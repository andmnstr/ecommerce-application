import { Checkbox, FormControlLabel, type FormControlLabelProps } from '@mui/material';
import * as React from 'react';

import styles from './FormCheckbox.module.scss';

type FormCheckboxProps = Omit<FormControlLabelProps, 'control'>;

export default function FormCheckbox({ style, ...props }: FormCheckboxProps): JSX.Element {
  return (
    <FormControlLabel
      {...props}
      className={styles.FormCheckbox}
      control={<Checkbox sx={style} />}
    />
  );
}
