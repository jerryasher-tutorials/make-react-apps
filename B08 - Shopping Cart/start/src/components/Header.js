import React from 'react';
import CartIcon from '../supermarket.svg';
import { useCart } from '../contexts/use-cart';

export default function Header() {
  const { itemCount } = useCart();
  return (
    <header>
      <div className="container">
        <div className="cart-button">
          <button>
            <img alt="shopping cart" src={CartIcon} width="30" />({itemCount()})
          </button>
        </div>
      </div>
    </header>
  );
}
