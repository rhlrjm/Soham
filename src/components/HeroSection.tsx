import React from 'react';
import { Sparkles, ArrowRight, Play, Quote, LifeBuoy, PhoneCall, Heart } from 'lucide-react';
import { PageType } from '../types';
import { motion } from 'motion/react';

interface HeroSectionProps {
  onNavigate: (page: PageType) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate }) => {
  const emergencyWhatsApp = "https://wa.me/919969977008?text=" + encodeURIComponent(
    "नमस्कार राहुलजी, मला अत्यंत मानसिक तणाव / नैराश्य जाणवत असून तातडीने मार्गदर्शनाची व संवादाची गरज आहे."
  );

  return (
    <section className="relative pt-8 pb-16 md:pt-14 md:pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
      {/* Decorative Aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[550px] h-[340px] sm:h-[550px] bg-purple-600/15 rounded-full blur-[100px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[220px] sm:w-[380px] h-[220px] sm:h-[380px] bg-amber-500/10 rounded-full blur-[80px] pointer-events-none -z-10" />

      {/* Emergency Crisis Lifeline Strip at top */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-rose-950/60 border border-rose-500/40 text-rose-200 text-xs sm:text-sm font-marathi font-medium mb-6 shadow-[0_0_20px_rgba(244,63,94,0.25)]"
      >
        <LifeBuoy className="w-4 h-4 text-rose-400 animate-spin" />
        <span>संकटात आहात? नैराश्य किंवा टोकाचे विचार येत आहेत?</span>
        <a
          href={emergencyWhatsApp}
          target="_blank"
          rel="noreferrer"
          className="ml-1 underline font-bold text-amber-300 hover:text-white flex items-center gap-1"
        >
          <PhoneCall className="w-3 h-3 inline" /> ९९६९९७७००८ वर बोला
        </a>
      </motion.div>

      {/* Platform and Philosophy branding */}
      <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-purple-300 font-marathi mb-3">
        <Sparkles className="w-4 h-4 text-amber-400" />
        <span>समृद्धीराजम • विचार: RAHUL KAMALAKAR RAJAM</span>
        <Sparkles className="w-4 h-4 text-amber-400" />
      </div>

      {/* Main Big Title */}
      <h1 className="text-5xl sm:text-7xl md:text-8xl font-display font-black tracking-wide text-transparent bg-clip-text bg-gradient-to-b from-white via-amber-100 to-purple-300 drop-shadow-sm mb-4">
        सोऽहं
      </h1>

      {/* Subtitle */}
      <p className="text-lg sm:text-2xl md:text-3xl text-slate-200 font-marathi font-light max-w-3xl mx-auto leading-relaxed mb-6">
        शांतीच्या शोधाचं, स्वतःला ओळखण्याचं आणि अंतर्मनात डोकावण्याचं पावन स्थान <br className="hidden sm:inline" />
        <span className="text-amber-200/90 text-sm sm:text-lg font-normal block mt-1">
          "जीवन अनमोल आहे — कोणत्याही संकटापेक्षा तुमचा आत्मा अनंत पटीने मोठा आहे"
        </span>
      </p>

      {/* Sacred Quote Card */}
      <div className="my-8 max-w-2xl mx-auto p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-purple-950/50 via-slate-900/70 to-indigo-950/50 border border-purple-500/30 backdrop-blur-md shadow-xl text-left relative overflow-hidden">
        <div className="absolute -right-4 -bottom-4 opacity-10 text-purple-300 pointer-events-none">
          <Quote className="w-24 h-24" />
        </div>
        <div className="flex items-start gap-3">
          <span className="text-2xl text-amber-400 font-serif leading-none mt-1">“</span>
          <div>
            <p className="font-marathi text-base sm:text-lg text-slate-200 leading-relaxed italic">
              रात्र कितीही गडद असली तरी सूर्याला उगवण्यापासून ती रोखू शकत नाही.
              तुमच्या आयुष्यातील दुःखही कायमचे नाही — एका संवादाने आणि आंतरिक ध्यानाने सर्व काही बदलू शकते.
            </p>
            <span className="block text-xs sm:text-sm text-amber-300/90 font-marathi mt-2 font-medium">
              — RAHUL KAMALAKAR RAJAM
            </span>
          </div>
        </div>
      </div>

      {/* Call to Actions */}
      <div className="flex flex-wrap items-center justify-center gap-3.5 sm:gap-4 mt-6">
        <button
          onClick={() => onNavigate('meditation')}
          className="px-6 py-3.5 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-medium text-sm sm:text-base font-marathi flex items-center gap-2 shadow-[0_0_24px_rgba(139,92,246,0.5)] hover:scale-105 transition-all"
        >
          <Play className="w-4 h-4 fill-white" />
          <span>सोऽहं ध्यान सुरू करा</span>
        </button>

        <button
          onClick={() => onNavigate('articles')}
          className="px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/15 text-slate-200 hover:text-white font-medium text-sm sm:text-base font-marathi border border-white/20 hover:border-amber-400/40 flex items-center gap-2 transition-all"
        >
          <span>सर्व लेख व जीवन मार्गदर्शन</span>
          <ArrowRight className="w-4 h-4 text-amber-400" />
        </button>

        <a
          href={emergencyWhatsApp}
          target="_blank"
          rel="noreferrer"
          className="px-5 py-3.5 rounded-full bg-rose-600/30 hover:bg-rose-600/50 text-rose-200 border border-rose-500/50 text-sm font-marathi flex items-center gap-2 transition-all hover:scale-105"
        >
          <Heart className="w-4 h-4 text-rose-400 fill-rose-400" />
          <span>आपत्कालीन संवाद</span>
        </a>
      </div>

      {/* Fast Highlights Badges */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto mt-12 pt-8 border-t border-white/10">
        <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 text-center">
          <div className="text-amber-400 font-bold text-lg font-display">२१,६००</div>
          <div className="text-[12px] font-marathi text-slate-300">दैनंदिन श्वास व अजपा जप</div>
        </div>
        <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 text-center">
          <div className="text-purple-400 font-bold text-lg font-display">४३२ Hz</div>
          <div className="text-[12px] font-marathi text-slate-300">पवित्र ॐ नाद व कंपने</div>
        </div>
        <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 text-center">
          <div className="text-rose-400 font-bold text-lg font-display">२४x७</div>
          <div className="text-[12px] font-marathi text-slate-300">आपत्कालीन जीवन आधार</div>
        </div>
        <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 text-center">
          <div className="text-sky-400 font-bold text-lg font-display">१००%</div>
          <div className="text-[12px] font-marathi text-slate-300">मानव-लिखित ज्ञान</div>
        </div>
      </div>
    </section>
  );
};
