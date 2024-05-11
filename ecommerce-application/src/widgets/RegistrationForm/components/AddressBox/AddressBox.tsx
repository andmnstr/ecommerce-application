import { Box, Typography } from '@mui/material';
import type React from 'react';

import CustomInputText from '../../../../shared/UI/CustomInputText/CustomInputText';
import FormCheckbox from '../../../../shared/UI/FormCheckbox/FormCheckbox';
import classes from '../RegistrationForm.module.scss';

interface IAddressBoxProps {
  title: string;
  checkboxLabel: string;
}

export const AddressBox: React.FC<IAddressBoxProps> = props => {
  const { title, checkboxLabel } = props;
  return (
    <Box className={classes.addressBox}>
      <Typography
        variant="body1"
        component="h3"
      >
        {title}
      </Typography>
      <CustomInputText label="Street" />
      <CustomInputText label="City" />
      <CustomInputText label="Postal Code" />
      <CustomInputText label="Country" />
      <FormCheckbox label={checkboxLabel} />
    </Box>
  );
};
