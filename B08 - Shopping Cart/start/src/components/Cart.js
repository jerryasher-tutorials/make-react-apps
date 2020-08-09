import React from 'react';
import products from '../products';
import { useCart } from '../contexts/use-cart';

export default function Cart() {
  const { addItem, removeItem } = useCart();
  console.log('Cart -> addItem', addItem);
  console.log('Cart -> removeItem', removeItem);

  return (
    <div className="cart">
      {/* show cart items here */}

      <div className="total">$100</div>
    </div>
  );
}
