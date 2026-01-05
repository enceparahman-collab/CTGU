
import React, { useState, useEffect, useRef } from 'react';
import { NewsItem } from '../types';
import { generateFlashNews } from '../services/geminiService';
import { StorageService } from '../services/storageService';

interface NewsSectionProps {
  isAdmin?: boolean;
}

const NewsSection: React.FC<NewsSectionProps> = ({ isAdmin }) => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [flashNews, setFlashNews] = useState<string>('Memuat berita terkini...');
  const [isLoadingFlash, setIsLoadingFlash] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [newTitle, setNewTitle] = useState('');
  const [newSummary, setNewSummary] = useState('');
  const [newCategory, setNewCategory] = useState<'Promo' | 'Store Info' | 'Internal'>('Promo');
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setNews(StorageService.getNews());
    const fetchFlash = async () => {
      const flash = await generateFlashNews();
      setFlashNews(flash);
      setIsLoadingFlash(false);
    };
    fetchFlash();
  }, []);

  useEffect(() => {
    if (news.length > 0) StorageService.saveNews(news);
  }, [news]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSaveNews = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newSummary || !previewImage) return alert('Lengkapi berita.');

    let updated;
    if (editingId) {
      updated = news.map(n => n.id === editingId ? { ...n, title: newTitle, summary: newSummary, content: newSummary, category: newCategory, imageUrl: previewImage } : n);
    } else {
      updated = [{ id: Date.now().toString(), title: newTitle, summary: newSummary, content: newSummary, imageUrl: previewImage, date: 'Baru saja', category: newCategory }, ...news];
    }
    setNews(updated);
    setIsModalOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setNewTitle(''); setNewSummary(''); setNewCategory('Promo'); setPreviewImage(null); setEditingId(null);
  };

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (window.confirm('Hapus berita dari database?')) {
      setNews(news.filter(n => n.id !== id));
    }
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="mb-12 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 overflow-hidden flex items-center">
        <div className="bg-[#ffeb00] text-[#e31e24] px-6 py-3 font-black text-xs uppercase z-10">FLASH NEWS</div>
        <div className="flex-grow overflow-hidden relative h-12 flex items-center">
          <p className={`text-white font-bold px-8 whitespace-nowrap animate-marquee ${isLoadingFlash ? 'animate-pulse' : ''}`}>{flashNews} • {flashNews}</p>
        </div>
      </div>

      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-black text-white uppercase tracking-tighter italic">News Feed X450</h2>
        {isAdmin && (
          <button onClick={() => { setEditingId(null); setIsModalOpen(true); }} className="bg-[#ffeb00] text-[#e31e24] px-6 py-3 rounded-2xl font-black text-xs uppercase shadow-xl hover:scale-105 transition-transform"><i className="fas fa-plus mr-2"></i> Tulis Berita Baru</button>
        )}
      </div>
          
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {news.map((item) => (
          <div 
            key={item.id} 
            onClick={() => { setSelectedNews(item); setIsDetailOpen(true); }} 
            className="bg-white rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col group border-4 border-transparent hover:border-[#ffeb00] hover:-translate-y-4 hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.4)] transition-all duration-500 relative cursor-pointer"
          >
            {isAdmin && (
              <div className="absolute top-4 right-4 z-20 flex flex-col gap-2">
                <button onClick={(e) => handleDelete(e, item.id)} className="w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform"><i className="fas fa-trash-alt text-xs"></i></button>
                <button onClick={(e) => { e.stopPropagation(); setEditingId(item.id); setNewTitle(item.title); setNewSummary(item.summary); setNewCategory(item.category); setPreviewImage(item.imageUrl); setIsModalOpen(true); }} className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform"><i className="fas fa-edit text-xs"></i></button>
              </div>
            )}
            <div className="h-64 overflow-hidden relative">
              <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
            <div className="p-8">
              <div className="flex items-center gap-3 mb-4">
                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase text-white ${item.category === 'Promo' ? 'bg-[#e31e24]' : item.category === 'Store Info' ? 'bg-[#0055a5]' : 'bg-green-600'}`}>{item.category}</span>
                <span className="text-gray-400 text-[10px] font-bold uppercase">{item.date}</span>
              </div>
              <h3 className="text-2xl font-black text-gray-900 mb-3 line-clamp-2 transition-colors group-hover:text-[#e31e24]">{item.title}</h3>
              <p className="text-gray-600 font-medium line-clamp-2 mb-4">{item.summary}</p>
              <div className="text-[#0055a5] font-black text-xs uppercase group-hover:translate-x-3 transition-all flex items-center">
                Baca Selengkapnya <i className="fas fa-arrow-right ml-2 group-hover:ml-4 transition-all"></i>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
          <div className="relative bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden">
            <div className="bg-[#e31e24] p-8 text-white flex justify-between"><h3 className="text-2xl font-black uppercase italic">{editingId ? 'Edit Berita' : 'Posting Berita Baru'}</h3><button onClick={() => setIsModalOpen(false)}><i className="fas fa-times"></i></button></div>
            <form onSubmit={handleSaveNews} className="p-8 space-y-4">
                <div onClick={() => fileInputRef.current?.click()} className="h-44 rounded-3xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center cursor-pointer overflow-hidden">
                  {previewImage ? <img src={previewImage} className="w-full h-full object-cover" /> : <div className="text-center"><i className="fas fa-image text-4xl text-gray-200 mb-2"></i><p className="text-xs font-bold text-gray-400">Upload Banner</p></div>}
                  <input type="file" ref={fileInputRef} onChange={handleImageChange} className="hidden" accept="image/*" />
                </div>
                <input type="text" placeholder="Judul" value={newTitle} onChange={e => setNewTitle(e.target.value)} className="w-full p-4 bg-gray-50 border-2 border-gray-100 rounded-2xl font-bold outline-none focus:border-[#e31e24]" />
                <select value={newCategory} onChange={e => setNewCategory(e.target.value as any)} className="w-full p-4 bg-gray-50 border-2 border-gray-100 rounded-2xl font-bold outline-none focus:border-[#e31e24]"><option value="Promo">Promo</option><option value="Store Info">Store Info</option><option value="Internal">Internal</option></select>
                <textarea placeholder="Isi berita..." value={newSummary} onChange={e => setNewSummary(e.target.value)} className="w-full p-4 bg-gray-50 border-2 border-gray-100 rounded-2xl font-bold h-32 resize-none outline-none focus:border-[#e31e24]" />
                <button type="submit" className="w-full bg-[#e31e24] text-white font-black py-4 rounded-2xl shadow-xl uppercase">Simpan ke Berita Database</button>
            </form>
          </div>
        </div>
      )}

      {isDetailOpen && selectedNews && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setIsDetailOpen(false)}></div>
          <div className="relative bg-white w-full max-w-3xl rounded-[3rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-500 max-h-[90vh] flex flex-col">
            <div className="relative h-64 sm:h-80 flex-shrink-0">
              <img src={selectedNews.imageUrl} className="w-full h-full object-cover" alt={selectedNews.title} />
              <button onClick={() => setIsDetailOpen(false)} className="absolute top-6 right-6 w-12 h-12 bg-white rounded-full flex items-center justify-center text-gray-900 shadow-xl"><i className="fas fa-times text-xl"></i></button>
            </div>
            <div className="p-8 sm:p-12 overflow-y-auto">
              <div className="text-gray-400 text-xs font-black uppercase mb-4 italic"><i className="far fa-calendar-alt mr-2"></i> {selectedNews.date}</div>
              <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-6 leading-tight uppercase italic">{selectedNews.title}</h2>
              <div className="text-gray-600 font-medium leading-[2] text-lg whitespace-pre-wrap">{selectedNews.content || selectedNews.summary}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsSection;
