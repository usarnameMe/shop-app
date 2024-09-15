import { configureStore } from '@reduxjs/toolkit';
import basketReducer from './reducers/basketReducer';
import authReducer from './reducers/authReducer';

const store = configureStore({
  reducer: {
    basket: basketReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
