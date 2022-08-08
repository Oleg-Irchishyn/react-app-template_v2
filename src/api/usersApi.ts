import axios from "axios";
import { User } from "../models/interfaces/User.interface";

const instance = axios.create({
  withCredentials: true,
  headers: {},
  baseURL: "/",
});

export const usersAPI = {
  getAllUsers: (key: string, order: string = "desc") => {
    return instance.get<Array<User>>(`users?_sort=${key}&order=${order}`).then((response) => {
      return response.data;
    });
  },
};
