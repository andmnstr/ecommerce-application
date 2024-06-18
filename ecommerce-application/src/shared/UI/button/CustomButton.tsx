import type { ButtonProps } from '@mui/material/Button';
import Button from '@mui/material/Button';
import type React from 'react';

import { buttonStyles } from './CustomButton.styles';

export function CustomButton({ children, ...props }: ButtonProps): React.ReactNode {
  return (
    <Button
      {...props}
      sx={buttonStyles}
    >
      {children}
    </Button>
  );
}
