import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addItemInWishlist, deleteItemFromWishlist, getWishlistedItemsByUser } from './wishlistAPI';

const initialState = {
  wishlistItems: [],
  status: 'idle',
};

export const addItemInWishlistAsync = createAsyncThunk('counter/addItemInWishlist', async (data) => {
  const response = await addItemInWishlist(data.item, data.user);
  return response.data;
});

export const deleteItemFromWishlistAsync = createAsyncThunk('counter/deleteItemFromWishlist', async (data) => {
  const response = await deleteItemFromWishlist(data.itemId, data.user);
  return response.data;
});

export const getWishlistedItemsByUserAsync = createAsyncThunk('counter/getWishlistedItemsByUser', async (user) => {
  const response = await getWishlistedItemsByUser(user);
  return response.data;
});

export const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addItemInWishlistAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addItemInWishlistAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.wishlistItems.push(action.payload);
      })
      .addCase(deleteItemFromWishlistAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteItemFromWishlistAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const idx = state.wishlistItems.findIndex((item) => item.id === action.payload.id);
        state.wishlistItems.splice(idx, 1);
      })
      .addCase(getWishlistedItemsByUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getWishlistedItemsByUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.wishlistItems = action.payload;
      });
  },
});

export const selectWishlistItems = (state) => state.wishlist.wishlistItems;

export default wishlistSlice.reducer;
