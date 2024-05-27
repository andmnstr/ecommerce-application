import EastIcon from '@mui/icons-material/East';
import { Typography } from '@mui/material';
import type React from 'react';
import { useNavigate } from 'react-router-dom';

import { CustomButton } from '../../../shared/UI/button/CustomButton';
import styles from './ShopBanner.module.scss';

export const ShopBanner: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className={styles.banner}>
      <div className={styles.content}>
        <Typography className={styles.text}>Classic Exclusive</Typography>
        <Typography className={styles.heading}>Women&apos;s Collection</Typography>
        <Typography className={styles.text}>UPTO 40% OFF</Typography>
        <CustomButton
          className={styles.shop_button}
          variant="contained"
          onClick={() => {
            navigate('/shop');
          }}
        >
          Shop Now <EastIcon />
        </CustomButton>
      </div>
      <div className={styles.shop_image} />
    </section>
  );
};
