import React, { useState, useRef } from 'react';
import useOnClickOutside from 'use-onclickoutside';

import CartIcon from '../supermarket.svg';
import { useCart } from '../contexts/use-cart';
import Cart from './Cart';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { cart } = useCart();

  const modalRef = useRef(null);
  // close the modal if we click outside of it
  useOnClickOutside(modalRef, () => {
    if (isOpen === true) setIsOpen(false);
  });

  return (
    <header>
      <div className="container">
        <div className="cart-button">
          <button onClick={() => setIsOpen((isOpen) => !isOpen)}>
            <img alt="shopping cart" src={CartIcon} width="30" />({cart.length})
          </button>
          {/* show a modal */}
          <div
            ref={modalRef}
            className="cart-modal"
            style={{ display: isOpen ? 'block' : 'none' }}
          >
            <Cart />
          </div>
        </div>
      </div>
    </header>
  );
}
