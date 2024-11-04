import React, { useState } from 'react';
import { Brain, Sparkles, Heart, Moon, Sun } from 'lucide-react';
import ChatInterface from './components/ChatInterface';
import NumerologyCalculator from './components/NumerologyCalculator';
import Header from './components/Header';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-purple-50 to-indigo-50 text-gray-800'
    }`}>
      <Header isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
              SOS Light
            </h1>
            <p className="text-xl mb-8 opacity-90">
              Guidance spirituelle et soutien psychologique alimentés par l'IA
            </p>
            <div className="flex justify-center gap-6 mb-12">
              <Feature icon={<Brain className="w-6 h-6" />} text="IA Intuitive" />
              <Feature icon={<Sparkles className="w-6 h-6" />} text="Numérologie Kabbalistique" />
              <Feature icon={<Heart className="w-6 h-6" />} text="Soutien Bienveillant" />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <ChatInterface />
            <NumerologyCalculator />
          </div>
        </div>
      </main>
    </div>
  );
}

function Feature({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 shadow-md">
      {icon}
      <span className="font-medium">{text}</span>
    </div>
  );
}

export default App;