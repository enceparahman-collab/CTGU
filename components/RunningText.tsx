
import React, { useState, useEffect } from 'react';
import { generateFlashNews } from '../services/geminiService';

const RunningText: React.FC = () => {
  const [text, setText] = useState('Selamat Datang di Alfamart Citaringgul X450! • Belanja Puas, Harga Pas! • Promo JSM sedang berlangsung!');

  useEffect(() => {
    const fetchAIUpdate = async () => {
      const aiUpdate = await generateFlashNews();
      if (aiUpdate) setText(prev => `${aiUpdate} • ${prev}`);
    };
    fetchAIUpdate();
  }, []);

  return (
    <div className="bg-[#ffeb00] py-2 border-b-2 border-[#e31e24] overflow-hidden">
      <div className="flex items-center">
        <div className="bg-[#e31e24] text-white px-4 py-1 font-black text-[10px] uppercase italic flex items-center z-50 ml-2 rounded-lg">
          <span className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></span>
          X450 LIVE
        </div>
        <div className="flex-grow overflow-hidden">
          <div className="animate-marquee inline-block whitespace-nowrap">
            <span className="text-[#e31e24] font-black text-sm uppercase italic px-4">
              {text} • {text} • {text}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RunningText;
