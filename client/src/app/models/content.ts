// content.ts

 
  export interface Post {
    id: number;
    content: string;
    authorEmail: string;
    createdAt: string; // ISO 8601 date string
    upvotes: number;
    downvotes: number;
    comments: Comment[];
     isFollowedUser : boolean;
  }

  export interface Comment {
    id: number;
    postId: number;
    authorEmail: string;
    text: string;
    createdAt: string;
    parentCommentId?: number | null;
    parentComment?: Comment | null;
    replies: Comment[];
    comments: Comment[];
    post: Post;
  }

  export interface Follow {
    id: number;
    followerEmail: string;
    followingEmail: string;
  }

  // Types
  export type CommentType = {
    id: number;
    text: string;
    authorEmail: string;
    createdAt: string;
    comments: CommentType[];
  };
  
  export type PostType = {
    id: number;
    content: string;
    authorEmail: string;
    createdAt: string;
    upvotes: number;
    downvotes: number;
    comments: CommentType[];
    isFollowedUser : boolean;
  };
 