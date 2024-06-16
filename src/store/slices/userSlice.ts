// src/store/slices/userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  selectedUserId: number | null;
}

const initialState: UserState = {
  selectedUserId: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    selectUser(state, action: PayloadAction<number | null>) {
      state.selectedUserId = action.payload;
    },
    clearSelectedUser(state) {
      state.selectedUserId = null;
    },
  },
});

export const { selectUser, clearSelectedUser } = userSlice.actions;
export default userSlice.reducer;
