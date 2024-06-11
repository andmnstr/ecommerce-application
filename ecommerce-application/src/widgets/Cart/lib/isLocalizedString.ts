import type { LocalizedString } from '@commercetools/platform-sdk';

export const isLocalizedString = (value: unknown): value is LocalizedString => {
  return true;
};
