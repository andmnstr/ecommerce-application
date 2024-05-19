import LogoutIcon from '@mui/icons-material/Logout';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { CustomButton } from '../../../../shared/UI/button/CustomButton';
import styles from './AuthSection.module.scss';
import { authPages } from './config';

export const AuthSection: React.FC = (): JSX.Element => {
  const [logoutEnable, setLogoutEnable] = React.useState(false);
  const [loginPage, signupPage] = authPages;
  const currentPage = window.location.pathname;
  const TOKEN_NAME = 'access_token';
  const token: string | null = localStorage.getItem(TOKEN_NAME);
  const navigate = useNavigate();

  const logoutFromApp = (): void => {
    setLogoutEnable(false);

    if (token) {
      localStorage.removeItem(TOKEN_NAME);
    }
  };

  React.useEffect(() => {
    if (token) {
      setLogoutEnable(true);

      if (currentPage === loginPage.href || currentPage === signupPage.href) {
        navigate('/');
      }
    }
  }, [navigate, token, logoutEnable, currentPage, loginPage.href, signupPage.href]);

  return (
    <div className={styles.ButtonSection}>
      {authPages.map(page => {
        return (
          <Link
            to={page.href}
            key={page.id}
            hidden={logoutEnable || page.href === currentPage}
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
        hidden={!logoutEnable}
      >
        <CustomButton
          className={styles.Button}
          variant="outlined"
          onClick={logoutFromApp}
          style={{ gap: '5px' }}
        >
          <LogoutIcon />
          Logout
        </CustomButton>
      </Link>
    </div>
  );
};
