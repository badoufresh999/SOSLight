export const religiousTexts = {
  quran: {
    endTimes: [
      "La venue du Mahdi, le guide attendu",
      "L'apparition de Dajjal (l'Antéchrist)",
      "Le retour de Issa (Jésus)",
      "Les signes mineurs et majeurs de la fin des temps"
    ],
    principles: [
      "Tawhid (Unicité divine)",
      "Les cinq piliers",
      "La purification de l'âme",
      "La patience et la gratitude"
    ]
  },
  bible: {
    prophecies: [
      "L'Apocalypse de Jean",
      "Les prophéties de Daniel",
      "Les signes des temps",
      "Le retour du Christ"
    ],
    wisdom: [
      "Les Psaumes",
      "Les Proverbes",
      "Les Béatitudes",
      "L'amour divin"
    ]
  },
  torah: {
    kabbalah: [
      "L'Arbre de Vie",
      "Les Sephiroth",
      "Les 22 lettres sacrées",
      "Les noms divins"
    ],
    teachings: [
      "La création",
      "L'alliance divine",
      "Les lois spirituelles",
      "La rédemption"
    ]
  }
};

export const kabbalisticNumerology = {
  letterValues: {
    'א': 1, 'ב': 2, 'ג': 3, 'ד': 4, 'ה': 5, 'ו': 6, 'ז': 7, 'ח': 8, 'ט': 9,
    'י': 10, 'כ': 20, 'ל': 30, 'מ': 40, 'נ': 50, 'ס': 60, 'ע': 70, 'פ': 80, 'צ': 90,
    'ק': 100, 'ר': 200, 'ש': 300, 'ת': 400
  },
  
  numberMeanings: {
    1: {
      title: "Unité Divine",
      description: "Connection directe avec le Divin, nouveau départ spirituel"
    },
    2: {
      title: "Dualité et Équilibre",
      description: "Harmonie entre le matériel et le spirituel"
    },
    3: {
      title: "Expression Divine",
      description: "Manifestation spirituelle, créativité sacrée"
    },
    4: {
      title: "Stabilité Matérielle",
      description: "Fondation solide pour la croissance spirituelle"
    },
    5: {
      title: "Transformation Divine",
      description: "Changement spirituel, évolution de l'âme"
    },
    6: {
      title: "Harmonie Parfaite",
      description: "Équilibre entre tous les aspects de l'existence"
    },
    7: {
      title: "Perfection Spirituelle",
      description: "Accomplissement spirituel, sagesse divine"
    },
    8: {
      title: "Pouvoir et Abondance",
      description: "Manifestation divine dans le monde matériel"
    },
    9: {
      title: "Accomplissement",
      description: "Completion spirituelle, service à l'humanité"
    }
  },

  calculateLifePath: (birthDate: string): number => {
    const nums = birthDate.split('-').join('').split('').map(Number);
    let sum = nums.reduce((a, b) => a + b, 0);
    while (sum > 9) {
      sum = sum.toString().split('').map(Number).reduce((a, b) => a + b, 0);
    }
    return sum;
  },

  calculateDestiny: (name: string): number => {
    const nameValue = name.toLowerCase()
      .split('')
      .map(char => char.charCodeAt(0) - 96)
      .filter(num => num > 0)
      .reduce((a, b) => a + b, 0);
    
    let sum = nameValue;
    while (sum > 9) {
      sum = sum.toString().split('').map(Number).reduce((a, b) => a + b, 0);
    }
    return sum;
  },

  getDetailedAnalysis: (lifePath: number, destiny: number) => {
    return {
      lifePath: {
        number: lifePath,
        ...kabbalisticNumerology.numberMeanings[lifePath as keyof typeof kabbalisticNumerology.numberMeanings]
      },
      destiny: {
        number: destiny,
        ...kabbalisticNumerology.numberMeanings[destiny as keyof typeof kabbalisticNumerology.numberMeanings]
      },
      compatibility: (lifePath + destiny) % 9 || 9,
      spiritualPath: `Votre chemin combine les énergies ${lifePath} et ${destiny}, 
        créant une unique opportunité de croissance spirituelle et de développement personnel.`
    };
  }
};

export const energyLaws = {
  universal: [
    "La loi de l'attraction",
    "La loi du karma",
    "La loi de la vibration",
    "La loi de la correspondance"
  ],
  spiritual: [
    "La loi de la gratitude",
    "La loi du pardon",
    "La loi de la cause à effet",
    "La loi de l'intention"
  ],
  manifestation: [
    "La loi de l'action",
    "La loi de la compensation",
    "La loi de la non-résistance",
    "La loi de la transmutation"
  ]
};