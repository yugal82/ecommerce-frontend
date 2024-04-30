import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { checkAuth, createUser, login, logout } from './authAPI';

const initialState = {
  loggedInUserToken: null,
  userAuthChecked: false,
  status: 'idle',
  error: null,
};

export const createUserAsync = createAsyncThunk('user/createUser', async (userData) => {
  const response = await createUser(userData);
  return response.data;
});

export const loginAsync = createAsyncThunk('user/login', async (loginInfo) => {
  try {
    const data = await login(loginInfo);
    return data.user;
  } catch (error) {
    return error;
  }
});

export const checkAuthAsync = createAsyncThunk('user/checkAuth', async (user) => {
  try {
    const data = await checkAuth(user);
    return data.user;
  } catch (error) {
    return error;
  }
});

export const logoutAsync = createAsyncThunk('user/logout', async (userData) => {
  const response = await logout(userData);
  return response.data;
});

export const authSlice = createSlice({
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
      })
      .addCase(checkAuthAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(checkAuthAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUserToken = action.payload;
        state.userAuthChecked = true;
      })
      .addCase(checkAuthAsync.rejected, (state) => {
        state.status = 'idle';
        state.userAuthChecked = true;
      });
  },
});

export const selectLoggedInUser = (state) => state.auth.loggedInUserToken;
export const selectError = (state) => state.auth.error;
export const selectUserAuthChecked = (state) => state.auth.userAuthChecked;

export default authSlice.reducer;
