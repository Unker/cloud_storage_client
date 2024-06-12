// src/services/api.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store/store';
import { IRegisterFormData, IRegistrationResponse, IUser } from '../utils/types';
import { ROUTE_API_REGISTER, ROUTE_API_USERS } from '../utils/consts';

export const apiRegistration = createApi({
  reducerPath: 'apiRegistration',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_SERVER_URL,
    credentials: 'include'
  }),
  endpoints: (builder) => ({
    registerUser: builder.mutation<IRegistrationResponse, IRegisterFormData>({
      query: (formData) => {
        const formDataToSend = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
          formDataToSend.append(key, value);
        });
        return {
          url: ROUTE_API_REGISTER,
          method: 'POST',
          body: formDataToSend,
        };
      },
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
