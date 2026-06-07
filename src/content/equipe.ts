// TODO content : noms / fonctions / parcours / photos à fournir par le centre.
// Placeholders propres en attendant. La photo pointe vers /public/team/.

export type Practitioner = {
  name: string;
  role: string;
  specialty: string;
  photo: string;
  bio?: string;
};

export const team: Practitioner[] = [
  {
    name: "Dr Diack",
    role: "Médecin — Direction médicale",
    specialty: "Médecine vasculaire",
    photo: "/team/placeholder.svg",
    bio: "Parcours et titres à compléter par le centre.", // TODO content
  },
  {
    name: "À compléter",
    role: "Cardiologue",
    specialty: "Cardiologie",
    photo: "/team/placeholder.svg",
  },
  {
    name: "À compléter",
    role: "Médecin physique & réadaptation",
    specialty: "Médecine physique & réadaptation",
    photo: "/team/placeholder.svg",
  },
  {
    name: "À compléter",
    role: "Kinésithérapeute",
    specialty: "Kinésithérapie",
    photo: "/team/placeholder.svg",
  },
  {
    name: "À compléter",
    role: "Neurologue",
    specialty: "Neurologie (EMG, EEG)",
    photo: "/team/placeholder.svg",
  },
  {
    name: "À compléter",
    role: "Psychologue",
    specialty: "Psychologie",
    photo: "/team/placeholder.svg",
  },
];
