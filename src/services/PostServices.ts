import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { Post } from "../models/interfaces/Post.interface";

interface QueryArgs {
  start: number;
  end: number;
}

export const postsAPI = createApi({
  reducerPath: "postsAPI",
  baseQuery: fetchBaseQuery({ baseUrl: "/" }),
  tagTypes: ["Post"],
  endpoints: (build) => ({
    fetchPosts: build.query<Array<Post>, QueryArgs>({
      query: ({ start, end }) => ({
        url: `posts`,
        credentials: "include",
        params: {
          _start: start,
          _end: end,
        },
      }),
      providesTags: (result) => ["Post"],
    }),
    createPost: build.mutation<Post, Post>({
      query: (post) => ({
        url: `posts`,
        method: "POST",
        credentials: "include",
        body: post,
      }),
      invalidatesTags: ["Post"],
    }),
    updatePost: build.mutation<Post, Post>({
      query: (post) => ({
        url: `posts/${post.id}`,
        method: "PUT",
        credentials: "include",
        body: post,
      }),
      invalidatesTags: ["Post"],
    }),
    deletePost: build.mutation<Post, Post>({
      query: (post) => ({
        url: `posts/${post.id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["Post"],
    }),
  }),
});
