import type * as React from 'react';

import ShopLogo from '../../../../../public/images/Shop-Logo.svg';
import { CustomLink } from '../../../../shared/ui/CustomLink/CustomLink';
import styles from './Logo.module.scss';

export const Logo: React.FC = (): JSX.Element => {
  return (
    <div>
      <CustomLink href="/">
        <img
          src={ShopLogo}
          alt="Shop logo"
          className={styles.Logo}
        />
      </CustomLink>
    </div>
  );
};
