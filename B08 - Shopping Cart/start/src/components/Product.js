import React from 'react';
import { useCart } from '../contexts/use-cart';

export default function Product({ product: { sku, name, image_url, price } }) {
  const {
    addItem,
    removeItem,
    // itemCount,
    shoppingCart,
  } = useCart();
  // console.log('Product -> addItem', addItem);
  // console.log('Product -> removeItem', removeItem);
  // console.log('Product -> itemCount', itemCount);
  console.log('Product -> shoppingCart', shoppingCart);
  return (
    <div className="product">
      <img alt={name} src={image_url} />
      <h3>{name}</h3>
      <div className="product-buttons">
        <button className="remove" onClick={() => removeItem(sku)}>
          Remove
        </button>
      </div>
      <div className="product-buttons">
        <button className="add" onClick={() => addItem(sku)}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}
