import CreditScoreIcon from '@mui/icons-material/CreditScore';
import LocalPostOfficeIcon from '@mui/icons-material/LocalPostOffice';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import { Typography } from '@mui/material';
import type React from 'react';

import StoryPic1 from '../../../../public/images/StoryImage1.jpg?url';
import StoryPic2 from '../../../../public/images/StoryImage2.jpg?url';
import StoryPic3 from '../../../../public/images/StoryImage3.jpg?url';
import StoryPic4 from '../../../../public/images/StoryImage4.jpg?url';
import styles from './ShopStoriesSection.module.scss';

export const ShopStoriesSection: React.FC = () => {
  return (
    <section className={styles.stories_section}>
      <Typography className={styles.stories_heading}>Our Instagram Stories</Typography>
      <div className={styles.stories_image_block}>
        <img
          className={styles.stories_image}
          src={StoryPic1}
          alt="Money Guarantee"
        />
        <img
          className={styles.stories_image}
          src={StoryPic2}
          alt="Money Guarantee"
        />
        <img
          className={styles.stories_image}
          src={StoryPic3}
          alt="Online Support"
        />
        <img
          className={styles.stories_image}
          src={StoryPic4}
          alt="Flexible Payment"
        />
      </div>
      <div className={styles.stories_card_block}>
        <div className={styles.stories_card}>
          <LocalPostOfficeIcon fontSize="large" />
          <Typography className={styles.stories_subheading}>Free Shipping</Typography>
          <Typography className={styles.stories_text}>Free shipping for orders above $150</Typography>
        </div>
        <div className={styles.stories_card}>
          <MonetizationOnOutlinedIcon fontSize="large" />
          <Typography className={styles.stories_subheading}>Money Guarantee</Typography>
          <Typography className={styles.stories_text}>Within 30 days for an exchange</Typography>
        </div>
        <div className={styles.stories_card}>
          <SupportAgentIcon fontSize="large" />
          <Typography className={styles.stories_subheading}>Online Support</Typography>
          <Typography className={styles.stories_text}>24 hours a day, 7 days a week</Typography>
        </div>
        <div className={styles.stories_card}>
          <CreditScoreIcon fontSize="large" />
          <Typography className={styles.stories_subheading}>Flexible Payment</Typography>
          <Typography className={styles.stories_text}>Pay with multiple credit cards</Typography>
        </div>
      </div>
    </section>
  );
};
