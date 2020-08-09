import React from 'react';
import { useState } from 'react';
import { useContext, createContext } from 'react';
import { useReducer } from 'react';

export const CartContext = createContext();
CartContext.displayName = 'CartContext';
export const useCart = () => useContext(CartContext);

// export const useCart = () => {
//   return {
//     addItem: (s, p) => console.log(s, p),
//     removeItem: (s) => console.log(s),
//   };
// };

// export function CartProvider({ children }) {
//   return <ul><li>{children}</li></ul>;
// }

export function CartProvider({ children }) {
  function reducer(state, action) {
    console.log('reducer -> state', state);
    const { shoppingCart } = state;
    console.log('reducer -> shoppingCart', shoppingCart);
    const { type, payload } = action;
    console.log('reducer -> payload', payload);
    console.log('reducer -> type', type);

    let newCart;
    if (type === 'ADD') {
      newCart = [...shoppingCart, payload];
    }

    if (type === 'REMOVE') {
      const ndx = shoppingCart.indexOf(payload);
      if (ndx >= 0) {
        newCart = [
          ...shoppingCart.slice(0, ndx),
          ...shoppingCart.slice(ndx + 1),
        ];
      } else {
        newCart = [...shoppingCart];
      }
    }

    console.log('reducer -> newCart', newCart);
    console.log('reducer -> state', state);

    const newState = { ...state, shoppingCart: newCart };
    console.log('reducer -> newState', newState);
    return newState;
  }

  function itemCount() {
    return shoppingCart.length;
  }

  const [state, dispatch] = useReducer(reducer, { shoppingCart: [] });
  // const [state, dispatch] = useState({ shoppingCart: [] });

  const { shoppingCart } = state;

  const addItem = (sku) => {
    dispatch({ type: 'ADD', payload: sku });
  };
  const removeItem = (sku) => {
    dispatch({ type: 'REMOVE', payload: sku });
  };

  const [actions] = useState({ addItem, removeItem });

  const context = { ...actions, shoppingCart, itemCount };
  console.log('reducer -> context', context);

  return (
    <CartContext.Provider value={context}>{children}</CartContext.Provider>
  );
}
