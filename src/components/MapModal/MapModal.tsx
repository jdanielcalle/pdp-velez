import React from 'react';
import styles from './MapModal.module.scss';

interface MapModalProps {
  onClose: () => void;
}

const MapModal = ({ onClose }: MapModalProps) => {
  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <button className={styles.close} onClick={onClose}>X</button>
        <iframe
          id="map-canvas"
          className={styles.map_part}
          src="https://maps.google.com/maps?width=520&height=400&hl=en&q=Tiendas%20V%C3%A9lez&t=k&z=12&ie=UTF8&iwloc=B&output=embed"
          title="Tiendas Vélez"
        />
      </div>
    </div>
  );
};

export default MapModal;