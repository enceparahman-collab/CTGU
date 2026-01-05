
import React from 'react';

const CalendarWidget: React.FC = () => {
  const now = new Date();
  
  const dayName = new Intl.DateTimeFormat('id-ID', { weekday: 'long' }).format(now);
  const dayNumber = now.getDate();
  const monthName = new Intl.DateTimeFormat('id-ID', { month: 'long' }).format(now);
  const year = now.getFullYear();

  return (
    <div className="relative group perspective-1000">
      <div className="w-32 sm:w-40 bg-white rounded-3xl overflow-hidden shadow-2xl transform transition-all duration-500 group-hover:rotate-y-12 group-hover:scale-105 border-4 border-white/20">
        {/* Header Bulan - Merah Alfamart */}
        <div className="bg-[#e31e24] py-2 px-4 text-center">
          <span className="text-[10px] sm:text-xs font-black text-white uppercase tracking-widest">
            {monthName}
          </span>
        </div>
        
        {/* Angka Tanggal - Kuning Alfamart */}
        <div className="bg-white py-4 sm:py-6 flex flex-col items-center justify-center">
          <span className="text-4xl sm:text-5xl font-black text-gray-900 leading-none">
            {dayNumber}
          </span>
          <div className="h-1 w-8 bg-[#ffeb00] mt-2 rounded-full"></div>
        </div>
        
        {/* Footer Hari - Biru Alfamart */}
        <div className="bg-[#0055a5] py-2 px-4 text-center">
          <span className="text-[10px] sm:text-xs font-black text-white uppercase tracking-widest">
            {dayName}
          </span>
        </div>
      </div>
      
      {/* Decorative dots to look like a ring binder */}
      <div className="absolute -top-2 left-1/2 -translate-x-1/2 flex space-x-4 z-10">
        <div className="w-3 h-3 rounded-full bg-gray-300 shadow-inner"></div>
        <div className="w-3 h-3 rounded-full bg-gray-300 shadow-inner"></div>
      </div>
      
      {/* Reflection effect */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-white/0 pointer-events-none rounded-3xl"></div>
    </div>
  );
};

export default CalendarWidget;
