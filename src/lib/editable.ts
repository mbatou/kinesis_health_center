import { cache } from "react";
import { site as siteDefaults } from "@/content/site";
import { poles as polesDefaults } from "@/content/specialites";
import { centre as centreDefaults } from "@/content/centre";
import { director as directorDefaults } from "@/content/director";
import { images as imageDefaults } from "@/content/images";
import { team as teamDefaults } from "@/content/equipe";
import {
  getContentOverrides,
  getImageOverrides,
  getTeamOverride,
  type TeamMember,
} from "./db";

// Single source of truth for editable copy. The admin form and the public site
// both read from this registry, so they can never drift. Defaults come from the
// static `src/content` modules; overrides come from the DB (content_overrides).

export type EditableField = {
  key: string;
  label: string;
  group: string;
  multiline?: boolean;
  default: string;
};

// Default lede paragraph for the hero (kept here so it's editable in one place).
export const HERO_LEDE_DEFAULT =
  "De la cardiologie à la réadaptation, Kinesis Réadaptation réunit en un seul lieu des expertises médicales coordonnées — un accompagnement personnalisé, dans le respect de la confidentialité et de la sérénité de chaque patient, premier centre privé de médecine vasculaire de la place.";

function poleFields(): EditableField[] {
  const out: EditableField[] = [];
  for (const p of polesDefaults) {
    const group = `Pôle ${p.num} — ${p.title}`;
    out.push({ key: `pole.${p.id}.title`, label: "Titre du pôle", group, default: p.title });
    out.push({ key: `pole.${p.id}.intro`, label: "Introduction", group, multiline: true, default: p.intro });
    p.specialties.forEach((s, i) => {
      out.push({ key: `pole.${p.id}.spec.${i}.name`, label: `Spécialité ${i + 1} — nom`, group, default: s.name });
      out.push({ key: `pole.${p.id}.spec.${i}.desc`, label: `Spécialité ${i + 1} — description`, group, multiline: true, default: s.desc ?? "" });
    });
  }
  return out;
}

export const editableFields: EditableField[] = [
  // Accueil — hero
  { key: "home.hero.line1", label: "Titre (ligne 1)", group: "Accueil — hero", default: "Un seul lieu." },
  { key: "home.hero.line2", label: "Titre (ligne 2)", group: "Accueil — hero", default: "Toutes vos spécialités." },
  { key: "home.hero.lede", label: "Paragraphe d'introduction", group: "Accueil — hero", multiline: true, default: HERO_LEDE_DEFAULT },
  // Accueil — index des pôles
  { key: "home.specialites.title", label: "Titre de section", group: "Accueil — index des pôles", default: "Quatre pôles, des expertises réunies" },
  { key: "home.specialites.subtitle", label: "Sous-titre", group: "Accueil — index des pôles", multiline: true, default: "De la cardiologie aux consultations spécialisées, suivez le fil qui relie nos quatre pôles d'expertise, réunis en un seul lieu." },
  // Accueil — Pourquoi Kinesis
  { key: "home.pourquoi.title", label: "Titre de section", group: "Accueil — Pourquoi Kinesis", default: "L'excellence médicale, dans un cadre d'exception" },
  { key: "home.pourquoi.subtitle", label: "Sous-titre", group: "Accueil — Pourquoi Kinesis", multiline: true, default: "Kinesis Réadaptation allie innovation technologique et expertise médicale, premier centre privé de médecine vasculaire de la place." },
  { key: "home.highlights.0", label: "Point fort 1", group: "Accueil — Pourquoi Kinesis", default: siteDefaults.highlights[0] },
  { key: "home.highlights.1", label: "Point fort 2", group: "Accueil — Pourquoi Kinesis", default: siteDefaults.highlights[1] },
  { key: "home.highlights.2", label: "Point fort 3", group: "Accueil — Pourquoi Kinesis", default: siteDefaults.highlights[2] },
  // Le mot du directeur
  { key: "director.name", label: "Nom", group: "Le mot du directeur", default: directorDefaults.name },
  { key: "director.role", label: "Fonction", group: "Le mot du directeur", default: directorDefaults.role },
  { key: "director.message.0", label: "Message — paragraphe 1", group: "Le mot du directeur", multiline: true, default: directorDefaults.message[0] },
  { key: "director.message.1", label: "Message — paragraphe 2", group: "Le mot du directeur", multiline: true, default: directorDefaults.message[1] },
  { key: "director.message.2", label: "Message — paragraphe 3", group: "Le mot du directeur", multiline: true, default: directorDefaults.message[2] },
  { key: "director.signature", label: "Signature", group: "Le mot du directeur", default: directorDefaults.signature },
  // Le centre
  { key: "centre.intro", label: "Introduction", group: "Le centre", multiline: true, default: centreDefaults.intro },
  // Pôles (generated)
  ...poleFields(),
  // Coordonnées
  { key: "site.tagline", label: "Slogan (SEO / titre)", group: "Coordonnées & infos", default: siteDefaults.tagline },
  { key: "site.phone.0", label: "Téléphone 1", group: "Coordonnées & infos", default: siteDefaults.phones[0] },
  { key: "site.phone.1", label: "Téléphone 2", group: "Coordonnées & infos", default: siteDefaults.phones[1] },
  { key: "site.emailPublic", label: "E-mail public", group: "Coordonnées & infos", default: siteDefaults.emailPublic },
  { key: "site.address.full", label: "Adresse", group: "Coordonnées & infos", multiline: true, default: siteDefaults.address.full },
  { key: "site.hours", label: "Horaires (semaine)", group: "Coordonnées & infos", default: siteDefaults.hours },
  { key: "site.hoursVip", label: "Horaires (VIP / dimanche)", group: "Coordonnées & infos", default: siteDefaults.hoursVip },
];

