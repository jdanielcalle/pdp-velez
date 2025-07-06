import React, { useContext, useState } from 'react';
import styles from './Navbar/Navbar.module.scss';
import { CartContext } from '../../context/CartContext';
import { AuthContext } from '../../context/AuthContext';
import { ReactComponent as CartIcon } from '../../assets/cart-icon.svg';

const Navbar = () => {
  const { cartItems } = useContext(CartContext);
  const { user, signInWithGoogle } = useContext(AuthContext);
  const [search, setSearch] = useState('');
  const [showMap, setShowMap] = useState(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    // Aquí podemos emitir el valor o manejarlo por contexto
  };

  const handleMapToggle = () => {
    setShowMap(prev => !prev);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.left}>
        <span className={styles.logo}>VÉLEZ</span>
      </div>

      <ul className={styles.menu}>
        <li>Mujer</li>
        <li>Hombre</li>
        <li>Rebajas</li>
        <li>Mundo Vélez</li>
        <li>Fly Up</li>
      </ul>

      <div className={styles.right}>
        <input 
          type="text" 
          placeholder="Buscar productos..."
          value={search}
          onChange={handleSearchChange}
          className={styles.search}
        />

        <button className={styles.button} onClick={handleMapToggle}>
          Buscar tiendas
        </button>

        <div className={styles.cart}>
          <CartIcon />
          {cartItems.length > 0 && (
            <span className={styles.badge}>{cartItems.length}</span>
          )}
        </div>

        <button className={styles.button} onClick={signInWithGoogle}>
          {user ? `Hola, ${user.firstName}` : 'Ingresar'}
        </button>
      </div>

      {showMap && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <button className={styles.close} onClick={handleMapToggle}>X</button>
            {/* Aquí insertaremos el mapa más adelante */}
            <p>Mapa aquí</p>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;