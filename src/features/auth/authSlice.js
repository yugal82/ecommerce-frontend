import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createUser, updateUser } from './authAPI';

const initialState = {
  loggedInUser: null,
  status: 'idle',
};

export const createUserAsync = createAsyncThunk('user/createUser', async (userData) => {
  const response = await createUser(userData);
  return response.data;
});

export const updateUserAsync = createAsyncThunk('user/updateUser', async (userData) => {
  const response = await updateUser(userData);
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
        state.loggedInUser = action.payload;
      })
      .addCase(updateUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUser = action.payload;
      });
  },
});

export const selectLoggedInUser = (state) => state.auth.loggedInUser;

export default userSlice.reducer;
