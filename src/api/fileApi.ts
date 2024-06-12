import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IStorageFiles } from '../utils/types';
import { ROUTE_API_STORAGE } from '../utils/consts';
import { RootState } from '../store/store';

const baseApiUrl = import.meta.env.VITE_SERVER_URL;

export const fileApi = createApi({
  reducerPath: 'fileApi',
  baseQuery: fetchBaseQuery({
    baseUrl: baseApiUrl,
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState;
      const token = state.auth.token;
      if (token) {
        headers.set('Authorization', `Token ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    fetchFiles: builder.query<IStorageFiles, { limit: number; offset: number }>({
      query: ({ limit, offset }) => `${ROUTE_API_STORAGE}/?limit=${limit}&offset=${offset}`,
    }),
    deleteFile: builder.mutation<void, number>({
      query: (fileId) => ({
        url: `${ROUTE_API_STORAGE}/${fileId}/`,
        method: 'DELETE',
      }),
    }),
    changeFileComment: builder.mutation<void, { fileId: number; newComment: string }>({
      query: ({ fileId, newComment }) => ({
        url: `${ROUTE_API_STORAGE}/${fileId}/`,
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: { comment: newComment },
      }),
    }),
  }),
});

export const {
  useFetchFilesQuery, 
  useDeleteFileMutation,
  useChangeFileCommentMutation,
} = fileApi;
