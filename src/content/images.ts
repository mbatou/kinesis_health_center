// Central registry for the center's real photography. Paths live here only, so
// pages/components never hardcode image URLs. Files are dropped into
// public/images/ (see public/images/.gitkeep). Alt text is FR, descriptive.

export const images = {
  hero: {
    src: "/images/hero_landing_page.png",
    alt: "Salle de réadaptation du centre Kinesis, équipée pour la rééducation",
  },
  accueil: {
    src: "/images/salle_accueil.png",
    alt: "Espace d'accueil et salle d'attente du centre Kinesis Réadaptation",
  },
  readapt: {
    src: "/images/salle_reabilitation.png",
    alt: "Plateau de réadaptation et de kinésithérapie du centre Kinesis",
  },
  balneo: {
    src: "/images/pool_aquagym.png",
    alt: "Bassin de balnéothérapie du centre Kinesis Réadaptation",
  },
} as const;
