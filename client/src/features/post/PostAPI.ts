import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithErrorHandling } from "../../app/api/baseApi";
import type { Post } from "../../app/models/content";

export const PostAPI = createApi({
  reducerPath: "Content",
  tagTypes: ["Posts"],
  baseQuery: baseQueryWithErrorHandling,
  endpoints: (builder) => ({
    getPosts: builder.query<Post[], void>({
      query: () => "GetPosts", // updated endpoint
      providesTags: ["Posts"],
    }),

    createPost: builder.mutation<Post, { content: string; authorEmail: string }>({
      query: (body) => ({
        url: "Post",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Posts"],
    }),

    votePost: builder.mutation<Post, { id: number; up: boolean }>({
      query: ({ id, up }) => ({
        url: `vote/${id}/vote?up=${up}`,
        method: "POST",
      }),
      invalidatesTags: ["Posts"],
    }),

    commentPost: builder.mutation<Comment, { id: number; text: string; authorEmail: string }>({
      query: (body) => ({
        url: `commentandreply/${body.id}/comment`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Posts"],
    }),

    commentChildPost: builder.mutation<
      Comment,
      { ParentCommentId: number; Text: string; AuthorEmail: string }
    >({
      query: (body) => ({
        url: `commentandreply/comment/${body.ParentCommentId}/reply`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Posts"],
    }),

    // ✅ Follow a user
    followUser: builder.mutation<void, { followerEmail: string; followingEmail: string }>({
      query: (body) => ({
        url: "follow/followuser",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Posts"], // re-fetch to update post ordering
    }),

    // ✅ Unfollow a user
    unfollowUser: builder.mutation<void, { followerEmail: string; followeeEmail: string }>({
      query: (body) => ({
        url: "unfollow/unfollowuser",
        method: "DELETE",
        body,
      }),
      invalidatesTags: ["Posts"],
    }),
  }),
});

export const {
  useCreatePostMutation,
  useGetPostsQuery,
  useVotePostMutation,
  useCommentPostMutation,
  useCommentChildPostMutation,
  useFollowUserMutation,
  useUnfollowUserMutation,
} = PostAPI;
