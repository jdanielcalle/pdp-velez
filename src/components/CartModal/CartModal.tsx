import React, { useContext, useState } from 'react';
import { CartContext } from '../../context/CartContext';
import styles from './CartModal.module.scss';
import CheckoutModal from '../CheckoutModal/CheckoutModal';

interface CartModalProps {
  onClose: () => void;
}

const CartModal = ({ onClose }: CartModalProps) => {
  const { cartItems, removeFromCart, clearCart } = useContext(CartContext);
  const [showCheckout, setShowCheckout] = useState(false);

  return (
    <>
      <div className={styles.modalOverlay}>
        <div className={styles.modalContent}>
          <button className={styles.close} onClick={onClose}>×</button>
          <h2>Tu Carrito</h2>
          {cartItems.length === 0 ? (
            <p>El carrito está vacío</p>
          ) : (
            <div className={styles.items}>
              {cartItems.map(item => (
                <div key={item.id} className={styles.item}>
                  <img src={item.image} alt={item.name} />
                  <div>
                    <h4>{item.name}</h4>
                    <p>Cantidad: {item.quantity}</p>
                    <p>${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                  <button onClick={() => removeFromCart(item.id)}>Eliminar</button>
                </div>
              ))}
              <div className={styles.actions}>
                <button className={styles.clear} onClick={clearCart}>Vaciar carrito</button>
                <button className={styles.checkout} onClick={() => setShowCheckout(true)}>
                  Ir al checkout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {showCheckout && <CheckoutModal onClose={() => setShowCheckout(false)} />}
    </>
  );
};

export default CartModal;