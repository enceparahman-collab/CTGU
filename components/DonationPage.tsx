
import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";

const DonationPage: React.FC = () => {
  const [amount, setAmount] = useState<number | string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [totalRaised, setTotalRaised] = useState(850000);
  const [donors, setDonors] = useState([
    { name: 'Pelanggan Setia', amount: 50000, time: '10 menit lalu' },
    { name: 'Warga Citaringgul', amount: 100000, time: '2 jam lalu' }
  ]);

  const handleDonate = async () => {
    const donationAmount = Number(amount);
    if (!amount || donationAmount <= 0) return alert('Pilih nominal valid.');
    
    setIsProcessing(true);
    setTimeout(() => {
      setTotalRaised(prev => prev + donationAmount);
      setDonors([{ name: 'Donatur Baru', amount: donationAmount, time: 'Baru saja' }, ...donors]);
      setIsProcessing(false);
      setAmount('');
      alert('Terima kasih! Donasi Anda telah diterima dan memperbarui sistem.');
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-16 space-y-8">
      <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden border-8 border-white/10 p-10">
        <h2 className="text-3xl font-black text-[#e31e24] mb-6 uppercase italic">Kotak Amal X450</h2>
        <div className="mb-8">
          <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Dana Terkumpul</p>
          <p className="text-4xl font-black text-gray-900 italic">Rp {totalRaised.toLocaleString()}</p>
          <div className="w-full h-4 bg-gray-100 rounded-full mt-4 overflow-hidden">
            <div className="h-full bg-[#ffeb00]" style={{ width: '45%' }}></div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-6">
          {[10000, 20000, 50000, 100000].map(p => (
            <button key={p} onClick={() => setAmount(p)} className="py-4 bg-gray-50 rounded-2xl font-black hover:bg-[#ffeb00] transition-all">
              {p / 1000}K
            </button>
          ))}
        </div>
        <input type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="Nominal lain..." className="w-full p-5 bg-gray-50 border-2 border-transparent rounded-2xl mb-6 font-black outline-none focus:border-[#e31e24]" />
        <button onClick={handleDonate} disabled={isProcessing} className="w-full bg-[#0055a5] text-white py-6 rounded-2xl font-black uppercase tracking-widest">
          {isProcessing ? 'Memproses...' : 'Kirim Donasi'}
        </button>
      </div>

      <div className="bg-white/10 backdrop-blur-xl p-10 rounded-[3rem] border border-white/20">
        <h3 className="text-xl font-black text-white mb-6 italic">Kontributor Terkini</h3>
        <div className="space-y-4">
          {donors.map((d, i) => (
            <div key={i} className="flex justify-between items-center p-4 bg-white/5 rounded-2xl border border-white/10">
              <span className="font-black text-white">{d.name}</span>
              <span className="font-black text-[#ffeb00]">Rp {d.amount.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DonationPage;
