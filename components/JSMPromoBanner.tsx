
import React, { useState, useEffect } from 'react';
import { StorageService } from '../services/storageService';
import { NewsItem } from '../types';

const JSMPromoBanner: React.FC = () => {
  const [jsmPromo, setJsmPromo] = useState<NewsItem | null>(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const news = StorageService.getNews();
    const jsm = news.find(n => n.title.toLowerCase().includes('jsm') || n.category === 'Promo');
    if (jsm) {
      setJsmPromo(jsm);
    }
  }, []);

  if (!jsmPromo || !isVisible) return null;

  return (
    <div className="relative z-[45] animate-in fade-in slide-in-from-top-10 duration-1000">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border-4 border-[#ffeb00] relative group">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 bg-[#e31e24] text-white px-8 py-2 rounded-bl-[2rem] font-black text-[10px] uppercase tracking-widest z-20 shadow-lg">
            Promo JSM Hari Ini
          </div>
          
          <div className="flex flex-col md:flex-row items-stretch">
            {/* Image Section */}
            <div className="md:w-1/3 h-48 md:h-auto overflow-hidden relative">
              <img 
                src={jsmPromo.imageUrl} 
                alt="JSM Promo" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent md:bg-gradient-to-l md:from-transparent md:to-black/40"></div>
            </div>

            {/* Content Section */}
            <div className="flex-grow p-8 flex flex-col justify-center bg-gradient-to-br from-white to-[#fffde0]">
              <div className="flex items-center gap-3 mb-4">
                <span className="flex h-3 w-3 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                </span>
                <span className="text-[#e31e24] font-black text-xs uppercase tracking-tighter italic">Alfamart Citaringgul X450 Spotlight</span>
              </div>
              
              <h2 className="text-3xl font-black text-gray-900 leading-tight uppercase italic mb-2 tracking-tighter">
                {jsmPromo.title}
              </h2>
              <p className="text-gray-600 font-bold text-sm mb-6 line-clamp-2">
                {jsmPromo.summary}
              </p>
              
              <div className="flex flex-wrap gap-4 items-center">
                <button className="bg-[#e31e24] text-white px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-red-100 hover:scale-105 active:scale-95 transition-all">
                  Lihat Katalog JSM
                </button>
                <button 
                  onClick={() => setIsVisible(false)}
                  className="text-gray-400 font-black text-[10px] uppercase tracking-widest hover:text-gray-600 transition-colors"
                >
                  Tutup Banner
                </button>
              </div>
            </div>

            {/* Price/Badge Section */}
            <div className="bg-[#ffeb00] px-10 py-8 flex flex-col items-center justify-center text-center">
                <p className="text-[#e31e24] font-black text-4xl italic tracking-tighter">-JSM-</p>
                <p className="text-gray-900 font-black text-[10px] uppercase tracking-widest mt-1">Special Weekend</p>
                <div className="mt-4 w-12 h-12 bg-white rounded-full flex items-center justify-center text-[#e31e24] shadow-md">
                   <i className="fas fa-shopping-cart"></i>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JSMPromoBanner;
