import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import type * as React from 'react';
import { Link } from 'react-router-dom';

import { items } from './config';
import styles from './Navbar.module.scss';

export const Navbar: React.FC = (): JSX.Element => {
  return (
    <div className={styles.NavBar}>
      {items.map(item => {
        if (item.href === '/shop') {
          return (
            <Link
              to={item.href}
              className={styles.Link}
              key={item.id}
            >
              {item.text}
              <KeyboardArrowDownIcon />
            </Link>
          );
        }
        return (
          <Link
            to={item.href}
            className={styles.Link}
            key={item.id}
          >
            {item.text}
          </Link>
        );
      })}
    </div>
  );
};
