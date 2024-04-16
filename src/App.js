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

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);

  useEffect(() => {
    if (user) dispatch(getItemsByUserAsync(user?.id));
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
      </Routes>
    </div>
  );
}

export default App;
