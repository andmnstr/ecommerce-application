import type React from 'react';

import FormCheckbox from '../../../../shared/UI/FormCheckbox/FormCheckbox';

type SameAddressCheckboxType = { changeHandle: () => void };

export const SameAddressCheckbox: React.FC<SameAddressCheckboxType> = ({ changeHandle }) => {
  return (
    <FormCheckbox
      label="My shipping and billing addresses are the same"
      sx={{ alignSelf: 'center' }}
      onChange={() => {
        changeHandle();
      }}
    />
  );
};
