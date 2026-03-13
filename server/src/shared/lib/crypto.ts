import { randomBytes, createHash } from "node:crypto";
import argon from "argon2";
import jwt from "jsonwebtoken";
import { env } from "../../config";

export async function hashPassword(password: string): Promise<string> {
  return await argon.hash(password);
}

export async function comparePassword(
  hashedPassword: string,
  password: string,
): Promise<boolean> {
  return await argon.verify(hashedPassword, password);
}

export function randomString(size: number = 64): string {
  return randomBytes(size).toString("hex");
}

export function stringHash(str: string): string {
  return createHash("sha256").update(str).digest("hex");
}

export async function signJwt(
  payload: Record<string, unknown>,
): Promise<string> {
  return await jwt.sign(payload, env.JWT_SECRET);
}
