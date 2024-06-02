import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import LogoutIcon from '@mui/icons-material/Logout';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import MenuIcon from '@mui/icons-material/Menu';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import type React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import { type AuthSectionProps } from '../../lib/types/Header.types';
import styles from './Burger.module.scss';
import { appPages, authPages, userProfilePath } from './config';
import { DrawerStyle } from './style';

export const BurgerMenu: React.FC<AuthSectionProps> = (props): JSX.Element => {
  const [open, setOpen] = useState(false);
  const currentPage = window.location.pathname;
  const { userLoggedOn, logoutFn } = props;

  const handleDrawerOpen = (): void => {
    setOpen(true);
  };

  const handleDrawerClose = (): void => {
    setOpen(false);
  };

  return (
    <div className={styles.Box}>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="end"
        onClick={handleDrawerOpen}
        sx={{ ...(open && { display: 'none' }) }}
        className={styles.MenuButton}
      >
        <MenuIcon className={styles.MenuIcon} />
      </IconButton>
      <Drawer
        sx={DrawerStyle}
        variant="persistent"
        anchor="right"
        open={open}
      >
        <div className={styles.DrawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronRightIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          {appPages.map(page => {
            return (
              <ListItem
                key={page.id}
                disablePadding
              >
                <ListItemButton>
                  <Link
                    className={styles.PageLink}
                    to={page.href}
                    onClick={handleDrawerClose}
                  >
                    {page.text}
                  </Link>
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
        <Divider />
        <List>
          {authPages.map(page => {
            return (
              <ListItem
                key={page.id}
                disablePadding
                style={{ display: userLoggedOn || page.href === currentPage ? 'none' : undefined }}
              >
                <ListItemButton>
                  <Link
                    className={styles.AuthLink}
                    to={page.href}
                    onClick={handleDrawerClose}
                  >
                    {page.text}
                  </Link>
                </ListItemButton>
              </ListItem>
            );
          })}
          <ListItem style={{ display: !userLoggedOn ? 'none' : undefined }}>
            <ListItemButton>
              <Link
                to="/"
                className={styles.AuthLink}
                onClick={() => {
                  handleDrawerClose();
                  logoutFn();
                }}
              >
                <LogoutIcon />
                Logout
              </Link>
            </ListItemButton>
          </ListItem>
          <ListItem style={{ display: !userLoggedOn ? 'none' : undefined }}>
            <ListItemButton>
              <Link
                to={userProfilePath}
                className={styles.AuthLink}
                onClick={() => {
                  handleDrawerClose();
                }}
              >
                <ManageAccountsIcon />
                User profile
              </Link>
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </div>
  );
};
