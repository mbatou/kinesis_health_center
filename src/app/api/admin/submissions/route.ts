import { NextResponse } from "next/server";
import { listSubmissions, setSubmissionStatus, isDbConfigured } from "@/lib/db";

const ALLOWED_STATUS = new Set(["nouveau", "traité", "archivé"]);

export async function GET() {
  const submissions = await listSubmissions();
  return NextResponse.json({
    ok: true,
    dbConfigured: isDbConfigured(),
    submissions,
  });
}

export async function PATCH(request: Request) {
  if (!isDbConfigured()) {
    return NextResponse.json(
      { ok: false, error: "Base de données non configurée (POSTGRES_URL)." },
      { status: 503 }
    );
  }

  let body: { id?: number; status?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Requête invalide." }, { status: 400 });
  }

  if (typeof body.id !== "number" || !body.status || !ALLOWED_STATUS.has(body.status)) {
    return NextResponse.json({ ok: false, error: "Paramètres invalides." }, { status: 400 });
  }

  try {
    await setSubmissionStatus(body.id, body.status);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[admin/submissions] update error:", err);
    return NextResponse.json({ ok: false, error: "Échec de la mise à jour." }, { status: 500 });
  }
}
