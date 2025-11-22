export interface AnalysisResultsInterface {
  totalFollowers: number;
  totalFollowing: number;
  mutualFollows: number;
  notFollowingBack: string[];
}

export interface ListItemInterface {
  href: string;
  value: string;
  timestamp: number;
}

export interface FollowerItemInterface {
  title: string;
  media_list_data: string[];
  string_list_data: ListItemInterface[];
}

export interface FollowingItemInterface {
  title: string;
  string_list_data: Array<{
    href: string;
    timestamp: number;
  }>;
}

export interface FollowingDataInterface {
  relationships_following: FollowingItemInterface[];
}
