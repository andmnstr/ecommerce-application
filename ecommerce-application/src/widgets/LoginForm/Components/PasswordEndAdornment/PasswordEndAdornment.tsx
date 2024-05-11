import { Visibility, VisibilityOff } from '@mui/icons-material';
import { IconButton, InputAdornment } from '@mui/material';
import type React from 'react';

import { passwordEndAdornmentStyle } from './PasswordEndAdornment.style';

interface PasswordEndAdornmentProps {
  onClick: () => void;
  showPassword: boolean;
}

export const PasswordEndAdornment: React.FC<PasswordEndAdornmentProps> = ({ onClick, showPassword }) => {
  return (
    <InputAdornment position="end">
      <IconButton onClick={onClick}>
        {showPassword ? (
          <VisibilityOff style={passwordEndAdornmentStyle} />
        ) : (
          <Visibility style={passwordEndAdornmentStyle} />
        )}
      </IconButton>
    </InputAdornment>
  );
};
