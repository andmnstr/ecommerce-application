import { Box, Container, Stack, Typography } from '@mui/material';
import type React from 'react';

import { CustomButton } from '../../../shared/UI/button/CustomButton';
import CustomInputText from '../../../shared/UI/CustomInputText/CustomInputText';
import FormCheckbox from '../../../shared/UI/FormCheckbox/FormCheckbox';
import classes from './RegistrationForm.module.scss';

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
          <Box className={classes.addressBox}>
            <Typography
              variant="body1"
              component="h3"
            >
              Shipping Address
            </Typography>
            <CustomInputText label="Street" />
            <CustomInputText label="City" />
            <CustomInputText label="Postal Code" />
            <CustomInputText label="Country" />
            <FormCheckbox label="Set as default shipping address" />
          </Box>

          <Box className={classes.addressBox}>
            <Typography
              variant="body1"
              component="h3"
            >
              Billing Address
            </Typography>
            <CustomInputText label="Street" />
            <CustomInputText label="City" />
            <CustomInputText label="Postal Code" />
            <CustomInputText label="Country" />
            <FormCheckbox label="Set as default billing address" />
          </Box>
        </Box>

        <FormCheckbox
          label="My shipping and billing addresses are the same"
          sx={{ alignSelf: 'center' }}
        />
        <CustomButton
          variant="contained"
          size="large"
          className={classes.button}
        >
          Sign Up
        </CustomButton>
      </Box>
    </Container>
  );
};
