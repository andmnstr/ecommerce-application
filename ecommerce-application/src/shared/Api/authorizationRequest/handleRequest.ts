import type { ClientResponse, CustomerSignInResult } from '@commercetools/platform-sdk';

import { createClientWithAccessToken } from './createClientWithAccessToken';

export const handleRequest = async (
  customer: Promise<ClientResponse<CustomerSignInResult>>,
  email: string,
  password: string
): Promise<unknown> => {
  try {
    await customer;
    return createClientWithAccessToken(email, password);
  } catch (error) {
    if (error instanceof Error && 'status' in error) {
      return error.status;
    }
    return 0;
  }
};
