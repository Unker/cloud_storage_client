import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { IFile, IStorageFiles } from '../../utils/types';
import { RootState } from '../store';
import { ROUTE_API_STORAGE } from '../../utils/consts';

interface FileState {
  files: IFile[];
  currentPage: number;
  totalPages: number;
  limit: number;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: FileState = {
  files: [],
  currentPage: 1,
  totalPages: 1,
  limit: 10,
  status: 'idle',
  error: null,
};

const url = `${import.meta.env.VITE_SERVER_URL}/${ROUTE_API_STORAGE}`

export const fetchFiles = createAsyncThunk(
  'files/fetchFiles',
  async (page: number, { getState }) => {
    const state = getState() as RootState;
    const limit = state.files.limit;
    const offset = (page - 1) * limit;
    const response = await fetch(`${url}?limit=${limit}&offset=${offset}`, {
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch files');
    }

    const data: IStorageFiles = await response.json();
    return { results: data.results, count: data.count, currentPage: page };
  }
);

export const deleteFile = createAsyncThunk(
  'files/deleteFile',
  async (fileId: number) => {
    const response = await fetch(`${url}/${fileId}`, {
      method: 'DELETE',
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Failed to delete file');
    }

    return fileId;
  }
);

export const renameFile = createAsyncThunk(
  'files/renameFile',
  async ({ fileId, newName }: { fileId: number; newName: string }) => {
    const response = await fetch(`${url}/${fileId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ original_name: newName }),
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Failed to rename file');
    }

    return { fileId, newName };
  }
);

const fileSlice = createSlice({
  name: 'files',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFiles.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchFiles.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.files = action.payload.results;
        state.totalPages = Math.ceil(action.payload.count / state.limit);
        state.currentPage = action.payload.currentPage;
      })
      .addCase(fetchFiles.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch files';
      })
      .addCase(deleteFile.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(deleteFile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.files = state.files.filter((file) => file.id !== action.payload);
      })
      .addCase(deleteFile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to delete file';
      })
      .addCase(renameFile.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(renameFile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const fileIndex = state.files.findIndex((file) => file.id === action.payload.fileId);
        if (fileIndex !== -1) {
          state.files[fileIndex].original_name = action.payload.newName;
        }
      })
      .addCase(renameFile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to rename file';
      });
  },
});

export default fileSlice.reducer;
