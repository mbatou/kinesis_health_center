import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getTeamContent, defaultTeam } from "@/lib/editable";
import { setTeamOverride, isDbConfigured, type TeamMember } from "@/lib/db";
import { isBlobConfigured } from "@/lib/blob";

export async function GET() {
  const team = await getTeamContent();
  return NextResponse.json({
    ok: true,
    dbConfigured: isDbConfigured(),
    blobConfigured: isBlobConfigured(),
    team,
    defaults: defaultTeam,
  });
}

function clean(value: unknown, max = 300): string | undefined {
  if (typeof value !== "string") return undefined;
  const t = value.trim().slice(0, max);
  return t.length ? t : undefined;
}

export async function POST(request: Request) {
  if (!isDbConfigured()) {
    return NextResponse.json(
      { ok: false, error: "Base de données non configurée (POSTGRES_URL)." },
      { status: 503 }
    );
  }

  let body: { team?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Requête invalide." }, { status: 400 });
  }

  if (!Array.isArray(body.team)) {
    return NextResponse.json({ ok: false, error: "Format invalide." }, { status: 400 });
  }
  if (body.team.length > 100) {
    return NextResponse.json({ ok: false, error: "Trop de membres." }, { status: 400 });
  }

  const members: TeamMember[] = [];
  for (const raw of body.team) {
    if (typeof raw !== "object" || raw === null) continue;
    const r = raw as Record<string, unknown>;
    const name = clean(r.name, 160);
    const role = clean(r.role, 160);
    if (!name || !role) {
      return NextResponse.json(
        { ok: false, error: "Chaque membre doit avoir un nom et une fonction." },
        { status: 400 }
      );
    }
    members.push({
      name,
      role,
      specialty: clean(r.specialty, 160),
      bio: clean(r.bio, 2000),
      photo: clean(r.photo, 2000),
    });
  }

  try {
    await setTeamOverride(members);
    revalidatePath("/equipe");
    return NextResponse.json({ ok: true, count: members.length });
  } catch (err) {
    console.error("[admin/team] save error:", err);
    const detail = err instanceof Error ? err.message : String(err);
    return NextResponse.json(
      { ok: false, error: `Échec de l'enregistrement : ${detail}` },
      { status: 500 }
    );
  }
}
