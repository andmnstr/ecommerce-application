import LogoutIcon from '@mui/icons-material/Logout';
import type React from 'react';
import { Link } from 'react-router-dom';

import { CustomButton } from '../../../../shared/UI/button/CustomButton';
import { type AuthSectionProps } from '../../lib/types/Header.types';
import styles from './AuthSection.module.scss';
import { authPages } from './config';

export const AuthSection: React.FC<AuthSectionProps> = (props): JSX.Element => {
  const { userLoggedOn, logoutFn } = props;
  const currentPage = window.location.pathname;

  return (
    <div className={styles.ButtonSection}>
      {authPages.map(page => {
        return (
          <Link
            to={page.href}
            key={page.id}
            hidden={userLoggedOn || page.href === currentPage}
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
      <Link
        to="/"
        hidden={!userLoggedOn}
      >
        <CustomButton
          className={styles.Button}
          variant="outlined"
          onClick={logoutFn}
          style={{ gap: '5px' }}
        >
          <LogoutIcon />
          Logout
        </CustomButton>
      </Link>
    </div>
  );
};
