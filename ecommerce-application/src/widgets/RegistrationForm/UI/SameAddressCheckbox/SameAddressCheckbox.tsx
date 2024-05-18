import type React from 'react';

import FormCheckbox from '../../../../shared/UI/FormCheckbox/FormCheckbox';

export const SameAddressCheckbox: React.FC = () => {
  return (
    <FormCheckbox
      label="My shipping and billing addresses are the same"
      sx={{ alignSelf: 'center' }}
    />
  );
};
