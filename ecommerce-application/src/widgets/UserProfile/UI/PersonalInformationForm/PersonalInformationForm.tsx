import type { Customer } from '@commercetools/platform-sdk';
import { Box } from '@mui/material';
import type React from 'react';

import CustomInputText from '../../../../shared/UI/CustomInputText/CustomInputText';
import { UserProfileButton } from '../Button/UserProfileButton';
import classes from '../UserProfile.module.scss';

interface IPersonalInformationFormProps {
  userInfo: Customer;
}

export const PersonalInformationForm: React.FC<IPersonalInformationFormProps> = ({ userInfo }) => {
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
        fullWidth
        disabled
      />
      <CustomInputText
        name="lastName"
        label="Last Name"
        value={lastName}
        className={classes.Input}
        fullWidth
        disabled
      />
      <CustomInputText
        name="dateOfBirth"
        label="Date of Birth"
        value={dateOfBirth}
        className={classes.Input}
        fullWidth
        disabled
      />
      <CustomInputText
        name="email"
        label="Email"
        value={email}
        className={classes.Input}
        fullWidth
        disabled
      />
      <UserProfileButton>Edit</UserProfileButton>
    </Box>
  );
};
