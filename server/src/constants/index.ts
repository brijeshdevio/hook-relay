export const PRISMA_ERROR_CODES = {
  CONFLICT: "P2002",
  NOT_FOUND: "P2025",
};

export const DUMMY_HASH =
  "$argon2id$v=19$m=65536,t=3,p=4$/y1jJS2H1+mZ1Sg77uvgAg$AYsdfipeVFRQxT2zXSCaw6581/ZdUV1I1MOjlng0fCM";

export const COOKIE_NAME = {
  ACCESS_TOKEN: "access_token",
  REFRESH_TOKEN: "refresh_token",
};

export const COOKIE_EXPIRES = {
  ACCESS_TOKEN: 30 * 60,
  REFRESH_TOKEN: 7 * 24 * 60 * 60,
};

export const DAY = new Date(Date.now() + 24 * 60 * 60 * 1000);
export const WEEK = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
