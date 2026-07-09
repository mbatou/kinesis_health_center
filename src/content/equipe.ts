// Team of Kinesis Réadaptation. Real names & positions provided by the center.
// Photos and bios to come — cards fall back to an elegant placeholder meanwhile.
// TODO content: photos → public/team/ ; short bios if desired.
//
// Surnames are kept in capitals (Francophone convention). Job titles are written
// in sentence case to match the site's editorial style.

export type Practitioner = {
  name: string;
  role: string;
  specialty?: string;
  photo?: string;
  bio?: string;
};

export const team: Practitioner[] = [
  {
    name: "Dr Bouna DIACK",
    role: "Directeur général",
    specialty: "Cardiologue",
  },
  {
    name: "Ami NDAO BA",
    role: "Directrice générale adjointe",
  },
  {
    name: "Clémence Baraye MANKA",
    role: "Surveillante générale",
  },
  {
    name: "Maguette SÈNE",
    role: "Infirmière",
  },
  {
    name: "Ndéye Dieumbe MBAYE",
    role: "Technicienne de laboratoire",
  },
  {
    name: "Khady Ngom DIOP",
    role: "Intendante générale",
  },
  {
    name: "Christine Amina ÉPÉE KUOUH",
    role: "Secrétaire",
  },
  {
    name: "Ndéye Bineta NDIAYE",
    role: "Secrétaire",
  },
  {
    name: "Oumy Khairy Diagne FALL",
    role: "Caissière",
  },
  {
    name: "Oumar BAH",
    role: "Garçon de salle",
  },
];
