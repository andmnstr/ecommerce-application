import type * as React from 'react';

import ShopLogo from './assets/Shop-logo.svg';
import styles from './Logo.module.scss';

export const Logo: React.FC = (): JSX.Element => {
  return (
    <div>
      <img
        src={ShopLogo}
        alt="Shop logo"
        className={styles.Logo}
      />
    </div>
  );
};
