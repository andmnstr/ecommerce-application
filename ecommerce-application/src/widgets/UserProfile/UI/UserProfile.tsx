import type { Customer } from '@commercetools/platform-sdk';
import { Box, Tab, Tabs, Typography } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import type React from 'react';
import { useEffect, useState } from 'react';

import { CustomButton } from '../../../shared/UI/button/CustomButton';
import { getUserInfo } from '../api/getUserInfo';
import { AddressBox } from './Addresses/AddressBox';
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
  }, [currentTabIndex]);

  const smallScreen = useMediaQuery('(max-width: 640px)');

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
        orientation={smallScreen ? 'vertical' : 'horizontal'}
        onChange={handleTabChange}
        TabIndicatorProps={{
          style: {
            backgroundColor: '#000',
          },
        }}
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
                userInfo={userInfo}
              />
            );
          })}
          <CustomButton
            variant="contained"
            size="large"
            className={classes.Button}
            type="submit"
          >
            Add new address
          </CustomButton>
        </Box>
      )}

      {currentTabIndex === 2 && userInfo && <PasswordManager version={userInfo.version} />}
    </>
  );
};
