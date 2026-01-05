
import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";

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
      // Create a fresh instance of GoogleGenAI as recommended for API interactions
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: "Berikan 5 saran nama domain unik dan profesional untuk website album kenangan Alfamart Citaringgul X450. Gunakan akhiran .id, .com, atau .site. Berikan hanya daftar namanya saja.",
      });
      const text = response.text || "";
      setSuggestions(text.split('\n').filter(s => s.trim() !== ''));
    } catch (error) {
      setSuggestions(['citaringgulx450.id', 'alfamartx450.com', 'kenangan-x450.site']);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  if (!isAdmin) return <div className="text-center py-20 text-white font-black">AKSES DITOLAK</div>;

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden border-8 border-white/10">
        <div className="bg-[#0055a5] p-10 text-white relative">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <i className="fas fa-globe text-8xl"></i>
          </div>
          <h2 className="text-3xl font-black uppercase tracking-tighter italic">Pengaturan Domain & Situs</h2>
          <p className="text-blue-100 font-bold opacity-80 uppercase tracking-widest text-xs mt-2">Kelola Identitas Digital X450</p>
        </div>

        <div className="p-10 space-y-12">
          {/* Domain Suggestion Section */}
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-black text-gray-900 flex items-center">
                <i className="fas fa-lightbulb text-[#ffeb00] mr-3 bg-gray-900 p-2 rounded-lg"></i>
                Saran Nama Domain (AI)
              </h3>
              <button 
                onClick={generateDomainSuggestions}
                disabled={isGenerating}
                className="bg-[#e31e24] text-white px-4 py-2 rounded-xl font-black text-[10px] uppercase tracking-widest hover:scale-105 transition-transform disabled:opacity-50"
              >
                {isGenerating ? 'Mencari...' : 'Cari Ide Baru'}
              </button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {suggestions.length > 0 ? suggestions.map((s, i) => (
                <div key={i} className="bg-gray-50 border-2 border-gray-100 p-4 rounded-2xl flex items-center justify-between group hover:border-[#0055a5] transition-colors cursor-pointer">
                  <span className="font-bold text-gray-700">{s.replace(/^\d+\.\s*/, '')}</span>
                  <i className="fas fa-arrow-right text-gray-300 group-hover:text-[#0055a5] transition-colors"></i>
                </div>
              )) : (
                <div className="col-span-2 py-8 text-center border-2 border-dashed border-gray-100 rounded-3xl text-gray-400 font-bold italic">
                  Klik tombol di atas untuk mendapatkan saran domain dari AI.
                </div>
              )}
            </div>
            <p className="text-[10px] text-gray-400 font-bold italic">Note: Anda perlu mendaftarkan nama ini secara manual di penyedia layanan domain (Niagahoster, Rumahweb, dll).</p>
          </section>

          <hr className="border-gray-100" />

          {/* Site Identity Section */}
          <form onSubmit={handleSave} className="space-y-8">
            <h3 className="text-xl font-black text-gray-900 flex items-center">
              <i className="fas fa-id-card text-[#0055a5] mr-3"></i>
              Identitas Global Website
            </h3>
            
            <div className="grid grid-cols-1 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Judul Website (SEO)</label>
                <input 
                  type="text" 
                  value={siteName}
                  onChange={(e) => setSiteName(e.target.value)}
                  className="w-full p-4 bg-gray-50 border-2 border-gray-100 rounded-2xl font-bold focus:border-[#0055a5] outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Tagline Utama</label>
                <input 
                  type="text" 
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  className="w-full p-4 bg-gray-50 border-2 border-gray-100 rounded-2xl font-bold focus:border-[#0055a5] outline-none"
                />
              </div>

              <div className="bg-yellow-50 border-2 border-yellow-100 p-6 rounded-[2rem] flex items-start">
                <i className="fas fa-shield-halved text-yellow-600 mt-1 mr-4 text-xl"></i>
                <div>
                  <h4 className="font-black text-gray-900 text-sm mb-1 uppercase tracking-tight">Status SSL & Keamanan</h4>
                  <p className="text-xs font-medium text-gray-600 leading-relaxed">Website saat ini berjalan di lingkungan aman. Jika sudah memiliki domain asli, pastikan sertifikat SSL (HTTPS) sudah terpasang agar gembok hijau muncul di browser.</p>
                </div>
              </div>
            </div>

            <button 
              type="submit"
              className={`w-full py-4 rounded-2xl font-black uppercase tracking-widest text-sm shadow-xl transition-all flex items-center justify-center ${
                isSaved ? 'bg-green-500 text-white' : 'bg-[#e31e24] text-white hover:bg-red-700'
              }`}
            >
              {isSaved ? (
                <><i className="fas fa-check-circle mr-3"></i> Perubahan Disimpan!</>
              ) : (
                <><i className="fas fa-save mr-3"></i> Simpan Konfigurasi Situs</>
              )}
            </button>
          </form>
        </div>
        
        <div className="p-8 bg-gray-50 border-t border-gray-100 text-center">
          <p className="text-[10px] font-black text-gray-300 uppercase tracking-[0.4em]">Webmaster Dashboard X450</p>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
