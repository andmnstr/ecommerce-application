export interface IAddress {
  streetName: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface ICustomerDraft {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  addresses: IAddress[];
  shippingAddresses: number[];
  billingAddresses: number[];
  dateOfBirth: string;
  defaultShippingAddress?: number;
  defaultBillingAddress?: number;
}
