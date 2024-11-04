import { Topic, Emotion, Message } from './types';

export const analyzeEmotion = (message: string): Emotion[] => {
  const emotions: Emotion[] = [];
  const lowercaseMsg = message.toLowerCase();

  if (lowercaseMsg.match(/triste|seul|déprimé|mal|pleure|souffre/)) {
    emotions.push('sadness');
  }
  if (lowercaseMsg.match(/peur|inquiet|stress|angoisse|anxieux|terrifié/)) {
    emotions.push('anxiety');
  }
  if (lowercaseMsg.match(/colère|énervé|furieux|rage|frustré|agacé/)) {
    emotions.push('anger');
  }
  if (lowercaseMsg.match(/heureux|content|joie|super|génial|bien/)) {
    emotions.push('happiness');
  }
  if (lowercaseMsg.match(/confus|perdu|comprends pas|incertain/)) {
    emotions.push('confusion');
  }
  if (lowercaseMsg.match(/espoir|espère|optimiste|confiant/)) {
    emotions.push('hope');
  }
  if (lowercaseMsg.match(/curieux|intéressé|fasciné/)) {
    emotions.push('curiosity');
  }
  if (lowercaseMsg.match(/effrayé|terrifié|craint|redoute/)) {
    emotions.push('fear');
  }

  return emotions;
};

export const identifyTopics = (message: string): Topic[] => {
  const topics: Topic[] = [];
  const lowercaseMsg = message.toLowerCase();

  if (lowercaseMsg.match(/famille|parent|frère|sœur|enfant/)) {
    topics.push('family');
  }
  if (lowercaseMsg.match(/travail|job|carrière|étude|école/)) {
    topics.push('career');
  }
  if (lowercaseMsg.match(/ami|relation|social|gens|personne/)) {
    topics.push('relationships');
  }
  if (lowercaseMsg.match(/santé|maladie|médecin|symptôme/)) {
    topics.push('health');
  }
  if (lowercaseMsg.match(/argent|finance|dette|budget/)) {
    topics.push('finance');
  }
  if (lowercaseMsg.match(/spirituel|sens|vie|existence|but|dieu|foi/)) {
    topics.push('spirituality');
  }
  if (lowercaseMsg.match(/avenir|futur|projet|plan|objectif/)) {
    topics.push('future');
  }
  if (lowercaseMsg.match(/islam|musulman|coran|mahdi|dajjal/)) {
    topics.push('islam');
  }
  if (lowercaseMsg.match(/chrétien|bible|jésus|apocalypse/)) {
    topics.push('christianity');
  }
  if (lowercaseMsg.match(/juif|torah|kabbale|judaïsme/)) {
    topics.push('judaism');
  }
  if (lowercaseMsg.match(/énergie|vibration|chakra|aura/)) {
    topics.push('energy');
  }
  if (lowercaseMsg.match(/fin des temps|prophétie|signe|apocalypse/)) {
    topics.push('endTimes');
  }
  if (lowercaseMsg.match(/développement|croissance|évolution|transformation/)) {
    topics.push('personal_growth');
  }

  return topics;
};

export const religiousTexts = {
  quran: {
    endTimes: [
      "Le Saint Coran parle du Mahdi comme guide attendu",
      "Les signes de l'Heure dans la tradition islamique",
      "La sagesse prophétique sur les temps de la fin"
    ]
  },
  bible: {
    prophecies: [
      "Les prophéties de l'Apocalypse",
      "Les enseignements de Jésus sur les derniers temps",
      "Les visions prophétiques de Daniel"
    ]
  },
  torah: {
    kabbalah: [
      "Les enseignements de la Kabbale sur la création",
      "La sagesse mystique du Zohar",
      "Les secrets des lettres hébraïques"
    ]
  }
};

export const energyLaws = {
  universal: [
    "La loi de l'attraction universelle",
    "Le principe de la vibration énergétique",
    "L'harmonie des forces cosmiques"
  ]
};