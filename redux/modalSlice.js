import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  signupModal: false,
  loginModal: false,
  commentModal: false,

  commentTweetDetails: {
    id: null,
    tweet: null,
    photoUrl: null,
    name: null,
    username: null,
  },
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openSignupModal: (state) => {
      state.signupModal = true;
    },
    closeSignupModal: (state) => {
      state.signupModal = false;
    },
    openLoginModal: (state) => {
      state.loginModal = true;
    },
    closeLoginModal: (state) => {
      state.loginModal = false;
    },
    openCommentModal: (state) => {
      state.commentModal = true;
    },
    closeCommentModal: (state) => {
      state.commentModal = false;
    },

    setCommentTweet: (state, action) => {
      state.commentTweetDetails.username = action.payload.username;
      state.commentTweetDetails.name = action.payload.name;
      state.commentTweetDetails.id = action.payload.id;
      state.commentTweetDetails.photoUrl = action.payload.photoUrl;
      state.commentTweetDetails.tweet = action.payload.tweet;
    },
  },
});

export const {
  openSignupModal,
  closeSignupModal,
  openLoginModal,
  closeLoginModal,
  openCommentModal,
  closeCommentModal,
  setCommentTweet,
} = modalSlice.actions;

export default modalSlice.reducer;
