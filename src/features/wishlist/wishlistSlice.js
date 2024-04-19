import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addItemInWishlist, deleteItemFromWishlist, getWishlistedItemsByUser } from './wishlistAPI';

const initialState = {
  wishlistItems: [],
  status: 'idle',
};

export const addItemInWishlistAsync = createAsyncThunk('counter/addItemInWishlist', async (item) => {
  const response = await addItemInWishlist(item);
  return response.data;
});

export const deleteItemFromWishlistAsync = createAsyncThunk('counter/deleteItemFromWishlist', async (itemId) => {
  const response = await deleteItemFromWishlist(itemId);
  return response.data;
});

export const getWishlistedItemsByUserAsync = createAsyncThunk('counter/getWishlistedItemsByUser', async (userId) => {
  const response = await getWishlistedItemsByUser(userId);
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
