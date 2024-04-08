import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAllProducts, getProductsByFilters, getProductsBySortFilter } from './productAPI';

// initial states
const initialState = {
  products: [],
  status: 'idle',
};

// async thunk - used for getting the status of API calls.
export const getAllProductsAsync = createAsyncThunk('product/getAllProducts', async () => {
  const response = await getAllProducts();
  return response.data;
});

export const getProductsByFiltersAsync = createAsyncThunk('product/getProductsByFilters', async (filters) => {
  const response = await getProductsByFilters(filters);
  return response.data;
});

export const getProductsBySortFilterAsync = createAsyncThunk('product/getProductsBySortFilter', async (filters) => {
  const response = await getProductsBySortFilter(filters);
  return response.data;
});

// slice
export const productSlice = createSlice({
  name: 'product',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllProductsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getAllProductsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products = action.payload;
      })
      .addCase(getProductsByFiltersAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getProductsByFiltersAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products = action.payload;
      })
      .addCase(getProductsBySortFilterAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getProductsBySortFilterAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products = action.payload;
      });
  },
});

export const selectAllProducts = (state) => state.products.products;

export default productSlice.reducer;
