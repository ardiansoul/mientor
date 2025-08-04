import apiPath from "@/constants/api-path";
import { api } from "@/lib/apiConfig";
import { Response } from "@/types/api";
import { User } from "@/types/user";

export const logout = async (): Promise<Response> => {
  const result = await api({ path: apiPath.auth.logout });

  return result;
};

export const me = async (): Promise<Response<User>> => {
  const result = await api({ path: apiPath.user.me });

  return result;
};
