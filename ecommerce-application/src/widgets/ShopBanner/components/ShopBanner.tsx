import EastIcon from '@mui/icons-material/East';
import { Box, Typography } from '@mui/material';
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
        <Typography className={styles.text}>Available Promo Codes:</Typography>
        <Box>
          <Typography className={styles.promocode}>SOD1806</Typography>
          <Typography className={styles.promocodeDetails}>
            <span>15% off</span> your total cart price
          </Typography>
        </Box>
        <Box>
          <Typography className={styles.promocode}>5POS10D</Typography>
          <Typography className={styles.promocodeDetails}>
            Additional <span>10% off</span> if you buy more than 5 items
          </Typography>
        </Box>
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
