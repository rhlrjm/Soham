import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  HeartHandshake,
  PhoneCall,
  MessageCircle,
  ShieldAlert,
  Sparkles,
  LifeBuoy,
  X,
  Phone,
  ShieldCheck
} from 'lucide-react';

interface CrisisSupportBannerProps {
  variant?: 'banner' | 'card' | 'compact';
}

export const CrisisSupportBanner: React.FC<CrisisSupportBannerProps> = ({ variant = 'banner' }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const whatsappEmergencyUrl = "https://wa.me/919969977008?text=" + encodeURIComponent(
    "नमस्कार राहुलजी, मी खूप मानसिक तणावात / संकटात आहे आणि मला आत्महत्येसारखे किंवा टोकाचे विचार येत आहेत. मला आपल्याशी तातडीने बोलायचे आहे."
  );

  const phoneCallUrl = "tel:+919969977008";

  return (
    <>
      {/* 1. COMPACT / STRIP VARIANT */}
      {variant === 'compact' && (
        <div className="p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-rose-950/80 via-purple-950/70 to-slate-900 border border-rose-500/40 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3 text-left">
            <div className="w-10 h-10 rounded-xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center shrink-0 text-rose-400 animate-pulse">
              <LifeBuoy className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold font-marathi text-rose-200 flex items-center gap-1.5">
                <span>एकटे वाटत आहे? टोकाचे विचार येत आहेत?</span>
              </h4>
              <p className="text-xs text-slate-300 font-marathi">
                जीवन मौल्यवान आहे. राहुल कमलाकर राजम यांच्याशी थेट संपर्क साधा.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <a
              href={whatsappEmergencyUrl}
              target="_blank"
              rel="noreferrer"
              className="px-3.5 py-1.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-slate-950 font-bold font-marathi text-xs flex items-center gap-1.5 shadow transition-all hover:scale-105"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-slate-950" />
              <span>WhatsApp कॉल / संवाद</span>
            </a>
            <a
              href={phoneCallUrl}
              className="px-3.5 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold font-sans text-xs flex items-center gap-1.5 shadow transition-all"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>9969977008</span>
            </a>
          </div>
        </div>
      )}

      {/* 2. FULL BANNER / SECTION VARIANT */}
      {variant === 'banner' && (
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-rose-950/70 via-slate-950/90 to-purple-950/80 border-2 border-rose-500/40 backdrop-blur-2xl p-6 sm:p-8 shadow-[0_0_50px_rgba(244,63,94,0.15)] my-8">
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-rose-600/10 rounded-full blur-3xl pointer-events-none -z-10" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-600/15 rounded-full blur-3xl pointer-events-none -z-10" />

          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="space-y-3 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-marathi font-semibold">
                <ShieldAlert className="w-4 h-4 text-rose-400 animate-bounce" />
                <span>तातडीची आत्मीय मदत व संकट निवारण (Emergency Life Support)</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-display font-bold text-white font-marathi leading-snug">
                आयुष्य अत्यंत मौल्यवान आहे — <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-300 via-amber-200 to-white">तुम्ही एकटे मुळीच नाही आहात!</span>
              </h3>

              <p className="text-sm sm:text-base font-marathi text-slate-200 max-w-2xl leading-relaxed">
                जर तुम्ही किंवा तुमच्या ओळखीची व्यक्ती अत्यंत नैराश्य, तीव्र मानसिक वेदना किंवा आत्महत्येसारख्या (Suicidal Thoughts) टोकाच्या विचारांतून जात असेल, तर कृपया कोणताही चुकीचा निर्णय घेऊ नका. एका क्षणासाठी थांबा आणि थेट संपर्क साधा.
              </p>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs text-amber-200/90 font-marathi pt-1">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" /> १००% संपूर्ण गोपनीयता
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5">
                  <HeartHandshake className="w-4 h-4 text-rose-400" /> प्रेमळ व निस्वार्थ अध्यात्मिक मार्गदर्शन
                </span>
                <span>•</span>
                <span className="text-white font-semibold">
                  विचार व संवाद: RAHUL KAMALAKAR RAJAM
                </span>
              </div>
            </div>

            {/* Action Call Buttons */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 w-full sm:w-auto shrink-0">
              <motion.a
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.98 }}
                href={whatsappEmergencyUrl}
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:from-[#20bd5a] hover:to-[#0f7a6e] text-white font-bold font-marathi text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-[0_0_20px_rgba(37,211,102,0.4)]"
              >
                <MessageCircle className="w-5 h-5 fill-white" />
                <span>WhatsApp वर थेट बोला / कॉल</span>
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.98 }}
                href={phoneCallUrl}
                className="px-6 py-3.5 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-bold font-marathi text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-lg border border-rose-400/40"
              >
                <PhoneCall className="w-5 h-5" />
                <span>तातडीचा कॉल: ९९६९९७७००८</span>
              </motion.a>
            </div>
          </div>
        </section>
      )}

      {/* 3. CARD VARIANT */}
      {variant === 'card' && (
        <div className="rounded-3xl bg-slate-950/80 border border-rose-500/40 p-6 shadow-xl space-y-4 font-marathi text-slate-200">
          <div className="w-12 h-12 rounded-2xl bg-rose-500/20 text-rose-400 flex items-center justify-center mb-2">
            <HeartHandshake className="w-6 h-6" />
          </div>
          <h4 className="text-xl font-bold text-white">
            संकटाच्या क्षणी आत्मीय संवाद
          </h4>
          <p className="text-sm text-slate-300 leading-relaxed">
            जेव्हा सर्व मार्ग बंद वाटतात, तेव्हा केवळ एका संवादाने जीवनाची नवी दिशा मिळू शकते. निराश होऊ नका.
          </p>
          <div className="pt-2 flex flex-col gap-2.5">
            <a
              href={whatsappEmergencyUrl}
              target="_blank"
              rel="noreferrer"
              className="w-full py-2.5 rounded-xl bg-[#25D366] text-slate-950 font-bold text-sm flex items-center justify-center gap-2 shadow"
            >
              <MessageCircle className="w-4 h-4 fill-slate-950" />
              <span>WhatsApp Helpline: 9969977008</span>
            </a>
            <a
              href={phoneCallUrl}
              className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-rose-300 border border-rose-500/30 text-sm font-sans font-bold flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4" />
              <span>Direct Call: +91 9969977008</span>
            </a>
          </div>
        </div>
      )}
    </>
  );
};

