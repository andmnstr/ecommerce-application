import type { ButtonProps } from '@mui/material/Button';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import type React from 'react';

import { buttonStyles } from './CustomButton.styles';

const buttonTheme = createTheme({
  palette: {
    primary: {
      main: '#131118',
      light: '#F3F3F3',
      dark: '#6E6D6D',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#F3F3F3',
      light: '#E8DFDF',
      dark: '#CCCCCC',
      contrastText: '#000000',
    },
  },
});

export function CustomButton({ children, ...props }: ButtonProps): React.ReactNode {
  return (
    <ThemeProvider theme={buttonTheme}>
      <Button
        {...props}
        sx={buttonStyles}
      >
        {children}
      </Button>
    </ThemeProvider>
  );
}
