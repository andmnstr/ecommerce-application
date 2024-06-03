import { createTheme } from '@mui/material/styles';

export const colorTheme = createTheme({
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
