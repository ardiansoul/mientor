"use client";
import { ApiObjectPath } from "@/constants/api-path";
import axios from "axios";
import { Response } from "@/types/api";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_GATEWAY || "http://localhost:3000/api",
  timeout: 10000, // 10 seconds timeout
  withCredentials: true, // Include cookies in requests
});

apiClient.interceptors.request.use(
  (config) => {
    const access_token = localStorage.getItem("access_token");
    if (access_token) {
      config.headers["Authorization"] = `Bearer ${access_token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const api = async ({
  path,
  data,
  params,
}: {
  path: ApiObjectPath;
  data?: Record<string, any>;
  params?: Record<string, any>;
}) => {
  try {
    const result = await apiClient({
      method: path.method,
      url: path.url,
      data: data,
      params: params,
    });

    return result.data;
  } catch (error) {
    console.error("API Error:", error);
    throw error; // Re-throw the error for further handling
  }
};
