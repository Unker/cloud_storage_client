// src/services/api.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store/store';
import { IUser } from '../utils/types';
import { ROUTE_API_REGISTER, ROUTE_API_USERS } from '../utils/consts';

interface RegistrationResponse {
  status: string;
  errors?: string;
}

export const apiRegistration = createApi({
  reducerPath: 'apiRegistration',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_SERVER_URL,
    // credentials: 'include'
  }),
  endpoints: (builder) => ({
    registerUser: builder.mutation<RegistrationResponse, {
      username: string;
      first_name: string;
      last_name: string;
      email: string;
      password1: string;
      password2: string;
    }>({
      query: (user) => ({
        url: ROUTE_API_REGISTER,
        method: 'POST',
        body: user,
      }),
    }),
  }),
});

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_SERVER_URL,
    prepareHeaders: (headers, { getState }) => {
      const { token } = (getState() as RootState).auth;

      if (token) {
        headers.set('Authorization', `Token ${token}`);
      }

      return headers;
    },
    credentials: 'include',
  }),
  endpoints: (builder) => ({
    getUsers: builder.query<IUser[], void>({
      query: () => ROUTE_API_USERS,
    }),
    // login: builder.mutation<
    // { 
    //   token: string 
    // }, 
    // {
    //   username: string;
    //   password: string;
    //   csrfmiddlewaretoken: string
    // }>({
    //   query: (credentials) => ({
    //     url: ROUTE_API_LOGIN,
    //     method: 'POST',
    //     body: credentials,
    //   }),
    // }),
  }),
});

export const { useRegisterUserMutation } = apiRegistration;
export const { useGetUsersQuery } = api;
