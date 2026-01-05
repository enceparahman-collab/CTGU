
import React, { useState } from 'react';

interface AdminLoginProps {
  onLogin: (success: boolean) => void;
  onCancel: () => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin, onCancel }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Kredensial hardcoded untuk akses admin
    if (username === 'admin' && password === 'X450admin') {
      onLogin(true);
    } else {
      setError('Username atau password salah!');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 py-12">
      <div className="bg-white rounded-[3rem] shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-500 border-8 border-white/10">
        <div className="bg-[#e31e24] p-10 text-center relative">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#ffeb00] rounded-full opacity-20 blur-2xl"></div>
          <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl transform -rotate-6">
            <i className="fas fa-user-shield text-4xl text-[#e31e24]"></i>
          </div>
          <h2 className="text-3xl font-black text-white uppercase tracking-tighter">Login Admin</h2>
          <p className="text-red-100 font-bold text-sm mt-2 opacity-80 uppercase tracking-widest">Akses Pengelola X450</p>
        </div>

        <form onSubmit={handleLogin} className="p-10 space-y-6">
          {error && (
            <div className="bg-red-50 text-[#e31e24] p-4 rounded-2xl text-xs font-black uppercase tracking-widest flex items-center border-2 border-red-100 animate-bounce">
              <i className="fas fa-exclamation-triangle mr-3"></i>
              {error}
            </div>
          )}

          <div className="space-y-2">
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">Username</label>
            <div className="relative">
              <i className="fas fa-user absolute left-5 top-1/2 -translate-y-1/2 text-gray-300"></i>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-12 pr-6 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:border-[#e31e24] focus:ring-0 outline-none transition-all font-bold text-gray-800"
                placeholder="Admin ID"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">Password</label>
            <div className="relative">
              <i className="fas fa-lock absolute left-5 top-1/2 -translate-y-1/2 text-gray-300"></i>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-14 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:border-[#e31e24] focus:ring-0 outline-none transition-all font-bold text-gray-800"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#e31e24] transition-colors focus:outline-none"
                aria-label={showPassword ? "Sembunyikan password" : "Lihat password"}
              >
                <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'} text-lg`}></i>
              </button>
            </div>
          </div>

          {/* Info Login Section */}
          <div className="bg-blue-50 border-2 border-blue-100 rounded-2xl p-4 flex items-start">
            <i className="fas fa-info-circle text-[#0055a5] mt-1 mr-3"></i>
            <div>
              <p className="text-[10px] font-black text-[#0055a5] uppercase tracking-widest mb-1">Akses Masuk:</p>
              <p className="text-xs font-bold text-gray-600">ID: <span className="text-[#e31e24]">admin</span></p>
              <p className="text-xs font-bold text-gray-600">Password: <span className="text-[#e31e24]">X450admin</span></p>
            </div>
          </div>

          <div className="pt-4 space-y-3">
            <button
              type="submit"
              className="w-full bg-[#0055a5] hover:bg-blue-700 text-white font-black py-4 rounded-2xl shadow-xl shadow-blue-100 transition-all flex items-center justify-center uppercase tracking-widest"
            >
              Masuk Sistem <i className="fas fa-sign-in-alt ml-3"></i>
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-500 font-black py-4 rounded-2xl transition-all uppercase tracking-widest text-xs"
            >
              Kembali
            </button>
          </div>
        </form>
        
        <div className="p-6 bg-gray-50 text-center border-t border-gray-100">
          <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest">
            Sistem Keamanan Terpadu Citaringgul X450
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
