import { Container, Typography } from '@mui/material';
import type React from 'react';

import classes from './RegistrationForm.module.scss';
import { SubmitForm } from './SubmitForm/SubmitForm';

export const RegistrationForm: React.FC = () => {
  return (
    <Container className={classes.container}>
      <Typography
        component="h1"
        className={classes.title}
      >
        Create New Account
      </Typography>
      <Typography
        component="h2"
        className={classes.subTitle}
      >
        Please enter delails
      </Typography>

      <SubmitForm />
    </Container>
  );
};
