import type * as React from 'react';
import { NavLink } from 'react-router-dom';

import { items } from './config';
import styles from './Navbar.module.scss';

export const Navbar: React.FC = (): JSX.Element => {
  return (
    <div className={styles.NavBar}>
      {items.map(item => {
        return (
          <NavLink
            to={item.href}
            className={({ isActive }) => {
              return isActive ? styles.Link_active : styles.Link;
            }}
            key={item.id}
          >
            {item.text}
          </NavLink>
        );
      })}
    </div>
  );
};
