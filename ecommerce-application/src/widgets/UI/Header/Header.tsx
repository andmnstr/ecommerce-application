import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { AppBar, StyledEngineProvider, Toolbar } from '@mui/material';
import type * as React from 'react';

import { CustomLink } from '../../../shared/UI/CustomLink/CustomLink';
import { AuthSection } from './AuthSection';
import styles from './Header.module.scss';
import { Logo } from './Logo';

const shopLinkStyle = {
  display: 'flex',
  alignItems: 'center',
};

export const Header: React.FC = () => {
  return (
    <StyledEngineProvider injectFirst>
      <AppBar className={styles.AppBar}>
        <Toolbar className={styles.ToolBar}>
          <Logo />
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
          <AuthSection />
        </Toolbar>
      </AppBar>
    </StyledEngineProvider>
  );
};
