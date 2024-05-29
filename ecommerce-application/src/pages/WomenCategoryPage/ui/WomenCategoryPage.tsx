import type React from 'react';

import { Header } from '../../../widgets/Header';
import styles from './WomenCategoryPage.module.scss';

export const WomenCategoryPage: React.FC = () => {
  return (
    <div>
      <Header />
      <div className={styles.content}>
        <h2 className={styles.text_heading}>Oops! :(</h2>
        <h2 className={styles.text}>Content is not ready at this moment...</h2>
      </div>
    </div>
  );
};
