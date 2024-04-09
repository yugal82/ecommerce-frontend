import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getBrands, getCategories, getProductsByFilters, getProductsBySortFilter } from './productAPI';

// initial states
const initialState = {
  products: [],
  brands: [],
  categories: [],
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

export const getBrandsAsync = createAsyncThunk('product/getBrands', async () => {
  const response = await getBrands();
  return response.data;
});

export const getCategoriesAsync = createAsyncThunk('product/getCategories', async () => {
  const response = await getCategories();
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
      .addCase(getBrandsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getBrandsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.brands = action.payload;
      })
      .addCase(getCategoriesAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getCategoriesAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.categories = action.payload;
      });
  },
});

export const selectAllProducts = (state) => state.product.products;
export const selectAllBrands = (state) => state.product.brands;
export const selectAllCategories = (state) => state.product.categories;

export default productSlice.reducer;
