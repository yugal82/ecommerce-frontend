import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  createProduct,
  deleteProduct,
  getProductsByFilters,
  getProductsBySortFilter,
} from '../product-list/productAPI';

// initial states
const initialState = {
  products: [],
  status: 'idle',
};

// async thunk - used for getting the status of API calls.
export const getProductsByFiltersAsync = createAsyncThunk('product/getProductsByFilters', async (filters) => {
  const response = await getProductsByFilters(filters);
  return response.data;
});

export const getProductsBySortFilterAsync = createAsyncThunk('product/getProductsBySortFilter', async (filters) => {
  const response = await getProductsBySortFilter(filters);
  return response.data;
});

export const createProductAsync = createAsyncThunk('product/createProduct', async (product) => {
  const response = await createProduct(product);
  return response.data;
});

export const deleteProductAsync = createAsyncThunk('product/deleteProduct', async (product) => {
  const response = await deleteProduct(product);
  console.log(response);
  return response.data;
});

// slice
export const productSlice = createSlice({
  name: 'product',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {},
  extraReducers: (builder) => {
    builder
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
      })
      .addCase(createProductAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createProductAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products.push(action.payload);
      })
      .addCase(deleteProductAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteProductAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const idx = state.products.findIndex((item) => item.id === action.payload.id);
        state.products[idx] = action.payload;
      });
  },
});

export const selectAllProducts = (state) => state.product.products;

export default productSlice.reducer;
