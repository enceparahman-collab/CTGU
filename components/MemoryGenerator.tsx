
import React, { useState } from 'react';
import { enhanceMemoryStory } from '../services/geminiService';

const MemoryGenerator: React.FC = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    if (!input.trim()) return;
    setIsLoading(true);
    const result = await enhanceMemoryStory(input);
    setOutput(result);
    setIsLoading(false);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 my-8">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">AI Memory Storyteller</h2>
        <p className="text-gray-500 mb-6">Punya kenangan singkat? Biarkan AI kami mengubahnya menjadi narasi yang indah.</p>
        
        <div className="space-y-4">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Contoh: Momen pas hujan deras terus kita semua bantu pelanggan yang neduh..."
            className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#e31e24] focus:border-transparent transition-all outline-none resize-none h-32"
          />
          <button
            onClick={handleGenerate}
            disabled={isLoading || !input}
            className={`w-full py-3 px-6 rounded-xl font-bold text-white transition-all ${
              isLoading ? 'bg-gray-400' : 'bg-[#e31e24] hover:bg-red-700 active:scale-95 shadow-md'
            }`}
          >
            {isLoading ? (
              <><i className="fas fa-circle-notch fa-spin mr-2"></i> Sedang Merangkai Kata...</>
            ) : (
              <><i className="fas fa-magic mr-2"></i> Abadikan Kenangan</>
            )}
          </button>
        </div>

        {output && (
          <div className="mt-8 p-6 bg-red-50 rounded-xl border border-red-100 text-left relative animate-in fade-in slide-in-from-bottom-4 duration-500">
            <i className="fas fa-quote-left text-3xl text-red-200 absolute top-4 left-4"></i>
            <p className="text-gray-800 italic leading-relaxed relative z-10 pt-4 pl-4">
              {output}
            </p>
            <div className="mt-4 flex justify-end">
              <button 
                onClick={() => setOutput('')}
                className="text-xs text-red-400 hover:text-red-600 font-semibold"
              >
                Hapus & Mulai Lagi
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MemoryGenerator;
