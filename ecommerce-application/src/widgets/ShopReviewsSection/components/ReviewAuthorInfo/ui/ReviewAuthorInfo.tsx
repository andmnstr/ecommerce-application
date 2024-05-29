import { Avatar, Stack, Typography } from '@mui/material';
import type React from 'react';

import styles from './ReviewAuthorInfo.module.scss';

interface IReviewAuthorInfoProps {
  name: string;
  text: string;
  imageURL: string;
}

export const ReviewAuthorInfo: React.FC<IReviewAuthorInfoProps> = props => {
  const { name, text, imageURL } = props;

  return (
    <Stack
      className={styles.review_author_info}
      direction="row"
      spacing={1}
    >
      <Avatar
        alt={name}
        src={imageURL}
        sx={{ width: 64, height: 64 }}
      />
      <div>
        <Typography className={styles.review_author_name}>{name}</Typography>
        <Typography className={styles.review_author_text}>{text}</Typography>
      </div>
    </Stack>
  );
};
