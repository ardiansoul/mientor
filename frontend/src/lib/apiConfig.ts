"use client";
import { ApiObjectPath } from "@/constants/api-path";
import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_GATEWAY || "http://localhost:3000/api",
  timeout: 10000, // 10 seconds timeout
  withCredentials: true, // Include cookies in requests
});

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });
  failedQueue = [];
};

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

apiClient.interceptors.response.use(
  (res) => res,
  async (value) => {
    console.log(value, "value");
    const originalRequest = value.config;

    if (value.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          originalRequest.headers["Authorization"] = `Bearer ${token}`;
          return api(originalRequest);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;
      const access_token = localStorage.getItem("access_token");

      try {
        const { data } = await axios.post(
          `${process.env.NEXT_PUBLIC_API_GATEWAY}/auth/refresh_token`,
          {},
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          }
        );

        apiClient.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${data.data.accessToken}`;
        processQueue(null, data.data.accessToken);
        originalRequest.headers["Authorization"] = `Bearer ${data.data.token}`;
        localStorage.setItem("access_token", data.data.accessToken);
        return apiClient(originalRequest);
      } catch (error) {
        processQueue(error, null);
        return Promise.reject(error);
      } finally {
        isRefreshing = false;
      }
    }
    return Promise.reject(value);
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
      baseURL: path.baseURL,
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
