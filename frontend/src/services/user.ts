import apiPath from "@/constants/api-path";
import { api } from "@/lib/apiConfig";
import { Response } from "@/types/api";
import { User } from "@/types/user";

export const getUsers = async (): Promise<Response<User[]>> => {
  const result: Response<User[]> = await api({ path: apiPath.user.list });

  return result;
};

export const updateUser = async (
  id: string,
  data: Record<string, any>
): Promise<Response<null>> => {
  const result = await api({ path: apiPath.user.update(id), data });

  return result;
};

export const createUser = async (
  data: Record<string, any>
): Promise<Response<null>> => {
  const result = await api({ path: apiPath.user.add, data });

  return result;
};

export const deleteUser = async (id: string): Promise<Response<null>> => {
  const result = await api({ path: apiPath.user.delete(id) });

  return result;
};
