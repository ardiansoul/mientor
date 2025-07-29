const query = {
  users: (page: number) => ["users-", page] as const,
  updateUser: (id: string) => ["update-user", id] as const,
  addUser: ["add-user"] as const,
  me: ["me"] as const,
  tools: ["tools"] as const,
  tool: (id: string) => ["tool", id] as const,
};

export default query;
