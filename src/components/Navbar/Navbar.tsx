import React, { useContext, useState } from 'react';
import styles from './Navbar.module.scss';
import { AuthContext } from '../../context/AuthContext';
import MapModal from '../MapModal/MapModal';
import velezLogo from '../../assets/logo-velez.png'; // importamos el logo

const Navbar = () => {
  const { user, signInWithGoogle } = useContext(AuthContext);
  const [search, setSearch] = useState('');
  const [showMap, setShowMap] = useState(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleMapToggle = () => {
    setShowMap(prev => !prev);
  };

  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.left}>
          <img src={velezLogo} alt="Vélez" className={styles.logo} />
        </div>

        <ul className={styles.menu}>
          <li>MUJER</li>
          <li>HOMBRE</li>
          <li>REBAJAS</li>
          <li>MUNDO VÉLEZ</li>
          <li>FLY UP</li>
        </ul>

        <div className={styles.right}>
          <input 
            type="text" 
            placeholder="Buscar productos..."
            value={search}
            onChange={handleSearchChange}
            className={styles.search}
          />

          <span className={styles.mapLink} onClick={handleMapToggle}>
            BUSCAR TIENDA
          </span>

          <button className={styles.ingresarButton} onClick={signInWithGoogle}>
            {user ? `Hola, ${user.firstName}` : 'INGRESAR'}
          </button>
        </div>
      </nav>

      {showMap && (
        <MapModal onClose={handleMapToggle} />
      )}
    </>
  );
};

export default Navbar;