import { Topic, Emotion, Message } from './types';
import { religiousTexts, energyLaws } from './aiLogic';

export class ConversationManager {
  private messageHistory: Message[] = [];
  private readonly maxHistoryLength = 10;

  constructor() {
    this.messageHistory = [{
      id: 'initial',
      text: "Je suis votre guide spirituel, versé dans les traditions sacrées et la sagesse universelle.",
      isAI: true,
      timestamp: Date.now(),
      topics: ['spirituality'],
      emotions: ['hope']
    }];
  }

  private getReligiousResponse(topics: Topic[]): string {
    if (topics.includes('islam')) {
      return religiousTexts.quran.endTimes[Math.floor(Math.random() * religiousTexts.quran.endTimes.length)];
    }
    if (topics.includes('christianity')) {
      return religiousTexts.bible.prophecies[Math.floor(Math.random() * religiousTexts.bible.prophecies.length)];
    }
    if (topics.includes('judaism')) {
      return religiousTexts.torah.kabbalah[Math.floor(Math.random() * religiousTexts.torah.kabbalah.length)];
    }
    return "";
  }

  private getEnergyResponse(): string {
    return energyLaws.universal[Math.floor(Math.random() * energyLaws.universal.length)];
  }

  private getEmotionalContext(emotions: Emotion[]): string {
    const emotionalResponses: Record<Emotion, string[]> = {
      sadness: [
        "Je ressens votre peine. Prenons un moment pour explorer ce qui vous attriste.",
        "La tristesse est une émotion profonde qui mérite d'être écoutée. Partagez ce que vous ressentez."
      ],
      anxiety: [
        "Je perçois votre inquiétude. Respirons ensemble et explorons vos préoccupations.",
        "L'anxiété peut être écrasante, mais vous n'êtes pas seul. Parlons-en."
      ],
      anger: [
        "Votre colère est légitime. Explorons ensemble sa source pour mieux la comprendre.",
        "La colère peut être une force de transformation quand on sait l'écouter."
      ],
      happiness: [
        "Votre joie est contagieuse! Partagez ce qui vous rend heureux.",
        "Le bonheur est un cadeau précieux. Savourons ce moment ensemble."
      ],
      confusion: [
        "Dans la confusion se cache souvent une opportunité de clarté. Prenons le temps d'y voir plus clair.",
        "Parfois, le doute est le début de la sagesse. Explorons vos questionnements."
      ],
      hope: [
        "L'espoir est une lumière qui guide nos pas. Nourrissons cette flamme ensemble.",
        "Votre optimisme est une force positive. Parlons de vos aspirations."
      ],
      curiosity: [
        "Votre curiosité est une belle qualité. Explorons ensemble vos questions.",
        "La quête de connaissance est un chemin sacré. Que souhaitez-vous découvrir?"
      ],
      fear: [
        "La peur peut être un guide quand on sait l'écouter. Parlons de ce qui vous préoccupe.",
        "Face à la peur, nous pouvons trouver la force intérieure. Je suis là pour vous accompagner."
      ]
    };

    const emotion = emotions[0] || 'hope';
    const responses = emotionalResponses[emotion] || emotionalResponses.hope;
    return responses[Math.floor(Math.random() * responses.length)];
  }

  private getTopicalResponse(topics: Topic[]): string {
    const topicalResponses: Record<Topic, string[]> = {
      spirituality: [
        "La spiritualité est un chemin personnel de découverte. Quelle est votre quête?",
        "Chaque tradition spirituelle offre sa propre sagesse. Qu'est-ce qui résonne en vous?"
      ],
      endTimes: [
        "Les prophéties parlent de signes et de transformations. Qu'en pensez-vous?",
        "La fin des temps est un concept présent dans de nombreuses traditions. Partagez vos réflexions."
      ],
      islam: [
        "L'islam offre une riche perspective sur la spiritualité et la vie. Que souhaitez-vous explorer?",
        "Les enseignements du Coran sont profonds et nombreux. Quel aspect vous intéresse?"
      ],
      christianity: [
        "La Bible contient de nombreuses sagesses. Quel passage vous touche particulièrement?",
        "Les enseignements de Jésus nous parlent encore aujourd'hui. Qu'en pensez-vous?"
      ],
      judaism: [
        "La tradition juive est riche en sagesse mystique. Que souhaitez-vous comprendre?",
        "La Kabbale nous enseigne sur les mystères de l'existence. Qu'est-ce qui vous intrigue?"
      ],
      energy: [
        "Les lois de l'énergie gouvernent l'univers. Comment les ressentez-vous?",
        "Chaque être est connecté à l'énergie universelle. Quelle est votre expérience?"
      ],
      personal_growth: [
        "Le développement personnel est un voyage continu. Où en êtes-vous?",
        "Chaque défi est une opportunité de croissance. Que souhaitez-vous transformer?"
      ],
      future: [
        "L'avenir se construit dans le présent. Quelles sont vos aspirations?",
        "Chaque choix ouvre de nouvelles possibilités. Que voyez-vous pour votre futur?"
      ],
      family: [
        "La famille est un miroir de notre âme. Que vous reflète-t-elle?",
        "Les liens familiaux portent de profondes leçons. Qu'apprenez-vous?"
      ],
      relationships: [
        "Nos relations sont des enseignants précieux. Que vous apprennent-elles?",
        "Chaque rencontre a un sens spirituel. Que découvrez-vous?"
      ],
      career: [
        "Le travail peut être une forme de service spirituel. Comment le vivez-vous?",
        "Votre carrière fait partie de votre chemin. Quelle direction souhaitez-vous prendre?"
      ],
      health: [
        "Le corps est le temple de l'âme. Comment prenez-vous soin de vous?",
        "La santé est un équilibre subtil. Que ressentez-vous?"
      ],
      finance: [
        "L'argent est une forme d'énergie. Quelle est votre relation avec lui?",
        "L'abondance se manifeste de nombreuses façons. Comment la percevez-vous?"
      ]
    };

    const topic = topics[0] || 'spirituality';
    const responses = topicalResponses[topic] || topicalResponses.spirituality;
    return responses[Math.floor(Math.random() * responses.length)];
  }

  public generateResponse(message: string, topics: Topic[], emotions: Emotion[]): string {
    this.messageHistory.push({
      id: Date.now().toString(),
      text: message,
      isAI: false,
      timestamp: Date.now(),
      topics,
      emotions
    });

    if (this.messageHistory.length > this.maxHistoryLength) {
      this.messageHistory = this.messageHistory.slice(-this.maxHistoryLength);
    }

    const religiousResponse = this.getReligiousResponse(topics);
    if (religiousResponse) return religiousResponse;

    if (topics.includes('energy')) return this.getEnergyResponse();

    const emotionalContext = this.getEmotionalContext(emotions);
    const topicalResponse = this.getTopicalResponse(topics);

    return `${emotionalContext} ${topicalResponse}`;
  }
}