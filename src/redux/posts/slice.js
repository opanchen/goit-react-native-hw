import { createSlice } from "@reduxjs/toolkit";
import {
  addComment,
  addLike,
  addPost,
  deletePost,
  fetchPosts,
  getPostById,
  removeLike,
} from "./operations";

const initialState = {
  items: [],
  isLoading: false,
  error: null,
  singlePost: null,
};

const handlePending = (state) => {
  state.isLoading = true;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, handlePending)
      .addCase(fetchPosts.rejected, handleRejected)
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items = action.payload;
      })

      .addCase(getPostById.pending, handlePending)
      .addCase(getPostById.rejected, handleRejected)
      .addCase(getPostById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.singlePost = action.payload;
      })

      .addCase(addPost.pending, handlePending)
      .addCase(addPost.rejected, handleRejected)
      .addCase(addPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items.push(action.payload);
      })

      .addCase(deletePost.pending, handlePending)
      .addCase(deletePost.rejected, handleRejected)
      .addCase(deletePost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;

        const index = state.items.findIndex(
          ({ postID }) => postID === action.payload.postID
        );

        state.items.splice(index, 1);
      })

      .addCase(addComment.pending, handlePending)
      .addCase(addComment.rejected, handleRejected)
      .addCase(addComment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;

        const { data } = action.payload;
        state.singlePost.comments.push(data);

        const index = state.items.findIndex(
          ({ owner }) => owner === action.payload.owner
        );
        // console.log("INDEX: ", index);

        const post = state.items.find(
          ({ postID }) => postID === action.payload.postID
        );
        // console.log("UPDATED POST: ", post);
        post.comments.push(data);

        state.items.slice(index, 1, post);
      })

      .addCase(addLike.pending, handlePending)
      .addCase(addLike.rejected, handleRejected)
      .addCase(addLike.fulfilled, (state, action) => {
        const post = state.items.find(
          ({ postID }) => postID === action.payload.postID
        );
        const index = state.items.findIndex(
          ({ postID }) => postID === action.payload.postID
        );

        post.isLiked = true;
        post.likes += 1;

        state.items.splice(index, 1, post);
      })

      .addCase(removeLike.pending, handlePending)
      .addCase(removeLike.rejected, handleRejected)
      .addCase(removeLike.fulfilled, (state, action) => {
        const post = state.items.find(
          ({ postID }) => postID === action.payload.postID
        );
        const index = state.items.findIndex(
          ({ postID }) => postID === action.payload.postID
        );

        post.isLiked = false;
        post.likes -= 1;

        state.items.splice(index, 1, post);
      });
  },
});
