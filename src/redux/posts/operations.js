import { createAsyncThunk } from "@reduxjs/toolkit";
import { firebaseAPI } from "../../services/firebaseAPI";

export const fetchPosts = createAsyncThunk(
  "posts/fetchAll",
  async ({ owner }, thunkAPI) => {
    try {
      const response = await firebaseAPI.getPostsCollection({ owner });
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getPostById = createAsyncThunk(
  "posts/fetchOneById",
  async ({ owner, postID }, thunkAPI) => {
    try {
      const response = await firebaseAPI.getPostByID({ owner, postID });
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const addPost = createAsyncThunk(
  "posts/add",
  async ({ image, title, location, coordinates, owner }, thunkAPI) => {
    try {
      const response = await firebaseAPI.addPost({
        image,
        title,
        location,
        coordinates,
        owner,
      });
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const addComment = createAsyncThunk(
  "posts/addComment",
  async ({ owner, postID, author, text }, thunkAPI) => {
    try {
      const response = await firebaseAPI.addComment({
        owner,
        postID,
        author,
        text,
      });
      // return response;
      return { data: response, owner, postID };
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const addLike = createAsyncThunk(
  "posts/addLike",
  async ({ owner, postID }, thunkAPI) => {
    try {
      const response = firebaseAPI.addLikeToPost({ owner, postID });
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const removeLike = createAsyncThunk(
  "posts/removeLike",
  async ({ owner, postID }, thunkAPI) => {
    try {
      const response = firebaseAPI.removeLikeFromPost({ owner, postID });
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deletePost = createAsyncThunk(
  "posts/delete",
  async ({ owner, postID }, thunkAPI) => {
    try {
      const response = firebaseAPI.deletePost({ owner, postID });
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
