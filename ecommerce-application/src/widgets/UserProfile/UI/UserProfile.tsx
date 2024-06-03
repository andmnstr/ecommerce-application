import type { Address, Customer } from '@commercetools/platform-sdk';
import { Box, Tab, Tabs, Typography } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import type React from 'react';
import { useCallback, useEffect, useState } from 'react';

import { CustomButton } from '../../../shared/UI/button/CustomButton';
import { getUserInfo } from '../api/getUserInfo';
import { AddNewAddress } from './Addresses/AddNewAddress/AddNewAddress';
import { AddressBox } from './Addresses/AddressBox';
import { ChangeAddress } from './Addresses/ChangeAddress/ChangeAddress';
import { PasswordManager } from './PasswordManager/PasswordManager';
import { PersonalInformationForm } from './PersonalInformationForm/PersonalInformationForm';
import classes from './UserProfile.module.scss';

export const UserProfile: React.FC = () => {
  const [currentTabIndex, setCurrentTabIndex] = useState(0);
  const [isChangeAddress, setIsChangeAddress] = useState(false);
  const [isNewAddress, setIsNewAddress] = useState(false);
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
  const [addresses, setAddresses] = useState<Address[]>([]);

  const changeAddress = useCallback((shouldChangeAddress: boolean, newAddress: Address) => {
    setIsChangeAddress(shouldChangeAddress);
    setAddress(newAddress);
  }, []);
  const cancelChangeAddress = (): void => {
    setIsChangeAddress(false);
  };

  const addNewAddress = (): void => {
    setIsNewAddress(true);
  };
  const cancelNewAddress = (): void => {
    setIsNewAddress(false);
  };

  useEffect(() => {
    const fetchUserInfo = async (): Promise<void> => {
      const userData = await getUserInfo();
      setUserInfo(userData);
      setAddresses(userData.addresses);
    };
    fetchUserInfo();
  }, [currentTabIndex, isChangeAddress, isNewAddress]);

  const handleDeleteAddress = (deletedAddressId: string | undefined): void => {
    setAddresses(currentAddresses =>
      currentAddresses.filter(item => {
        return item.id !== deletedAddressId;
      })
    );
  };

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
        <>
          {isChangeAddress && (
            <ChangeAddress
              address={address}
              version={userInfo.version}
              isDefaultBillingAddress={address.id === userInfo.defaultBillingAddressId}
              isDefaultShippingAddress={address.id === userInfo.defaultShippingAddressId}
              onCancel={cancelChangeAddress}
            />
          )}
          {isNewAddress && (
            <AddNewAddress
              version={userInfo.version}
              onCancel={cancelNewAddress}
            />
          )}
          {!isChangeAddress && !isNewAddress && (
            <Box className={classes.Container}>
              {addresses.map(item => {
                return (
                  <AddressBox
                    key={item.id}
                    address={item}
                    userInfo={userInfo}
                    changeAddress={changeAddress}
                    handleDeleteAddress={handleDeleteAddress}
                  />
                );
              })}
              <CustomButton
                variant="contained"
                size="large"
                className={classes.Button}
                type="button"
                onClick={addNewAddress}
              >
                Add new address
              </CustomButton>
            </Box>
          )}
        </>
      )}

      {currentTabIndex === 2 && userInfo && <PasswordManager version={userInfo.version} />}
    </>
  );
};
