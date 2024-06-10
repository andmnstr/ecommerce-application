import { Add, DeleteForever, Remove } from '@mui/icons-material';
import {
  Box,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import type React from 'react';

import KittenImage from '../../../../public/images/kitten.png';
import { CustomButton } from '../../../shared/UI/button/CustomButton';
import classes from './Cart.module.scss';

export const Cart: React.FC = () => {
  return (
    <Box className={classes.CartContainer}>
      <TableContainer className={classes.CartProductsTable}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Products</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Total</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow key="0">
              <TableCell className={classes.ProductsCell}>
                <Box
                  component="img"
                  src={KittenImage}
                  className={classes.CartItemImage}
                />
                <Stack>
                  <Typography sx={{ fontWeight: 700 }}>Kitten Kitten Kitten Kitten</Typography>
                  <Typography>Size: S</Typography>
                </Stack>
              </TableCell>
              <TableCell>$80.00</TableCell>
              <TableCell>
                <Stack className={classes.ItemQuantity}>
                  <Remove />
                  <Typography>1</Typography>
                  <Add />
                </Stack>
              </TableCell>
              <TableCell>$80.00</TableCell>
              <TableCell size="small">
                <DeleteForever />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Box className={classes.TotalPriceBox}>
        <Stack className={classes.TotalPrice}>
          <Typography sx={{ fontWeight: 700 }}>Grand Total:</Typography>
          <Typography sx={{ fontWeight: 700 }}>$80.00</Typography>
        </Stack>
        <CustomButton
          variant="contained"
          size="large"
          type="button"
        >
          Checkout
        </CustomButton>
      </Box>
    </Box>
  );
};
