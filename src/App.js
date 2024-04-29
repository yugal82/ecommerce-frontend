import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import Navbar from './components/Navbar';
import Cart from './features/cart/Cart';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Checkout from './features/checkout/Checkout';
import ProductDetails from './features/product-list/product-components/ProductDetails';
import Protected from './components/auth/Protected';
import { useDispatch, useSelector } from 'react-redux';
import { selectLoggedInUser } from './features/auth/authSlice';
import { getItemsByUserAsync } from './features/cart/cartSlice';
import OrderSuccess from './features/orders/OrderSuccess';
import UserOrders from './features/user/UserOrders';
import UserProfile from './features/user/UserProfile';
import Logout from './components/auth/Logout';
import ForgotPassword from './components/auth/ForgotPassword';
import AdminProtected from './components/auth/AdminProtected';
import AdminProducts from './features/admin/AdminProducts';
import AdminProductDetails from './features/admin/AdminProductDetails';
import CreateProductForm from './features/admin/CreateProductForm';
import AdminOrders from './features/admin/AdminOrders';
import Wishlist from './features/wishlist/Wishlist';
import { getLoggedInUserAsync } from './features/user/userSlice';
import AdminOrderDetails from './features/admin/AdminOrderDetails';

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);

  useEffect(() => {
    // 'user' variable will now contain the JWT token that is sent by the backend server. Now we can get user from 'req.user' by token on backend, so no need to pass the user?.id in frontend.
    if (user) {
      dispatch(getItemsByUserAsync(user));
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (user) dispatch(getLoggedInUserAsync(user?.id));
  }, [dispatch, user]);

  return (
    <div className="App bg-background">
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route
          exact
          path="/cart"
          element={
            <Protected>
              <Cart />
            </Protected>
          }
        />
        <Route
          exact
          path="/checkout"
          element={
            <Protected>
              <Checkout />
            </Protected>
          }
        />
        <Route exact path="/product-details/:id" element={<ProductDetails />} />
        <Route exact path="/order-success/:id" element={<OrderSuccess />} />
        <Route
          exact
          path="/profile"
          element={
            <Protected>
              <UserProfile />
            </Protected>
          }
        />
        <Route
          exact
          path="/profile/my-orders"
          element={
            <Protected>
              <UserOrders />
            </Protected>
          }
        />
        <Route exact path="/logout" element={<Logout />} />
        <Route exact path="/forgot-password" element={<ForgotPassword />} />
        <Route
          exact
          path="/wishlist"
          element={
            <Protected>
              <Wishlist />
            </Protected>
          }
        />

        {/* Admin routes */}
        <Route
          exact
          path="/admin"
          element={
            <AdminProtected>
              <AdminProducts />
            </AdminProtected>
          }
        />
        <Route
          exact
          path="/admin/product-details/:id"
          element={
            <AdminProtected>
              <AdminProductDetails />
            </AdminProtected>
          }
        />
        <Route
          exact
          path="/admin/create-product"
          element={
            <AdminProtected>
              <CreateProductForm />
            </AdminProtected>
          }
        />
        <Route
          exact
          path="/admin/orders"
          element={
            <AdminProtected>
              <AdminOrders />
            </AdminProtected>
          }
        />
        <Route
          exact
          path="/admin/orders/order-details/:id"
          element={
            <AdminProtected>
              <AdminOrderDetails />
            </AdminProtected>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
