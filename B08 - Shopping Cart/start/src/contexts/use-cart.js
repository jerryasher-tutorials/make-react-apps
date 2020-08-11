import React from 'react';
import { useContext, createContext } from 'react';
import { useReducer } from 'react';

import products from '../products';

const CartContext = createContext();
CartContext.displayName = 'CartContext';
export const useCart = () => useContext(CartContext);

const initialState = { cart: [] };
function reducer(state, { type, payload }) {
  let newState;
  switch (type) {
    case 'ADD':
      newState = {
        ...state,
        cart: [
          ...state.cart,
          products.find((product) => product.sku === payload),
        ],
      };
      break;
    case 'REMOVE':
      const itemIndex = state.cart.findIndex((p) => p.sku === payload);
      const newCart = [...state.cart];
      if (itemIndex > -1) newCart.splice(itemIndex, 1);
      newState = {
        ...state,
        cart: [...newCart],
      };

      break;
    case 'EMPTY':
      break;
    default:
  }

  return newState;
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addItem = (sku) => {
    dispatch({ type: 'ADD', payload: sku });
  };
  const removeItem = (sku) => dispatch({ type: 'REMOVE', payload: sku });

  function countSkuInCart(sku) {
    let count = 0;
    state.cart.forEach((item) => (count += item.sku === sku ? 1 : 0));
    return count;
  }
  function totalPrice() {
    const prices = state.cart.map((product) => product.price);
    const total = prices.reduce((subTotal, price) => subTotal + price, 0);

    return total;
  }

  function groupCart() {
    const groupingCart = {};
    state.cart.forEach((p) => {
      const { sku } = p;
      if (sku in groupingCart) {
        groupingCart[sku].quant = groupingCart[sku].quant + 1;
      } else {
        groupingCart[sku] = { quant: 1, item: p };
      }
    });

    const entries = Object.entries(groupingCart);
    return groupingCart;
  }

  const context = {
    addItem,
    removeItem,
    countSkuInCart,
    groupCart,
    totalPrice,
    cart: state.cart,
  };

  return (
    <CartContext.Provider value={context}>{children}</CartContext.Provider>
  );
}
