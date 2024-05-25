import { Skeleton } from '@mui/material';
import type React from 'react';

import styles from './ProductPrice.module.scss';

interface IProductPriceProps {
  price: number;
  discounted: number;
}

export const ProductPrice: React.FC<IProductPriceProps> = props => {
  const { price, discounted } = props;

  return (
    <div className={styles.price_section}>
      {price ? (
        <div className={styles.default_price}>{price}</div>
      ) : (
        <Skeleton
          animation="wave"
          variant="text"
          className={styles.default_price}
        />
      )}
      {discounted ? (
        <div className={styles.discount_price}>{discounted}</div>
      ) : (
        <Skeleton
          animation="wave"
          variant="text"
          className={styles.discount_price}
        />
      )}
    </div>
  );
};
