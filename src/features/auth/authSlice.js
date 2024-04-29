import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createUser, login, logout } from './authAPI';

const initialState = {
  loggedInUserToken: null,
  status: 'idle',
  error: null,
};

export const createUserAsync = createAsyncThunk('user/createUser', async (userData) => {
  const response = await createUser(userData);
  return response.data;
});

export const loginAsync = createAsyncThunk('user/login', async (loginInfo) => {
  const data = await login(loginInfo);
  return data.user;
});

export const logoutAsync = createAsyncThunk('user/logout', async (userData) => {
  const response = await logout(userData);
  return response.data;
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUserToken = action.payload;
      })
      .addCase(loginAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUserToken = action.payload;
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.error;
      })
      .addCase(logoutAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(logoutAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUserToken = null;
      });
  },
});

export const selectLoggedInUser = (state) => state.auth.loggedInUserToken;
export const selectError = (state) => state.auth.error;

export default userSlice.reducer;
