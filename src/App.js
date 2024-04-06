import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import Navbar from './components/Navbar';
import Cart from './features/cart/Cart';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Checkout from './features/checkout/Checkout';

function App() {
  return (
    <div className="App bg-[#2d2d2d]">
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/cart" element={<Cart />} />
        <Route exact path="/checkout" element={<Checkout />} />
      </Routes>
    </div>
  );
}

export default App;
