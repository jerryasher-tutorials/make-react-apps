import React from 'react';
// import products from '../products';
import { useCart } from '../contexts/use-cart';

export default function Cart() {
  const { addItem, removeItem, groupCart, totalPrice } = useCart();

  const groupedCart = groupCart();
  const entries = Object.entries(groupedCart);

  return (
    <div className="cart">
      {/* show cart items here */}

      {entries.map(([sku, entry], i) => {
        const { item, quant } = entry;
        return (
          <div className="cart-item" key={i}>
            <img src={item.image_url} alt={item.name} width={100} />
            <div className="content">
              <h3>{item.name}</h3>
              <div className="cart-buttons">
                <button onClick={() => removeItem(item.sku)}>-</button>
                <button>{quant}</button>
                <button onClick={() => addItem(item.sku)}>+</button>
              </div>
            </div>
          </div>
        );
      })}
      <div className="total">${totalPrice()}</div>
    </div>
  );
}
