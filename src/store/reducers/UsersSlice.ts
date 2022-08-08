import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../models/interfaces/User.interface";
import { fetchUsers } from "./actionCreators/UsersActionCreators";

interface UsersState {
  users: Array<User> | null;
  isLoading: boolean;
  error: string;
}

const initialState: UsersState = {
  users: null,
  isLoading: false,
  error: "",
};

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchUsers.pending.type]: (state, action: PayloadAction<Array<User>>) => {
      state.isLoading = true;
    },
    [fetchUsers.fulfilled.type]: (state, action: PayloadAction<Array<User>>) => {
      state.isLoading = false;
      state.error = "";
      state.users = action.payload;
    },
    [fetchUsers.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
      state.users = null;
    },
  },
});

export default userSlice.reducer;
