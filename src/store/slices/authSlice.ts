// src/store/slices/authSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ROUTE_API_GET_TOKEN, ROUTE_API_LOGIN } from '../../utils/consts';
import { getCSRFToken, getSessionid } from '../../utils/csrf';

interface AuthState {
  token: string | null | undefined;
  csrfToken: string | null | undefined;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: AuthState = {
  token: null,
  csrfToken: null,
  status: 'idle',
  error: null,
};

const baseApiUrl = import.meta.env.VITE_SERVER_URL

export const fetchCsrfToken = createAsyncThunk<string | null, void>(
  'auth/fetchCsrfToken', 
  async () => {
    await fetch(ROUTE_API_LOGIN, {
      method: 'GET',
      credentials: 'include',
    });
    const csrfToken = getCSRFToken();

    return csrfToken;
});

export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ username, password }: { username: string; password: string }) => {

    const csrfToken = getCSRFToken();

    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    formData.append('csrfmiddlewaretoken', csrfToken || '');

    const response = await fetch(`${baseApiUrl}/${ROUTE_API_LOGIN}`, {
      method: 'POST',
      body: formData,
      credentials: 'include',
    });

    const data = await response.json();

    const csrfTokenNew = getCSRFToken();
    const sessionId = getSessionid();

    return { token: data.token, csrfToken: csrfTokenNew, sessionId };
  }
);

export const getToken = createAsyncThunk(
  'auth/token',
  async ({ username, password }: { username: string; password: string }) => {
    const csrfToken = getCSRFToken();

    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    formData.append('csrfmiddlewaretoken', csrfToken || '');

    const response = await fetch(ROUTE_API_GET_TOKEN, {
      method: 'POST',
      body: formData,
      credentials: 'include',
    });

    const data = await response.json();

    // Extract and return tokens
    const csrfTokenNew = getCSRFToken();
    const sessionId = getSessionid();

    return { token: data.token, csrfToken: csrfTokenNew, sessionId };
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.token = null;
      state.csrfToken = null;
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCsrfToken.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchCsrfToken.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.csrfToken = action.payload;
      })
      .addCase(fetchCsrfToken.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch CSRF token';
      })
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.token = action.payload.token;
        state.csrfToken = action.payload.csrfToken;
        localStorage.setItem('token', action.payload.token);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Login failed';
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
