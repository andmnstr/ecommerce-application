import { Box, Typography } from '@mui/material';
import type React from 'react';

import FormCheckbox from '../../../../shared/UI/FormCheckbox/FormCheckbox';
import type { IAddressBoxProps } from '../../lib/types/AdressBoxProps';
import { InputWithController } from '../InputWithController/InputWithController';
import classes from '../RegistrationForm.module.scss';
import { SelectWithController } from '../SelectWtihController/SelectWithController';

export const AddressBox: React.FC<IAddressBoxProps> = props => {
  const { title, checkboxLabel, control, names, helperTexts } = props;
  return (
    <Box className={classes.addressBox}>
      <Typography
        variant="body1"
        component="h3"
      >
        {title}
      </Typography>

      <InputWithController
        name={names[0]}
        control={control}
        label="Street"
        helperText={helperTexts[0]}
      />
      <InputWithController
        name={names[1]}
        control={control}
        label="City"
        helperText={helperTexts[1]}
      />
      <InputWithController
        name={names[2]}
        control={control}
        label="Postal Code"
        helperText={helperTexts[2]}
      />
      <SelectWithController
        name={names[3]}
        control={control}
        label="Country"
        helperText={helperTexts[3]}
      />
      <FormCheckbox label={checkboxLabel} />
    </Box>
  );
};
