import React, { useContext, useState } from 'react';
import styles from './CartButton.module.scss';
import cartImg from '../../assets/cart.png';
import { CartContext } from '../../context/CartContext';
import CartModal from '../CartModal/CartModal';

const CartButton = () => {
  const { cartItems } = useContext(CartContext);
  const [showCart, setShowCart] = useState(false);

  return (
    <>
      <div className={styles.cartButton} onClick={() => setShowCart(true)}>
        <img src={cartImg} alt="Carrito" className={styles.icon} />
        {cartItems.length > 0 && (
          <span className={styles.badge}>{cartItems.length}</span>
        )}
      </div>

      {showCart && <CartModal onClose={() => setShowCart(false)} />}
    </>
  );
};

export default CartButton;
