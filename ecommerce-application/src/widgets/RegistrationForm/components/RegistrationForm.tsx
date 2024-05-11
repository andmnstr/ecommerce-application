import { Box, Container, Stack, Typography } from '@mui/material';
import type React from 'react'; // убрать type

import CustomInputText from '../../../shared/UI/CustomInputText/CustomInputText';
import FormCheckbox from '../../../shared/UI/FormCheckbox/FormCheckbox';
import { AddressBox } from './AddressBox/AddressBox';
import classes from './RegistrationForm.module.scss';
import { SignupButton } from './SignupButton/SignupButton';

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
      <Box
        component="form"
        className={classes.form}
      >
        <Stack
          direction="row"
          spacing={2}
        >
          <CustomInputText
            label="First Name"
            fullWidth
          />
          <CustomInputText
            label="Last Name"
            fullWidth
          />
          <CustomInputText
            label="Date of Birth"
            fullWidth
          />
        </Stack>

        <Stack
          direction="row"
          spacing={2}
        >
          <CustomInputText
            label="Email"
            fullWidth
          />
          <CustomInputText
            label="Password"
            fullWidth
          />
        </Stack>

        <Box className={classes.address}>
          <AddressBox
            title="Shipping Address"
            checkboxLabel="Set as default shipping address"
          />
          <AddressBox
            title="Billing Address"
            checkboxLabel="Set as default billing address"
          />
        </Box>

        <FormCheckbox
          label="My shipping and billing addresses are the same"
          sx={{ alignSelf: 'center' }}
        />

        <SignupButton />
      </Box>
    </Container>
  );
};
