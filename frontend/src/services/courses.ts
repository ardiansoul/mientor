import apiPath from "@/constants/api-path";
import { api } from "@/lib/apiConfig";
import { Response } from "@/types/api";
import { Course } from "@/types/course";

export const getCourses = async (): Promise<Response<Course[]>> => {
  const result = await api({ path: apiPath.course.list });
  return result;
};

export const updateCourse = async (
  id: string,
  data: Record<string, any>
): Promise<Response<null>> => {
  const result = await api({ path: apiPath.course.update(id), data });
  return result;
};

export const createCourse = async (
  data: Record<string, any>
): Promise<Response<null>> => {
  const result = await api({ path: apiPath.course.add, data });
  return result;
};

export const deleteCourse = async (id: string): Promise<Response<null>> => {
  const result = await api({ path: apiPath.course.delete(id) });
  return result;
};
