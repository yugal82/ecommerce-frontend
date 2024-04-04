import React from 'react';
import './App.css';
import ProductList from './features/product-list/ProductList';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="App">
      <Navbar />
      <ProductList />
    </div>
  );
}

export default App;
