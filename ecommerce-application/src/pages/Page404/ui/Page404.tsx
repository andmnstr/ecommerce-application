import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';
import OtherHousesIcon from '@mui/icons-material/OtherHouses';
import type React from 'react';
import { Link } from 'react-router-dom';

import KittenImage from '../../../../public/images/kitten.png';
import { CustomButton } from '../../../shared/UI/button/CustomButton';
import { Header } from '../../../widgets/Header';
import styles from './Page404.module.scss';

export const Page404: React.FC = () => {
  return (
    <>
      <Header />
      <section className={styles.Container}>
        <h1 className={styles.Heading}>
          SORRY
          <DisabledByDefaultIcon className={styles.FaultIcon} />
        </h1>
        <h2 className={styles.Text}>We could not find that page...</h2>
        <h3 className={styles.SubText}>
          Please, proceed to
          <span className={styles.ShopName}> Krist </span>
          home page
        </h3>
        <Link
          className={styles.HomePage_link}
          to="/"
        >
          <CustomButton
            className={styles.Button}
            variant="outlined"
          >
            To home page
            <OtherHousesIcon />
          </CustomButton>
        </Link>
        <img
          src={KittenImage}
          alt="Sad kitten"
          className={styles.Image}
        />
      </section>
    </>
  );
};
