import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MenuIcon from '@mui/icons-material/Menu';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import * as React from 'react';

import { CustomLink } from '../../../../shared/ui/CustomLink/CustomLink';
import styles from './Burger.module.scss';
import { appPages, authPages } from './config';
import { DrawerStyle } from './style';

export const BurgerMenu: React.FC = (): JSX.Element => {
  const [open, setOpen] = React.useState(false);

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
                  <CustomLink
                    className={styles.PageLink}
                    href={page.href}
                  >
                    {page.text}
                  </CustomLink>
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
              >
                <ListItemButton>
                  <CustomLink
                    className={styles.AuthLink}
                    href={page.href}
                  >
                    {page.text}
                  </CustomLink>
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Drawer>
    </div>
  );
};
