import { createSelector } from "reselect";
import { RootState } from "../store";

const getRootState = (state: RootState) => state;

export const getUsers = createSelector(getRootState, (data) => data.userReducer.users);
