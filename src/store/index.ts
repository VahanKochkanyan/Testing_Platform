import { configureStore } from "@reduxjs/toolkit"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"

import auth from "./features/authSlice"
import tests from "./features/testsSlice"
import { testsApi } from "./api/tests.api"

export const store = configureStore({
  reducer: {
    auth,
    tests,
    [testsApi.reducerPath]: testsApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(testsApi.middleware),
})

type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>


export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
