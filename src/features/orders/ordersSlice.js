import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createOrder, getAllOrders, updateOrder } from './ordersAPI';

const initialState = {
  orders: [],
  latestOrder: null,
  status: 'idle',
};

export const createOrderAsync = createAsyncThunk('order/createOrder', async (data) => {
  const response = await createOrder(data.order, data.user);
  return response.data;
});

export const getAllOrdersAsync = createAsyncThunk('order/getAllOrders', async (user) => {
  const response = await getAllOrders(user);
  return response.data;
});

export const updateOrderAsync = createAsyncThunk('order/updateOrder', async (data) => {
  const response = await updateOrder(data.updatedOrder, data.user);
  return response.data;
});

export const orderSlice = createSlice({
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
        state.latestOrder = action.payload.data;
      })
      .addCase(getAllOrdersAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getAllOrdersAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.orders = action.payload;
      })
      .addCase(updateOrderAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateOrderAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const idx = state.orders.findIndex((order) => order.id === action.payload.id);
        state.orders[idx] = action.payload;
      });
  },
});

export const { resetLatestOrder } = orderSlice.actions;

export const selectOrders = (state) => state.order.orders;
export const selectLatestOrder = (state) => state.order.latestOrder;

export default orderSlice.reducer;
