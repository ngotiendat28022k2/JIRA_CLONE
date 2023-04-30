import { AxiosPromise } from "axios";
import { IUser } from "../interfaces/users";
import instance from "./instance";

const UserAPI = {
  getUsers: async (): Promise<IUser[]> => {
    return await instance.get("user");
  },

  getUser: async (id: string): Promise<IUser> => {
    return await instance.get(`user/${id}`);
  },

  updateUser: async (data: IUser): Promise<IUser> => {
    return await instance.put(`user/${data.id}`, data);
  },

  removeUser: async (id: string): Promise<IUser[]> => {
    return await instance.delete(`user/${id}`);
  },
  signup: async (data: IUser): Promise<IUser> => {
    return await instance.post("signup", data);
  },
  signin: async (data: IUser): Promise<any> => {
    const device = JSON.parse(localStorage.getItem("device") || "");
    return await instance.post("signin", data, { headers: { device } });
  },
};

export default UserAPI;
