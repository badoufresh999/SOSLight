import * as tf from '@tensorflow/tfjs';
import natural from 'natural';
import { Message, Topic, Emotion } from './types';

const tokenizer = new natural.WordTokenizer();
const tfidf = new natural.TfIdf();

interface LearningData {
  input: string;
  topics: Topic[];
  emotions: Emotion[];
  response: string;
  feedback: number;
}

export class AILearningEngine {
  private model: tf.Sequential;
  private learningData: LearningData[] = [];
  private vocabulary: Set<string> = new Set();

  constructor() {
    this.initializeModel();
  }

  private async initializeModel() {
    this.model = tf.sequential({
      layers: [
        tf.layers.dense({ units: 128, activation: 'relu', inputShape: [100] }),
        tf.layers.dropout({ rate: 0.2 }),
        tf.layers.dense({ units: 64, activation: 'relu' }),
        tf.layers.dense({ units: 32, activation: 'softmax' })
      ]
    });

    this.model.compile({
      optimizer: tf.train.adam(),
      loss: 'categoricalCrossentropy',
      metrics: ['accuracy']
    });
  }

  public async learn(conversation: Message[]) {
    const processedData = this.preprocessConversation(conversation);
    await this.updateModel(processedData);
    this.updateVocabulary(processedData);
  }

  private preprocessConversation(conversation: Message[]): LearningData[] {
    return conversation.map((msg, index) => {
      if (msg.isAI || index === 0) return null;

      const response = conversation[index + 1]?.text || '';
      return {
        input: msg.text,
        topics: msg.topics,
        emotions: msg.emotions,
        response,
        feedback: 1 // Default positive feedback
      };
    }).filter((data): data is LearningData => data !== null);
  }

  private async updateModel(data: LearningData[]) {
    const inputTensors = data.map(item => {
      const tokens = tokenizer.tokenize(item.input.toLowerCase());
      return this.vectorizeText(tokens);
    });

    const xs = tf.stack(inputTensors);
    const ys = tf.tensor2d(data.map(item => [item.feedback]));

    await this.model.fit(xs, ys, {
      epochs: 5,
      batchSize: 32,
      validationSplit: 0.2
    });
  }

  private vectorizeText(tokens: string[]): tf.Tensor {
    const vector = new Array(100).fill(0);
    tokens.forEach((token, index) => {
      if (index < 100) {
        vector[index] = this.vocabulary.has(token) ? 1 : 0;
      }
    });
    return tf.tensor1d(vector);
  }

  private updateVocabulary(data: LearningData[]) {
    data.forEach(item => {
      const tokens = tokenizer.tokenize(item.input.toLowerCase());
      tokens.forEach(token => this.vocabulary.add(token));
    });
  }

  public async generateImprovedResponse(
    input: string,
    topics: Topic[],
    emotions: Emotion[]
  ): Promise<string> {
    const tokens = tokenizer.tokenize(input.toLowerCase());
    const inputTensor = this.vectorizeText(tokens);
    const prediction = await this.model.predict(inputTensor.expandDims()) as tf.Tensor;
    const confidence = await prediction.data();

    // Use confidence to adjust response generation
    return this.generateContextualResponse(input, topics, emotions, confidence[0]);
  }

  private generateContextualResponse(
    input: string,
    topics: Topic[],
    emotions: Emotion[],
    confidence: number
  ): string {
    // Implement sophisticated response generation based on learning
    // This is a placeholder for the actual implementation
    return `Based on our learning (${confidence.toFixed(2)} confidence), I understand your question about ${topics.join(', ')} and sense ${emotions.join(', ')}. Let me provide a thoughtful response...`;
  }
}

export const aiLearningEngine = new AILearningEngine();