export const FloatingEmergencyButton: React.FC = () => {
  const [open, setOpen] = useState(false);

  const whatsappEmergencyUrl = "https://wa.me/919969977008?text=" + encodeURIComponent(
    "नमस्कार राहुलजी, मला अत्यंत मानसिक तणाव / नैराश्य जाणवत असून तातडीने मार्गदर्शनाची व संवादाची गरज आहे."
  );

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="mb-4 w-80 sm:w-96 rounded-3xl bg-slate-950/95 border-2 border-rose-500/50 backdrop-blur-2xl p-5 shadow-2xl text-slate-100 font-marathi space-y-3"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <div className="flex items-center gap-2 text-rose-300 font-bold text-sm">
                <LifeBuoy className="w-4 h-4 animate-spin text-rose-400" />
                <span>तातडीचा आत्मीय आधार</span>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-full bg-white/5"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-200 leading-relaxed">
              मन अशांत आहे? आत्महत्येचे किंवा नैराश्याचे विचार येत आहेत? <strong>थांबा, जीवन सुंदर आहे.</strong> राहुल कमलाकर राजम यांच्याशी थेट संपर्क साधा.
            </p>

            <div className="space-y-2 pt-1">
              <a
                href={whatsappEmergencyUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow"
              >
                <MessageCircle className="w-4 h-4 fill-slate-950" />
                <span>WhatsApp Call / Chat: 9969977008</span>
              </a>

              <a
                href="tel:+919969977008"
                className="w-full py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs flex items-center justify-center gap-2"
              >
                <PhoneCall className="w-4 h-4" />
                <span>थेट फोन करा: ९९६९९७७००८</span>
              </a>
            </div>

            <div className="text-[10px] text-center text-slate-400">
              संपूर्ण आत्मीय, विनामूल्य व गोपनीय मार्गदर्शन
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen(!open)}
        className="px-4 py-3 rounded-full bg-gradient-to-r from-rose-600 via-purple-600 to-rose-600 hover:from-rose-500 hover:to-purple-500 text-white font-bold font-marathi text-xs sm:text-sm flex items-center gap-2 shadow-[0_0_25px_rgba(244,63,94,0.6)] border border-white/20 animate-pulse"
        title="तातडीची मदत (Emergency Help)"
      >
        <LifeBuoy className="w-5 h-5 text-white animate-spin" />
        <span className="font-semibold">तातडीची मदत | ९९६९९७७००८</span>
      </motion.button>
    </div>
  );
};
