import React, { useState } from 'react';
import { motion } from 'motion/react';
import { PageType } from '../types';
import { useLanguage } from '../context/LanguageContext';
import {
  Sparkles,
  BookOpen,
  Volume2,
  Calendar,
  Info,
  Mail,
  Menu,
  X,
  Share2,
  Languages,
  LifeBuoy,
  PhoneCall
} from 'lucide-react';
import { playSingingBowl } from '../utils/audioSynthesizer';

interface NavbarProps {
  currentPage: PageType;
  onNavigate: (page: PageType) => void;
  onSearch: (query: string) => void;
  searchQuery: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  onSearch,
  searchQuery,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { language, toggleLanguage } = useLanguage();

  const handleNav = (page: PageType) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const playChime = () => {
    playSingingBowl(432, 3.5);
  };

  const navLinks: { id: PageType; label: string; subLabel: string; icon: React.ReactNode }[] = [
    { id: 'home', label: 'मुखपृष्ठ', subLabel: 'Home', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'articles', label: 'लेख संग्रह', subLabel: 'Articles', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'meditation', label: 'सोऽहं ध्यान', subLabel: 'Meditation', icon: <Sparkles className="w-4 h-4 text-purple-400" /> },
    { id: 'mantras', label: 'मंत्र साधना', subLabel: 'Mantras', icon: <Volume2 className="w-4 h-4 text-amber-400" /> },
    { id: 'panchang', label: 'पंचांग', subLabel: 'Panchang', icon: <Calendar className="w-4 h-4 text-sky-400" /> },
    { id: 'contact', label: 'तातडीची मदत', subLabel: 'Helpline', icon: <LifeBuoy className="w-4 h-4 text-rose-400 animate-pulse" /> }
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#050810]/85 backdrop-blur-xl border-b border-white/10 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => handleNav('home')}
          className="flex items-center gap-3.5 text-left group focus:outline-none"
          title="Soaham - समृद्धीराजम"
        >
          <div className="relative w-11 h-11 rounded-full bg-gradient-to-br from-amber-300 via-purple-600 to-indigo-700 p-[1.5px] shadow-[0_0_20px_rgba(246,196,83,0.35)] group-hover:shadow-[0_0_28px_rgba(139,92,246,0.6)] transition-all duration-300">
            <div className="w-full h-full rounded-full bg-[#050810] flex items-center justify-center text-amber-300 font-display font-bold text-xl">
              सो
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display font-bold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-white via-amber-100 to-purple-200 tracking-wider">
                समृद्धीराजम
              </span>
              <span className="px-1.5 py-0.5 rounded text-[10px] uppercase font-semibold tracking-wider bg-purple-900/60 text-purple-200 border border-purple-500/30">
                सोऽहं
              </span>
            </div>
            <span className="text-[12px] font-marathi text-amber-200/80 -mt-0.5 block tracking-wide">
              विचार: RAHUL KAMALAKAR RAJAM
            </span>
          </div>
        </motion.button>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-1.5 xl:gap-2">
          {navLinks.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                  isActive
                    ? 'bg-purple-900/40 text-amber-300 border border-purple-500/30 shadow-[0_0_12px_rgba(139,92,246,0.2)]'
                    : item.id === 'contact'
                    ? 'text-rose-300 hover:text-rose-200 bg-rose-950/30 border border-rose-500/30'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.icon}
                <span className="font-marathi text-[15px]">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5">
          {/* Direct Emergency SOS Call Button in header */}
          <a
            href="https://wa.me/919969977008?text=%E0%A4%A8%E0%A4%AE%E0%A4%B8%E0%A5%8D%E0%A4%95%E0%A4%BE%E0%A4%B0%20%E0%A4%B0%E0%A4%BE%E0%A4%B9%E0%A5%81%E0%A4%B2%E0%A4%9C%E0%A5%80,%20%E0%A4%AE%E0%A4%B2%E0%A4%BE%20%E0%A4%A4%E0%A4%BE%E0%A4%A4%E0%A4%A1%E0%A5%80%E0%A4%9A%E0%A5%8D%E0%A4%AF%E0%A4%BE%20%E0%A4%B8%E0%A4%82%E0%A4%B5%E0%A4%BE%E0%A4%A6%E0%A4%BE%E0%A4%9A%E0%A5%80%20%E0%A4%97%E0%A4%B0%E0%A4%9C%20%E0%A4%86%E0%A4%B9%E0%A5%87."
            target="_blank"
            rel="noreferrer"
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-rose-600/20 border border-rose-500/40 text-rose-300 hover:bg-rose-600/30 text-xs font-marathi transition-all"
            title="आपत्कालीन मदत: 9969977008"
          >
            <PhoneCall className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
            <span>मदत: ९९६९९७७००८</span>
          </a>

          {/* Language Toggle */}
          <button
            onClick={toggleLanguage}
            className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-all"
            title="भाषा बदला (Toggle Language)"
          >
            <Languages className="w-4 h-4" />
            <span className="sr-only">{language === 'mr' ? 'Switch to English' : 'मराठीत बदला'}</span>
          </button>

          {/* Quick Sound Bell button */}
          <button
            onClick={playChime}
            className="p-2.5 rounded-full bg-white/5 hover:bg-amber-500/20 text-amber-300 hover:text-amber-200 border border-white/10 hover:border-amber-500/40 transition-all text-xs flex items-center gap-1.5 shadow-sm"
            title="पवित्र नाद (432Hz Sound Chime)"
          >
            <Volume2 className="w-4 h-4 animate-pulse" />
            <span className="hidden sm:inline font-marathi text-xs">नाद</span>
          </button>

          {/* Quick Search toggle */}
          <div className="relative">
            {searchOpen ? (
              <div className="flex items-center bg-slate-900/90 border border-purple-500/40 rounded-full px-3 py-1.5 shadow-lg">
                <input
                  type="text"
                  placeholder="शोधा (उदा. ध्यान, नैराश्य, सोऽहं)..."
                  value={searchQuery}
                  onChange={(e) => onSearch(e.target.value)}
                  autoFocus
                  className="bg-transparent text-sm text-white placeholder-slate-400 focus:outline-none w-36 sm:w-48 font-marathi"
                />
                <button
                  onClick={() => {
                    setSearchOpen(false);
                    onSearch('');
                  }}
                  className="text-slate-400 hover:text-white ml-1 text-xs"
                >
                  ✕
                </button>
              </div>
            ) : (
              <button
                onClick={() => setSearchOpen(true)}
                className="px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 text-xs border border-white/10 flex items-center gap-1.5 transition-all"
              >
                <span className="font-marathi">शोध</span>
              </button>
            )}
          </div>

          {/* Share website URL */}
          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: 'समृद्धीराजम — सोऽहं (शांतीची वाट)',
                  text: 'विचार: RAHUL KAMALAKAR RAJAM | ध्यान, आत्मज्ञान, आणि जीवन संजीवनी मदत',
                  url: window.location.href
                }).catch(() => {});
              } else {
                navigator.clipboard.writeText(window.location.href);
                alert('लिंक कॉपी केली आहे! (Link copied)');
              }
            }}
            className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-all"
            title="शेअर करा"
          >
            <Share2 className="w-4 h-4" />
          </button>

          {/* Mobile hamburger menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-lg bg-white/5 text-slate-300 hover:text-white border border-white/10"
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0a0f24]/95 backdrop-blur-2xl border-b border-white/10 px-4 pt-3 pb-6 space-y-1.5 shadow-2xl animate-in slide-in-from-top duration-200">
          {navLinks.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNav(item.id)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-left font-medium transition-all ${
                currentPage === item.id
                  ? 'bg-purple-900/50 text-amber-300 border border-purple-500/40'
                  : item.id === 'contact'
                  ? 'bg-rose-950/40 text-rose-300 border border-rose-500/30'
                  : 'text-slate-200 hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-3">
                {item.icon}
                <span className="font-marathi text-base">{item.label}</span>
              </div>
              <span className="text-xs text-slate-400 font-sans">{item.subLabel}</span>
            </button>
          ))}

          <div className="pt-3 border-t border-white/10 flex items-center justify-around">
            <button
              onClick={() => handleNav('about')}
              className="text-xs text-slate-300 hover:text-amber-300 font-marathi py-2 flex items-center gap-1.5"
            >
              <Info className="w-3.5 h-3.5" /> आमच्याबद्दल (About)
            </button>
            <button
              onClick={() => handleNav('contact')}
              className="text-xs text-rose-300 hover:text-rose-200 font-marathi py-2 flex items-center gap-1.5"
            >
              <LifeBuoy className="w-3.5 h-3.5" /> आपत्कालीन मदत
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
