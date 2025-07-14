'use client'
import { configureStore } from "@reduxjs/toolkit"

import userSlice from "../store/slices/user"

const store = configureStore({
  reducer: {
    user: userSlice,
  }
})

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;