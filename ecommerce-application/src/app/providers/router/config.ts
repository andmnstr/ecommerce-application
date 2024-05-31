import {
  AboutPage,
  AccessoriesCategoryPage,
  ContactsPage,
  FootwearCategoryPage,
  LoginPage,
  MainPage,
  MenCategoryPage,
  Page404,
  ShopPage,
  SignupPage,
  UserProfilePage,
  WomenCategoryPage,
} from '../../../pages';

export const pages = [
  { id: 1, page: MainPage, path: '/' },
  { id: 2, page: AboutPage, path: '/about' },
  { id: 3, page: ContactsPage, path: '/contacts' },
  { id: 4, page: LoginPage, path: '/login' },
  { id: 5, page: ShopPage, path: '/shop' },
  { id: 6, page: SignupPage, path: '/signup' },
  { id: 7, page: WomenCategoryPage, path: '/shop/women' },
  { id: 8, page: MenCategoryPage, path: '/shop/men' },
  { id: 9, page: FootwearCategoryPage, path: '/shop/footwear' },
  { id: 10, page: AccessoriesCategoryPage, path: '/shop/accessories' },
  { id: 11, page: UserProfilePage, path: '/user' },
  { id: 12, page: Page404, path: '*' },
];
