export const apiUrl = (): string => {
  return process.env.VERCEL_ENV === "development"
    ? `http://localhost:${process.env.PORT}`
    : process.env.VERCEL_URL!;
};
