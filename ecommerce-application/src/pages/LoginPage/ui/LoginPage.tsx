import type React from 'react';

import { Header } from '../../../widgets/Header';
import { LoginForm } from '../../../widgets/LoginForm';
import styles from './LoginPage.module.scss';

export const LoginPage: React.FC = () => {
  return (
    <>
      <Header />
      <div className={styles.LoginPage__container}>
        <div className={styles.LoginPage__image} />
        <div className={styles.LoginPage__inputs}>
          <LoginForm />
        </div>
      </div>
    </>
  );
};
