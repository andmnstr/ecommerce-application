import type React from 'react';

import { Header } from '../../../widgets/Header';
import { RegistrationForm } from '../../../widgets/RegistrationForm';
import styles from './SignupPage.module.scss';

export const SignupPage: React.FC = () => {
  return (
    <div>
      <Header />
      <div className={styles.SignupPage__container}>
        <div className={styles.SignupPage__image} />
        <div className={styles.SignupPage__inputs}>
          <RegistrationForm />
        </div>
      </div>
    </div>
  );
};
