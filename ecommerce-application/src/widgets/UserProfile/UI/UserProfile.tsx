import type { Address, Customer } from '@commercetools/platform-sdk';
import { Box, Tab, Tabs, Typography } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import type React from 'react';
import { useCallback, useEffect, useState } from 'react';

import { CustomButton } from '../../../shared/UI/button/CustomButton';
import { getUserInfo } from '../api/getUserInfo';
import { AddressBox } from './Addresses/AddressBox';
import { ChangeAddress } from './Addresses/ChangeAddress/ChangeAddress';
import { PasswordManager } from './PasswordManager/PasswordManager';
import { PersonalInformationForm } from './PersonalInformationForm/PersonalInformationForm';
import classes from './UserProfile.module.scss';

export const UserProfile: React.FC = () => {
  const [currentTabIndex, setCurrentTabIndex] = useState(0);
  const [isChangeAddress, setIsChangeAddress] = useState(false);
  const [address, setAddress] = useState<Address>({
    id: '',
    streetName: '',
    city: '',
    postalCode: '',
    country: '',
  });

  const handleTabChange = (e: React.SyntheticEvent, tabIndex: number): void => {
    setCurrentTabIndex(tabIndex);
    setIsChangeAddress(false);
  };

  const [userInfo, setUserInfo] = useState<Customer>();
  const changeAddress = useCallback((shouldChangeAddress: boolean, newAddress: Address) => {
    setIsChangeAddress(shouldChangeAddress);
    setAddress(newAddress);
  }, []);
  const cancelChangeAddress = (): void => {
    setIsChangeAddress(false);
  };

  useEffect(() => {
    const fetchUserInfo = async (): Promise<void> => {
      const userData = await getUserInfo();
      setUserInfo(userData);
    };
    fetchUserInfo();
  }, [currentTabIndex, isChangeAddress]);

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

      {currentTabIndex === 1 &&
        userInfo &&
        (isChangeAddress ? (
          <ChangeAddress
            address={address}
            version={userInfo.version}
            onCancel={cancelChangeAddress}
          />
        ) : (
          <Box className={classes.Container}>
            {userInfo.addresses.map(item => {
              return (
                <AddressBox
                  key={item.id}
                  address={item}
                  userInfo={userInfo}
                  changeAddress={changeAddress}
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
        ))}

      {currentTabIndex === 2 && userInfo && <PasswordManager version={userInfo.version} />}
    </>
  );
};
