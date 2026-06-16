import { NextResponse } from "next/server";
import {
  SESSION_COOKIE,
  checkCredentials,
  createSessionToken,
  isAuthConfigured,
} from "@/lib/auth";

export async function POST(request: Request) {
  if (!isAuthConfigured()) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "Authentification non configurée (ADMIN_PASSWORD / AUTH_SECRET manquants).",
      },
      { status: 503 }
    );
  }

  let body: { username?: string; password?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Requête invalide." }, { status: 400 });
  }

  const { username = "", password = "" } = body;
  if (!checkCredentials(username, password)) {
    return NextResponse.json(
      { ok: false, error: "Identifiants incorrects." },
      { status: 401 }
    );
  }

  const token = await createSessionToken();
  if (!token) {
    return NextResponse.json({ ok: false, error: "Erreur de session." }, { status: 500 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return res;
}
