import type { IValue } from './types';

export const isValue = (value: unknown): value is IValue => {
  return true;
};
