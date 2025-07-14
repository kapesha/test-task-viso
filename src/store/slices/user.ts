import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type UserState = {
  username: string;
  token: string;
  loggedIn: boolean;
  authLoaded: boolean; 
}

const initialState: UserState = {
  username: '',
  token: '',
  loggedIn: false,
  authLoaded: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login(state, action: PayloadAction<{ username: string; token: string; loggedIn: boolean }>) {
      state.username = action.payload.username;
      state.token = action.payload.token;
      state.loggedIn = action.payload.loggedIn;
      state.authLoaded = true;
    },
    logout(state) {
      state.username = '';
      state.token = '';
      state.loggedIn = false;
      state.authLoaded = true;
    },
    setAuthLoaded(state) {
      state.authLoaded = true;
    },
  },
});

export const { login, logout, setAuthLoaded } = userSlice.actions;
export default userSlice.reducer;
