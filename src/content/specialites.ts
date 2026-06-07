// The 4 "pôles" (specialty hubs). Source: questionnaire Dr Diack.
// Structured so each pôle can later be split into its own page without a refactor.
//
// `num` drives the editorial 01→04 index and the "fil de soin" nodes.
// `icon` is a lucide-react icon name, kept for optional future use.

export type Specialty = {
  name: string;
  desc?: string;
};

export type Pole = {
  id: string;
  num: string;
  title: string;
  icon: string;
  intro: string;
  specialties: Specialty[];
};

// The order of poles = the care journey / the order of the "fil de soin".
export const poles: Pole[] = [
  {
    id: "cardiovasculaire",
    num: "01",
    title: "Pôle cardiovasculaire",
    icon: "HeartPulse",
    intro:
      "Prise en charge des maladies cardiovasculaires, de la circulation et de la réadaptation du cœur.",
    specialties: [
      {
        name: "Cardiologie",
        desc: "Prise en charge des maladies cardiovasculaires.",
      },
      {
        name: "Médecine vasculaire",
        desc: "Premier centre privé prenant en charge le lymphœdème et les autres causes de grosse jambe.",
      },
      {
        name: "Réadaptation cardiaque",
        desc: "Suivi et rééducation après un événement cardiaque.",
      },
    ],
  },
  {
    id: "explorations",
    num: "02",
    title: "Pôle explorations",
    icon: "Activity",
    intro: "Plateau d'explorations fonctionnelles pour un diagnostic précis.",
    specialties: [
      {
        name: "Neurologie (EMG, EEG)",
        desc: "Explorations électromyographiques et électroencéphalographiques.",
      },
      {
        name: "Apnée du sommeil",
        desc: "Dépistage et suivi des troubles du sommeil.",
      },
      {
        name: "Exploration fonctionnelle respiratoire (EFR)",
        desc: "Évaluation de la fonction respiratoire.",
      },
    ],
  },
  {
    id: "readaptation",
    num: "03",
    title: "Réadaptation & bien-être",
    icon: "PersonStanding",
    intro: "Rééducation, mobilité et bien-être, dans un cadre confortable.",
    specialties: [
      {
        name: "Médecine physique & réadaptation",
        desc: "Rééducation fonctionnelle personnalisée.",
      },
      {
        name: "Kinésithérapie",
        desc: "Soins avant et après accouchement, et rééducation générale.",
      },
      {
        name: "Balnéothérapie",
        desc: "Piscine chauffée et jacuzzi pour des soins en milieu aquatique.",
      },
    ],
  },
  {
    id: "consultations",
    num: "04",
    title: "Consultations spécialisées",
    icon: "Stethoscope",
    intro: "Un large éventail de consultations spécialisées en un seul lieu.",
    specialties: [
      { name: "Diabétologie" },
      { name: "Néphrologie" },
      { name: "Urologie" },
      { name: "Gériatrie" },
      { name: "Diététique" },
      { name: "Psychologie" },
      { name: "Orthophonie" },
      { name: "Coaching sportif" },
    ],
  },
];

// Flat list of specialty names, useful for the contact form <select>.
export const allSpecialtyNames: string[] = poles.flatMap((p) =>
  p.specialties.map((s) => s.name)
);
