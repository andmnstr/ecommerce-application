import { RemoveShoppingCart } from '@mui/icons-material';
import { Box, Popover, Typography } from '@mui/material';
import type React from 'react';
import { useState } from 'react';

import { CustomButton } from '../../../../shared/UI/button/CustomButton';
import { clearCart } from '../../api/clearCart';
import classes from './ClearCartButton.module.scss';

interface IClearCartButtonProps {
  cartId: string;
  cartVersion: number;
  handleClearCart: () => void;
}

export const ClearCartButton: React.FC<IClearCartButtonProps> = ({ cartId, cartVersion, handleClearCart }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClearCartButtonClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = (): void => {
    setAnchorEl(null);
  };

  const handleClearCartConfirmationClick = async (): Promise<void> => {
    await clearCart(cartId, cartVersion);
    handleClearCart();
    handlePopoverClose();
  };

  const open = Boolean(anchorEl);
  const id = open ? 'clear-cart-popover' : undefined;

  return (
    <Box className={classes.ButtonContainer}>
      <CustomButton
        className={classes.ClearCartButton}
        variant="contained"
        size="large"
        type="button"
        aria-describedby={id}
        onClick={handleClearCartButtonClick}
      >
        Clear Cart
        <RemoveShoppingCart />
      </CustomButton>
      <Popover
        className={classes.Popover}
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        slotProps={{
          paper: {
            className: classes.Paper,
          },
        }}
      >
        <Typography>Are you sure you want to clear your cart?</Typography>
        <Box className={classes.PopoverButtons}>
          <CustomButton
            variant="contained"
            size="large"
            type="button"
            onClick={handleClearCartConfirmationClick}
          >
            Yes
          </CustomButton>
          <CustomButton
            variant="contained"
            size="large"
            type="button"
            onClick={handlePopoverClose}
          >
            No
          </CustomButton>
        </Box>
      </Popover>
    </Box>
  );
};
