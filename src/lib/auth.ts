import { cookies } from "next/headers";
import { SignJWT, jwtVerify, type JWTPayload } from "jose";

// Single-user admin auth. Username + password come from env (set in Vercel):
//   ADMIN_USERNAME (default "drdiack"), ADMIN_PASSWORD, AUTH_SECRET.
// Session is a signed JWT stored in an httpOnly cookie.

export const SESSION_COOKIE = "kinesis_session";
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "drdiack";

function getSecretKey(): Uint8Array | null {
  const secret = process.env.AUTH_SECRET;
  if (!secret) return null;
  return new TextEncoder().encode(secret);
}

// True only when both the password and signing secret are configured.
export function isAuthConfigured(): boolean {
  return Boolean(process.env.ADMIN_PASSWORD && process.env.AUTH_SECRET);
}

export function checkCredentials(username: string, password: string): boolean {
  if (!isAuthConfigured()) return false;
  return username === ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD;
}

export async function createSessionToken(): Promise<string | null> {
  const key = getSecretKey();
  if (!key) return null;
  return new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(ADMIN_USERNAME)
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(key);
}

export async function verifySessionToken(
  token: string | undefined
): Promise<JWTPayload | null> {
  const key = getSecretKey();
  if (!key || !token) return null;
  try {
    const { payload } = await jwtVerify(token, key);
    return payload;
  } catch {
    return null;
  }
}

// Server-side helper to read the current session (in Server Components / routes).
export async function getSession(): Promise<JWTPayload | null> {
  const token = cookies().get(SESSION_COOKIE)?.value;
  return verifySessionToken(token);
}
