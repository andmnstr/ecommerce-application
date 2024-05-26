import type { Customer } from '@commercetools/platform-sdk';
import { Box } from '@mui/material';
import type React from 'react';

import { CustomButton } from '../../../../shared/UI/button/CustomButton';
import CustomInputText from '../../../../shared/UI/CustomInputText/CustomInputText';
import classes from '../UserProfile.module.scss';

interface PersonalInformationFormProps {
  userInfo: Customer;
}

export const PersonalInformationForm: React.FC<PersonalInformationFormProps> = ({ userInfo }) => {
  const { firstName, lastName, dateOfBirth, email } = userInfo;
  return (
    <Box
      component="form"
      className={classes.Container}
    >
      <CustomInputText
        name="firstName"
        label="First Name"
        value={firstName}
        className={classes.Input}
        disabled
      />
      <CustomInputText
        name="lastName"
        label="Last Name"
        value={lastName}
        className={classes.Input}
        disabled
      />
      <CustomInputText
        name="dateOfBirth"
        label="Date of Birth"
        value={dateOfBirth}
        className={classes.Input}
        disabled
      />
      <CustomInputText
        name="email"
        label="Email"
        value={email}
        className={classes.Input}
        disabled
      />
      <CustomButton
        variant="contained"
        size="large"
        type="button"
        className={classes.Button}
      >
        Edit
      </CustomButton>
    </Box>
  );
};
