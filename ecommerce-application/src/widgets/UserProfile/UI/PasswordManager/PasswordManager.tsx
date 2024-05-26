import { Box } from '@mui/material';
import type React from 'react';

import CustomInputText from '../../../../shared/UI/CustomInputText/CustomInputText';
import { UserProfileButton } from '../Button/UserProfileButton';
import classes from '../UserProfile.module.scss';

export const PasswordManager: React.FC = () => {
  return (
    <Box className={classes.Container}>
      <CustomInputText
        label="Current password"
        fullWidth
      />
      <CustomInputText
        label="New password"
        fullWidth
      />
      <UserProfileButton>Save</UserProfileButton>
      <UserProfileButton>Cancel</UserProfileButton>
    </Box>
  );
};
