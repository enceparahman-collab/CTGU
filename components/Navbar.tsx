
import React, { useState } from 'react';

interface NavbarProps {
  onNavigate: (page: string) => void;
  currentPage: string;
  isAdmin: boolean;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate, currentPage, isAdmin, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Beranda', icon: 'fa-home' },
    { id: 'team', label: 'Team Kita', icon: 'fa-users' },
    { id: 'news', label: 'Berita', icon: 'fa-newspaper' },
    { id: 'gallery', label: 'Galeri', icon: 'fa-images' },
    { id: 'donasi', label: 'Donasi', icon: 'fa-hand-holding-heart' },
    { id: 'guestbook', label: 'Buku Tamu', icon: 'fa-book-open' },
  ];

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center space-x-4">
            <div 
              className="flex items-center cursor-pointer" 
              onClick={() => onNavigate('home')}
            >
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/8/86/Alfamart_logo.svg" 
                alt="Alfamart Logo" 
                className="h-10 w-auto object-contain"
              />
              <div className="ml-4 pl-4 border-l border-gray-200 hidden sm:block">
                <span className="block text-xs font-bold text-gray-400 uppercase tracking-tighter">Official Store</span>
                <span className="block text-sm font-black text-gray-800 tracking-tight">CITARINGGUL X450</span>
              </div>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`px-4 py-2 rounded-full text-sm font-bold transition-all duration-300 ${
                  currentPage === item.id
                    ? 'text-white bg-[#e31e24] shadow-md shadow-red-100'
                    : 'text-gray-600 hover:text-[#e31e24] hover:bg-red-50'
                }`}
              >
                <i className={`fas ${item.icon} mr-2`}></i>
                {item.label}
              </button>
            ))}
            
            <div className="w-px h-8 bg-gray-100 mx-2"></div>
            
            {isAdmin ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onNavigate('settings')}
                  className={`px-4 py-2 rounded-full text-xs font-black transition-all uppercase tracking-widest flex items-center ${
                    currentPage === 'settings' ? 'bg-[#0055a5] text-white' : 'text-[#0055a5] bg-blue-50'
                  }`}
                  title="Pengaturan Domain & Situs"
                >
                  <i className="fas fa-cog mr-2"></i> DOMAIN
                </button>
                <button
                  onClick={onLogout}
                  className="px-4 py-2 rounded-full text-xs font-black text-[#e31e24] bg-red-50 hover:bg-red-100 transition-all uppercase tracking-widest border-2 border-red-200 flex items-center"
                >
                  <i className="fas fa-power-off mr-2"></i> LOGOUT
                </button>
              </div>
            ) : (
              <button
                onClick={() => onNavigate('admin-login')}
                className="px-4 py-2 rounded-full text-xs font-black text-gray-400 hover:text-[#0055a5] hover:bg-blue-50 transition-all uppercase tracking-widest flex items-center"
              >
                <i className="fas fa-lock mr-2"></i> ADMIN
              </button>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 focus:outline-none transition-colors"
            >
              <i className={`fas ${isOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 pb-4 pt-2 shadow-xl animate-in fade-in slide-in-from-top-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onNavigate(item.id);
                setIsOpen(false);
              }}
              className={`flex items-center w-full text-left px-6 py-4 text-base font-bold ${
                currentPage === item.id
                  ? 'text-[#e31e24] bg-red-50 border-r-4 border-[#e31e24]'
                  : 'text-gray-600 hover:text-[#e31e24] hover:bg-red-50'
              }`}
            >
              <i className={`fas ${item.icon} w-8 text-center mr-3`}></i>
              {item.label}
            </button>
          ))}
          
          <div className="px-6 py-4 mt-2 border-t border-gray-50 flex flex-col space-y-4">
             {isAdmin ? (
               <>
                <button onClick={() => { onNavigate('settings'); setIsOpen(false); }} className="text-left font-black text-[#0055a5] text-xs uppercase tracking-widest flex items-center">
                   <i className="fas fa-cog mr-3"></i> Pengaturan Domain
                 </button>
                 <button onClick={onLogout} className="text-left font-black text-[#e31e24] text-xs uppercase tracking-widest flex items-center">
                   <i className="fas fa-power-off mr-3"></i> Logout Admin
                 </button>
               </>
             ) : (
               <button onClick={() => { onNavigate('admin-login'); setIsOpen(false); }} className="text-left font-black text-gray-400 text-xs uppercase tracking-widest flex items-center">
                 <i className="fas fa-lock mr-3"></i> Admin Login
               </button>
             )}
             <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">Store ID: X450</span>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
