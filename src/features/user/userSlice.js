import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getLoggedInUser, getUserOrders } from './userAPI';

const initialState = {
  userInfo: {},
  userOrders: [],
  status: 'idle',
};

export const getLoggedInUserAsync = createAsyncThunk('user/getLoggedInUser', async (user) => {
  const response = await getLoggedInUser(user);
  return response.data;
});

export const getUserOrdersAsync = createAsyncThunk('user/getUserOrders', async (user) => {
  const response = await getUserOrders(user);
  return response.data;
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getLoggedInUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getLoggedInUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.userInfo = action.payload;
      })
      .addCase(getUserOrdersAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getUserOrdersAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.userOrders = action.payload;
      });
  },
});

export const selectUserInfo = (state) => state.user.userInfo;
export const selectUserOrders = (state) => state.user.userOrders;

export default userSlice.reducer;
