import { Link, type LinkProps } from '@mui/material';
import type React from 'react';

import { customLinkStyle } from './CustomLink.styles';

export const CustomLink: React.FC<LinkProps> = ({ href, children, style, ...props }) => {
  return (
    <Link
      underline="none"
      href={href}
      color="#131118"
      fontSize="16px"
      sx={customLinkStyle}
      {...props}
    >
      {children}
    </Link>
  );
};
