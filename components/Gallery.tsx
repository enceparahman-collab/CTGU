
import React, { useState, useRef } from 'react';
import { MEMORIES } from '../constants';
import { Memory } from '../types';

interface GalleryProps {
  isAdmin?: boolean;
}

const LazyImage: React.FC<{ src: string; alt: string; className?: string }> = ({ src, alt, className }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div className={`relative overflow-hidden bg-gray-200 ${className}`}>
      {!isLoaded && !error && (
        <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse" 
             style={{ backgroundSize: '200% 100%', animation: 'shimmer 1.5s infinite linear' }}>
          <style>{`
            @keyframes shimmer {
              0% { background-position: -200% 0; }
              100% { background-position: 200% 0; }
            }
          `}</style>
        </div>
      )}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        onError={() => setError(true)}
        className={`w-full h-full object-cover transition-opacity duration-700 ease-in-out ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-400">
          <i className="fas fa-image text-3xl"></i>
        </div>
      )}
    </div>
  );
};

const Gallery: React.FC<GalleryProps> = ({ isAdmin }) => {
  const [memories, setMemories] = useState<Memory[]>(MEMORIES);
  const [filter, setFilter] = useState<'All' | 'Event' | 'Daily' | 'Achievement'>('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  // Form State
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newCategory, setNewCategory] = useState<'Event' | 'Daily' | 'Achievement'>('Daily');
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const filteredMemories = filter === 'All' 
    ? memories 
    : memories.filter(m => m.category === filter);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleOpenEdit = (item: Memory) => {
    setEditingId(item.id);
    setNewTitle(item.title);
    setNewDesc(item.description);
    setNewDate(item.date);
    setNewCategory(item.category);
    setPreviewImage(item.imageUrl);
    setIsModalOpen(true);
  };

  const handleOpenAdd = () => {
    setEditingId(null);
    resetFormFields();
    setIsModalOpen(true);
  };

  const resetFormFields = () => {
    setNewTitle('');
    setNewDesc('');
    setNewDate('');
    setNewCategory('Daily');
    setPreviewImage(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newDesc || !newDate || !previewImage) {
      alert('Mohon lengkapi semua data dan pilih foto.');
      return;
    }

    if (editingId) {
      setMemories(memories.map(m => m.id === editingId ? {
        ...m,
        title: newTitle,
        description: newDesc,
        date: newDate,
        category: newCategory,
        imageUrl: previewImage
      } : m));
    } else {
      const newMemory: Memory = {
        id: Date.now().toString(),
        title: newTitle,
        description: newDesc,
        date: newDate,
        category: newCategory,
        imageUrl: previewImage
      };
      setMemories([newMemory, ...memories]);
    }

    setIsModalOpen(false);
    resetFormFields();
    setEditingId(null);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Hapus kenangan ini?')) {
      setMemories(memories.filter(m => m.id !== id));
    }
  };

  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 space-y-6 md:space-y-0">
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-black text-white uppercase tracking-tighter">Momen Berharga</h2>
            <div className="h-1 w-20 bg-[#ffeb00] mt-2 hidden md:block"></div>
            {isAdmin && (
              <button 
                onClick={handleOpenAdd}
                className="mt-6 bg-[#ffeb00] text-[#e31e24] px-8 py-3 rounded-2xl font-black text-sm uppercase tracking-widest shadow-2xl hover:scale-105 transition-transform flex items-center border-4 border-[#e31e24]/20"
              >
                <i className="fas fa-plus-circle mr-3 text-lg"></i> Tambah Kenangan
              </button>
            )}
          </div>
          <div className="flex bg-black/20 backdrop-blur-md p-1.5 rounded-2xl border border-white/10 overflow-x-auto max-w-full">
            {(['All', 'Event', 'Daily', 'Achievement'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2.5 text-xs font-black rounded-xl transition-all uppercase tracking-widest whitespace-nowrap ${
                  filter === cat 
                    ? 'bg-[#ffeb00] text-[#e31e24] shadow-lg' 
                    : 'text-white hover:bg-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-10">
          {filteredMemories.map((item) => (
            <div key={item.id} className="bg-white rounded-[2rem] overflow-hidden shadow-2xl hover:shadow-[#00000040] transition-all duration-500 group border-4 border-transparent hover:border-white animate-in slide-in-from-bottom-4 relative">
              
              {/* Admin Controls */}
              {isAdmin && (
                <div className="absolute top-4 right-4 z-20 flex gap-2">
                  <button 
                    onClick={() => handleDelete(item.id)}
                    className="w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center shadow-lg hover:bg-red-700 transition-colors"
                  >
                    <i className="fas fa-trash-alt"></i>
                  </button>
                  <button 
                    onClick={() => handleOpenEdit(item)}
                    className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg hover:bg-blue-700 transition-colors"
                  >
                    <i className="fas fa-edit"></i>
                  </button>
                </div>
              )}

              <div className="relative h-72 overflow-hidden">
                <LazyImage
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-6 left-6 z-10 flex flex-col gap-2">
                  <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-white shadow-lg ${
                    item.category === 'Event' ? 'bg-orange-600' :
                    item.category === 'Achievement' ? 'bg-blue-600' : 'bg-red-600'
                  }`}>
                    {item.category}
                  </span>
                </div>
              </div>
              <div className="p-8">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-2xl font-black text-gray-900 tracking-tight">{item.title}</h3>
                  <span className="text-xs text-[#e31e24] font-black uppercase tracking-widest bg-red-50 px-3 py-1 rounded-full">{item.date}</span>
                </div>
                <p className="text-gray-600 leading-relaxed font-medium line-clamp-3">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Edit/Add Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
          <div className="relative bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-500">
            <div className="bg-[#e31e24] p-8 text-white relative">
              <h3 className="text-2xl font-black uppercase tracking-tight">
                {editingId ? 'Edit Kenangan' : 'Tambah Kenangan'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/40 transition-colors"><i className="fas fa-times"></i></button>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-6 max-h-[70vh] overflow-y-auto">
              <div>
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="group relative h-48 rounded-3xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center cursor-pointer hover:border-[#e31e24] hover:bg-red-50 transition-all overflow-hidden"
                >
                  {previewImage ? (
                    <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-center">
                      <i className="fas fa-cloud-upload-alt text-[#e31e24] text-xl mb-3"></i>
                      <p className="text-sm font-bold text-gray-500">Klik untuk upload foto</p>
                    </div>
                  )}
                  <input type="file" ref={fileInputRef} onChange={handleImageChange} accept="image/*" className="hidden" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <input type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder="Judul Kenangan" className="w-full px-5 py-3 rounded-2xl border-2 border-gray-100 focus:border-[#e31e24] outline-none font-bold" />
                </div>
                <div>
                  <input type="text" value={newDate} onChange={(e) => setNewDate(e.target.value)} placeholder="Tanggal (e.g. 12 Jan 2024)" className="w-full px-5 py-3 rounded-2xl border-2 border-gray-100 focus:border-[#e31e24] outline-none font-bold" />
                </div>
                <div>
                  <select value={newCategory} onChange={(e) => setNewCategory(e.target.value as any)} className="w-full px-5 py-3 rounded-2xl border-2 border-gray-100 focus:border-[#e31e24] outline-none font-bold">
                    <option value="Daily">Daily</option>
                    <option value="Event">Event</option>
                    <option value="Achievement">Achievement</option>
                  </select>
                </div>
              </div>

              <textarea rows={3} value={newDesc} onChange={(e) => setNewDesc(e.target.value)} placeholder="Cerita singkat..." className="w-full px-5 py-3 rounded-2xl border-2 border-gray-100 focus:border-[#e31e24] outline-none font-bold resize-none" />

              <button type="submit" className="w-full bg-[#0055a5] hover:bg-blue-700 text-white font-black py-4 rounded-2xl shadow-xl uppercase transition-all">
                {editingId ? 'Simpan Perubahan' : 'Simpan Kenangan'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
