import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addItemInCart, deleteItemFromCart, getItemsByUser, resetCart, updateItemInCart } from './cartAPI';

const initialState = {
  items: [],
  status: 'idle',
};

export const addItemInCartAsync = createAsyncThunk('cart/addItemInCart', async (data) => {
  const response = await addItemInCart(data.newItem, data.user);
  return response.data;
});

export const getItemsByUserAsync = createAsyncThunk('cart/getItemsByUser', async (user) => {
  const response = await getItemsByUser(user);
  return response.data;
});

export const updateCartAsync = createAsyncThunk('cart/updateItemInCart', async (data) => {
  const response = await updateItemInCart(data.newProduct, data.user);
  return response.data;
});

export const deleteItemFromCartAsync = createAsyncThunk('cart/deleteItemFromCart', async (data) => {
  const response = await deleteItemFromCart(data.id, data.user);
  return response.data;
});

export const resetCartAsync = createAsyncThunk('cart/resetCart', async (user) => {
  await resetCart(user);
  return;
});

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(addItemInCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addItemInCartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items.push(action.payload);
      })
      .addCase(getItemsByUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getItemsByUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items = action.payload;
      })
      .addCase(updateCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateCartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const idx = state.items.findIndex((item) => item.id === action.payload.id);
        state.items[idx] = action.payload;
      })
      .addCase(deleteItemFromCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteItemFromCartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const idx = state.items.findIndex((item) => item.id === action.payload.id);
        state.items.splice(idx, 1);
      })
      .addCase(resetCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(resetCartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items = [];
      });
  },
});

export const selectCartItems = (state) => state.cart.items;

export default cartSlice.reducer;
