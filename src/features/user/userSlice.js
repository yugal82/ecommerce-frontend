import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getLoggedInUser, getUserOrders, updateUser } from './userAPI';

const initialState = {
  userInfo: null,
  userOrders: [],
  status: 'idle',
};

export const getLoggedInUserAsync = createAsyncThunk('user/getLoggedInUser', async (userId) => {
  const response = await getLoggedInUser(userId);
  return response.data;
});

export const getUserOrdersAsync = createAsyncThunk('user/getUserOrders', async () => {
  const response = await getUserOrders();
  return response.data;
});

export const updateUserAsync = createAsyncThunk('user/updateUser', async (user) => {
  const response = await updateUser(user);
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
      })
      .addCase(updateUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.userInfo = action.payload;
      });
  },
});

export const selectUserInfo = (state) => state.user.userInfo;
export const selectUserOrders = (state) => state.user.userOrders;

export default userSlice.reducer;
