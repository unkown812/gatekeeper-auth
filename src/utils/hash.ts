import bcrypt from "bcrypt";

export const hashPassword = async (password: string, salt: number) => {
  return bcrypt.hash(password, salt);
};

export const comparePassword = async (password: string, hash: string) => {
  return bcrypt.compare(password, hash);
};
