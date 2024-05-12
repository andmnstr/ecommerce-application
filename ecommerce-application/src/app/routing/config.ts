import { AboutPage, ContactsPage, LoginPage, MainPage, Page404, ShopPage, SignupPage } from '../../pages';

export const pages = [
  { id: 1, page: MainPage, path: '/' },
  { id: 2, page: AboutPage, path: '/about' },
  { id: 3, page: ContactsPage, path: '/contacts' },
  { id: 4, page: LoginPage, path: '/login' },
  { id: 5, page: Page404, path: '*' },
  { id: 6, page: ShopPage, path: '/shop' },
  { id: 7, page: SignupPage, path: '/signup' },
];
