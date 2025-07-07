import React, { useContext, useState } from 'react';
import { CartContext } from '../../context/CartContext';
import { AuthContext } from '../../context/AuthContext';
import styles from './CheckoutModal.module.scss';

interface CheckoutModalProps {
  onClose: () => void;
}

const CheckoutModal = ({ onClose }: CheckoutModalProps) => {
  const { cartItems, clearCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const isValidName = (name: string) => {
    return /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(name.trim());
  };

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  };

  const handleFinish = () => {
    if (!user) {
      if (!isValidName(name)) {
        alert('El nombre no debe contener números ni símbolos.');
        return;
      }
      if (!isValidEmail(email)) {
        alert('Por favor ingresa un correo válido.');
        return;
      }
    }

    if (cartItems.length === 0) {
      alert('El carrito está vacío. Agrega productos antes de finalizar la compra.');
      return;
    }

    alert('¡Compra realizada con éxito! 🚀');
    clearCart();
    onClose();
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.close} onClick={onClose}>×</button>
        <h2>Checkout</h2>

        <div className={styles.summary}>
          {cartItems.map(item => (
            <div key={item.id} className={styles.item}>
              <span>{item.name} x {item.quantity}</span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div className={styles.total}>
            <strong>Total:</strong>
            <strong>${total.toFixed(2)}</strong>
          </div>
        </div>

        {!user && (
          <div className={styles.form}>
            <input 
              type="text" 
              placeholder="Nombre completo" 
              value={name}
              onChange={e => setName(e.target.value)}
              required 
            />
            <input 
              type="email" 
              placeholder="Correo electrónico" 
              value={email}
              onChange={e => setEmail(e.target.value)}
              required 
            />
          </div>
        )}

        <button className={styles.finishButton} onClick={handleFinish}>
          Finalizar compra
        </button>
      </div>
    </div>
  );
};

export default CheckoutModal;

