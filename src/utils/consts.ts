export const ROUTE_MAIN_PAGE: string = '/';
export const ROUTE_ADMIN: string = '/admin';
export const ROUTE_STORAGE: string = '/storage';
export const ROUTE_LOGIN: string = '/login';
export const ROUTE_REGISTER: string = '/register';

export const ROUTE_API_LOGIN: string = `accounts/login/`;
export const ROUTE_API_LOGOUT: string = `accounts/logout/`;
export const ROUTE_API_REGISTER: string = `accounts/register/`;
export const ROUTE_API_GET_CSRFTOKEN: string = `api/csrf/`;
export const ROUTE_API_GET_TOKEN: string = 'api-token-auth/';

export const ROUTE_API_USERS: string = `users`;
export const ROUTE_API_STORAGE: string = `storagefiles`;
export const ROUTE_API_FILES_BY_USER: string = `storagefiles/by_user`;

export const getRouteApiDownloadByShortLink = (shortLink: string | number): string => {
  return `storagefiles/download/${shortLink}/`; 
}
export const getRouteApiDownloadById = (fileId: string | number): string => {
  return `storagefiles/${fileId}/download/`; 
}
export const getRouteApiGenerateShortLink = (fileId: string | number): string => {
  return `storagefiles/${fileId}/generate_short_link/`;
}
export const getRouteApiDeleteShortLink = (fileId: string | number): string => {
  return `storagefiles/${fileId}/delete_short_link/`;
}
