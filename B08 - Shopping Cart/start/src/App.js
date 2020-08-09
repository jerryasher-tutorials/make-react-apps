import React from 'react';
import Header from './components/Header';
import products from './products';
import Product from './components/Product';

import { CartProvider } from './contexts/use-cart';

import './App.css';

export default function App() {
  return (
    <div className="app">
      <CartProvider>
        {/* header */}
        <Header />
        <main>
          <div className="products-list">
            {products.map((p, i) => (
              <Product key={i} product={p} />
            ))}
          </div>
        </main>
      </CartProvider>
    </div>
  );
}
