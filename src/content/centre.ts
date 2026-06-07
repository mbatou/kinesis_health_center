// Editorial content for the "Le centre" page. Base copy provided by the client;
// to be enriched/validated (TODO content).

export const centre = {
  intro:
    "Kinesis Réadaptation est un établissement de référence où l'excellence médicale est au service des patients. Il allie innovation technologique et expertise humaine. Premier centre privé de médecine vasculaire de la place, il propose une démarche qualité et un circuit VIP privilégié, pensé pour la discrétion et le confort.",

  // Mission / valeurs (TODO content : à enrichir/valider avec le client).
  values: [
    {
      title: "Excellence médicale",
      desc: "Des praticiens spécialisés et un plateau technique moderne pour une prise en charge de haut niveau.",
    },
    {
      title: "Innovation technologique",
      desc: "Des équipements de pointe au service d'un diagnostic précis et d'un suivi personnalisé.",
    },
    {
      title: "Approche humaine",
      desc: "L'écoute et l'accompagnement du patient au cœur de chaque étape du parcours de soin.",
    },
    {
      title: "Démarche qualité",
      desc: "Des protocoles rigoureux et une amélioration continue pour votre sécurité et votre confort.",
    },
  ],

  vip: {
    title: "Le circuit VIP",
    desc: "Un parcours privilégié pensé pour la discrétion et le confort : accueil dédié, prise en charge fluide et environnement serein, du premier contact jusqu'au suivi.",
    points: [
      "Accueil personnalisé et confidentiel",
      "Parcours de soin coordonné en un seul lieu",
      "Cadre confortable et apaisant",
      "Rayonnement sous-régional",
    ],
  },
} as const;
