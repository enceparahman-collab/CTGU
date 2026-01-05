
import React, { useState, useRef } from 'react';
import { GuestMessage } from '../types';

interface GuestbookProps {
  isAdmin?: boolean;
}

const Guestbook: React.FC<GuestbookProps> = ({ isAdmin }) => {
  const [messages, setMessages] = useState<GuestMessage[]>([
    {
      id: '1',
      sender: 'Pak RT Mulyadi',
      content: 'Luar biasa pelayanannya. Toko Alfamart paling rapi di wilayah kita. Sukses terus!',
      timestamp: '2 jam yang lalu'
    }
  ]);

  const [newName, setNewName] = useState('');
  const [newContent, setNewContent] = useState('');
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleOpenEdit = (msg: GuestMessage) => {
    setEditingId(msg.id);
    setNewName(msg.sender);
    setNewContent(msg.content);
    setPreviewImage(msg.imageUrl || null);
    // Scroll form into view
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newContent) return;

    if (editingId) {
      setMessages(messages.map(m => m.id === editingId ? {
        ...m,
        sender: newName,
        content: newContent,
        imageUrl: previewImage || undefined
      } : m));
    } else {
      const newMessage: GuestMessage = {
        id: Date.now().toString(),
        sender: newName,
        content: newContent,
        timestamp: 'Baru saja',
        imageUrl: previewImage || undefined
      };
      setMessages([newMessage, ...messages]);
    }

    resetForm();
  };

  const resetForm = () => {
    setNewName('');
    setNewContent('');
    setPreviewImage(null);
    setEditingId(null);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Hapus pesan ini?')) {
      setMessages(messages.filter(m => m.id !== id));
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6">
      <div className="bg-white rounded-[3rem] shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-8 bg-[#e31e24] text-white relative">
          <h2 className="text-2xl font-bold uppercase tracking-tight">
            {editingId ? 'Edit Pesan Buku Tamu' : 'Buku Tamu Digital'}
          </h2>
          <p className="text-red-100 font-medium opacity-80">
            {editingId ? 'Perbaiki isi pesan yang terpilih.' : 'Sampaikan kesan dan upload foto kenangan Anda.'}
          </p>
          {editingId && (
            <button onClick={resetForm} className="absolute top-8 right-8 text-white font-bold text-xs bg-white/20 px-4 py-2 rounded-full">Batal Edit</button>
          )}
        </div>

        <div className="p-8">
          <form onSubmit={handleSubmit} className="mb-12 space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 ml-1">Nama</label>
                <input type="text" value={newName} onChange={e => setNewName(e.target.value)} className="w-full px-5 py-3 border-2 border-gray-50 bg-gray-50 rounded-xl outline-none focus:border-[#e31e24] font-bold" placeholder="Nama Anda" />
              </div>
              <div className="flex items-end">
                <button 
                  type="button" 
                  onClick={() => fileInputRef.current?.click()}
                  className={`w-full py-3 border-2 rounded-xl font-bold text-xs uppercase transition-all flex items-center justify-center ${previewImage ? 'border-green-400 text-green-600 bg-green-50' : 'border-gray-100 text-gray-400 bg-gray-50'}`}
                >
                  <i className={`fas ${previewImage ? 'fa-check-circle' : 'fa-camera'} mr-2`}></i>
                  {previewImage ? 'Foto Terlampir' : 'Lampirkan Foto (Opsional)'}
                </button>
                <input type="file" ref={fileInputRef} onChange={handleImageChange} className="hidden" accept="image/*" />
              </div>
            </div>
            {previewImage && (
              <div className="relative w-24 h-24 rounded-xl overflow-hidden border-2 border-[#ffeb00]">
                <img src={previewImage} className="w-full h-full object-cover" />
                <button type="button" onClick={() => setPreviewImage(null)} className="absolute top-1 right-1 bg-red-600 text-white w-5 h-5 rounded-full text-[10px] flex items-center justify-center"><i className="fas fa-times"></i></button>
              </div>
            )}
            <div>
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 ml-1">Pesan</label>
              <textarea value={newContent} onChange={e => setNewContent(e.target.value)} rows={3} className="w-full px-5 py-3 border-2 border-gray-50 bg-gray-50 rounded-xl outline-none focus:border-[#e31e24] font-bold resize-none" placeholder="Tulis sesuatu..." />
            </div>
            <button type="submit" className={`text-white font-black py-4 px-10 rounded-2xl shadow-xl uppercase tracking-widest text-xs ${editingId ? 'bg-orange-500 hover:bg-orange-600' : 'bg-[#0055a5] hover:bg-blue-700'}`}>
              {editingId ? 'Perbarui Pesan' : 'Kirim Pesan'}
            </button>
          </form>

          <div className="space-y-6">
            {messages.map((msg) => (
              <div key={msg.id} className="flex space-x-4 group">
                <div className="flex-shrink-0">
                  <div className="h-12 w-12 rounded-2xl bg-[#ffeb00] flex items-center justify-center text-[#e31e24] shadow-md transform rotate-3 font-black">
                    {msg.sender.charAt(0)}
                  </div>
                </div>
                <div className="flex-grow bg-gray-50 rounded-[2rem] p-6 relative hover:bg-white hover:shadow-xl transition-all border border-transparent hover:border-gray-100">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-black text-gray-900">{msg.sender}</h4>
                    {isAdmin && (
                      <div className="flex gap-2">
                         <button onClick={() => handleOpenEdit(msg)} className="text-blue-400 hover:text-blue-600"><i className="fas fa-edit"></i></button>
                         <button onClick={() => handleDelete(msg.id)} className="text-red-400 hover:text-red-600"><i className="fas fa-trash-alt"></i></button>
                      </div>
                    )}
                  </div>
                  <p className="text-gray-600 font-medium mb-3">{msg.content}</p>
                  {msg.imageUrl && (
                    <div className="mt-3 rounded-2xl overflow-hidden border-2 border-white shadow-md max-w-sm">
                      <img src={msg.imageUrl} className="w-full object-cover max-h-60" />
                    </div>
                  )}
                  <span className="text-[10px] font-black text-gray-300 uppercase mt-4 block">{msg.timestamp}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Guestbook;
