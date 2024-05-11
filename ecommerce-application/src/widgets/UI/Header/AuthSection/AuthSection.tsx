import type * as React from 'react';

import { CustomButton } from '../../../../shared/UI/button/CustomButton';
import styles from './AuthSection.module.scss';

export const AuthSection: React.FC = (): JSX.Element => {
  return (
    <div className={styles.ButtonSection}>
      <CustomButton
        className={styles.Button}
        variant="contained"
      >
        Login
      </CustomButton>
      <CustomButton
        className={styles.Button}
        variant="contained"
      >
        Sign-Up
      </CustomButton>
    </div>
  );
};
