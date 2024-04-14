import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createOrder, fetchCount } from './ordersAPI';

const initialState = {
  value: 0,
  orders: [],
  status: 'idle',
};

export const createOrderAsync = createAsyncThunk('order/createOrder', async (order) => {
  const response = await createOrder(order);
  return response.data;
});

export const orderSlicer = createSlice({
  name: 'order',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(createOrderAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createOrderAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.orders.push(action.payload);
      });
  },
});

export const orders = (state) => state.order.orders;

export default orderSlicer.reducer;
