import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import styles from './ProductGallery.module.scss';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useCart } from '../../hooks/useCart';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
}

const ProductGallery = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [modalProduct, setModalProduct] = useState<Product | null>(null);
  const { addToCart } = useCart();

  useEffect(() => {
    axios.get('https://api-frontend-production.up.railway.app/api/products')
      .then(response => {
        const data = Array.isArray(response.data) ? response.data : [];
        const mapped = data.map((item: any) => {
          const firstItem = item.items?.[0];
          if (!firstItem || !firstItem.images?.[0]?.imageUrl) return null;
          return {
            id: firstItem.itemId || item.productId,
            name: item.productName,
            price: firstItem.sellers?.[0]?.commertialOffer?.Price || 0,
            image: firstItem.images[0].imageUrl
          };
        }).filter(Boolean);
        setProducts(mapped as Product[]);
      })
      .catch(error => {
        console.error('Error al cargar productos relacionados:', error);
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
          <div key={product.id} className={styles.card} onClick={() => setModalProduct(product)}>
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(product.price)}</p>
          </div>
        ))}
      </Slider>

      {modalProduct && (
        <div className={styles.modal} onClick={() => setModalProduct(null)}>
          <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
            <img src={modalProduct.image} alt={modalProduct.name} />
            <h3>{modalProduct.name}</h3>
            <p>{new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(modalProduct.price)}</p>
            <button onClick={() => {
              addToCart({ ...modalProduct, quantity: 1 });
              setModalProduct(null);
            }}>
              Agregar al carrito
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductGallery;
