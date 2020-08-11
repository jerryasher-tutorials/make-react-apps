import React from 'react';
import { useCart } from '../contexts/use-cart';

export default function Product({ product: { sku, name, image_url, price } }) {
  const { removeItem, addItem, countSkuInCart } = useCart();
  const itemCount = countSkuInCart(sku);
  return (
    <div className="product">
      <img alt={name} src={image_url} />
      <h3>{name}</h3>
      <div className="product-buttons">
        {itemCount > -1 ? (
          <button className="remove" onClick={() => removeItem(sku)}>
            Remove
          </button>
        ) : (
          <div></div>
        )}
        <button className="add" onClick={() => addItem(sku)}>
          Add to Cart ({itemCount})
        </button>
      </div>
    </div>
  );
}
