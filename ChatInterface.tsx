import React, { useState, useRef, useEffect } from 'react';
import { Send, MessageCircle } from 'lucide-react';
import { ConversationManager } from '../utils/conversationManager';
import { analyzeEmotion, identifyTopics } from '../utils/aiLogic';
import type { Message } from '../utils/types';

function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([{
    id: 'initial',
    text: "Je suis votre guide spirituel, versé dans les traditions sacrées et la sagesse universelle. Comment puis-je vous accompagner aujourd'hui?",
    isAI: true,
    timestamp: Date.now(),
    topics: ['spirituality'],
    emotions: ['hope']
  }]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const conversationManager = useRef(new ConversationManager());
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const simulateTyping = (response: string, topics: string[], emotions: string[]) => {
    setIsTyping(true);
    const minDelay = 1500;
    const charsPerSecond = 20;
    const typingDelay = Math.max(minDelay, response.length / charsPerSecond * 1000);
    
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        text: response,
        isAI: true,
        timestamp: Date.now(),
        topics: topics,
        emotions: emotions
      }]);
      setIsTyping(false);
    }, typingDelay);
  };

  const handleSend = () => {
    if (!input.trim()) return;
    
    const userMessage = input.trim();
    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      text: userMessage,
      isAI: false,
      timestamp: Date.now(),
      topics: [],
      emotions: []
    }]);
    setInput('');
    
    const emotions = analyzeEmotion(userMessage);
    const topics = identifyTopics(userMessage);
    const response = conversationManager.current.generateResponse(userMessage, topics, emotions);
    
    simulateTyping(response, topics, emotions);
  };

  return (
    <div className="bg-white rounded-xl shadow-xl p-4 h-[600px] flex flex-col">
      <div className="flex items-center gap-2 mb-4 p-2 bg-purple-50 rounded-lg">
        <MessageCircle className="w-5 h-5 text-purple-600" />
        <h2 className="font-semibold">Guide Spirituel</h2>
      </div>

      <div className="flex-1 overflow-y-auto mb-4 space-y-4 pr-2">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.isAI ? 'justify-start' : 'justify-end'}`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-lg ${
                msg.isAI
                  ? 'bg-gradient-to-r from-purple-50 to-indigo-50 text-gray-800'
                  : 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white'
              } shadow-sm`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gradient-to-r from-purple-50 to-indigo-50 text-gray-800 p-3 rounded-lg max-w-[80%] shadow-sm">
              <div className="flex gap-1">
                <span className="animate-bounce">.</span>
                <span className="animate-bounce delay-100">.</span>
                <span className="animate-bounce delay-200">.</span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Partagez vos pensées..."
          className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          disabled={isTyping}
        />
        <button
          onClick={handleSend}
          disabled={isTyping || !input.trim()}
          className={`p-2 rounded-lg transition-colors ${
            isTyping || !input.trim()
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:opacity-90'
          }`}
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

export default ChatInterface;