import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import type * as React from 'react';

import { CustomLink } from '../../../../shared/UI/CustomLink/CustomLink';
import { items } from './config';
import styles from './Navbar.module.scss';
import { linkStyle } from './style';

export const Navbar: React.FC = (): JSX.Element => {
  return (
    <div className={styles.NavBar}>
      {items.map(item => {
        if (item.href === '/shop') {
          return (
            <CustomLink
              href={item.href}
              className={styles.Link}
              sx={linkStyle}
              key={item.id}
            >
              {item.text}
              <KeyboardArrowDownIcon />
            </CustomLink>
          );
        }
        return (
          <CustomLink
            href={item.href}
            className={styles.Link}
            sx={linkStyle}
            key={item.id}
          >
            {item.text}
          </CustomLink>
        );
      })}
    </div>
  );
};
