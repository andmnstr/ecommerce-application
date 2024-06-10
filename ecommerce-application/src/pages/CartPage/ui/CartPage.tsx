import { Typography } from '@mui/material';
import type React from 'react';

import { Cart } from '../../../widgets/Cart';
import { Header } from '../../../widgets/Header';
import styles from './CartPage.module.scss';

export const CartPage: React.FC = () => {
  return (
    <>
      <Header />
      <div className={styles.CartPage__container}>
        <Typography className={styles.CartPage__Title}>My Cart</Typography>
        <Cart />
      </div>
    </>
  );
};
