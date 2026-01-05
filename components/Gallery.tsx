
import React, { useState, useRef, useEffect } from 'react';
import { Memory } from '../types';
import { StorageService } from '../services/storageService';

interface GalleryProps {
  isAdmin?: boolean;
}

const LazyImage: React.FC<{ src: string; alt: string; className?: string }> = ({ src, alt, className }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);
  return (
    <div className={`relative overflow-hidden bg-gray-200 ${className}`}>
      {!isLoaded && !error && <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>}
      <img src={src} alt={alt} loading="lazy" onLoad={() => setIsLoaded(true)} onError={() => setError(true)} className={`w-full h-full object-cover transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`} />
    </div>
  );
};

const Gallery: React.FC<GalleryProps> = ({ isAdmin }) => {
  const [memories, setMemories] = useState<Memory[]>([]);
  const [filter, setFilter] = useState<'All' | 'Event' | 'Daily' | 'Achievement'>('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newCategory, setNewCategory] = useState<'Event' | 'Daily' | 'Achievement'>('Daily');
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMemories(StorageService.getMemories());
  }, []);

  useEffect(() => {
    if (memories.length > 0) StorageService.saveMemories(memories);
  }, [memories]);

  const filteredMemories = filter === 'All' ? memories : memories.filter(m => m.category === filter);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newDesc || !newDate || !previewImage) return alert('Lengkapi data.');

    let updated;
    if (editingId) {
      updated = memories.map(m => m.id === editingId ? { ...m, title: newTitle, description: newDesc, date: newDate, category: newCategory, imageUrl: previewImage } : m);
    } else {
      updated = [{ id: Date.now().toString(), title: newTitle, description: newDesc, date: newDate, category: newCategory, imageUrl: previewImage }, ...memories];
    }
    setMemories(updated);
    setIsModalOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setNewTitle(''); setNewDesc(''); setNewDate(''); setNewCategory('Daily'); setPreviewImage(null); setEditingId(null);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Hapus kenangan dari database?')) {
      setMemories(memories.filter(m => m.id !== id));
    }
  };

  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 space-y-6 md:space-y-0">
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-black text-white uppercase tracking-tighter">Database Momen X450</h2>
            {isAdmin && (
              <button onClick={() => { setEditingId(null); setIsModalOpen(true); }} className="mt-6 bg-[#ffeb00] text-[#e31e24] px-8 py-3 rounded-2xl font-black text-sm uppercase tracking-widest shadow-2xl flex items-center border-4 border-[#e31e24]/20">
                <i className="fas fa-plus-circle mr-3 text-lg"></i> Upload Momen Baru
              </button>
            )}
          </div>
          <div className="flex bg-black/20 backdrop-blur-md p-1.5 rounded-2xl border border-white/10 overflow-x-auto">
            {(['All', 'Event', 'Daily', 'Achievement'] as const).map((cat) => (
              <button key={cat} onClick={() => setFilter(cat)} className={`px-6 py-2.5 text-xs font-black rounded-xl transition-all uppercase whitespace-nowrap ${filter === cat ? 'bg-[#ffeb00] text-[#e31e24]' : 'text-white'}`}>
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-10">
          {filteredMemories.map((item) => (
            <div key={item.id} className="bg-white rounded-[2rem] overflow-hidden shadow-2xl hover:shadow-black/40 transition-all duration-500 group relative">
              {isAdmin && (
                <div className="absolute top-4 right-4 z-20 flex gap-2">
                  <button onClick={() => handleDelete(item.id)} className="w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center"><i className="fas fa-trash-alt"></i></button>
                  <button onClick={() => { setEditingId(item.id); setNewTitle(item.title); setNewDesc(item.description); setNewDate(item.date); setNewCategory(item.category); setPreviewImage(item.imageUrl); setIsModalOpen(true); }} className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center"><i className="fas fa-edit"></i></button>
                </div>
              )}
              <div className="relative h-72 overflow-hidden">
                <LazyImage src={item.imageUrl} alt={item.title} className="w-full h-full group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute top-6 left-6 z-10"><span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase text-white ${item.category === 'Event' ? 'bg-orange-600' : item.category === 'Achievement' ? 'bg-blue-600' : 'bg-red-600'}`}>{item.category}</span></div>
              </div>
              <div className="p-8">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-2xl font-black text-gray-900 tracking-tight">{item.title}</h3>
                  <span className="text-xs text-[#e31e24] font-black uppercase bg-red-50 px-3 py-1 rounded-full">{item.date}</span>
                </div>
                <p className="text-gray-600 leading-relaxed font-medium line-clamp-3">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
          <div className="relative bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-500">
            <div className="bg-[#e31e24] p-8 text-white flex justify-between">
              <h3 className="text-2xl font-black uppercase">{editingId ? 'Edit Kenangan' : 'Upload Kenangan'}</h3>
              <button onClick={() => setIsModalOpen(false)}><i className="fas fa-times"></i></button>
            </div>
            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              <div onClick={() => fileInputRef.current?.click()} className="h-48 rounded-3xl border-2 border-dashed border-gray-200 flex items-center justify-center cursor-pointer overflow-hidden">
                {previewImage ? <img src={previewImage} className="w-full h-full object-cover" /> : <div className="text-center"><i className="fas fa-cloud-upload-alt text-[#e31e24] text-xl mb-3"></i><p className="text-sm font-bold text-gray-500">Pilih Foto Kenangan</p></div>}
                <input type="file" ref={fileInputRef} onChange={handleImageChange} accept="image/*" className="hidden" />
              </div>
              <input type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder="Judul" className="w-full px-5 py-3 rounded-2xl border-2 border-gray-100 font-bold outline-none focus:border-[#e31e24]" />
              <div className="grid grid-cols-2 gap-4">
                <input type="text" value={newDate} onChange={(e) => setNewDate(e.target.value)} placeholder="Tanggal" className="w-full px-5 py-3 rounded-2xl border-2 border-gray-100 font-bold" />
                <select value={newCategory} onChange={(e) => setNewCategory(e.target.value as any)} className="w-full px-5 py-3 rounded-2xl border-2 border-gray-100 font-bold">
                  <option value="Daily">Daily</option><option value="Event">Event</option><option value="Achievement">Achievement</option>
                </select>
              </div>
              <textarea rows={3} value={newDesc} onChange={(e) => setNewDesc(e.target.value)} placeholder="Cerita..." className="w-full px-5 py-3 rounded-2xl border-2 border-gray-100 font-bold resize-none" />
              <button type="submit" className="w-full bg-[#0055a5] text-white font-black py-4 rounded-2xl shadow-xl uppercase">Simpan ke Galeri Database</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
