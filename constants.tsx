
import { TeamMember, Memory, NewsItem } from './types';

export const ALFAMART_COLORS = {
  RED: '#e31e24',
  YELLOW: '#ffeb00',
  BLUE: '#0055a5',
  WHITE: '#ffffff'
};

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: '1',
    name: 'HERMAN',
    role: 'CHIEF OF STORE',
    nik: '21098765',
    imageUrl: 'https://images.unsplash.com/photo-1519085184628-6a0b15422607?q=80&w=400&h=400&auto=format&fit=crop',
    quote: 'Memimpin dengan teladan untuk pelayanan terbaik.'
  },
  {
    id: '2',
    name: 'ENCEP ABDU ROHMAN',
    role: 'ASSISTANT OF STORE',
    nik: '22104532',
    imageUrl: 'https://images.canvas.com/b5a5b678-8d4e-4f3b-8c8e-8e8e8e8e8e8e/image.png?v=1',
    quote: 'Kecepatan dan ketepatan dalam melayani pelanggan.'
  },
  {
    id: '3',
    name: 'SEHAN MAULANA',
    role: 'ASSISTANT OF STORE',
    nik: '22115678',
    imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&h=400&auto=format&fit=crop',
    quote: 'Kekompakan tim adalah kunci kesuksesan toko.'
  },
  {
    id: '4',
    name: 'DEDE',
    role: 'ASSISTANT OF STORE',
    nik: '23019843',
    imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&h=400&auto=format&fit=crop',
    quote: 'Senyum ikhlas dalam setiap pelayanan.'
  },
  {
    id: '5',
    name: 'MUHAMAD RIZKY MUTAKIM',
    role: 'CREW',
    nik: '23041122',
    imageUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=400&h=400&auto=format&fit=crop',
    quote: 'Kerapian rak untuk kenyamanan belanja Anda.'
  },
  {
    id: '6',
    name: 'RINNAT DESAYEV',
    role: 'CREW',
    nik: '23067788',
    imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&h=400&auto=format&fit=crop',
    quote: 'Selalu sigap membantu kebutuhan pelanggan.'
  },
  {
    id: '7',
    name: 'TANIA MUSTAFA',
    role: 'CASHIER',
    nik: '24012233',
    imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&h=400&auto=format&fit=crop',
    quote: 'Transaksi lancar, pelanggan senang.'
  },
  {
    id: '8',
    name: 'SINTA APRILIANI',
    role: 'CASHIER',
    nik: '24024455',
    imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=400&h=400&auto=format&fit=crop',
    quote: 'Melayani setulus hati di setiap transaksi.'
  }
];

export const MEMORIES: Memory[] = [
  {
    id: 'm1',
    title: 'Grand Opening Citaringgul',
    description: 'Momen bersejarah pembukaan toko X450 yang penuh harapan.',
    imageUrl: 'https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?q=80&w=800&h=600&auto=format&fit=crop',
    date: '12 Januari 2022',
    category: 'Event'
  },
  {
    id: 'm2',
    title: 'Buka Puasa Bersama Team',
    description: 'Hangatnya kebersamaan di bulan suci Ramadhan.',
    imageUrl: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=800&h=600&auto=format&fit=crop',
    date: '15 April 2023',
    category: 'Daily'
  },
  {
    id: 'm3',
    title: 'Penghargaan Toko Terbersih',
    description: 'Hasil kerja keras seluruh team menjaga kenyamanan.',
    imageUrl: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=800&h=600&auto=format&fit=crop',
    date: '20 September 2023',
    category: 'Achievement'
  },
  {
    id: 'm4',
    title: 'Kerja Bakti Lingkungan',
    description: 'Kontribusi nyata Alfamart untuk warga Citaringgul.',
    imageUrl: 'https://images.unsplash.com/photo-1559027615-cdbd712217f7?q=80&w=800&h=600&auto=format&fit=crop',
    date: '05 Desember 2023',
    category: 'Event'
  }
];

export const NEWS_ITEMS: NewsItem[] = [
  {
    id: 'n1',
    title: 'Promo JSM Minggu Ini!',
    summary: 'Diskon besar-besaran untuk kebutuhan pokok setiap hari Jumat, Sabtu, dan Minggu.',
    content: 'Dapatkan harga spesial untuk beras, minyak goreng, dan kebutuhan rumah tangga lainnya hanya di Alfamart Citaringgul X450.',
    imageUrl: 'https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=800&h=600&auto=format&fit=crop',
    date: 'Hari ini',
    category: 'Promo'
  },
  {
    id: 'n2',
    title: 'Update Fasilitas Parkir Baru',
    summary: 'Kini parkir di Citaringgul X450 lebih luas dan aman untuk kenyamanan Anda.',
    content: 'Kami telah memperluas area parkir depan toko untuk menampung lebih banyak kendaraan pelanggan setia kami.',
    imageUrl: 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?q=80&w=800&h=600&auto=format&fit=crop',
    date: '3 hari yang lalu',
    category: 'Store Info'
  },
  {
    id: 'n3',
    title: 'Staff of the Month: Encep',
    summary: 'Selamat kepada Pak Encep atas dedikasi luar biasa dalam pelayanan bulan ini.',
    content: 'Kerja keras dan senyum ramah Pak Encep menjadi inspirasi bagi seluruh team X450.',
    imageUrl: 'https://images.canvas.com/b5a5b678-8d4e-4f3b-8c8e-8e8e8e8e8e8e/image.png?v=1',
    date: '1 minggu yang lalu',
    category: 'Internal'
  }
];
