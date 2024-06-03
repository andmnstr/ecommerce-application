export interface IProductCard {
  id: string;
  key: string;
  image: string;
  name: string;
  description: string;
  price: string;
  oldPrice: string;
  product: string;
  category: string;
  productLink: string;
}

export interface IProductCardData {
  categoryName: string;
  subcategoryName: string;
  productName: string;
  id: string;
}
