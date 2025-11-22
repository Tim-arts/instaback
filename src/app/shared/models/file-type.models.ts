export const FileTypeEnum = {
  FOLLOWERS: 'followers',
  FOLLOWING: 'following'
}
export type FileTypeEnum = (typeof FileTypeEnum)[keyof typeof FileTypeEnum];
