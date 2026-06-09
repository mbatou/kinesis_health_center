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

// The order of poles = display order / the order of the "fil de soin".
export const poles: Pole[] = [
  {
    id: "cardiovasculaire",
    num: "01",
    title: "Cardiologie & médecine vasculaire",
    icon: "HeartPulse",
    intro:
      "Le diagnostic et la prise en charge des maladies du cœur, de la circulation et du système vasculaire.",
    specialties: [
      {
        name: "Cardiologie",
        desc: "Maladies cardiaques et vasculaires, hypertension artérielle et pathologies associées.",
      },
      {
        name: "Médecine vasculaire",
        desc: "Premier centre privé de la place : drainage lymphatique, prise en charge du lymphœdème et des autres causes de grosse jambe, et soin des plaies.",
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
    title: "Explorations",
    icon: "Activity",
    intro:
      "Un plateau d'explorations fonctionnelles pour un diagnostic précis et complet.",
    specialties: [
      {
        name: "Explorations neuro-musculaires et cérébrales (EMG, EEG)",
        desc: "Électromyographie et électroencéphalographie pour explorer les nerfs, les muscles et le cerveau.",
      },
      // TODO content (Dr Diack): exact term to confirm — "exploration pathotechnique
      // complet" transcribed as-is; medical rewording below to validate (or
      // "exploration neurophysiologique complète").
      {
        name: "Bilan d'exploration complet",
        desc: "Une exploration fonctionnelle complète, pour un diagnostic global.",
      },
      {
        name: "Apnée du sommeil (polygraphie ventilatoire)",
        desc: "Dépistage et suivi des troubles du sommeil par polygraphie ventilatoire.",
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
    title: "Médecine physique et de réadaptation (MPR)",
    icon: "PersonStanding",
    intro:
      "Une réadaptation complète pour retrouver mobilité, fonction et autonomie — bien au-delà de la simple rééducation.",
    specialties: [
      {
        name: "Médecine physique et de réadaptation (MPR)",
        desc: "Une réadaptation globale et complète, qui va plus loin que la rééducation pour restaurer durablement la fonction et l'autonomie.",
      },
      {
        name: "Kinésithérapie",
        desc: "De la kinésithérapie générale à la rééducation périnéale et au suivi pré et post-natal.",
      },
      {
        name: "Balnéothérapie & aquagym",
        desc: "Soins en milieu aquatique : piscine chauffée, jacuzzi et séances d'aquagym.",
      },
    ],
  },
  {
    id: "consultations",
    num: "04",
    title: "Consultations spécialisées",
    icon: "Stethoscope",
    intro:
      "Un large éventail de consultations spécialisées, réunies en un seul lieu.",
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
