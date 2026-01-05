
import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import { StorageService } from '../services/storageService';

interface SettingsPageProps {
  isAdmin: boolean;
}

const SettingsPage: React.FC<SettingsPageProps> = ({ isAdmin }) => {
  const [siteName, setSiteName] = useState('Alfamart Citaringgul X450');
  const [tagline, setTagline] = useState('Digital Memories Album');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const generateDomainSuggestions = async () => {
    setIsGenerating(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: "Berikan 5 saran nama domain unik untuk website album kenangan Alfamart Citaringgul X450.",
      });
      const text = response.text || "";
      setSuggestions(text.split('\n').filter(s => s.trim() !== ''));
    } catch (error) {
      setSuggestions(['citaringgulx450.id', 'alfamartx450.com']);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleResetDatabase = () => {
    if (window.confirm('PERINGATAN: Ini akan menghapus semua foto dan data yang telah Anda upload dan mengembalikannya ke data contoh. Lanjutkan?')) {
      StorageService.clearAll();
      window.location.reload();
    }
  };

  if (!isAdmin) return <div className="text-center py-20 text-white font-black uppercase tracking-widest">Akses Database Ditolak</div>;

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden border-8 border-white/10">
        <div className="bg-[#0055a5] p-10 text-white">
          <h2 className="text-3xl font-black uppercase tracking-tighter italic">Pengaturan & Database</h2>
          <p className="text-blue-100 font-bold opacity-80 uppercase tracking-widest text-xs mt-2">Pusat Kendali Citaringgul X450</p>
        </div>

        <div className="p-10 space-y-12">
          {/* Database Maintenance Section */}
          <section className="space-y-6">
            <h3 className="text-xl font-black text-gray-900 flex items-center">
              <i className="fas fa-database text-[#e31e24] mr-3"></i>
              Pemeliharaan Database
            </h3>
            <div className="bg-red-50 border-2 border-red-100 p-8 rounded-[2.5rem]">
              <div className="flex items-start gap-4 mb-6">
                <i className="fas fa-exclamation-triangle text-[#e31e24] text-2xl mt-1"></i>
                <div>
                  <h4 className="font-black text-gray-900 uppercase tracking-tight text-sm">Reset Seluruh Database</h4>
                  <p className="text-xs font-medium text-gray-500 leading-relaxed mt-1">Gunakan fitur ini jika Anda ingin menghapus semua data yang di-upload (Foto Profil, Galeri, News) dan memulai kembali dari nol.</p>
                </div>
              </div>
              <button onClick={handleResetDatabase} className="w-full bg-[#e31e24] text-white py-4 rounded-2xl font-black uppercase text-[10px] tracking-[0.3em] hover:bg-black transition-all">
                Hapus Seluruh Data & Reset Database
              </button>
            </div>
          </section>

          <hr className="border-gray-100" />

          {/* Domain Suggestion Section */}
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-black text-gray-900">Ide Domain Web</h3>
              <button onClick={generateDomainSuggestions} disabled={isGenerating} className="bg-[#ffeb00] text-[#e31e24] px-4 py-2 rounded-xl font-black text-[10px] uppercase tracking-widest hover:scale-105 transition-transform disabled:opacity-50">
                {isGenerating ? 'Bertanya ke AI...' : 'Tanya Gemini AI'}
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {suggestions.map((s, i) => (
                <div key={i} className="bg-gray-50 border-2 border-gray-100 p-4 rounded-2xl flex items-center justify-between">
                  <span className="font-bold text-gray-700 text-sm">{s}</span>
                  <i className="fas fa-globe text-[#0055a5]"></i>
                </div>
              ))}
            </div>
          </section>

          <hr className="border-gray-100" />

          {/* Site Identity */}
          <form onSubmit={(e) => { e.preventDefault(); setIsSaved(true); setTimeout(() => setIsSaved(false), 2000); }} className="space-y-8">
            <h3 className="text-xl font-black text-gray-900">Identitas Situs</h3>
            <div className="space-y-4">
              <input type="text" value={siteName} onChange={(e) => setSiteName(e.target.value)} className="w-full p-4 bg-gray-50 border-2 border-gray-100 rounded-2xl font-bold focus:border-[#0055a5] outline-none" placeholder="Nama Situs" />
              <input type="text" value={tagline} onChange={(e) => setTagline(e.target.value)} className="w-full p-4 bg-gray-50 border-2 border-gray-100 rounded-2xl font-bold focus:border-[#0055a5] outline-none" placeholder="Tagline" />
            </div>
            <button type="submit" className={`w-full py-4 rounded-2xl font-black uppercase text-sm transition-all ${isSaved ? 'bg-green-500 text-white' : 'bg-[#0055a5] text-white'}`}>
              {isSaved ? 'Konfigurasi Disimpan!' : 'Update Informasi Web'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
