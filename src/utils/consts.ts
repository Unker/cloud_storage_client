export const ROUTE_MAIN_PAGE: string = '/';
export const ROUTE_ADMIN: string = '/admin';
export const ROUTE_STORAGE: string = '/storage';
export const ROUTE_LOGIN: string = '/login';
export const ROUTE_REGISTER: string = '/register';

const server_url = import.meta.env.VITE_SERVER_URL;
export const ROUTE_API_USERS: string = `${server_url}/users/`;
export const ROUTE_API_LOGIN: string = `${server_url}/accounts/login`;
export const ROUTE_API_LOGOUT: string = `${server_url}/accounts/logout`;
export const ROUTE_API_REGISTER: string = `${server_url}/accounts/register`;
