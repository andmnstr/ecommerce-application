import { TableCell, TableHead, TableRow } from '@mui/material';
import type React from 'react';

export const CartTableHead: React.FC = () => {
  return (
    <TableHead>
      <TableRow>
        <TableCell>Products</TableCell>
        <TableCell>Price</TableCell>
        <TableCell>Quantity</TableCell>
        <TableCell>Total</TableCell>
        <TableCell />
      </TableRow>
    </TableHead>
  );
};
