import { Checkbox, FormControlLabel, type FormControlLabelProps } from '@mui/material';
import * as React from 'react';

type FormCheckboxProps = Omit<FormControlLabelProps, 'control'>;

export default function FormCheckbox({ style, ...props }: FormCheckboxProps): JSX.Element {
  return (
    <FormControlLabel
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
      control={<Checkbox sx={style} />}
    />
  );
}
