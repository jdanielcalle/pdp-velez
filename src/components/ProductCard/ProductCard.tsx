import React, { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import styles from './ProductCard.module.scss';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
}

const ProductCard = ({ id, name, price, image }: ProductCardProps) => {
  const { addToCart } = useContext(CartContext);

  return (
    <div className={styles.card}>
      <img src={image} alt={name} className={styles.image} />
      <h3>{name}</h3>
      <p>${price.toFixed(2)}</p>
      <button onClick={() => addToCart({ id, name, price, image, quantity: 1 })}>
        Agregar al carrito
      </button>
    </div>
  );
};

export default ProductCard;
