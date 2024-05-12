import type * as React from 'react';
import { Link } from 'react-router-dom';

import { CustomButton } from '../../../../shared/UI/button/CustomButton';
import styles from './AuthSection.module.scss';
import { authPages } from './config';

export const AuthSection: React.FC = (): JSX.Element => {
  return (
    <div className={styles.ButtonSection}>
      {authPages.map(page => {
        return (
          <Link
            to={page.href}
            key={page.id}
          >
            <CustomButton
              className={styles.Button}
              variant="contained"
            >
              {page.text}
            </CustomButton>
          </Link>
        );
      })}
    </div>
  );
};
