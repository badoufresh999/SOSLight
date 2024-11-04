import React from 'react';
import { Moon, Sun } from 'lucide-react';

interface HeaderProps {
  isDarkMode: boolean;
  setIsDarkMode: (value: boolean) => void;
}

function Header({ isDarkMode, setIsDarkMode }: HeaderProps) {
  return (
    <header className={`py-4 px-6 ${
      isDarkMode ? 'bg-gray-800' : 'bg-white/70 backdrop-blur-sm'
    } shadow-sm`}>
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <img
            src="https://images.unsplash.com/photo-1531379410502-63bfe8cdaf6f?auto=format&fit=crop&w=100&h=100"
            alt="Logo"
            className="w-10 h-10 rounded-full"
          />
          <span className="font-bold text-xl">SOS Light</span>
        </div>
        
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className={`p-2 rounded-full ${
            isDarkMode ? 'bg-gray-700 text-yellow-400' : 'bg-gray-100 text-gray-600'
          }`}
        >
          {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
      </div>
    </header>
  );
}

export default Header;