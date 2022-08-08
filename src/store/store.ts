import { combineReducers, configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import userReducer from "./reducers/UsersSlice";
import { reducer as formReducer } from "redux-form";
import { postsAPI } from "./../services/PostServices";

const rootReducer = combineReducers({
  userReducer,
  [postsAPI.reducerPath]: postsAPI.reducer,
  form: formReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(postsAPI.middleware),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
