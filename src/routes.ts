import MainPage from './pages/MainPage.tsx';
import AdminPage from './pages/AdminPage.tsx';
import StoragePage from './pages/StoragePage.tsx';
import FilePage from './pages/FilePage.tsx';
import Register from './components/Auth/Register.tsx';
import Login from './components/Auth/Login.tsx';
import { ROUTE_ADMIN, ROUTE_LOGIN, ROUTE_MAIN_PAGE, ROUTE_REGISTER, ROUTE_STORAGE } from './utils/consts';

export interface IPublicRoute {
  path: string;
  component: React.FC;
}

export const publicRoutes: IPublicRoute[] = [
  {
    path: ROUTE_MAIN_PAGE,
    component: MainPage,
  },

  {
    path: ROUTE_LOGIN,
    component: Login,
  },
  {
    path: ROUTE_REGISTER,
    component: Register,
  },
];

export const authRoutes: IPublicRoute[] = [
  {
    path: ROUTE_STORAGE,
    component: StoragePage,
  },
  {
    path: `${ROUTE_STORAGE}/:id`,
    component: FilePage,
  },

];

export const adminRoutes: IPublicRoute[] = [
  {
    path: ROUTE_ADMIN,
    component: AdminPage,
  },

];
