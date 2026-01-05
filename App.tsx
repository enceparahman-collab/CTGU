
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TeamGrid from './components/TeamGrid';
import Gallery from './components/Gallery';
import Guestbook from './components/Guestbook';
import MemoryGenerator from './components/MemoryGenerator';
import NewsSection from './components/NewsSection';
import AdminLogin from './components/AdminLogin';
import SettingsPage from './components/SettingsPage';
import DonationPage from './components/DonationPage';
import RunningText from './components/RunningText';
import JSMPromoBanner from './components/JSMPromoBanner';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const savedAdminStatus = localStorage.getItem('isAdmin');
    if (savedAdminStatus === 'true') {
      setIsAdmin(true);
    }
  }, []);

  const handleAdminLogin = (success: boolean) => {
    if (success) {
      setIsAdmin(true);
      localStorage.setItem('isAdmin', 'true');
      setCurrentPage('home');
    }
  };

  const handleLogout = () => {
    setIsAdmin(false);
    localStorage.removeItem('isAdmin');
    setCurrentPage('home');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <div className="animate-in fade-in duration-700">
            <JSMPromoBanner />
            <Hero isAdmin={isAdmin} />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-20">
              <MemoryGenerator />
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
               <div className="text-center mb-16">
                  <h2 className="text-3xl font-black text-white uppercase tracking-tighter sm:text-4xl">Fitur Utama Aplikasi</h2>
                  <div className="h-1.5 w-20 bg-[#ffeb00] mx-auto mt-4 rounded-full"></div>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="bg-white/10 backdrop-blur-md p-10 rounded-[2.5rem] text-white border border-white/20 group hover:bg-white/20 transition-all duration-500 shadow-xl">
                     <div className="w-16 h-16 bg-[#ffeb00] rounded-2xl flex items-center justify-center mb-8 shadow-lg transform group-hover:rotate-12 transition-transform">
                        <i className="fas fa-brain text-3xl text-[#e31e24]"></i>
                     </div>
                     <h3 className="text-2xl font-black mb-4 tracking-tight">AI Story Enhancement</h3>
                     <p className="text-red-50 opacity-80 leading-relaxed font-medium">Teknologi Gemini AI yang merangkai setiap kata ingatan pendek menjadi narasi puitis yang menyentuh hati.</p>
                  </div>
                  <div className="bg-[#ffeb00] p-10 rounded-[2.5rem] text-gray-900 shadow-2xl transform md:-translate-y-4 group hover:scale-[1.02] transition-all duration-500">
                     <div className="w-16 h-16 bg-black/10 rounded-2xl flex items-center justify-center mb-8 transform group-hover:-rotate-12 transition-transform">
                        <i className="fas fa-hand-holding-heart text-3xl text-[#e31e24]"></i>
                     </div>
                     <h3 className="text-2xl font-black mb-4 tracking-tight text-[#e31e24]">Donasi & Santunan</h3>
                     <p className="text-gray-800 font-bold leading-relaxed">Wadah digital untuk saling berbagi dan membantu sesama di lingkungan Alfamart Citaringgul X450.</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-md p-10 rounded-[2.5rem] text-white border border-white/20 group hover:bg-white/20 transition-all duration-500 shadow-xl">
                     <div className="w-16 h-16 bg-[#0055a5] rounded-2xl flex items-center justify-center mb-8 shadow-lg transform group-hover:rotate-12 transition-transform">
                        <i className="fas fa-shield-alt text-3xl text-white"></i>
                     </div>
                     <h3 className="text-2xl font-black mb-4 tracking-tight">Admin Dashboard</h3>
                     <p className="text-red-50 opacity-80 leading-relaxed font-medium">Panel kontrol khusus bagi Chief Of Store dan asisten untuk mengelola konten dan personil secara real-time.</p>
                  </div>
               </div>
            </div>
          </div>
        );
      case 'team': return <TeamGrid isAdmin={isAdmin} />;
      case 'news': return <NewsSection isAdmin={isAdmin} />;
      case 'gallery': return <Gallery isAdmin={isAdmin} />;
      case 'guestbook': return <Guestbook isAdmin={isAdmin} />;
      case 'donasi': return <DonationPage />;
      case 'settings': return <SettingsPage isAdmin={isAdmin} />;
      case 'admin-login': return <AdminLogin onLogin={handleAdminLogin} onCancel={() => setCurrentPage('home')} />;
      default: return <Hero isAdmin={isAdmin} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col selection:bg-[#ffeb00] selection:text-[#e31e24]">
      <div className="h-1.5 bg-gradient-to-r from-[#0055a5] via-[#ffeb00] to-[#e31e24] w-full"></div>
      {isAdmin && (
        <div className="bg-[#ffeb00] text-[#e31e24] py-1.5 text-center text-[10px] font-black uppercase tracking-[0.5em] flex items-center justify-center sticky top-0 z-[60]">
          <i className="fas fa-shield-alt mr-3"></i> Admin Control Active
        </div>
      )}
      <Navbar onNavigate={setCurrentPage} currentPage={currentPage} isAdmin={isAdmin} onLogout={handleLogout} />
      <RunningText />
      <main className="flex-grow">{renderPage()}</main>
      <footer className="bg-[#0f172a] text-white py-16 border-t border-white/5 relative overflow-hidden">
        {/* Background Decor for Footer */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-4xl bg-gradient-to-b from-[#e31e24]/10 to-transparent pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-center gap-10 relative z-10">
          <div className="flex items-center gap-6">
            <img src="https://upload.wikimedia.org/wikipedia/commons/8/86/Alfamart_logo.svg" alt="Alfamart" className="h-6 brightness-0 invert opacity-40" />
            <div className="w-px h-6 bg-white/10"></div>
            <span className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40">STORE CODE: X450</span>
          </div>

          <div className="text-center space-y-6">
            <div className="flex flex-col items-center">
              <p className="text-[9px] font-black uppercase tracking-[0.5em] text-white/30 mb-4 italic">Developed with Pride by</p>
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#e31e24] to-[#ffeb00] rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative bg-black/40 border border-white/10 px-10 py-4 rounded-2xl backdrop-blur-xl flex flex-col items-center">
                  <p className="text-[#ffeb00] text-lg font-black tracking-[0.4em] uppercase italic drop-shadow-[0_4px_8px_rgba(255,235,0,0.3)]">
                    ENCEP ABDU ROHMAN
                  </p>
                  <p className="text-[8px] font-bold text-white/40 uppercase tracking-[0.2em] mt-2">X450 Assistant of Store & Developer</p>
                </div>
              </div>
            </div>
            
            <div className="pt-6">
               <p className="text-[8px] font-black uppercase tracking-[0.3em] text-white/20">
                 &copy; {new Date().getFullYear()} ALFAMART CITARINGGUL X450 &bull; ALL RIGHTS RESERVED
               </p>
            </div>
          </div>

          <div className="flex gap-8 text-white/10 text-lg">
            <i className="fas fa-heart hover:text-red-500 transition-colors cursor-pointer"></i>
            <i className="fas fa-code hover:text-blue-500 transition-colors cursor-pointer"></i>
            <i className="fas fa-bolt hover:text-yellow-400 transition-colors cursor-pointer"></i>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
