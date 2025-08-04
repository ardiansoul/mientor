export interface ApiObjectPath {
  method: string;
  url: string;
  baseURL?: string; // Optional baseURL for specific paths
}

const apiPath: {
  [x: string]: Record<
    string,
    ApiObjectPath | ((...args: string[]) => ApiObjectPath)
  >;
} = {
  user: {
    list: {
      method: "GET" as const,
      url: "/users",
    },
    update: (id: string) => ({
      method: "PATCH" as const,
      url: `/users/${id}`,
    }),
    add: {
      method: "POST" as const,
      url: "/users",
    },
    delete: (id: string) => ({
      method: "DELETE" as const,
      url: `/users/${id}`,
    }),
    me: {
      method: "GET" as const,
      url: "/users/me",
    },
  },

  course: {
    list: {
      baseURL:
        process.env.NEXT_PUBLIC_COURSE_SERVICE_URL ||
        "http://localhost:4001/api",
      method: "GET" as const,
      url: "/courses",
    },
    update: (id: string) => ({
      baseURL:
        process.env.NEXT_PUBLIC_COURSE_SERVICE_URL ||
        "http://localhost:4001/api",
      method: "PATCH" as const,
      url: `/courses/${id}`,
    }),
    add: {
      baseURL:
        process.env.NEXT_PUBLIC_COURSE_SERVICE_URL ||
        "http://localhost:4001/api",
      method: "POST" as const,
      url: "/courses",
    },
    delete: (id: string) => ({
      baseURL:
        process.env.NEXT_PUBLIC_COURSE_SERVICE_URL ||
        "http://localhost:4001/api",
      method: "DELETE" as const,
      url: `/courses/${id}`,
    }),
  },
  auth: {
    logout: {
      method: "POST" as const,
      url: "/auth/logout",
    },
  },
};

export default apiPath;
