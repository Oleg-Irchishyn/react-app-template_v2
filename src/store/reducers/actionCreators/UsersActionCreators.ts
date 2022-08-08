import { createAsyncThunk } from "@reduxjs/toolkit";
import { usersAPI } from "../../../api/usersApi";

interface fetchUserArgs {
  key: string;
  order: string;
}

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",

  async (args: fetchUserArgs, thunkAPI) => {
    let { key, order } = args;
    try {
      const response = await usersAPI.getAllUsers(key, order);
      return response;
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.message);
    }
  },
);
