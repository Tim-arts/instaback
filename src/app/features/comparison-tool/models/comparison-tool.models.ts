export interface FollowAnalysis {
  totalFollowers: number;
  totalFollowing: number;
  mutualFollows: number;
  notFollowingBack: string[];
  debugInfo: DebugInfo;
}

export interface StringListItem {
  href: string;
  value: string;
  timestamp: number;
}

export interface FollowerItem {
  title: string;
  media_list_data: any[];
  string_list_data: StringListItem[];
}

export interface FollowingItem {
  title: string;
  string_list_data: Array<{
    href: string;
    timestamp: number;
  }>;
}

export interface FollowingData {
  relationships_following: FollowingItem[];
}

export interface DebugInfo {
  followersFileTimestamps: { earliest: number; latest: number };
  followingFileTimestamps: { earliest: number; latest: number };
  sampleFollowers: string[];
  sampleFollowing: string[];
  duplicatesInFollowers: number;
  duplicatesInFollowing: number;
}
