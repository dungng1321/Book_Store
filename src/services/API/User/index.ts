import axiosInstance from "../../axios-customize";
import { IUser } from "../../../store/authSlice";

export const callLoginUser = (user: IUser) => {
  return axiosInstance.post("/auth/login", user);
};

export const callRegisterUser = (user: IUser) => {
  return axiosInstance.post("/user/register", user);
};

export const callFetchUser = () => {
  return axiosInstance.get("/auth/account");
};
