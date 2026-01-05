
import React, { useState, useEffect, useRef } from 'react';
import { NEWS_ITEMS } from '../constants';
import { NewsItem } from '../types';
import { generateFlashNews } from '../services/geminiService';

interface NewsSectionProps {
  isAdmin?: boolean;
}

const NewsSection: React.FC<NewsSectionProps> = ({ isAdmin }) => {
  const [news, setNews] = useState<NewsItem[]>(NEWS_ITEMS);
  const [flashNews, setFlashNews] = useState<string>('Memuat berita terkini...');
  const [isLoadingFlash, setIsLoadingFlash] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form State for Admin
  const [newTitle, setNewTitle] = useState('');
  const [newSummary, setNewSummary] = useState('');
  const [newCategory, setNewCategory] = useState<'Promo' | 'Store Info' | 'Internal'>('Promo');
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchFlash = async () => {
      const flash = await generateFlashNews();
      setFlashNews(flash);
      setIsLoadingFlash(false);
    };
    fetchFlash();
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleOpenEdit = (e: React.MouseEvent, item: NewsItem) => {
    e.stopPropagation(); // Prevent opening detail modal
    setEditingId(item.id);
    setNewTitle(item.title);
    setNewSummary(item.summary);
    setNewCategory(item.category);
    setPreviewImage(item.imageUrl);
    setIsModalOpen(true);
  };

  const handleOpenAdd = () => {
    setEditingId(null);
    setNewTitle('');
    setNewSummary('');
    setNewCategory('Promo');
    setPreviewImage(null);
    setIsModalOpen(true);
  };

  const handleOpenDetail = (item: NewsItem) => {
    setSelectedNews(item);
    setIsDetailOpen(true);
  };

  const handleSaveNews = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newSummary || !previewImage) return;

    if (editingId) {
      setNews(news.map(n => n.id === editingId ? {
        ...n,
        title: newTitle,
        summary: newSummary,
        content: newSummary, // Simplified for this demo
        category: newCategory,
        imageUrl: previewImage
      } : n));
    } else {
      const newItem: NewsItem = {
        id: Date.now().toString(),
        title: newTitle,
        summary: newSummary,
        content: newSummary,
        imageUrl: previewImage,
        date: 'Baru saja',
        category: newCategory
      };
      setNews([newItem, ...news]);
    }

    setIsModalOpen(false);
    setEditingId(null);
  };

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.stopPropagation(); // Prevent opening detail modal
    if (window.confirm('Hapus berita ini?')) {
      setNews(news.filter(n => n.id !== id));
    }
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Flash News Ticker */}
      <div className="mb-12 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 overflow-hidden flex items-center">
        <div className="bg-[#ffeb00] text-[#e31e24] px-6 py-3 font-black text-xs uppercase tracking-widest whitespace-nowrap z-10 shadow-lg">
          FLASH NEWS AI
        </div>
        <div className="flex-grow overflow-hidden relative h-12 flex items-center">
          <p className={`text-white font-bold px-8 whitespace-nowrap animate-marquee ${isLoadingFlash ? 'animate-pulse' : ''}`}>
            {flashNews} • {flashNews}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="md:col-span-12 space-y-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-3xl font-black text-white uppercase tracking-tighter">Berita Toko Citaringgul</h2>
            {isAdmin && (
              <button 
                onClick={handleOpenAdd}
                className="bg-[#ffeb00] text-[#e31e24] px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl flex items-center hover:scale-105 transition-transform"
              >
                <i className="fas fa-plus mr-2"></i> Tulis Berita
              </button>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {news.map((item) => (
              <div 
                key={item.id} 
                onClick={() => handleOpenDetail(item)}
                className="bg-white rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col group border-4 border-transparent hover:border-[#ffeb00] transition-all duration-500 relative cursor-pointer"
              >
                {isAdmin && (
                  <div className="absolute top-4 right-4 z-20 flex flex-col gap-2">
                    <button 
                      onClick={(e) => handleDelete(e, item.id)}
                      className="w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center shadow-lg hover:bg-red-700"
                    >
                      <i className="fas fa-trash-alt text-xs"></i>
                    </button>
                    <button 
                      onClick={(e) => handleOpenEdit(e, item)}
                      className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg hover:bg-blue-700"
                    >
                      <i className="fas fa-edit text-xs"></i>
                    </button>
                  </div>
                )}
                <div className="h-64 overflow-hidden">
                  <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-white ${
                      item.category === 'Promo' ? 'bg-[#e31e24]' :
                      item.category === 'Store Info' ? 'bg-[#0055a5]' : 'bg-green-600'
                    }`}>
                      {item.category}
                    </span>
                    <span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">{item.date}</span>
                  </div>
                  <h3 className="text-2xl font-black text-gray-900 mb-3 group-hover:text-[#e31e24] transition-colors">{item.title}</h3>
                  <p className="text-gray-600 font-medium leading-relaxed mb-6 line-clamp-2">{item.summary}</p>
                  <div className="flex items-center text-[#0055a5] font-black text-xs uppercase tracking-widest group-hover:translate-x-2 transition-transform">
                    Baca Selengkapnya <i className="fas fa-arrow-right ml-2"></i>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Admin Upload/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
          <div className="relative bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="bg-[#e31e24] p-8 text-white relative">
              <h3 className="text-2xl font-black uppercase tracking-tight">
                {editingId ? 'Edit Berita' : 'Tulis Berita Baru'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 text-white/60 hover:text-white"><i className="fas fa-times"></i></button>
            </div>
            <form onSubmit={handleSaveNews} className="p-8 space-y-4">
                <div onClick={() => fileInputRef.current?.click()} className="h-44 rounded-3xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center cursor-pointer overflow-hidden group hover:border-[#e31e24] transition-colors">
                  {previewImage ? (
                    <img src={previewImage} className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-center">
                      <i className="fas fa-image text-4xl text-gray-200 mb-2 group-hover:text-[#e31e24] transition-colors"></i>
                      <p className="text-xs font-bold text-gray-400">Upload Banner Berita</p>
                    </div>
                  )}
                  <input type="file" ref={fileInputRef} onChange={handleImageChange} className="hidden" accept="image/*" />
                </div>
                <input type="text" placeholder="Judul Berita" value={newTitle} onChange={e => setNewTitle(e.target.value)} className="w-full p-4 bg-gray-50 border-2 border-gray-100 rounded-2xl font-bold focus:border-[#e31e24] outline-none" />
                <select value={newCategory} onChange={e => setNewCategory(e.target.value as any)} className="w-full p-4 bg-gray-50 border-2 border-gray-100 rounded-2xl font-bold focus:border-[#e31e24] outline-none">
                  <option value="Promo">Promo</option>
                  <option value="Store Info">Store Info</option>
                  <option value="Internal">Internal</option>
                </select>
                <textarea placeholder="Isi berita atau ringkasan..." value={newSummary} onChange={e => setNewSummary(e.target.value)} className="w-full p-4 bg-gray-50 border-2 border-gray-100 rounded-2xl font-bold h-32 resize-none focus:border-[#e31e24] outline-none" />
                <button type="submit" className="w-full bg-[#e31e24] text-white font-black py-4 rounded-2xl shadow-xl uppercase tracking-widest hover:bg-red-700 transition-colors">
                  {editingId ? 'Simpan Perubahan' : 'Posting Berita'}
                </button>
            </form>
          </div>
        </div>
      )}

      {/* News Detail Modal */}
      {isDetailOpen && selectedNews && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setIsDetailOpen(false)}></div>
          <div className="relative bg-white w-full max-w-3xl rounded-[3rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-500 max-h-[90vh] flex flex-col">
            <div className="relative h-64 sm:h-80 flex-shrink-0">
              <img src={selectedNews.imageUrl} className="w-full h-full object-cover" alt={selectedNews.title} />
              <button 
                onClick={() => setIsDetailOpen(false)} 
                className="absolute top-6 right-6 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-transform text-gray-900"
              >
                <i className="fas fa-times text-xl"></i>
              </button>
              <div className="absolute bottom-6 left-8">
                <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-white shadow-lg ${
                  selectedNews.category === 'Promo' ? 'bg-[#e31e24]' :
                  selectedNews.category === 'Store Info' ? 'bg-[#0055a5]' : 'bg-green-600'
                }`}>
                  {selectedNews.category}
                </span>
              </div>
            </div>
            <div className="p-8 sm:p-12 overflow-y-auto">
              <div className="text-gray-400 text-xs font-black uppercase tracking-widest mb-4 flex items-center">
                <i className="far fa-calendar-alt mr-2"></i> {selectedNews.date}
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-6 leading-tight uppercase tracking-tighter italic">
                {selectedNews.title}
              </h2>
              <div className="h-1.5 w-24 bg-[#ffeb00] rounded-full mb-8"></div>
              <div className="text-gray-600 font-medium leading-[2] text-lg space-y-4 whitespace-pre-wrap">
                {selectedNews.content || selectedNews.summary}
              </div>
              
              <div className="mt-12 pt-8 border-t border-gray-100 flex items-center justify-between">
                <div className="flex items-center text-xs font-black text-gray-300 uppercase tracking-widest">
                  ALFAMART CITARINGGUL X450
                </div>
                <img src="https://upload.wikimedia.org/wikipedia/commons/8/86/Alfamart_logo.svg" className="h-6 opacity-30" alt="logo" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsSection;
