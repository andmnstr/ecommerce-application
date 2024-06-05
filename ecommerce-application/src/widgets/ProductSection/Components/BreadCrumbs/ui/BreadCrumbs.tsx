import { Breadcrumbs, Link, Typography } from '@mui/material';
import type React from 'react';

import styles from './BreadCrumbs.module.scss';

interface IBreadCrumbsProps {
  category: string;
  subcategory: string;
  product: string;
}

export const BreadCrumbs: React.FC<IBreadCrumbsProps> = props => {
  const { category, subcategory, product } = props;

  return (
    <Breadcrumbs className={styles.section__breadcrumbs}>
      <Link
        underline="hover"
        color="inherit"
        href={`/shop/${category}`}
        className={styles.link}
        hidden={!category}
      >
        {category}
      </Link>
      <Link
        underline="hover"
        color="inherit"
        href={`/shop/${category}/${subcategory}`}
        className={styles.link}
        hidden={!subcategory}
      >
        {subcategory}
      </Link>
      <Typography
        color="text.primary"
        className={styles.link}
      >
        {product}
      </Typography>
    </Breadcrumbs>
  );
};
