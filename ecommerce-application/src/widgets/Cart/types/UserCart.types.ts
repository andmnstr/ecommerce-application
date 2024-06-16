export interface ICartItemsData {
  id: string;
  sku: string;
  image: string;
  name: string;
  size: string;
  price: string;
  quantity: number;
  totalItemPrice: string;
}

export enum PromoCodeMessages {
  Success = 'Applied!',
  WrongCode = 'There is no such a promocode',
  NoMatch = 'You should have 5 or more items in your cart to use it',
  Used = 'This promocode is already applied',
}
