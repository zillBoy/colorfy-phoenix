export const Sleep = (ms: number = 100) =>
  new Promise((resolve) => setTimeout(resolve, ms));
