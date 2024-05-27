import 'react-multi-carousel/lib/styles.css';

import { Card } from '@mui/material';
import type React from 'react';
import Carousel from 'react-multi-carousel';

import ShopCategoryImage1 from '../../../../public/images/ShopCategoryImage1.webp?url';
import ShopCategoryImage2 from '../../../../public/images/ShopCategoryImage2.jpeg?url';
import ShopCategoryImage3 from '../../../../public/images/ShopCategoryImage3.jpeg?url';
import ShopCategoryImage4 from '../../../../public/images/ShopCategoryImage4.avif?url';
import { CustomButton } from '../../../shared/UI/button/CustomButton';
import styles from './ShopCategorySlider.module.scss';

export const ShopCategorySlider: React.FC = () => {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 4,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1200 },
      items: 4,
    },
    small: {
      breakpoint: { max: 1200, min: 1000 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1000, min: 660 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 660, min: 0 },
      items: 1,
    },
  };
  return (
    <section className={styles.category_section}>
      <Carousel
        className={styles.category_slider}
        swipeable={false}
        draggable={false}
        arrows
        responsive={responsive}
        autoPlay
        infinite
        transitionDuration={4000}
      >
        <Card
          className={styles.category_card}
          style={{ backgroundImage: `url(${ShopCategoryImage1})` }}
        >
          <CustomButton
            className={styles.category_button}
            variant="contained"
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
          >
            Accessories
          </CustomButton>
        </Card>
      </Carousel>
    </section>
  );
};
