import { TextField, type TextFieldProps } from '@mui/material';
import type React from 'react';

export default function CustomInputText({ style, ...props }: TextFieldProps): React.ReactNode {
  return (
    <TextField
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
      sx={{
        '& .MuiInputBase-root.Mui-focused': {
          '.MuiOutlinedInput-notchedOutline': {
            borderColor: 'black',
          },
        },
        '& label.Mui-focused': {
          color: 'black',
        },
        ...style,
      }}
    />
  );
}
