import type { Image } from '@commercetools/platform-sdk';
import { Skeleton, Typography } from '@mui/material';
import type React from 'react';
import { useState } from 'react';
import Carousel from 'react-material-ui-carousel';

import styles from './ImagesSection.module.scss';

interface IImagesSectionProps {
  images: Image[] | undefined;
  productProperties: {
    color: string;
    size: string;
    season: string;
  };
  additionInfo: string | undefined;
  modalOpen: () => void;
}

export const ImagesSection: React.FC<IImagesSectionProps> = props => {
  const { images, productProperties, additionInfo, modalOpen } = props;
  const productImage = images !== undefined ? images[0]?.url : undefined;
  const [propertiesVisisble, setPropertiesVisible] = useState(false);

  return (
    <aside className={styles.image_section}>
      {productImage ? (
        <Carousel autoPlay={false}>
          {images?.map(image => {
            return (
              <div
                className={styles.image}
                key={image.url}
                style={{ backgroundImage: `url(${image.url})` }}
                onClick={modalOpen}
                onTouchEnd={modalOpen}
              />
            );
          })}
        </Carousel>
      ) : (
        <Skeleton
          animation="wave"
          variant="rectangular"
          className={styles.pseudo_image}
        />
      )}
      {typeof additionInfo === 'string' ? (
        <div className={styles.image_text}>
          <div className={styles.properties_selector}>
            <Typography
              className={styles.image_label}
              style={!propertiesVisisble ? { borderBottom: '2px solid #e1e1e1' } : { borderBottom: 'none' }}
              onClick={() => {
                setPropertiesVisible(false);
              }}
            >
              Additional information
            </Typography>
            <Typography
              className={styles.image_label}
              style={propertiesVisisble ? { borderBottom: '2px solid #e1e1e1' } : { borderBottom: 'none' }}
              onClick={() => {
                setPropertiesVisible(true);
              }}
            >
              Product properties
            </Typography>
          </div>
          <article hidden={propertiesVisisble}>
            <Typography className={styles.image_description}>{additionInfo}</Typography>
          </article>
          <article hidden={!propertiesVisisble}>
            <Typography className={styles.image_description}>Product color: {productProperties.color}</Typography>
            <Typography className={styles.image_description}>Product size: {productProperties.size}</Typography>
            <Typography className={styles.image_description}>Season: {productProperties.season}</Typography>
          </article>
        </div>
      ) : (
        <div className={styles.image_text}>
          <Skeleton
            animation="wave"
            variant="text"
            className={styles.image_pseudo_label}
          />
          <Skeleton
            animation="wave"
            variant="text"
            className={styles.image_pseudo_description}
          />
        </div>
      )}
    </aside>
  );
};
