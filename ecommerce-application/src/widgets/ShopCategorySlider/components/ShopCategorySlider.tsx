import 'react-multi-carousel/lib/styles.css';

import { Card } from '@mui/material';
import type React from 'react';
import Carousel from 'react-multi-carousel';
import { useNavigate } from 'react-router-dom';

import ShopCategoryImage1 from '../../../../public/images/ShopCategoryImage1.webp?url';
import ShopCategoryImage2 from '../../../../public/images/ShopCategoryImage2.jpeg?url';
import ShopCategoryImage3 from '../../../../public/images/ShopCategoryImage3.jpeg?url';
import ShopCategoryImage4 from '../../../../public/images/ShopCategoryImage4.avif?url';
import { CustomButton } from '../../../shared/UI/button/CustomButton';
import { CategorySliderBreakpoints } from '../consts/consts';
import styles from './ShopCategorySlider.module.scss';

export const ShopCategorySlider: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className={styles.category_section}>
      <Carousel
        className={styles.category_slider}
        swipeable={false}
        draggable={false}
        arrows
        responsive={CategorySliderBreakpoints}
        autoPlay
        infinite
        transitionDuration={1000}
      >
        <Card
          className={styles.category_card}
          style={{ backgroundImage: `url(${ShopCategoryImage1})` }}
        >
          <CustomButton
            className={styles.category_button}
            variant="contained"
            onClick={() => {
              navigate('/shop/women');
            }}
          >
            Women
          </CustomButton>
        </Card>
        <Card
          className={styles.category_card}
          style={{ backgroundImage: `url(${ShopCategoryImage2})` }}
        >
          <CustomButton
            className={styles.category_button}
            variant="contained"
            onClick={() => {
              navigate('/shop/men');
            }}
          >
            Men
          </CustomButton>
        </Card>
        <Card
          className={styles.category_card}
          style={{ backgroundImage: `url(${ShopCategoryImage3})` }}
        >
          <CustomButton
            className={styles.category_button}
            variant="contained"
            onClick={() => {
              navigate('/shop/footwear');
            }}
          >
            Footwear
          </CustomButton>
        </Card>
        <Card
          className={styles.category_card}
          style={{ backgroundImage: `url(${ShopCategoryImage4})` }}
        >
          <CustomButton
            className={styles.category_button}
            variant="contained"
            onClick={() => {
              navigate('/shop/accessories');
            }}
          >
            Accessories
          </CustomButton>
        </Card>
      </Carousel>
    </section>
  );
};
