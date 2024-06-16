// src/services/api.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store/store';
import { IRegisterFormData, IRegistrationResponse, IStorageFiles, IUserPost, IUsers } from '../utils/types';
import { ROUTE_API_REGISTER, ROUTE_API_USERS, ROUTE_API_FILES_BY_USER } from '../utils/consts';

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

export const usersApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_SERVER_URL,
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
      const { token } = (getState() as RootState).auth;

      if (token) {
        headers.set('Authorization', `Token ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getUsers: builder.query<IUsers, { 
      limit: number; 
      offset: number;
    }>({
      query: ({ limit, offset }) => `${ROUTE_API_USERS}/?limit=${limit}&offset=${offset}`,
    }),
    fetchUserFiles: builder.query<IStorageFiles, { 
      limit: number; 
      offset: number;
      userId: number;
    }>({
      query: ({ limit, offset, userId }) => {
        return `${ROUTE_API_FILES_BY_USER}/?limit=${limit}&offset=${offset}&user_id=${userId}`
      }
    }),
    updateUser: builder.mutation<void, IUserPost>({
      query: (args) => ({
        url: `${ROUTE_API_USERS}/${args.userId}/`,
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: args,
      }),
    }),
    deleteUser: builder.mutation<void, number>({
      query: (userId) => ({
        url: `${ROUTE_API_USERS}/${userId}/`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const { useRegisterUserMutation } = apiRegistration;
export const {
  useGetUsersQuery,
  useFetchUserFilesQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = usersApi;
