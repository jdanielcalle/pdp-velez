import React, { useContext } from 'react';
import styles from './CartButton.module.scss';
import cartImg from '../../assets/cart.png';
import { CartContext } from '../../context/CartContext';

const CartButton = () => {
  const { cartItems } = useContext(CartContext);

  return (
    <div className={styles.cartButton}>
      <img src={cartImg} alt="Carrito" className={styles.icon} />
      {cartItems.length > 0 && (
        <span className={styles.badge}>{cartItems.length}</span>
      )}
    </div>
  );
};

export default CartButton;