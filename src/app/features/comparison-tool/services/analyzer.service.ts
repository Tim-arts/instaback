import { Injectable, signal } from '@angular/core';
import { catchError, from, map, Observable, throwError } from 'rxjs';
import { DebugInfo, FollowAnalysis, FollowerItem, FollowingData } from '../models/comparison-tool.models';

@Injectable({
  providedIn: 'root'
})
export class AnalyzerService {
  #analysisSignal = signal<FollowAnalysis | undefined>(undefined);
  #loadingSignal = signal<boolean>(false);
  #errorSignal = signal<string | undefined>(undefined);

  readonly analysis = this.#analysisSignal.asReadonly();
  readonly loading = this.#loadingSignal.asReadonly();
  readonly error = this.#errorSignal.asReadonly();

  analyzeFollowData(followersFile: File, followingFile: File): Observable<FollowAnalysis> {
    this.#loadingSignal.set(true);
    this.#errorSignal.set(undefined);

    return from(
      Promise.all([
        this.#readFileAsJSON<FollowerItem[]>(followersFile),
        this.#readFileAsJSON<FollowingData>(followingFile)
      ])
    ).pipe(
      map(([followersData, followingData]) => {
        const analysis = this.#processData(followersData, followingData);
        this.#analysisSignal.set(analysis);
        this.#loadingSignal.set(false);
        return analysis;
      }),
      catchError(error => {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        this.#errorSignal.set(errorMessage);
        this.#loadingSignal.set(false);
        return throwError(() => error);
      })
    );
  }

  #processData(
    followersData: FollowerItem[],
    followingData: FollowingData
  ): FollowAnalysis {
    // Extract follower usernames with timestamps
    const followers = new Set<string>();
    const followerTimestamps: number[] = [];
    const followersList: string[] = [];
    let duplicateFollowersCount = 0;

    for (const item of followersData) {
      if (item.string_list_data && item.string_list_data.length > 0) {
        const username = item.string_list_data[0].value;
        const timestamp = item.string_list_data[0].timestamp;

        if (followers.has(username)) {
          console.warn(`Duplicate follower found: ${username}`);
          duplicateFollowersCount++;
        }

        followers.add(username);
        followersList.push(username);
        followerTimestamps.push(timestamp);
      }
    }

    // Extract following usernames with timestamps
    const following = new Set<string>();
    const followingTimestamps: number[] = [];
    const followingList: string[] = [];
    let duplicateFollowingCount = 0;

    for (const item of followingData.relationships_following) {
      if (item.title) {
        const username = item.title;
        const timestamp = item.string_list_data?.[0]?.timestamp ?? 0;

        if (following.has(username)) {
          console.warn(`Duplicate following found: ${username}`);
          duplicateFollowingCount++;
        }

        following.add(username);
        followingList.push(username);
        followingTimestamps.push(timestamp);
      }
    }

    const notFollowingBack = [...following]
    .filter(username => !followers.has(username))
    .sort();

    const mutualFollowsCount = [...followers].filter(username =>
      following.has(username)
    ).length;

    // Create debug info
    const debugInfo: DebugInfo = {
      followersFileTimestamps: {
        earliest: Math.min(...followerTimestamps),
        latest: Math.max(...followerTimestamps)
      },
      followingFileTimestamps: {
        earliest: Math.min(...followingTimestamps),
        latest: Math.max(...followingTimestamps)
      },
      sampleFollowers: followersList.slice(0, 10),
      sampleFollowing: followingList.slice(0, 10),
      duplicatesInFollowers: duplicateFollowersCount,
      duplicatesInFollowing: duplicateFollowingCount
    };

    console.log('Debug Info:', debugInfo);
    console.log('Total unique followers:', followers.size);
    console.log('Total unique following:', following.size);

    // Log if antoninecce is found
    if (followers.has('antoninecce')) {
      console.log('✅ antoninecce IS in followers');
    } else {
      console.log('❌ antoninecce is NOT in followers');
    }

    if (following.has('antoninecce')) {
      console.log('✅ antoninecce IS in following');
    } else {
      console.log('❌ antoninecce is NOT in following');
    }

    return {
      totalFollowers: followers.size,
      totalFollowing: following.size,
      mutualFollows: mutualFollowsCount,
      notFollowingBack,
      debugInfo
    };
  }

  #readFileAsJSON<T>(file: File): Promise<T> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (e: ProgressEvent<FileReader>) => {
        try {
          const content = e.target?.result as string;
          const json = JSON.parse(content);
          resolve(json);
        } catch (error) {
          reject(new Error('Invalid JSON file'));
        }
      };

      reader.onerror = () => {
        reject(new Error('Failed to read file'));
      };

      reader.readAsText(file);
    });
  }

  clearAnalysis(): void {
    this.#analysisSignal.set(undefined);
    this.#errorSignal.set(undefined);
  }
}
