import LogoutIcon from '@mui/icons-material/Logout';
import { Avatar } from '@mui/material';
import type React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { CustomButton } from '../../../../shared/UI/button/CustomButton';
import { getUserNameData } from '../../api';
import { type AuthSectionProps } from '../../lib/types/Header.types';
import styles from './AuthSection.module.scss';
import { authPages, userProfilePath } from './config';

export const AuthSection: React.FC<AuthSectionProps> = (props): JSX.Element => {
  const { userLoggedOn, logoutFn } = props;
  const currentPage = window.location.pathname;

  const [userInfo, setUserInfo] = useState<string>();

  useEffect(() => {
    const getUserName = async (): Promise<void> => {
      const userData = await getUserNameData();
      setUserInfo(userData);
    };
    getUserName();
  }, []);

  return (
    <div className={styles.ButtonSection}>
      {authPages.map(page => {
        return (
          <Link
            to={page.href}
            key={page.id}
            hidden={userLoggedOn || page.href === currentPage}
          >
            <CustomButton
              className={styles.Button}
              variant="contained"
            >
              {page.text}
            </CustomButton>
          </Link>
        );
      })}
      <Link
        to={userProfilePath}
        hidden={!userLoggedOn}
        style={{ textDecoration: 'none' }}
      >
        <Avatar
          className={styles.UserProfileLink}
          sx={{ backgroundColor: '#131118', width: 56, height: 56, transition: 'all ease-in-out 0.5s' }}
        >
          {userInfo}
        </Avatar>
      </Link>
      <Link
        to="/"
        hidden={!userLoggedOn}
      >
        <CustomButton
          className={styles.Button}
          variant="outlined"
          onClick={logoutFn}
          style={{ gap: '5px' }}
        >
          <LogoutIcon />
          Logout
        </CustomButton>
      </Link>
    </div>
  );
};
