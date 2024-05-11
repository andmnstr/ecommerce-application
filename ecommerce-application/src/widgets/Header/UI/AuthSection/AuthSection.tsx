import type * as React from 'react';

import { CustomButton } from '../../../../shared/ui/button/CustomButton';
import { CustomLink } from '../../../../shared/ui/CustomLink/CustomLink';
import styles from './AuthSection.module.scss';
import { authPages } from './config';

export const AuthSection: React.FC = (): JSX.Element => {
  return (
    <div className={styles.ButtonSection}>
      {authPages.map(page => {
        return (
          <CustomLink
            href={page.href}
            key={page.id}
          >
            <CustomButton
              className={styles.Button}
              variant="contained"
            >
              {page.text}
            </CustomButton>
          </CustomLink>
        );
      })}
    </div>
  );
};
