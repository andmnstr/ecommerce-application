import { Box, Typography } from '@mui/material';
import type React from 'react';

import FormCheckbox from '../../../../shared/UI/FormCheckbox/FormCheckbox';
import { addressBoxInputs, addressBoxLabels } from '../../consts/RegistrationForm.consts';
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

      {addressBoxInputs.map((item: number) => {
        return (
          <InputWithController
            key={item}
            name={names[item]}
            control={control}
            label={addressBoxLabels[item]}
            helperText={helperTexts[item]}
          />
        );
      })}

      <SelectWithController
        name={names[3]}
        control={control}
        label={addressBoxLabels[3]}
        helperText={helperTexts[3]}
      />
      <FormCheckbox label={checkboxLabel} />
    </Box>
  );
};
