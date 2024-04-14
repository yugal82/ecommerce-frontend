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
      </Routes>
    </div>
  );
}

export default App;
