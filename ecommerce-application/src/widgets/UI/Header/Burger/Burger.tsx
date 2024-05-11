import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import * as React from 'react';

import styles from './Burger.module.scss';
import { AUTH, PAGES } from './config';
import { DrawerStyle } from './style';

export default function PersistentDrawerRight(): JSX.Element {
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = (): void => {
    setOpen(true);
  };

  const handleDrawerClose = (): void => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
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
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          {PAGES.map(text => {
            return (
              <ListItem
                key={text}
                disablePadding
              >
                <ListItemButton>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
        <Divider />
        <List>
          {AUTH.map(text => {
            return (
              <ListItem
                key={text}
                disablePadding
              >
                <ListItemButton>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Drawer>
    </Box>
  );
}
