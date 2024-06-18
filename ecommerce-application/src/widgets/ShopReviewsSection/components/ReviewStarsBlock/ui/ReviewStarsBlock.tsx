import StarIcon from '@mui/icons-material/Star';
import type React from 'react';

import styles from './ReviewStarsBlock.module.scss';

export const ReviewStarsBlock: React.FC = () => {
  return (
    <div className={styles.review_stars}>
      <StarIcon
        fontSize="large"
        style={{ color: 'orange' }}
      />
      <StarIcon
        fontSize="large"
        style={{ color: 'orange' }}
      />
      <StarIcon
        fontSize="large"
        style={{ color: 'orange' }}
      />
      <StarIcon
        fontSize="large"
        style={{ color: 'orange' }}
      />
      <StarIcon
        fontSize="large"
        style={{ color: 'orange' }}
      />
    </div>
  );
};
