import { AppBar } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthSection } from './AuthSection';
import { authPages, userProfilePath } from './AuthSection/config';
import { BurgerMenu } from './Burger';
import styles from './Header.module.scss';
import { Logo } from './Logo';
import { Navbar } from './Navbar';

export const Header: React.FC = (): JSX.Element => {
  const [logoutEnable, setLogoutEnable] = React.useState(false);
  const [loginPage, signupPage] = authPages;
  const currentPage = window.location.pathname;
  const TOKEN_NAME = 'hardcoders_access_token';
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

    if (!token) {
      if (currentPage === userProfilePath) {
        navigate('/');
      }
    }
  }, [navigate, token, logoutEnable, currentPage, loginPage.href, signupPage.href]);

  return (
    <AppBar className={styles.AppBar}>
      <Logo />
      <Navbar />
      <AuthSection
        userLoggedOn={logoutEnable}
        logoutFn={logoutFromApp}
      />
      <BurgerMenu
        userLoggedOn={logoutEnable}
        logoutFn={logoutFromApp}
      />
    </AppBar>
  );
};
