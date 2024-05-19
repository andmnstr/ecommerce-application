import type { TokenStore } from '@commercetools/sdk-client-v2';

export const isTokenStore = (value: unknown): value is TokenStore => {
  return true;
};
