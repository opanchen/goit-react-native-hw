import { createAsyncThunk } from "@reduxjs/toolkit";
import { firebaseAPI } from "../../services/firebaseAPI";

export const register = createAsyncThunk(
  "auth/register",
  async (credentials, thunkAPI) => {
    try {
      const res = await firebaseAPI.registerUser(credentials);
      console.log("auth/register operation res: ", res);
      const {
        uid: userID,
        displayName: login,
        email,
        photoURL: avatarURL,
      } = res;
      const newUser = {
        userID,
        login,
        email,
        avatarURL,
      };
      return newUser;
      //   return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logIn = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      const res = await firebaseAPI.loginUser(credentials);
      // console.log("auth/login operation res: ", res);
      const {
        uid: userID,
        displayName: login,
        email,
        photoURL: avatarURL,
      } = res;

      const currentUser = { userID, login, email, avatarURL };
      //   return res;
      return currentUser;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logOut = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    const res = await firebaseAPI.logoutUser();
    return res;
  } catch (error) {
    console.log("LogOut operation error:", error);
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const updateAvatar = createAsyncThunk(
  "auth/updateAvatar",
  async (credentials, thunkAPI) => {
    try {
      const res = await firebaseAPI.updateAvatar(credentials);
      return res;
    } catch (error) {
      // console.log("error operation", error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
