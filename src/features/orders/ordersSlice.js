import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createOrder } from './ordersAPI';

const initialState = {
  orders: [],
  latestOrder: null,
  status: 'idle',
};

export const createOrderAsync = createAsyncThunk('order/createOrder', async (order) => {
  const response = await createOrder(order);
  return response.data;
});

export const orderSlicer = createSlice({
  name: 'order',
  initialState,
  reducers: {
    resetLatestOrder: (state) => {
      state.latestOrder = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrderAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createOrderAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.orders.push(action.payload);
        state.latestOrder = action.payload;
      });
  },
});

export const { resetLatestOrder } = orderSlicer.actions;

export const selectOrders = (state) => state.order.orders;
export const selectLatestOrder = (state) => state.order.latestOrder;

export default orderSlicer.reducer;
