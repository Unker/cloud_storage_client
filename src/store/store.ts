// src/store.ts
import { configureStore } from '@reduxjs/toolkit';
import { usersApi, apiRegistration } from '../api/api';
import authReducer from './slices/authSlice';
import userReducer from './slices/userSlice';
import fileReducer from './slices/downloadSlice';
import { fileApi } from '../api/fileApi';

export const store = configureStore({
  reducer: {
    [apiRegistration.reducerPath]: apiRegistration.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [fileApi.reducerPath]: fileApi.reducer,
    auth: authReducer,
    user: userReducer,
    file: fileReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      fileApi.middleware,
      apiRegistration.middleware,
      usersApi.middleware,
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
