import { Card, Typography } from '@mui/material';
import type React from 'react';

import ReviewerImage1 from '../../../../public/images/Reviewer1.png?url';
import ReviewerImage2 from '../../../../public/images/Reviewer2.png?url';
import ReviewerImage3 from '../../../../public/images/Reviewer3.png?url';
import { ReviewAuthorInfo } from './ReviewAuthorInfo';
import { ReviewStarsBlock } from './ReviewStarsBlock';
import styles from './ShopReviewsSection.module.scss';

export const ShopReviewsSection: React.FC = () => {
  return (
    <section className={styles.review_section}>
      <Typography className={styles.review_heading}>What our Costumer says</Typography>
      <div className={styles.review_card_block}>
        <Card className={styles.review_card}>
          <ReviewStarsBlock />
          <Typography className={styles.stories_text}>
            I love the quality of my sweatshirt, The customer service team were quick to respond to my email and
            explained the backlog after the Christmas period. They were friendly and helpful would 100% order again in
            the future.
          </Typography>
          <ReviewAuthorInfo
            name="Ralph Bright"
            text="Blogger"
            imageURL={ReviewerImage1}
          />
        </Card>
        <Card className={styles.review_card}>
          <ReviewStarsBlock />
          <Typography className={styles.stories_text}>
            Good quality always offers on love the oversized hoodies customer service and good speedy delivery I always
            feel appreciated as a customer like my order/orders really matter.
          </Typography>
          <ReviewAuthorInfo
            name="Gina Weaver"
            text="Model"
            imageURL={ReviewerImage2}
          />
        </Card>
        <Card className={styles.review_card}>
          <ReviewStarsBlock />
          <Typography className={styles.stories_text}>
            Ordered two hoodie jumpers recently, the quality and fit are perfect! Will definitely order again.
          </Typography>
          <ReviewAuthorInfo
            name="Johann Brugges"
            text="Programmer"
            imageURL={ReviewerImage3}
          />
        </Card>
      </div>
    </section>
  );
};
