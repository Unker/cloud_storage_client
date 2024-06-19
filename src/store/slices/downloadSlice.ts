import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { getRouteApiDownloadById } from '../../utils/consts';

interface FileState {
  file: Blob | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: FileState = {
  file: null,
  status: 'idle',
  error: null,
};

const baseUrl = import.meta.env.VITE_SERVER_URL;

const getToken = () => {
  const token = localStorage.getItem('token');
  if (token) {
    return `Token ${token}`;
  }
  return null;
};

export const downloadFileById = createAsyncThunk(
  'file/downloadFile',
  async (fileId: number, thunkAPI) => {
    const token = getToken();
    if (!token) {
      throw new Error('No token available');
    }

    try {
      const response = await axios({
        url: `${baseUrl}/${getRouteApiDownloadById(fileId)}`,
        method: 'GET',
        responseType: 'blob',
        headers: {
          Authorization: token,
        },
      });

      const fileBlob = new Blob([response.data], { type: response.headers['content-type'] });

      return fileBlob;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || 'Failed to download file');
    }
  }
);

const fileSlice = createSlice({
  name: 'file',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(downloadFileById.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(downloadFileById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.file = action.payload;
      })
      .addCase(downloadFileById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export default fileSlice.reducer;
