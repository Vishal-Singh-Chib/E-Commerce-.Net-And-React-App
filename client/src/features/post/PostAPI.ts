import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithErrorHandling } from "../../app/api/baseApi";
import type { Post } from "../../app/models/content";

export const PostAPI = createApi({
  reducerPath: "Content",
  tagTypes: ["Posts"], // ✅ Enables auto-refetching
  baseQuery: baseQueryWithErrorHandling,
  endpoints: (builder) => ({
    getPosts: builder.query<Post[], void>({
      query: () => "Content",
      providesTags: ["Posts"], // ✅ Tells RTK Query this data is taggable
    }),

    createPost: builder.mutation<Post, { content: string; authorEmail: string }>({
      query: (body) => ({
        url: "Content",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Posts"], // ✅ Triggers re-fetch of getPosts
    }),

    votePost: builder.mutation<Post, { id: number; up: boolean }>({
      query: ({ id, up }) => ({
        url: `Content/${id}/vote?up=${up}`,
        method: "POST",
      }),
      invalidatesTags: ["Posts"], // ✅
    }),

    commentPost: builder.mutation<Comment, { id: number; text: string ;authorEmail: string }>({
      query: (body) => ({
        url: `Content/${body.id}/comment`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Posts"], // ✅
    }),

    commentChildPost: builder.mutation<
      Comment,
      { ParentCommentId: number; Text: string; AuthorEmail: string }
    >({
      query: (body) => ({
        url: `Content/comment/${body.ParentCommentId}/reply`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Posts"], // ✅
    }),
  }),
});

export const {
  useCreatePostMutation,
  useGetPostsQuery,
  useVotePostMutation,
  useCommentPostMutation,
  useCommentChildPostMutation,
} = PostAPI;
