import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../features/product-list/productSlice';
import authReducer from '../features/auth/authSlice';
import cartReducer from '../features/cart/cartSlice';
import orderSlicer from '../features/orders/ordersSlice';

export const store = configureStore({
  reducer: {
    product: productReducer,
    auth: authReducer,
    cart: cartReducer,
    order: orderSlicer,
  },
});
