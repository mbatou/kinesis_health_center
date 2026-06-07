// Central source of truth for the center's NAP (Name / Address / Phone) and
// contact details. Keep all site-facing copy here so it can be localized later
// without touching components.

export const site = {
  name: "Kinesis Réadaptation",
  tagline: "Un seul lieu. Toutes vos spécialités.",
  description:
    "Centre médical pluridisciplinaire à Dakar : cardiologie, médecine vasculaire, réadaptation, explorations fonctionnelles et consultations spécialisées. Un accompagnement personnalisé, dans le respect de la confidentialité et du confort.",

  // TODO domaine : recommandé kinesisreadaptation.com (aligné charte).
  // L'e-mail fourni par le client comportait une faute (kinesisreadaption) — corrigé ici.
  domain: "kinesisreadaptation.com",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://kinesisreadaptation.com",
  emailPublic: "contact@kinesisreadaptation.com", // TODO confirmer

  phones: ["+221 33 923 10 50", "+221 77 644 55 77"],

  // TODO : numéro WhatsApp réel du centre (annoncé pour lundi).
  // Format international sans "+" ni espaces, ex: 221770000000.
  // Overridable via NEXT_PUBLIC_WHATSAPP.
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP ?? "221000000000",
  whatsappMessage:
    "Bonjour Kinesis Réadaptation, je souhaite obtenir des informations.",

  address: {
    street: "Sacré Cœur Keur Gorgui, Villa AW N°18",
    city: "Dakar",
    country: "Sénégal",
    full: "Sacré Cœur Keur Gorgui, Villa AW N°18, Dakar, Sénégal",
  },

  // TODO : coordonnées GPS exactes du centre (carte + JSON-LD).
  geo: { lat: 14.7167, lng: -17.4677 },

  hours: "Lundi – Samedi : 8h00 – 17h00", // TODO confirmer jours/horaires
  // Machine-readable opening hours for JSON-LD (schema.org format).
  openingHours: "Mo-Sa 08:00-17:00",

  socials: {
    facebook: "#", // TODO lien réel
    instagram: "#", // TODO lien réel
  },

  openedSince: "Juin 2026",
} as const;

// Helper: build a wa.me deep link with a pre-filled French message.
export function whatsappLink(message: string = site.whatsappMessage): string {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}

// Helper: build a tel: link from a display phone number.
export function telLink(phone: string): string {
  return `tel:${phone.replace(/\s+/g, "")}`;
}
