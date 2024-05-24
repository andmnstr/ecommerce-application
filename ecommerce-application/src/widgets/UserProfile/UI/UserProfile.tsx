import { Box, Tab, Tabs, Typography } from '@mui/material';
import type React from 'react';
import { useState } from 'react';

import { CustomButton } from '../../../shared/UI/button/CustomButton';
import CustomInputText from '../../../shared/UI/CustomInputText/CustomInputText';
import classes from './UserProfile.module.scss';

export const UserProfile: React.FC = () => {
  const [currentTabIndex, setCurrentTabIndex] = useState(0);

  const handleTabChange = (e: React.SyntheticEvent, tabIndex: number): void => {
    setCurrentTabIndex(tabIndex);
  };

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

      {currentTabIndex === 0 && (
        <Box
          component="form"
          className={classes.Container}
        >
          <CustomInputText
            name="firstName"
            label="First Name"
            className={classes.Input}
            disabled
          />
          <CustomInputText
            name="lastName"
            label="Last Name"
            className={classes.Input}
            disabled
          />
          <CustomInputText
            name="dateOfBirth"
            label="Date of Birth"
            className={classes.Input}
            disabled
          />
          <CustomInputText
            name="email"
            label="Email"
            className={classes.Input}
            disabled
          />
          <CustomButton
            variant="contained"
            size="large"
            type="button"
            className={classes.Button}
          >
            Edit
          </CustomButton>
        </Box>
      )}

      {currentTabIndex === 1 && (
        <Box className={classes.Container}>
          <Typography component="h2">Default shipping address</Typography>
          <Box className={classes.AddressContainer}>
            <CustomInputText label="Street" />
            <CustomInputText label="City" />
            <CustomInputText label="Postal Code" />
            <CustomInputText label="Country" />
            <CustomButton
              variant="contained"
              size="large"
              type="button"
              className={classes.Button}
            >
              Edit
            </CustomButton>
            <CustomButton
              variant="contained"
              size="large"
              type="button"
              className={classes.Button}
            >
              Delete
            </CustomButton>
          </Box>
          <Typography component="h2">Default billing address</Typography>
          <Box className={classes.AddressContainer}>
            <CustomInputText label="Street" />
            <CustomInputText label="City" />
            <CustomInputText label="Postal Code" />
            <CustomInputText label="Country" />
            <CustomButton
              variant="contained"
              size="large"
              type="button"
              className={classes.Button}
            >
              Edit
            </CustomButton>
            <CustomButton
              variant="contained"
              size="large"
              type="button"
              className={classes.Button}
            >
              Delete
            </CustomButton>
          </Box>
          <CustomButton
            variant="contained"
            size="large"
            type="button"
            className={classes.Button}
            style={{ width: 300, alignSelf: 'center', marginTop: 20 }}
          >
            Add new address
          </CustomButton>
        </Box>
      )}

      {currentTabIndex === 2 && (
        <Box className={classes.Container}>
          <CustomInputText
            label="Current password"
            fullWidth
          />
          <CustomInputText
            label="New password"
            fullWidth
          />
          <CustomButton
            variant="contained"
            size="large"
            type="submit"
            className={classes.Button}
          >
            Save
          </CustomButton>
          <CustomButton
            variant="contained"
            size="large"
            type="button"
            className={classes.Button}
          >
            Cancel
          </CustomButton>
        </Box>
      )}
    </>
  );
};
