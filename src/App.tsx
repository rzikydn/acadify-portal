import React, { useState } from 'react';
import { 
  User, Calendar, FileText, Bell, LogIn, UserPlus, GraduationCap, 
  Clock, Users, Mail, Phone, MapPin 
} from 'lucide-react';
import ScrollVelocity from './components/ScrollVelocity';
import './components/ScrollVelocity.css';

function App() {
  const navigationItems = [
    { name: 'Beranda', href: '#beranda' },
    { name: 'Fitur Layanan', href: '#jadwal' },
    { name: 'Akses Infofmasi', href: '#pengumuman' },
    { name: 'Kontak', href: '#kontak' },
  ];

  const cards = [
    { title: 'Absensi', description: 'Pantau kehadiran dan rekap absensi mahasiswa secara real-time', icon: <Users className="w-8 h-8 text-blue-600" /> },
    { title: 'Jadwal Kuliah', description: 'Akses jadwal perkuliahan lengkap dengan ruang dan dosen pengampu', icon: <Calendar className="w-8 h-8 text-blue-600" /> },
    { title: 'Pengumuman', description: 'Dapatkan informasi terbaru seputar kegiatan akademik dan kampus', icon: <Bell className="w-8 h-8 text-blue-600" /> },
    { title: 'Nilai & Transkrip', description: 'Lihat nilai semester dan transkrip akademik secara lengkap', icon: <FileText className="w-8 h-8 text-blue-600" /> },
  ];

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleScroll = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -100; // sesuaikan dengan tinggi header
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Header */}
      <header className="bg-[#0f62c1] shadow-lg relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-12 md:py-16">
            <div className="flex items-center">
              <GraduationCap className="w-10 h-10 text-white mr-3" />
              <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                ACADIFY
              </h1>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex space-x-4">
              {navigationItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-full transition-all duration-300 hover:scale-105 font-medium backdrop-blur-sm border border-white/20 whitespace-nowrap"
                >
                  {item.name}
                </a>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="md:flex lg:hidden text-white p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:block lg:hidden bg-[#0f62c1]">
            <nav className="px-4 pb-4 space-y-2">
              {navigationItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-full transition-all duration-300 hover:scale-105 font-medium backdrop-blur-sm border border-white/20"
                  onClick={() => setMobileMenuOpen(false)} // tutup menu saat klik
                >
                  {item.name}
                </a>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section id="beranda" className="bg-white py-20 md:py-32 relative overflow-hidden">
        <ScrollVelocity
          texts={['SELAMAT DATANG DI ACADIFY!']}
          velocity={100}
          className="text-4xl md:text-6xl font-bold text-[#0f62c1]"
        />
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <p className="text-xl md:text-2xl text-gray-600 mb-12 leading-relaxed">
            Akses informasi akademik dan jadwal kuliah dengan mudah.
            <br />
            Platform terpadu untuk kebutuhan akademik mahasiswa dan dosen.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="bg-[#0f62c1] hover:bg-blue-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-lg flex items-center">
              <LogIn className="w-5 h-5 mr-2" />
              Masuk ke Portal
            </button>
            <button className="border-2 border-[#0f62c1] text-[#0f62c1] hover:bg-[#0f62c1] hover:text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 flex items-center">
              <UserPlus className="w-5 h-5 mr-2" />
              Daftar Sekarang
            </button>
          </div>
        </div>
      </section>

      {/* Cards Section */}
      <section id="jadwal" className="py-20 md:py-24 bg-gray-50">
        <div className="w-full overflow-hidden text-center">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Fitur Layanan</h3>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Akses semua kebutuhan akademik Anda dalam satu platform yang terintegrasi
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-4 lg:px-0">
            {cards.map((card, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 hover:scale-105 border border-gray-100 group">
                <div className="flex flex-col items-center text-center">
                  <div className="mb-6 p-4 bg-blue-50 rounded-full group-hover:bg-blue-100 transition-colors duration-300">
                    {card.icon}
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-4">{card.title}</h4>
                  <p className="text-gray-600 leading-relaxed">{card.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Info Section */}
      <section id="pengumuman" className="py-20 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Kemudahan Akses Informasi Akademik</h3>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                ACADIFY menghadirkan solusi digital terdepan untuk mengelola seluruh kegiatan akademik. 
                Dengan antarmuka yang intuitif dan fitur-fitur canggih, proses administrasi akademik 
                menjadi lebih efisien dan mudah diakses.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Clock className="w-6 h-6 text-[#0f62c1] mr-3" />
                  <span className="text-gray-700">Akses 24/7 dari mana saja</span>
                </div>
                <div className="flex items-center">
                  <User className="w-6 h-6 text-[#0f62c1] mr-3" />
                  <span className="text-gray-700">Dashboard personal yang komprehensif</span>
                </div>
                <div className="flex items-center">
                  <Bell className="w-6 h-6 text-[#0f62c1] mr-3" />
                  <span className="text-gray-700">Notifikasi real-time untuk updates penting</span>
                </div>
              </div>
            </div>
            <div className="lg:pl-12">
              <div className="bg-gradient-to-br from-[#0f62c1] to-blue-700 rounded-2xl p-8 text-white">
                <h4 className="text-2xl font-bold mb-4">Statistik Platform</h4>
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2">10,000+</div>
                    <div className="text-blue-100">Mahasiswa Aktif</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2">500+</div>
                    <div className="text-blue-100">Dosen</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2">50+</div>
                    <div className="text-blue-100">Program Studi</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2">99%</div>
                    <div className="text-blue-100">Uptime</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Contact Section */}
      <section id="kontak" className="bg-gradient-to-br from-[#0f62c1] to-blue-700 text-white py-20 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-40 h-40 bg-white rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-white rounded-full blur-2xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Hubungi Kami</h2>
            <p className="text-blue-100 max-w-2xl mx-auto text-center text-lg leading-relaxed">
              Tim support ACADIFY siap membantu Anda 24/7 untuk segala kebutuhan akademik.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {/* Email Support */}
            <div className="group bg-white/10 backdrop-blur-md rounded-2xl p-8 hover:bg-white/20 hover:scale-105 transition-all duration-300 shadow-xl border border-white/20 hover:shadow-blue-400/50">
              <div className="p-4 rounded-full bg-white/20 mb-6 inline-flex group-hover:rotate-12 transition-transform duration-300">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Email Support</h3>
              <p className="text-blue-100 text-sm leading-relaxed mb-4">
                Kirimkan pertanyaan atau keluhan Anda melalui email resmi kami.
              </p>
              <a href="mailto:support@acadify.com" className="text-white hover:text-yellow-300 transition-colors duration-300 underline decoration-2 underline-offset-4 hover:decoration-yellow-300">
                support@acadify.com
              </a>
            </div>

            {/* Telepon */}
            <div className="group bg-white/10 backdrop-blur-md rounded-2xl p-8 hover:bg-white/20 hover:scale-105 transition-all duration-300 shadow-xl border border-white/20 hover:shadow-blue-400/50">
              <div className="p-4 rounded-full bg-white/20 mb-6 inline-flex group-hover:rotate-12 transition-transform duration-300">
                <Phone className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Telepon</h3>
              <p className="text-blue-100 text-sm leading-relaxed mb-4">
                Tersedia layanan bantuan langsung via telepon setiap hari.
              </p>
              <a href="tel:+62123456789" className="text-white hover:text-yellow-300 transition-colors duration-300 underline decoration-2 underline-offset-4 hover:decoration-yellow-300">
                +62 123 456 789
              </a>
            </div>

            {/* Lokasi Kampus */}
            <div className="group bg-white/10 backdrop-blur-md rounded-2xl p-8 hover:bg-white/20 hover:scale-105 transition-all duration-300 shadow-xl border border-white/20 hover:shadow-blue-400/50">
              <div className="p-4 rounded-full bg-white/20 mb-6 inline-flex group-hover:rotate-12 transition-transform duration-300">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Lokasi Kampus</h3>
              <p className="text-blue-100 text-sm leading-relaxed mb-4">
                Jl. Pendidikan No. 45, Jakarta, Indonesia.
              </p>
              <a href="https://goo.gl/maps/example" target="_blank" rel="noopener noreferrer" className="text-white hover:text-yellow-300 transition-colors duration-300 underline decoration-2 underline-offset-4 hover:decoration-yellow-300">
                Lihat di Google Maps
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0f62c1] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center mb-4">
                <GraduationCap className="w-8 h-8 text-white mr-3" />
                <h5 className="text-2xl font-bold">ACADIFY</h5>
              </div>
              <p className="text-blue-100 leading-relaxed max-w-md">
                Platform akademik terpadu yang mengintegrasikan semua kebutuhan administrasi 
                dan informasi akademik dalam satu sistem yang mudah dan efisien.
              </p>
            </div>
            <div>
              <h6 className="font-semibold text-lg mb-4">Layanan</h6>
              <ul className="space-y-2 text-blue-100">
                <li><a href="#" className="hover:text-white transition-colors">Portal Mahasiswa</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Portal Dosen</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Sistem Informasi</a></li>
                <li><a href="#" className="hover:text-white transition-colors">E-Learning</a></li>
              </ul>
            </div>
            <div>
              <h6 className="font-semibold text-lg mb-4">Bantuan</h6>
              <ul className="space-y-2 text-blue-100">
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Panduan</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Kontak Support</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Tutorial</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-blue-400 pt-8 text-center">
            <p className="text-blue-100">
              &copy; 2025 ACADIFY. Semua hak cipta dilindungi. Dikembangkan oleh acoeng untuk kemajuan pendidikan.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
