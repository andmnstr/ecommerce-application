import type * as React from 'react';
import { Link } from 'react-router-dom';

import ShopLogo from '../../../../../public/images/Shop-Logo.svg';
import styles from './Logo.module.scss';

export const Logo: React.FC = (): JSX.Element => {
  return (
    <div>
      <Link to="/">
        <img
          src={ShopLogo}
          alt="Shop logo"
          className={styles.Logo}
        />
      </Link>
    </div>
  );
};
