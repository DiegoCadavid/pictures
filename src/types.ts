
export interface PostImage {
  imageUrl: string;
  imageWidth: number;
  imageHeight: number;
  imageColorHex: string;
}
export interface Post extends PostImage {
  id: string;
  authorId: string;
  title: string;
  description: string;
 
}

export interface User {
  id: string;
  name: string | null;
  email: string | null;
  emailVerified: Date | null;
  image: string | null;
  bio: string;
}

export interface FollowsCount {
  followings: number;
  followers: number;
}

export interface UserWithFollowsCount extends User {
  _count: FollowsCount;
}

export interface PostWithTags extends Post {
  tags: string[];
}

export interface PostWithBookmarks extends Post {
  bookmarks: string | null;
}

export interface PostWithTagsAndBookmarks
  extends PostWithTags,
    PostWithBookmarks {}

export interface Comment {
  id: string;
  postId: string;
  authorId: string;
  responseId: string | null;
  content: string;
  createdAt: Date;
}

export interface CommentWithUser extends Comment {
  author: User;
}
