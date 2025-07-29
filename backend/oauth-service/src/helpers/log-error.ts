export const logError = (error: unknown, context?: string) => {
  const timestamp = new Date().toISOString();
  if (error instanceof Error) {
    console.error(`[${timestamp}] [${context}] ${error.stack}`);
  } else {
    console.error(`[${timestamp}] [${context}]`, error);
  }
};
