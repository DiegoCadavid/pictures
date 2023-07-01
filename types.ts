export interface Post {
  id: string;
  authorId: string;
  title: string;
  description: string;
  imageUrl: string;
  imageWidth: number;
  imageHeight: number;
  imageColorHex: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  emailVerified: Date;
  image: string;
  bio: string;
}

export interface FollowsCount {
  followings: number;
  followers: number;
}

export interface UserWithFollowsCount extends User {
  _count: FollowsCount
}

export interface PostWithTags extends Post {
  tags: string[]
}

export interface PostWithBookmarks extends Post {
  bookmarks: string | null;
}

// create interface with post with tags and bookmarks

export interface PostWithTagsAndBookmarks extends PostWithTags, PostWithBookmarks {}
