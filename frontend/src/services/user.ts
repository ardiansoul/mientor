import apiPath from "@/constants/api-path";
import { api } from "@/lib/apiConfig";
import { Response } from "@/types/api";
import { User } from "@/types/user";

export const getUsers = async (): Promise<Response<User[]>> => {
  const result: Response<User[]> = await api({ path: apiPath.user.list });

  return result;
};

export const update = async (
  id: string,
  data: Record<string, any>
): Promise<Response<null>> => {
  const result = await api({ path: apiPath.user.update(id), data });

  return result;
};

export const add = async (
  data: Record<string, any>
): Promise<Response<null>> => {
  const result = await api({ path: apiPath.user.add, data });

  return result;
};
