import { AppBar, StyledEngineProvider } from '@mui/material';
import type * as React from 'react';

import { AuthSection } from './AuthSection';
import PersistentDrawerRight from './Burger/Burger';
import styles from './Header.module.scss';
import { Logo } from './Logo';
import { Navbar } from './Navbar';

export const Header: React.FC = (): JSX.Element => {
  return (
    <StyledEngineProvider injectFirst>
      <AppBar className={styles.AppBar}>
        <Logo />
        <Navbar />
        <AuthSection />
        <PersistentDrawerRight />
      </AppBar>
    </StyledEngineProvider>
  );
};
