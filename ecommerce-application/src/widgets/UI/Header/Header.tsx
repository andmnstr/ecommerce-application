import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { AppBar, StyledEngineProvider, Toolbar } from '@mui/material';
import type * as React from 'react';

import { CustomButton } from '../../../shared/UI/button/CustomButton';
import { CustomLink } from '../../../shared/UI/CustomLink/CustomLink';
import ShopLogo from './assets/Shop-logo.svg';
import styles from './Header.module.scss';

const shopLinkStyle = {
  display: 'flex',
  alignItems: 'center',
};

export const Header: React.FC = () => {
  return (
    <StyledEngineProvider injectFirst>
      <AppBar className={styles.AppBar}>
        <Toolbar className={styles.ToolBar}>
          <div>
            <img
              src={ShopLogo}
              alt="Shop logo"
              className={styles.Logo}
            />
          </div>
          <div className={styles.NavBar}>
            <CustomLink
              href="/"
              className={styles.Link}
              sx={shopLinkStyle}
            >
              Home
            </CustomLink>
            <CustomLink
              href=""
              className={styles.Link}
              sx={shopLinkStyle}
            >
              Shop
              <KeyboardArrowDownIcon />
            </CustomLink>
            <CustomLink
              href="/about"
              className={styles.Link}
              sx={shopLinkStyle}
            >
              About
            </CustomLink>
            <CustomLink
              href="/contact"
              className={styles.Link}
              sx={shopLinkStyle}
            >
              Contact us
            </CustomLink>
          </div>
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
        </Toolbar>
      </AppBar>
    </StyledEngineProvider>
  );
};
