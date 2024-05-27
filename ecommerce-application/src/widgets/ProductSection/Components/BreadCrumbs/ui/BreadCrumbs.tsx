import { Breadcrumbs, Skeleton } from '@mui/material';
import type React from 'react';

import styles from './BreadCrumbs.module.scss';

export const BreadCrumbs: React.FC = () => {
  return (
    <Breadcrumbs className={styles.section__breadcrumbs}>
      <Skeleton
        variant="text"
        className={styles.section__breadcrumbs}
      />
    </Breadcrumbs>
  );
};
