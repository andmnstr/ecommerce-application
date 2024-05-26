import type { Customer } from '@commercetools/platform-sdk';
import { Box, Tab, Tabs, Typography } from '@mui/material';
import type React from 'react';
import { useEffect, useState } from 'react';

import { getUserInfo } from '../api/getUserInfo';
import { AddressBox } from './Addresses/AddressBox';
import { UserProfileButton } from './Button/UserProfileButton';
import { PasswordManager } from './PasswordManager/PasswordManager';
import { PersonalInformationForm } from './PersonalInformationForm/PersonalInformationForm';
import classes from './UserProfile.module.scss';

export const UserProfile: React.FC = () => {
  const [currentTabIndex, setCurrentTabIndex] = useState(0);

  const handleTabChange = (e: React.SyntheticEvent, tabIndex: number): void => {
    setCurrentTabIndex(tabIndex);
  };

  const [userInfo, setUserInfo] = useState<Customer>();

  useEffect(() => {
    const fetchUserInfo = async (): Promise<void> => {
      const userData = await getUserInfo();
      setUserInfo(userData);
    };
    fetchUserInfo();
  }, []);

  return (
    <>
      <Typography
        component="h1"
        className={classes.Title}
      >
        My profile
      </Typography>
      <Tabs
        value={currentTabIndex}
        onChange={handleTabChange}
      >
        <Tab
          label="Personal informaton"
          className={classes.Tab}
        />
        <Tab
          label="Addresses"
          className={classes.Tab}
        />
        <Tab
          label="Password manager"
          className={classes.Tab}
        />
      </Tabs>

      {currentTabIndex === 0 && userInfo && <PersonalInformationForm userInfo={userInfo} />}

      {currentTabIndex === 1 && userInfo && (
        <Box className={classes.Container}>
          {userInfo.addresses.map(address => {
            return (
              <AddressBox
                key={address.id}
                address={address}
              />
            );
          })}
          <UserProfileButton>Add new address</UserProfileButton>
        </Box>
      )}

      {currentTabIndex === 2 && <PasswordManager />}
    </>
  );
};
