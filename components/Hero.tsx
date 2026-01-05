
import React, { useState } from 'react';
import CalendarWidget from './CalendarWidget';
import { NEWS_ITEMS } from '../constants';

interface HeroProps {
  isAdmin?: boolean;
}

const Hero: React.FC<HeroProps> = ({ isAdmin }) => {
  const [title1, setTitle1] = useState('Digital Hub & Album');
  const [title2, setTitle2] = useState('Citaringgul X450');
  const [description, setDescription] = useState('Platform digital khusus untuk mengabadikan setiap dedikasi, keceriaan, dan kekeluargaan tim Alfamart Citaringgul. Solusi modern untuk kebersamaan kita.');
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    setIsEditing(false);
  };

  return (
    <div className="relative overflow-hidden pt-12 pb-20 sm:pt-20 sm:pb-32">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-[#ffeb00] rounded-full blur-[120px] opacity-20"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-[#0055a5] rounded-full blur-[100px] opacity-20"></div>

      {isAdmin && !isEditing && (
        <button 
          onClick={() => setIsEditing(true)}
          className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-full text-[10px] font-black uppercase z-20 transition-all border border-white/20 backdrop-blur-md"
        >
          <i className="fas fa-edit mr-2"></i> Edit Tampilan Hero
        </button>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="lg:grid lg:grid-cols-12 lg:gap-12 items-center">
          <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-7 lg:text-left">
            {isEditing ? (
              <div className="space-y-4 mb-8 bg-white/10 p-8 rounded-[2.5rem] backdrop-blur-xl border border-white/20 shadow-2xl">
                <div className="flex justify-between items-center mb-4">
                   <h3 className="text-xs font-black text-[#ffeb00] uppercase tracking-widest">Editor Konten Aplikasi</h3>
                   <button onClick={() => setIsEditing(false)} className="text-white opacity-50 hover:opacity-100"><i className="fas fa-times"></i></button>
                </div>
                <input 
                  type="text" 
                  value={title1} 
                  onChange={(e) => setTitle1(e.target.value)}
                  className="w-full bg-white/10 border-2 border-white/10 rounded-2xl p-4 text-white font-bold outline-none focus:border-[#ffeb00] transition-colors"
                  placeholder="Judul Baris 1"
                />
                <input 
                  type="text" 
                  value={title2} 
                  onChange={(e) => setTitle2(e.target.value)}
                  className="w-full bg-white/10 border-2 border-white/10 rounded-2xl p-4 text-white font-bold outline-none focus:border-[#ffeb00] transition-colors"
                  placeholder="Judul Baris 2"
                />
                <textarea 
                  value={description} 
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-white/10 border-2 border-white/10 rounded-2xl p-4 text-white font-bold outline-none h-32 resize-none focus:border-[#ffeb00] transition-colors"
                  placeholder="Deskripsi Singkat"
                />
                <button 
                  onClick={handleSave}
                  className="w-full bg-[#ffeb00] text-[#e31e24] px-6 py-4 rounded-2xl font-black uppercase text-sm shadow-xl hover:scale-[1.02] transition-transform"
                >
                  <i className="fas fa-save mr-2"></i> Update Landing Page
                </button>
              </div>
            ) : (
              <>
                <div className="inline-flex items-center bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 mb-6 animate-in slide-in-from-top-4 duration-500">
                  <span className="w-2 h-2 rounded-full bg-green-400 mr-3 animate-pulse"></span>
                  <span className="text-[10px] font-black text-white uppercase tracking-[0.2em]">App Version 2.0 • Live Now</span>
                </div>
                <h1 className="animate-in fade-in slide-in-from-left-6 duration-700">
                  <span className="mt-1 block text-5xl tracking-tighter font-black sm:text-6xl xl:text-7xl text-white leading-none italic">
                    <span className="block">{title1}</span>
                    <span className="block text-[#ffeb00] drop-shadow-[0_10px_10px_rgba(0,0,0,0.3)]">{title2}</span>
                  </span>
                </h1>
                <p className="mt-6 text-lg text-red-50 sm:text-xl leading-relaxed font-medium max-w-xl animate-in fade-in duration-1000 delay-200">
                  {description}
                </p>
                
                <div className="mt-10 flex flex-wrap gap-4 sm:justify-center lg:justify-start animate-in fade-in slide-in-from-bottom-6 duration-700 delay-300">
                  <button className="bg-white text-[#e31e24] px-8 py-4 rounded-2xl font-black uppercase text-sm shadow-2xl hover:bg-[#ffeb00] hover:scale-105 transition-all flex items-center group">
                    <i className="fas fa-mobile-alt mr-3 group-hover:rotate-12 transition-transform"></i>
                    Buka Aplikasi
                  </button>
                  <button className="bg-transparent border-2 border-white/30 text-white px-8 py-4 rounded-2xl font-black uppercase text-sm hover:bg-white/10 transition-all flex items-center">
                    <i className="fas fa-info-circle mr-3"></i>
                    Tentang X450
                  </button>
                </div>
              </>
            )}
            
            <div className="mt-12 pt-8 border-t border-white/10 sm:max-w-lg sm:mx-auto lg:mx-0 lg:max-w-none animate-in fade-in duration-1000 delay-500">
               <div className="flex flex-col sm:flex-row items-center gap-8 justify-center lg:justify-start">
                  <div className="flex flex-col items-center lg:items-start gap-2">
                    <div className="flex -space-x-3">
                      {[1,2,3,4,5].map(i => (
                        <div key={i} className="w-10 h-10 rounded-full border-4 border-[#e31e24] overflow-hidden bg-white">
                          <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i * 123}`} alt="avatar" />
                        </div>
                      ))}
                      <div className="w-10 h-10 rounded-full border-4 border-[#e31e24] bg-[#ffeb00] flex items-center justify-center text-[10px] font-black text-[#e31e24]">
                        +8
                      </div>
                    </div>
                    <p className="text-[10px] font-black text-white uppercase tracking-widest opacity-60">Aktif Digunakan Seluruh Personil</p>
                  </div>
                  <CalendarWidget />
               </div>
            </div>
          </div>
          
          <div className="mt-16 lg:mt-0 lg:col-span-5 relative flex justify-center lg:justify-end animate-in zoom-in-90 duration-1000 delay-200">
            {/* Mockup Frame */}
            <div className="relative w-full max-w-[320px] aspect-[9/19] bg-gray-900 rounded-[3rem] border-[8px] border-gray-800 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] overflow-hidden">
               {/* Speaker/Notch */}
               <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-gray-800 rounded-b-2xl z-30 shadow-md"></div>
               
               {/* App Content Preview */}
               <div className="absolute inset-0 bg-gray-50 overflow-hidden flex flex-col">
                  {/* Fake App Navbar */}
                  <div className="bg-[#e31e24] pt-10 pb-4 px-6 text-white flex justify-between items-center shadow-lg relative z-20">
                    <div className="flex items-center gap-2">
                       <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></span>
                       <span className="font-black italic text-xs tracking-tighter">X450 NEWS FEED</span>
                    </div>
                    <i className="fas fa-search text-[10px] opacity-70"></i>
                  </div>

                  <div className="flex-grow overflow-y-auto custom-scrollbar p-4 space-y-4">
                     <div className="flex items-center justify-between mb-2">
                        <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Berita & Promo</h4>
                        <span className="text-[8px] font-bold text-[#e31e24] bg-red-50 px-2 py-0.5 rounded-full">LIVE</span>
                     </div>

                     {NEWS_ITEMS.map((item, idx) => (
                       <div 
                         key={item.id} 
                         className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden animate-in slide-in-from-bottom-2 duration-500 flex flex-col" 
                         style={{ animationDelay: `${idx * 150}ms` }}
                       >
                          <div className="h-24 w-full overflow-hidden relative">
                             <img src={item.imageUrl} className="w-full h-full object-cover" alt="news" />
                             <div className="absolute top-2 left-2">
                                <span className={`text-[7px] font-black text-white px-2 py-0.5 rounded-full uppercase tracking-tighter shadow-sm ${
                                   item.category === 'Promo' ? 'bg-[#e31e24]' : 'bg-[#0055a5]'
                                }`}>
                                   {item.category}
                                </span>
                             </div>
                          </div>
                          <div className="p-3">
                             <p className="text-[10px] font-black text-gray-800 leading-tight mb-1 line-clamp-1">{item.title}</p>
                             <div className="flex items-center justify-between">
                                <p className="text-[7px] text-gray-400 font-bold uppercase">{item.date}</p>
                                <i className="fas fa-chevron-right text-[8px] text-gray-300"></i>
                             </div>
                          </div>
                       </div>
                     ))}

                     {/* Extra Small Cards for Variation */}
                     <div className="grid grid-cols-2 gap-3">
                        <div className="bg-[#ffeb00] p-3 rounded-2xl shadow-sm border border-yellow-200">
                           <i className="fas fa-bolt text-[#e31e24] text-xs mb-1"></i>
                           <p className="text-[8px] font-black text-gray-900 leading-none">Flash Sale</p>
                           <p className="text-[6px] text-gray-600 font-bold mt-1">Mulai 16:00</p>
                        </div>
                        <div className="bg-[#0055a5] p-3 rounded-2xl shadow-sm border border-blue-400 text-white">
                           <i className="fas fa-gift text-yellow-300 text-xs mb-1"></i>
                           <p className="text-[8px] font-black leading-none">Voucher</p>
                           <p className="text-[6px] text-blue-100 font-bold mt-1">Cek Sekarang</p>
                        </div>
                     </div>
                  </div>
                  
                  {/* Fake Navigation Bar */}
                  <div className="bg-white border-t border-gray-100 py-3 px-6 flex justify-between items-center relative z-20">
                    <i className="fas fa-home text-gray-300 text-xs"></i>
                    <i className="fas fa-newspaper text-[#e31e24] text-xs"></i>
                    <div className="w-8 h-8 bg-[#ffeb00] rounded-full flex items-center justify-center text-[#e31e24] -mt-6 shadow-xl border-4 border-white">
                      <i className="fas fa-plus text-xs"></i>
                    </div>
                    <i className="fas fa-images text-gray-300 text-xs"></i>
                    <i className="fas fa-user text-gray-300 text-xs"></i>
                  </div>
               </div>
            </div>
            
            {/* Decorative Card */}
            <div className="absolute -bottom-6 -left-12 bg-white p-4 rounded-3xl shadow-2xl hidden xl:block animate-bounce-slow z-40">
               <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center text-green-600">
                    <i className="fas fa-check-circle text-xl"></i>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase">Status Toko</p>
                    <p className="text-sm font-black text-gray-900">Siap Melayani</p>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
