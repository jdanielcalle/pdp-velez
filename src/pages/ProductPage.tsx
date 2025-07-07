import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { CartContext } from '../context/CartContext';
import styles from './ProductPage.module.scss';
import ProductGallery from '../components/ProductGallery/ProductGallery';

interface Product {
  id: string;
  name: string;
  brand: string;
  reference: string;
  priceFull: number;
  priceDiscount: number;
  images: string[];
  sizes: string[];
  color: string;
}

const ProductPage = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    axios.get('https://api-frontend-production.up.railway.app/api/products/125829257')
      .then(response => {
        const data = response.data;
        const firstItem = data.items?.[0];

        setProduct({
          id: firstItem?.itemId || data.productId,
          name: data.productName,
          brand: data.brand,
          reference: data.productReference,
          priceFull: firstItem?.sellers?.[0]?.commertialOffer?.ListPrice || 0,
          priceDiscount: firstItem?.sellers?.[0]?.commertialOffer?.Price || 0,
          images: firstItem?.images?.map((img: any) => img.imageUrl) || [],
          sizes: data.items?.map((i: any) => i.name.split(' ').pop()) || [],
          color: firstItem?.variations?.find((v: any) => v.name === 'Color')?.values?.[0] || 'N/A',
        });
      })
      .catch(err => console.error('Error al cargar producto:', err));
  }, []);

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Por favor selecciona una talla');
      return;
    }

    if (product) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.priceDiscount,
        image: product.images[0],
        quantity: 1,
        size: selectedSize,
      });
    }
  };

  if (!product) return <p>Cargando producto...</p>;

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.productPage}>
        <div className={styles.images}>
          {product.images.map((img, idx) => (
            <img key={idx} src={img} alt={`${product.name} ${idx + 1}`} />
          ))}
        </div>

        <div className={styles.info}>
          <h1>{product.name}</h1>
          <p>Marca: {product.brand}</p>
          <p>Referencia: {product.reference}</p>
          <p>Color: {product.color}</p>
          <p>
            Precio:
            <span className={styles.full}>
              {new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(product.priceFull)}
            </span>
            <span className={styles.discount}>
              {new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(product.priceDiscount)}
            </span>
          </p>

          <div className={styles.sizes}>
            <p>Tallas:</p>
            {product.sizes.map((size, idx) => (
              <button
                key={idx}
                className={selectedSize === size ? styles.selected : ''}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </button>
            ))}
          </div>

          <button className={styles.addButton} onClick={handleAddToCart}>
            Agregar al carrito
          </button>
        </div>
      </div>

      <h2 className={styles.relatedTitle}>Productos relacionados</h2>
      <ProductGallery />
    </div>
  );
};

export default ProductPage;
