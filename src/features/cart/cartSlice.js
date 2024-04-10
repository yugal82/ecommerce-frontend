import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addItemInCart } from './cartAPI';

const initialState = {
  value: 0,
  items: [],
  status: 'idle',
};

export const addItemInCartAsync = createAsyncThunk('cart/addItemInCart', async (item) => {
  const response = await addItemInCart(item);
  return response.data;
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
      });
  },
});

export default cartSlice.reducer;
