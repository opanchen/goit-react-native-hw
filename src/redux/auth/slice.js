import { createSlice } from "@reduxjs/toolkit";
import { logIn, logOut, register, updateAvatar } from "./operations";

const initialState = {
  user: {
    userID: null,
    login: null,
    email: null,
    avatarURL: null,
  },
  isLoggedIn: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
        state.error = null;
      })
      .addCase(register.pending, (state) => {
        state.error = null;
      })
      .addCase(register.rejected, (state, action) => {
        const errorMessage = action.payload;
        console.log("REGISTER ERROR: ", errorMessage);

        state.error = errorMessage
          .toLowerCase()
          .includes("email-already-in-use")
          ? "Дана електронна пошта вже використовується."
          : "Введено некоректні дані для реєстрації";
      })

      .addCase(logIn.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
        state.error = null;
      })
      .addCase(logIn.pending, (state) => {
        state.error = null;
      })
      .addCase(logIn.rejected, (state, action) => {
        console.log("LOGIN ERROR: ", action.payload);
        state.error =
          "Пароль або електронну пошту вказано невірно. \nУвага, кількість спроб обмежено!";
      })

      .addCase(logOut.fulfilled, (state) => {
        state.user = {
          userID: null,
          login: null,
          email: null,
          avatarURL: null,
        };
        state.isLoggedIn = false;
        state.error = null;
        // console.log("logout inside redux slice");
      })
      .addCase(logOut.pending, (state) => state)
      .addCase(logOut.rejected, (state) => state)

      .addCase(updateAvatar.fulfilled, (state, action) => {
        state.user.avatarURL = action.payload.avatarURL;
      })
      .addCase(updateAvatar.pending, (state) => state)
      .addCase(updateAvatar.rejected, (state) => state);
  },
});

export const authReducer = authSlice.reducer;
