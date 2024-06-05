import type React from 'react';

import { Header } from '../../../widgets/Header';
import { UserProfile } from '../../../widgets/UserProfile';
import styles from './UserProfilePage.module.scss';

export const UserProfilePage: React.FC = () => {
  return (
    <>
      <Header />
      <div className={styles.ProfilePage__container}>
        <div className={styles.ProfilePage__image} />
        <div className={styles.ProfilePage__content}>
          <UserProfile />
        </div>
      </div>
    </>
  );
};