const defaultsByKey: Record<string, string> = Object.fromEntries(
  editableFields.map((f) => [f.key, f.default])
);

// Cached per request so multiple loaders share a single DB round-trip.
const loadOverrides = cache(async () => getContentOverrides());
const loadImageOverrides = cache(async () => getImageOverrides());

export type ResolvedFields = {
  get: (key: string) => string;
  overrides: Record<string, string>;
};

export async function getEditable(): Promise<ResolvedFields> {
  const overrides = await loadOverrides();
  return {
    overrides,
    get: (key: string) =>
      overrides[key] ?? defaultsByKey[key] ?? "",
  };
}

// ---- Merged, structured views used by the public site --------------------

export async function getSiteContent() {
  const { get } = await getEditable();
  return {
    ...siteDefaults,
    tagline: get("site.tagline"),
    emailPublic: get("site.emailPublic"),
    hours: get("site.hours"),
    hoursVip: get("site.hoursVip"),
    phones: [get("site.phone.0"), get("site.phone.1")],
    address: { ...siteDefaults.address, full: get("site.address.full") },
  };
}

export async function getHomeContent() {
  const { get } = await getEditable();
  return {
    heroLine1: get("home.hero.line1"),
    heroLine2: get("home.hero.line2"),
    heroLede: get("home.hero.lede"),
    specialitesTitle: get("home.specialites.title"),
    specialitesSubtitle: get("home.specialites.subtitle"),
    pourquoiTitle: get("home.pourquoi.title"),
    pourquoiSubtitle: get("home.pourquoi.subtitle"),
    highlights: [
      get("home.highlights.0"),
      get("home.highlights.1"),
      get("home.highlights.2"),
    ],
  };
}

export async function getPolesContent() {
  const { get } = await getEditable();
  return polesDefaults.map((p) => ({
    ...p,
    title: get(`pole.${p.id}.title`),
    intro: get(`pole.${p.id}.intro`),
    specialties: p.specialties.map((s, i) => {
      const desc = get(`pole.${p.id}.spec.${i}.desc`);
      return {
        name: get(`pole.${p.id}.spec.${i}.name`),
        desc: desc ? desc : undefined,
      };
    }),
  }));
}

export async function getCentreContent() {
  const { get } = await getEditable();
  return { ...centreDefaults, intro: get("centre.intro") };
}

export async function getDirectorContent() {
  const { get } = await getEditable();
  return {
    ...directorDefaults,
    name: get("director.name"),
    role: get("director.role"),
    signature: get("director.signature"),
    message: [
      get("director.message.0"),
      get("director.message.1"),
      get("director.message.2"),
    ],
  };
}

// ---- Images --------------------------------------------------------------

export type ImageKey = keyof typeof imageDefaults;

export async function getSiteImages() {
  const overrides = await loadImageOverrides();
  const out = {} as Record<ImageKey, { src: string; alt: string }>;
  (Object.keys(imageDefaults) as ImageKey[]).forEach((key) => {
    out[key] = {
      src: overrides[key] || imageDefaults[key].src,
      alt: imageDefaults[key].alt,
    };
  });
  return out;
}

export const imageKeys = Object.keys(imageDefaults) as ImageKey[];
export const imageMeta = imageDefaults;

// ---- Team ----------------------------------------------------------------

export type { TeamMember } from "./db";

const loadTeam = cache(async () => getTeamOverride());

// DB team (if set) fully replaces the static default team; else the default.
export async function getTeamContent(): Promise<TeamMember[]> {
  const override = await loadTeam();
  return override ?? (teamDefaults as TeamMember[]);
}

export const defaultTeam = teamDefaults as TeamMember[];
