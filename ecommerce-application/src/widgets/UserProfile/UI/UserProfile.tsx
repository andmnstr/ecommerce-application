import { Box, Tab, Tabs, Typography } from '@mui/material';
import type React from 'react';
import { useState } from 'react';

import { CustomButton } from '../../../shared/UI/button/CustomButton';
import CustomInputText from '../../../shared/UI/CustomInputText/CustomInputText';

export const UserProfile: React.FC = () => {
  const [currentTabIndex, setCurrentTabIndex] = useState(0);

  const handleTabChange = (e: React.SyntheticEvent, tabIndex: number): void => {
    setCurrentTabIndex(tabIndex);
  };

  return (
    <>
      <Typography component="h1">My profile</Typography>
      <Tabs
        value={currentTabIndex}
        onChange={handleTabChange}
      >
        <Tab label="Personal informaton" />
        <Tab label="Addresses" />
        <Tab label="Password manager" />
      </Tabs>

      {currentTabIndex === 0 && (
        <Box>
          <CustomInputText
            name="firstName"
            label="First Name"
            disabled
          />
          <CustomInputText
            name="lastName"
            label="Last Name"
            disabled
          />
          <CustomInputText
            name="dateOfBirth"
            label="Date of Birth"
            disabled
          />
          <CustomInputText
            name="email"
            label="Email"
            disabled
          />
          <CustomButton
            variant="contained"
            size="large"
            type="button"
          >
            Edit
          </CustomButton>
        </Box>
      )}

      {currentTabIndex === 1 && (
        <Box>
          <Box>
            <CustomInputText label="Street" />
            <CustomInputText label="City" />
            <CustomInputText label="Postal Code" />
            <CustomInputText label="Country" />
            <CustomButton
              variant="contained"
              size="large"
              type="submit"
            >
              Edit
            </CustomButton>
            <CustomButton
              variant="contained"
              size="large"
              type="submit"
            >
              Delete
            </CustomButton>
          </Box>

          <Box>
            <CustomInputText label="Street" />
            <CustomInputText label="City" />
            <CustomInputText label="Postal Code" />
            <CustomInputText label="Country" />
            <CustomButton
              variant="contained"
              size="large"
              type="submit"
            >
              Edit
            </CustomButton>
            <CustomButton
              variant="contained"
              size="large"
              type="submit"
            >
              Delete
            </CustomButton>
          </Box>
        </Box>
      )}

      {currentTabIndex === 2 && (
        <Box>
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
          >
            Save
          </CustomButton>
          <CustomButton
            variant="contained"
            size="large"
            type="submit"
          >
            Cancel
          </CustomButton>
        </Box>
      )}
    </>
  );
};
