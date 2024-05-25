import type React from 'react';
import { useEffect, useState } from 'react';

import { CustomButton } from '../../../../../shared/UI/button/CustomButton';
import styles from './CartManagement.module.scss';

export const CartManagement: React.FC = () => {
  const [products, setProducts] = useState(0);

  useEffect(() => {
    if (products < 0) {
      setProducts(0);
    }
  }, [products]);

  return (
    <div className={styles.product__cart_control}>
      <div className={styles.product__counter}>
        <CustomButton
          variant="outlined"
          className={styles.product__count}
          onClick={() => {
            setProducts(products - 1);
          }}
        >
          -
        </CustomButton>
        <span className={styles.product__number}>{products}</span>
        <CustomButton
          variant="outlined"
          className={styles.product__count}
          onClick={() => {
            setProducts(products + 1);
          }}
        >
          +
        </CustomButton>
      </div>
      <CustomButton
        variant="contained"
        className={styles.product__cart_addition}
      >
        Add to cart
      </CustomButton>
    </div>
  );
};
