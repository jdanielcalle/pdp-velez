import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { CartContext } from '../../context/CartContext';
import styles from './ProductGallery.module.scss';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
}

const ProductGallery = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    axios.get('https://api-frontend-production.up.railway.app/api/products?ft=tenis')
      .then((response) => {
        const data = response.data;
        const mapped = data.map((item: any) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          image: item.image || 'https://via.placeholder.com/150',
        }));
        setProducts(mapped);
      })
      .catch((error) => {
        console.error('Error al cargar la vitrina:', error);
      });
  }, []);

  return (
    <div className={styles.gallery}>
      {products.map(product => (
        <div key={product.id} className={styles.card}>
          <img src={product.image} alt={product.name} />
          <h3>{product.name}</h3>
          <p>${product.price.toFixed(2)}</p>
          <button onClick={() => addToCart({ ...product, quantity: 1 })}>
            Agregar al carrito
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductGallery;
