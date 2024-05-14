import { Box, Typography } from '@mui/material';
import type React from 'react';

import FormCheckbox from '../../../../shared/UI/FormCheckbox/FormCheckbox';
import type { IAddressBoxProps } from '../../lib/types/AdressBoxProps';
import { InputWithController } from '../InputWithController/InputWithController';
import classes from '../RegistrationForm.module.scss';
import { SelectWithController } from '../SelectWtihController/SelectWithController';

export const AddressBox: React.FC<IAddressBoxProps> = props => {
  const { title, checkboxLabel, control, names, helperTexts } = props;
  const labels = ['Street', 'City', 'Postal Code', 'Country'];
  const inputs = [0, 1, 2];
  return (
    <Box className={classes.addressBox}>
      <Typography
        variant="body1"
        component="h3"
      >
        {title}
      </Typography>

      {inputs.map((item: number) => {
        return (
          <InputWithController
            key={item}
            name={names[item]}
            control={control}
            label={labels[item]}
            helperText={helperTexts[item]}
          />
        );
      })}

      <SelectWithController
        name={names[3]}
        control={control}
        label={labels[3]}
        helperText={helperTexts[3]}
      />
      <FormCheckbox label={checkboxLabel} />
    </Box>
  );
};
