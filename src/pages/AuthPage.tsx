// src/pages/AuthPage.tsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom"; // ✅ untuk redirect
import {
  LogIn,
  UserPlus,
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  GraduationCap,
  BookOpen,
  Users,
  Award,
} from "lucide-react";
import { supabase } from "../supabaseClient";

// ✅ props diterima dari App.tsx
type AuthPageProps = {
  onLoginSuccess: () => void;
};

const AuthPage: React.FC<AuthPageProps> = ({ onLoginSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate(); // ✅ hook navigate

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      if (isLogin) {
        // 🔹 LOGIN
        const { data, error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });

        if (error) {
          setMessage(`❌ Login gagal: ${error.message}`);
        } else if (data?.user) {
          setMessage(`✅ Login berhasil! Selamat datang ${data.user.email}`);
          console.log("User data:", data.user);

          // ✅ Call callback untuk update state di App.tsx
          onLoginSuccess();
          
          // ✅ Navigate ke dashboard akan otomatis karena state berubah
          // Tapi kita bisa juga manual navigate untuk memastikan
          navigate('/dashboard', { replace: true });
        }
      } else {
        // 🔹 REGISTER
        if (formData.password !== formData.confirmPassword) {
          setMessage("❌ Password dan konfirmasi tidak sama!");
          setLoading(false);
          return;
        }

        const { data, error } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
        });

        if (error) {
          setMessage(`❌ Registrasi gagal: ${error.message}`);
          setLoading(false);
          return;
        }

        const user = data.user;

        if (user) {
          const { error: profileError } = await supabase
            .from("profiles")
            .insert([{ id: user.id, full_name: formData.fullName }]);

          if (profileError) {
            setMessage(`⚠️ Gagal simpan profile: ${profileError.message}`);
          } else {
            setMessage("✅ Registrasi berhasil! Silakan cek email untuk verifikasi.");
            setIsLogin(true);
            setFormData({ fullName: "", email: "", password: "", confirmPassword: "" });
          }
        }
      }
    } catch (err) {
      console.error("Error:", err);
      setMessage("⚠️ Terjadi kesalahan server.");
    }

    setLoading(false);
  };

  // Variants animasi
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6, staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 50 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const logoVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: "backOut", delay: 0.2 } },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <motion.div
        className="min-h-screen grid grid-cols-1 md:grid-cols-2"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Left Side - Branding */}
        <motion.div
          className="flex flex-col justify-center items-center p-6 md:p-12 bg-gradient-to-br from-[#0f62c1] to-[#0a4d99] text-white relative overflow-hidden"
          variants={itemVariants}
        >
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-xl"></div>
            <div className="absolute top-1/2 -right-20 w-60 h-60 bg-white/5 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-20 left-1/3 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
          </div>

          <div className="relative z-10 text-center max-w-md">
            <motion.div className="mb-8" variants={logoVariants}>
              <div className="flex items-center justify-center mb-4">
                <div className="bg-white/20 p-4 rounded-full backdrop-blur-sm">
                  <GraduationCap size={48} className="text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-2">ACADIFY</h1>
              <p className="text-blue-100 text-lg">Platform Pembelajaran Digital</p>
            </motion.div>

            <motion.div className="space-y-6" variants={itemVariants}>
              <div className="flex items-center gap-4">
                <div className="bg-white/20 p-3 rounded-full">
                  <BookOpen size={24} />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold">Pembelajaran Interaktif</h3>
                  <p className="text-blue-100 text-sm">Akses ribuan materi pembelajaran berkualitas</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-white/20 p-3 rounded-full">
                  <Users size={24} />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold">Komunitas Belajar</h3>
                  <p className="text-blue-100 text-sm">Belajar bersama ribuan siswa lainnya</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-white/20 p-3 rounded-full">
                  <Award size={24} />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold">Sertifikat Resmi</h3>
                  <p className="text-blue-100 text-sm">Dapatkan sertifikat yang diakui industri</p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Right Side - Auth Form */}
        <motion.div
          className="flex flex-col justify-center items-center p-6 md:p-12"
          variants={itemVariants}
        >
          <motion.div className="w-full max-w-md" variants={cardVariants}>
            <div className="bg-white rounded-2xl shadow-xl p-8">
              {/* Tab Navigation */}
              <div className="relative mb-8">
                <div className="flex bg-gray-100 rounded-full p-1">
                  <button
                    onClick={() => setIsLogin(true)}
                    className={`flex-1 py-2 px-4 rounded-full font-semibold transition-all duration-300 relative ${
                      isLogin
                        ? "bg-[#0f62c1] text-white shadow-md"
                        : "text-gray-600 hover:text-[#0f62c1]"
                    }`}
                  >
                    Masuk
                  </button>
                  <button
                    onClick={() => setIsLogin(false)}
                    className={`flex-1 py-2 px-4 rounded-full font-semibold transition-all duration-300 relative ${
                      !isLogin
                        ? "bg-[#0f62c1] text-white shadow-md"
                        : "text-gray-600 hover:text-[#0f62c1]"
                    }`}
                  >
                    Daftar
                  </button>
                </div>
              </div>

              <AnimatePresence mode="wait">
                <motion.form
                  key={isLogin ? "login" : "register"}
                  onSubmit={handleSubmit}
                  className="space-y-6"
                  initial={{ opacity: 0, x: isLogin ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: isLogin ? 20 : -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {!isLogin && (
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">
                        Nama Lengkap
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-[#0f62c1] focus:border-transparent outline-none transition-all"
                          placeholder="Masukkan nama lengkap"
                        />
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-[#0f62c1] focus:border-transparent outline-none transition-all"
                        placeholder="Masukkan email"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-[#0f62c1] focus:border-transparent outline-none transition-all"
                        placeholder="Masukkan password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                  </div>

                  {!isLogin && (
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">Konfirmasi Password</label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-[#0f62c1] focus:border-transparent outline-none transition-all"
                          placeholder="Konfirmasi password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                      </div>
                    </div>
                  )}

                  <motion.button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#0f62c1] text-white py-3 rounded-full font-semibold flex items-center justify-center gap-2 hover:bg-blue-700 hover:scale-105 active:scale-95 transition-all duration-200 shadow-lg hover:shadow-xl"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isLogin ? <LogIn size={20} /> : <UserPlus size={20} />}
                    {loading ? "Loading..." : isLogin ? "Masuk" : "Daftar"}
                  </motion.button>

                  {message && (
                    <p className="text-center text-sm mt-2">{message}</p>
                  )}
                </motion.form>
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Footer */}
      <motion.footer className="bg-[#0f62c1] text-white py-6" variants={itemVariants}>
        <div className="container mx-auto px-6 text-center">
          <p className="text-blue-100">© 2025 ACADIFY. Semua hak cipta dilindungi.</p>
        </div>
      </motion.footer>
    </div>
  );
};

export default AuthPage;