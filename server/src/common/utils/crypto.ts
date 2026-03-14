import crypto from "node:crypto";

export const randomString = (size: number = 32) => {
  return crypto.randomBytes(size).toString("hex");
};

export const hashString = (str: string) => {
  return crypto.createHash("sha256").update(str).digest("hex");
};
