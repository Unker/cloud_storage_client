// src/store.ts
import { configureStore } from '@reduxjs/toolkit';
import { usersApi, apiRegistration } from '../api/api';
import authReducer from './slices/authSlice';
import userReducer from './slices/userSlice';
import { fileApi } from '../api/fileApi';

export const store = configureStore({
  reducer: {
    [apiRegistration.reducerPath]: apiRegistration.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    auth: authReducer,
    user: userReducer,
    [fileApi.reducerPath]: fileApi.reducer,
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
