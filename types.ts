export type Emotion = 
  | 'sadness'
  | 'anxiety'
  | 'anger'
  | 'happiness'
  | 'confusion'
  | 'hope'
  | 'curiosity'
  | 'fear';

export type Topic = 
  | 'spirituality'
  | 'endTimes'
  | 'islam'
  | 'christianity'
  | 'judaism'
  | 'energy'
  | 'personal_growth'
  | 'future'
  | 'family'
  | 'relationships'
  | 'career'
  | 'health'
  | 'finance';

export interface Message {
  id: string;
  text: string;
  isAI: boolean;
  timestamp: number;
  topics: Topic[];
  emotions: Emotion[];
}