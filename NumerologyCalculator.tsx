import React, { useState } from 'react';
import { Calculator, Book, Star } from 'lucide-react';
import { kabbalisticNumerology } from '../utils/spiritualKnowledge';

function NumerologyCalculator() {
  const [birthDate, setBirthDate] = useState('');
  const [name, setName] = useState('');
  const [analysis, setAnalysis] = useState<any>(null);

  const calculateNumerology = () => {
    if (!birthDate || !name) return;

    const lifePath = kabbalisticNumerology.calculateLifePath(birthDate);
    const destiny = kabbalisticNumerology.calculateDestiny(name);
    const detailedAnalysis = kabbalisticNumerology.getDetailedAnalysis(lifePath, destiny);
    
    setAnalysis(detailedAnalysis);
  };

  return (
    <div className="bg-white rounded-xl shadow-xl p-4 h-[600px] flex flex-col">
      <div className="flex items-center gap-2 mb-4 p-2 bg-indigo-50 rounded-lg">
        <Star className="w-5 h-5 text-indigo-600" />
        <h2 className="font-semibold">Oracle Kabbalistique</h2>
      </div>

      <div className="space-y-4 flex-1 overflow-y-auto">
        <div>
          <label className="block text-sm font-medium mb-1">Votre nom complet</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            placeholder="Entrez votre nom..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Date de naissance</label>
          <input
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        <button
          onClick={calculateNumerology}
          disabled={!birthDate || !name}
          className={`w-full py-2 ${
            !birthDate || !name 
              ? 'bg-gray-300 cursor-not-allowed' 
              : 'bg-indigo-600 hover:bg-indigo-700'
          } text-white rounded-lg transition-colors`}
        >
          Révéler mon destin spirituel
        </button>

        {analysis && (
          <div className="mt-6 space-y-4">
            <div className="p-4 bg-indigo-50 rounded-lg">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <Calculator className="w-4 h-4" />
                Chemin de Vie ({analysis.lifePath.number})
              </h3>
              <p className="text-sm">{analysis.lifePath.description}</p>
            </div>

            <div className="p-4 bg-purple-50 rounded-lg">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <Star className="w-4 h-4" />
                Nombre de Destin ({analysis.destiny.number})
              </h3>
              <p className="text-sm">{analysis.destiny.description}</p>
            </div>

            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <Book className="w-4 h-4" />
                Guidance Spirituelle
              </h3>
              <p className="text-sm">{analysis.spiritualPath}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default NumerologyCalculator;