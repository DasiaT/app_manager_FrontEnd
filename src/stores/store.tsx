import { configureStore } from '@reduxjs/toolkit';
import { workstationAPI } from './users/workstationAPI';
import { loginAPI } from './login/login';


export const store = configureStore({
  reducer: {
    [workstationAPI.reducerPath] : workstationAPI.reducer,
    [loginAPI.reducerPath] : loginAPI.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
    .concat(workstationAPI.middleware)
    .concat(loginAPI.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
