import { Skeleton } from '@mui/material';
import Divider from '@mui/material/Divider';
import type React from 'react';

import styles from './ProductPrice.module.scss';

interface IProductPriceProps {
  price: string | undefined;
  discounted: string | undefined;
}

export const ProductPrice: React.FC<IProductPriceProps> = props => {
  const { price, discounted } = props;

  return (
    <>
      <div className={styles.price_section}>
        {price ? (
          <div className={discounted ? styles.default_price : styles.discount_price}>{price}</div>
        ) : (
          <>
            <Skeleton
              animation="wave"
              variant="text"
              className={styles.discount_price}
            />
            <Skeleton
              animation="wave"
              variant="text"
              className={styles.discount_price}
            />
          </>
        )}
        {discounted ? <div className={styles.discount_price}>{discounted}</div> : <div />}
      </div>
      <Divider aria-hidden="true" />
    </>
  );
};
