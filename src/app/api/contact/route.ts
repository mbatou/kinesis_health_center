import { NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";
import { site } from "@/content/site";

// Validation schema for the contact form payload.
const ContactSchema = z.object({
  nom: z.string().min(2, "Le nom est requis.").max(120),
  telephone: z.string().min(5, "Le téléphone est requis.").max(40),
  email: z.string().email("E-mail invalide.").max(160).optional().or(z.literal("")),
  specialite: z.string().max(120).optional().or(z.literal("")),
  message: z.string().min(5, "Le message est requis.").max(4000),
  // Honeypot — must stay empty.
  company: z.string().optional(),
});

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Requête invalide." },
      { status: 400 }
    );
  }

  const parsed = ContactSchema.safeParse(body);
  if (!parsed.success) {
    const first = parsed.error.issues[0]?.message ?? "Données invalides.";
    return NextResponse.json({ ok: false, error: first }, { status: 400 });
  }

  const data = parsed.data;

  // Honeypot triggered → pretend success, drop silently.
  if (data.company && data.company.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;

  // Without mail config we don't fail the user; log and accept.
  // (Configure RESEND_API_KEY / CONTACT_TO_EMAIL / CONTACT_FROM_EMAIL in prod.)
  if (!apiKey || !to || !from) {
    console.warn(
      "[contact] Resend not configured — message received but not emailed:",
      { nom: data.nom, telephone: data.telephone }
    );
    return NextResponse.json({ ok: true });
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: data.email || undefined,
      subject: `Nouveau message — ${data.nom} (${site.name})`,
      text: [
        `Nom : ${data.nom}`,
        `Téléphone : ${data.telephone}`,
        `E-mail : ${data.email || "—"}`,
        `Spécialité concernée : ${data.specialite || "—"}`,
        "",
        "Message :",
        data.message,
      ].join("\n"),
    });

    if (error) {
      console.error("[contact] Resend error:", error);
      return NextResponse.json(
        { ok: false, error: "L'envoi a échoué. Réessayez plus tard." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] Unexpected error:", err);
    return NextResponse.json(
      { ok: false, error: "Une erreur est survenue. Réessayez plus tard." },
      { status: 500 }
    );
  }
}
