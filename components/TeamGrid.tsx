
import React, { useState, useEffect, useRef } from 'react';
import { TEAM_MEMBERS } from '../constants';
import { TeamMember } from '../types';
import { generateTeamVibe } from '../services/geminiService';

interface TeamGridProps {
  isAdmin?: boolean;
}

const TeamGrid: React.FC<TeamGridProps> = ({ isAdmin }) => {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [teamQuote, setTeamQuote] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form State
  const [newName, setNewName] = useState('');
  const [newRole, setNewRole] = useState('');
  const [newQuote, setNewQuote] = useState('');
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load members from localStorage or fallback to constants
  useEffect(() => {
    const savedMembers = localStorage.getItem('x450_team_members');
    if (savedMembers) {
      setMembers(JSON.parse(savedMembers));
    } else {
      setMembers(TEAM_MEMBERS);
    }
  }, []);

  // Save to localStorage whenever members change
  useEffect(() => {
    if (members.length > 0) {
      localStorage.setItem('x450_team_members', JSON.stringify(members));
    }
  }, [members]);

  const fetchVibe = async () => {
    if (members.length === 0) return;
    setIsGenerating(true);
    const names = members.map(m => m.name);
    const quote = await generateTeamVibe(names);
    setTeamQuote(quote);
    setIsGenerating(false);
  };

  useEffect(() => {
    if (members.length > 0) {
      fetchVibe();
    }
  }, [members.length]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Limit file size to ~2MB for localStorage safety
      if (file.size > 2 * 1024 * 1024) {
        alert("Ukuran foto terlalu besar. Gunakan foto di bawah 2MB agar tersimpan dengan baik.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleOpenEdit = (member: TeamMember) => {
    setEditingId(member.id);
    setNewName(member.name);
    setNewRole(member.role);
    setNewQuote(member.quote);
    setPreviewImage(member.imageUrl);
    setIsModalOpen(true);
  };

  const handleOpenAdd = () => {
    setEditingId(null);
    setNewName('');
    setNewRole('');
    setNewQuote('');
    setPreviewImage(null);
    setIsModalOpen(true);
  };

  const handleSaveMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newRole || !previewImage) {
        alert("Mohon lengkapi nama, jabatan, dan upload foto profil.");
        return;
    }

    let updatedMembers;
    if (editingId) {
      updatedMembers = members.map(m => m.id === editingId ? {
        ...m,
        name: newName.toUpperCase(),
        role: newRole.toUpperCase(),
        quote: newQuote || "Semangat melayani!",
        imageUrl: previewImage
      } : m);
    } else {
      const newMember: TeamMember = {
        id: Date.now().toString(),
        name: newName.toUpperCase(),
        role: newRole.toUpperCase(),
        quote: newQuote || "Semangat melayani!",
        imageUrl: previewImage
      };
      updatedMembers = [newMember, ...members];
    }

    setMembers(updatedMembers);
    setIsModalOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setNewName('');
    setNewRole('');
    setNewQuote('');
    setPreviewImage(null);
    setEditingId(null);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Hapus anggota tim ini dari database?')) {
      const updated = members.filter(m => m.id !== id);
      setMembers(updated);
      localStorage.setItem('x450_team_members', JSON.stringify(updated));
    }
  };

  return (
    <div className="py-16 bg-gradient-to-b from-[#e31e24] to-[#af171c] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20 relative">
          <div className="inline-block px-6 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-6">
             <span className="text-[#ffeb00] text-[10px] font-black uppercase tracking-[0.5em]">The Avengers of X450</span>
          </div>
          <h2 className="text-4xl font-black text-white sm:text-6xl drop-shadow-2xl uppercase tracking-tighter italic leading-none">
            PERSONIL <span className="text-[#ffeb00]">SUPER</span>
          </h2>
          <p className="text-red-100 font-bold mt-4 opacity-80 uppercase tracking-widest text-xs">Database Karyawan Alfamart Citaringgul</p>
          
          {isAdmin && (
            <div className="mt-10 flex justify-center gap-4">
              <button 
                onClick={handleOpenAdd}
                className="bg-[#ffeb00] text-[#e31e24] px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl hover:bg-white hover:scale-110 transition-all inline-flex items-center"
              >
                <i className="fas fa-user-plus mr-3 text-lg"></i> Tambah Karyawan
              </button>
              <button 
                onClick={() => {
                   if(window.confirm('Reset ke data awal? Semua foto yang di-upload akan hilang.')) {
                      localStorage.removeItem('x450_team_members');
                      window.location.reload();
                   }
                }}
                className="bg-black/20 text-white/60 px-6 py-4 rounded-2xl font-black text-[9px] uppercase tracking-widest hover:text-white transition-all"
              >
                Reset Database
              </button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
          {members.map((person) => (
            <div key={person.id} className="group flex flex-col items-center relative transition-all duration-500 hover:-translate-y-4">
              {/* Lanyard Digital Effect */}
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-32 h-20 border-t-8 border-x-8 border-[#0055a5] rounded-t-full opacity-40 group-hover:opacity-100 transition-opacity"></div>
              
              <div className="relative w-full max-w-[280px] bg-white rounded-[2rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] overflow-hidden border-t-[12px] border-[#e31e24] group-hover:shadow-[#ffeb0040] transition-all">
                {/* ID Card Header */}
                <div className="bg-[#e31e24] px-6 py-3 flex justify-between items-center">
                   <img src="https://upload.wikimedia.org/wikipedia/commons/8/86/Alfamart_logo.svg" className="h-4 brightness-0 invert" alt="logo" />
                   <span className="text-[8px] font-black text-white opacity-60 uppercase tracking-widest">ID: X450-{person.id.slice(-4)}</span>
                </div>

                {/* Photo Section */}
                <div className="p-6">
                  <div className="relative aspect-square rounded-2xl overflow-hidden shadow-inner bg-gray-100 border-4 border-gray-50 group-hover:border-[#ffeb00] transition-colors">
                    <img
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                      src={person.imageUrl}
                      alt={person.name}
                    />
                    
                    {/* Admin Tools on Card */}
                    {isAdmin && (
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity gap-4">
                        <button 
                          onClick={() => handleOpenEdit(person)}
                          className="w-12 h-12 rounded-full bg-white text-[#0055a5] flex items-center justify-center hover:scale-110 transition-transform"
                        >
                          <i className="fas fa-edit"></i>
                        </button>
                        <button 
                          onClick={() => handleDelete(person.id)}
                          className="w-12 h-12 rounded-full bg-red-600 text-white flex items-center justify-center hover:scale-110 transition-transform"
                        >
                          <i className="fas fa-trash-alt"></i>
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Info Section */}
                <div className="px-6 pb-8 text-center">
                  <h3 className="text-xl font-black text-gray-900 tracking-tight leading-none mb-1 break-words px-2">{person.name}</h3>
                  <div className="inline-block px-3 py-1 bg-[#0055a5] rounded-full mb-4">
                    <p className="text-white text-[8px] uppercase tracking-[0.2em] font-black">{person.role}</p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 relative min-h-[60px] flex items-center justify-center">
                    <i className="fas fa-quote-left text-gray-200 text-xl absolute top-2 left-2"></i>
                    <p className="text-gray-500 italic text-[10px] leading-relaxed relative z-10">
                      {person.quote}
                    </p>
                  </div>
                </div>

                {/* Bottom Bar */}
                <div className="bg-gray-900 py-2 text-center">
                   <p className="text-[7px] font-black text-[#ffeb00] uppercase tracking-[0.5em]">Citaringgul Hub</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* AI Vibe Section */}
        {members.length > 0 && (
          <div className="mt-32 max-w-4xl mx-auto p-12 md:p-16 bg-white/5 backdrop-blur-3xl rounded-[4rem] border border-white/10 text-center relative overflow-hidden group shadow-[0_50px_100px_-20px_rgba(0,0,0,0.4)]">
             <div className="absolute -top-20 -left-20 w-60 h-60 bg-[#ffeb00] rounded-full blur-[100px] opacity-10"></div>
             
             <i className="fas fa-brain text-4xl text-[#ffeb00] mb-8 animate-pulse"></i>
             <h4 className="text-[10px] font-black text-white/40 uppercase tracking-[0.5em] mb-4">AI Team Synergy Analyst</h4>
             <p className="text-2xl md:text-3xl font-black text-white leading-tight italic relative z-10 tracking-tight drop-shadow-lg">
                {isGenerating ? "Menganalisis frekuensi positif tim..." : `"${teamQuote}"`}
             </p>
             
             <button 
               onClick={fetchVibe}
               disabled={isGenerating}
               className="mt-12 bg-white/10 text-white px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-[0.4em] hover:bg-[#ffeb00] hover:text-[#e31e24] transition-all disabled:opacity-50"
             >
               <i className={`fas fa-sync-alt mr-3 ${isGenerating ? 'fa-spin' : ''}`}></i> 
               REGENERATE VIBE
             </button>
          </div>
        )}
      </div>

      {/* Upload/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" onClick={() => setIsModalOpen(false)}></div>
          <div className="relative bg-white w-full max-w-lg rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-500">
            <div className="bg-[#e31e24] p-10 text-white flex justify-between items-center">
              <div>
                <h3 className="text-2xl font-black uppercase tracking-tighter italic">Data Personil</h3>
                <p className="text-red-100 text-[9px] font-black uppercase tracking-widest mt-1">Upload foto & lengkapi biodata</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all">
                <i className="fas fa-times text-xl"></i>
              </button>
            </div>

            <form onSubmit={handleSaveMember} className="p-10 space-y-6">
               <div className="flex flex-col items-center">
                 <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="relative w-48 h-48 rounded-[2rem] border-4 border-dashed border-gray-200 flex flex-col items-center justify-center cursor-pointer group hover:border-[#e31e24] hover:bg-red-50 transition-all overflow-hidden"
                  >
                    {previewImage ? (
                      <img src={previewImage} className="w-full h-full object-cover" />
                    ) : (
                      <>
                        <i className="fas fa-cloud-upload-alt text-4xl text-gray-200 mb-2 group-hover:text-[#e31e24]"></i>
                        <span className="text-[10px] font-black text-gray-400 uppercase">Klik untuk Upload Foto</span>
                      </>
                    )}
                  </div>
                  <input type="file" ref={fileInputRef} onChange={handleImageChange} className="hidden" accept="image/*" />
                </div>

                <div className="space-y-4">
                  <input 
                    type="text" 
                    placeholder="NAMA LENGKAP (Cth: ENCEP ABDU ROHMAN)" 
                    value={newName} 
                    onChange={e => setNewName(e.target.value)} 
                    className="w-full p-5 bg-gray-50 border-2 border-gray-100 rounded-2xl outline-none focus:border-[#e31e24] font-black text-sm transition-all" 
                  />
                  <input 
                    type="text" 
                    placeholder="JABATAN (Cth: ASSISTANT OF STORE)" 
                    value={newRole} 
                    onChange={e => setNewRole(e.target.value)} 
                    className="w-full p-5 bg-gray-50 border-2 border-gray-100 rounded-2xl outline-none focus:border-[#0055a5] font-black text-sm transition-all" 
                  />
                  <textarea 
                    placeholder="MOTO / SEMANGAT KERJA" 
                    value={newQuote} 
                    onChange={e => setNewQuote(e.target.value)} 
                    className="w-full p-5 bg-gray-50 border-2 border-gray-100 rounded-2xl outline-none focus:border-[#ffeb00] font-bold text-sm h-28 resize-none transition-all" 
                  />
                </div>

                <button 
                  type="submit" 
                  className="w-full bg-[#0055a5] text-white font-black py-5 rounded-2xl shadow-xl uppercase tracking-widest text-xs hover:bg-[#003d7a] transition-all"
                >
                  {editingId ? 'Update Data Karyawan' : 'Simpan Karyawan Baru'}
                </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamGrid;
