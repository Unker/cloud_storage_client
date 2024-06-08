// src/services/api.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store/store';
import { IUser } from '../utils/types';
import { ROUTE_API_LOGIN, ROUTE_API_USERS } from '../utils/consts';

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
    credentials: 'include', // Include credentials (cookies)
  }),
  endpoints: (builder) => ({
    getUsers: builder.query<IUser[], void>({
      query: () => ROUTE_API_USERS,
    }),
    login: builder.mutation<
    { 
      token: string 
    }, 
    {
      username: string;
      password: string;
      csrfmiddlewaretoken: string
    }>({
      query: (credentials) => ({
        url: ROUTE_API_LOGIN,
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
});

export const { useGetUsersQuery, useLoginMutation } = api;
