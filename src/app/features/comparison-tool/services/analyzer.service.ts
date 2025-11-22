import { Injectable } from '@angular/core';
import { catchError, from, map, Observable, shareReplay, throwError } from 'rxjs';
import { FollowAnalysis, FollowerItem, FollowingData } from '../models/comparison-tool.models';

@Injectable({
  providedIn: 'root'
})
export class AnalyzerService {
  analyzeData$(followersFile: File, followingFile: File): Observable<FollowAnalysis> {
    return from(
      Promise.all([
        this.#readFileAsJSON<FollowerItem[]>(followersFile),
        this.#readFileAsJSON<FollowingData>(followingFile)
      ])
    ).pipe(
      map(([followersData, followingData]) =>
        this.#processData(followersData, followingData)),
      catchError(err => throwError(() => err)),
      shareReplay(1) // Ensures only one execution even with multiple subscribers
    );
  }

  #processData(
    followersData: FollowerItem[],
    followingData: FollowingData
  ): FollowAnalysis {
    const followers = new Set<string>();
    for (const item of followersData) {
      const username = item.string_list_data?.[0]?.value;
      if (username) followers.add(username);
    }

    const following = new Set<string>();
    for (const item of followingData.relationships_following) {
      const username = item.title;
      if (username) following.add(username);
    }

    const notFollowingBack = [...following].filter(u => !followers.has(u)).sort();
    const mutualFollowsCount = [...followers].filter(u => following.has(u)).length;

    return {
      totalFollowers: followers.size,
      totalFollowing: following.size,
      mutualFollows: mutualFollowsCount,
      notFollowingBack
    };
  }

  #readFileAsJSON<T>(file: File): Promise<T> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const content = e.target?.result as string;
          resolve(JSON.parse(content) as T);
        } catch {
          reject(new Error('Invalid JSON file'));
        }
      };
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsText(file);
    });
  }
}
