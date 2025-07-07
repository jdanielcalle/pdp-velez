import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import { CartContext } from '../../context/CartContext';
import styles from './ProductGallery.module.scss';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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
    axios.get('https://api-frontend-production.up.railway.app/api/products')
      .then(response => {
        const data = Array.isArray(response.data) ? response.data : [];
        const mapped = data.map((item: any) => {
          const firstItem = item.items?.[0];
          return {
            id: firstItem?.itemId || item.productId || String(Math.random()),
            name: item.productName || 'Producto sin nombre',
            price: firstItem?.sellers?.[0]?.commertialOffer?.Price || 0,
            image: firstItem?.images?.[0]?.imageUrl || 'https://via.placeholder.com/150',
          };
        });
        setProducts(mapped);
      })
      .catch(error => {
        console.error('Error al cargar la vitrina:', error);
      });
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } }
    ]
  };

  return (
    <div className={styles.gallery}>
      <Slider {...settings}>
        {products.map(product => (
          <div key={product.id} className={styles.card}>
            <img src={product.image} alt={product.name} className={styles.image} />
            <h3>{product.name}</h3>
            <p>
              {new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(product.price)}
            </p>
            <button onClick={() => addToCart({ ...product, quantity: 1 })}>
              Agregar al carrito
            </button>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ProductGallery;
