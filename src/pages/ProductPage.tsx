import React, { useEffect, useState } from 'react';
import axios from 'axios';
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
  color: string;
}

const ProductPage = () => {
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    axios.get('https://api-frontend-production.up.railway.app/api/products')
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
          color: firstItem?.variations?.find((v: any) => v.name === 'Color')?.values?.[0] || 'N/A',
        });
      })
      .catch(err => console.error('Error al cargar producto:', err));
  }, []);

  if (!product) return <p>Cargando producto...</p>;

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.productPage}>
        <div className={styles.images}>
          {product.images.map((img, idx) => (
            <img key={idx} src={img} alt={`${product.name} ${idx + 1}`} />
          ))}
        </div>
      </div>
      <ProductGallery />
    </div>
  );
};

export default ProductPage;
