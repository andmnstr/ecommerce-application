import { Alert, Box, Modal, Typography } from '@mui/material';
import type React from 'react';

import { CustomButton } from '../../../../../shared/UI/button/CustomButton';
import classes from '../../UserProfile.module.scss';

interface ISuccessModalProps {
  open: boolean;
  onClick: () => void;
}

export const SuccessUpdateModal: React.FC<ISuccessModalProps> = ({ open, onClick }) => {
  return (
    <Modal
      open={open}
      className={classes.ModalBackdrop}
      disableEscapeKeyDown
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className={classes.Modal}>
        <Alert
          id="modal-modal-title"
          severity="success"
          variant="filled"
        >
          Your password has been succesfuly changed.
        </Alert>
        <Typography id="modal-modal-description">Please log in with your new password to continue.</Typography>
        <CustomButton
          variant="contained"
          size="large"
          className={classes.Button}
          type="button"
          onClick={onClick}
        >
          Login
        </CustomButton>
      </Box>
    </Modal>
  );
};
