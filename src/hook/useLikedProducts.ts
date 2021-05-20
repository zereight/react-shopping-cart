import { useEffect, useState } from 'react';
import { ProductDetailType } from '../type';

const useLikedProducts = (products: { [key: string]: ProductDetailType }) => {
  const [likedProducts, setLikedProductList] = useState<{
    [key: string]: ProductDetailType;
  }>({});

  useEffect(() => {
    const result: {
      [key: string]: ProductDetailType;
    } = {};
    Object.values(products).forEach((product) => {
      if (product.liked) {
        likedProducts[product.product_id] = product;
      }
    });

    setLikedProductList(result);
  }, []);

  return { likedProducts };
};

export default useLikedProducts;
