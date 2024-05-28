import type { Customer } from '@commercetools/platform-sdk';
import { Box } from '@mui/material';
import type React from 'react';
import { useState } from 'react';

import CustomInputText from '../../../../shared/UI/CustomInputText/CustomInputText';
import { UserProfileButton } from '../Button/UserProfileButton';
import classes from '../UserProfile.module.scss';

interface IPersonalInformationFormProps {
  userInfo: Customer;
}

export const PersonalInformationForm: React.FC<IPersonalInformationFormProps> = ({ userInfo }) => {
  const { firstName, lastName, dateOfBirth, email } = userInfo;
  const [isDisabled, setIsDisabled] = useState(true);
  const [editButton, setEditButtonClass] = useState(classes.Button);
  const [saveButton, setSavetButtonClass] = useState(classes.Invisible);

  const enableEditMode = (): void => {
    setIsDisabled(false);
    setEditButtonClass(classes.Invisible);
    setSavetButtonClass(classes.Button);
  };

  const saveData = (): void => {
    // нужно вернуть все велью инпутов на место, если их изменяли
    setIsDisabled(true);
    setEditButtonClass(classes.Button);
    setSavetButtonClass(classes.Invisible);
  };

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
        disabled={isDisabled}
      />
      <CustomInputText
        name="lastName"
        label="Last Name"
        value={lastName}
        className={classes.Input}
        fullWidth
        disabled={isDisabled}
      />
      <CustomInputText
        name="dateOfBirth"
        label="Date of Birth"
        value={dateOfBirth}
        className={classes.Input}
        fullWidth
        disabled={isDisabled}
      />
      <CustomInputText
        name="email"
        label="Email"
        value={email}
        className={classes.Input}
        fullWidth
        disabled={isDisabled}
      />
      <UserProfileButton
        className={editButton}
        onClick={enableEditMode}
      >
        Edit
      </UserProfileButton>
      <UserProfileButton
        className={saveButton}
        onClick={saveData}
      >
        Save
      </UserProfileButton>
    </Box>
  );
};
