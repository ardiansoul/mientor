export interface ApiObjectPath {
  method: string;
  url: string;
}

const apiPath = {
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
  },
  auth: {
    logout: {
      method: "POST" as const,
      url: "/auth/logout",
    },
    me: {
      method: "GET" as const,
      url: "/me",
    },
  },
};

export default apiPath;
