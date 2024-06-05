import type { Image } from '@commercetools/platform-sdk';
import CloseIcon from '@mui/icons-material/Close';
import { Dialog, DialogContent, IconButton } from '@mui/material';
import type React from 'react';
import Carousel from 'react-material-ui-carousel';

import styles from './ProductModalWindow.module.scss';

interface IProductModalWindowProps {
  images: Image[] | undefined;
  open: boolean;
  close: () => void;
}

export const ProductModalWindow: React.FC<IProductModalWindowProps> = props => {
  const { images, open, close } = props;

  return (
    <Dialog
      onClose={close}
      open={open}
      maxWidth="md"
    >
      <IconButton
        aria-label="close"
        sx={{
          position: 'absolute',
          right: 10,
          top: 10,
          color: '#03a9f4',
        }}
        onClick={close}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent
        className={styles.product_modal}
        dividers
      >
        <Carousel
          className={styles.modal_carousel}
          autoPlay={false}
        >
          {images?.map(image => {
            return (
              <div
                className={styles.image}
                key={image.url}
                style={{ backgroundImage: `url(${image.url})` }}
              />
            );
          })}
        </Carousel>
      </DialogContent>
    </Dialog>
  );
};
