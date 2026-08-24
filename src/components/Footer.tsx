import React from 'react';
import { motion } from 'motion/react';
import { PageType } from '../types';
import { Mail, MapPin, Heart, Facebook, Instagram, Youtube, MessageCircle, Send, PhoneCall, LifeBuoy, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: PageType) => void;
  onFilterCategory?: (category: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onFilterCategory }) => {
  const currentYear = new Date().getFullYear();

  const emergencyWhatsApp = "https://wa.me/919969977008?text=" + encodeURIComponent(
    "नमस्कार राहुलजी, मला अत्यंत मानसिक तणाव / नैराश्य असून तातडीने संवादाची गरज आहे."
  );

  return (
    <footer className="relative mt-20 border-t border-white/10 bg-gradient-to-b from-transparent via-[#050810]/95 to-[#02040a] backdrop-blur-md pt-16 pb-12 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Emergency Lifeline Highlight in Footer */}
        <div className="mb-12 p-6 rounded-3xl bg-gradient-to-r from-rose-950/60 via-purple-950/40 to-slate-950/80 border border-rose-500/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/20 text-rose-400 flex items-center justify-center shrink-0 animate-pulse border border-rose-500/30">
              <LifeBuoy className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-bold text-rose-300 uppercase tracking-wider font-marathi">
                जीवन संजीवनी — २४x७ आपत्कालीन आत्मीय सहाय्य
              </div>
              <h4 className="text-lg sm:text-xl font-bold text-white font-marathi">
                मनात आत्महत्येचे किंवा टोकाचे विचार येत आहेत? एकटे राहू नका!
              </h4>
              <p className="text-xs text-slate-300 font-marathi mt-0.5">
                विचार व थेट संपर्क: <strong>RAHUL KAMALAKAR RAJAM</strong> — १००% विनामूल्य व संपूर्ण गोपनीय
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href={emergencyWhatsApp}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-slate-950 font-bold font-marathi text-xs sm:text-sm flex items-center gap-2 shadow-lg transition-transform hover:scale-105"
            >
              <MessageCircle className="w-4 h-4 fill-slate-950" />
              <span>WhatsApp कॉल / मेसेज</span>
            </a>
            <a
              href="tel:+919969977008"
              className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold font-marathi text-xs sm:text-sm flex items-center gap-2 shadow-lg"
            >
              <PhoneCall className="w-4 h-4" />
              <span>९९६९९७७००८</span>
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Column 1: Brand & Attribution */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-400 to-purple-600 flex items-center justify-center font-display font-bold text-slate-950 text-lg shadow-[0_0_15px_rgba(246,196,83,0.3)]">
                सो
              </div>
              <div>
                <span className="font-display font-bold text-xl text-white tracking-wider block">
                  Soaham
                </span>
                <span className="text-xs font-marathi text-amber-200/80 -mt-1 block">
                  शांतीची वाट — niranjan369
                </span>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1.5">
              <p className="text-xs font-marathi text-amber-300 font-bold">
                व्यासपीठ: समृद्धीराजम (SamruddhiRajam)
              </p>
              <p className="text-xs font-marathi text-purple-300 font-bold">
                अध्यात्मिक विचार: RAHUL KAMALAKAR RAJAM
              </p>
              <p className="text-[11px] font-marathi text-slate-400 leading-relaxed pt-1">
                मानव-कल्याण, ध्यान, आत्मबोध आणि मानसिक शांतीसाठी समर्पित दालन.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              {[
                { name: 'Facebook', icon: Facebook, color: 'text-[#1877f2]', link: 'https://facebook.com' },
                { name: 'Instagram', icon: Instagram, color: 'text-[#E4405F]', link: 'https://instagram.com' },
                { name: 'YouTube', icon: Youtube, color: 'text-[#FF0000]', link: 'https://youtube.com' },
                { name: 'WhatsApp', icon: MessageCircle, color: 'text-[#25d366]', link: emergencyWhatsApp },
                { name: 'Telegram', icon: Send, color: 'text-[#0088cc]', link: 'https://t.me' }
              ].map((item) => (
                <motion.a
                  key={item.name}
                  href={item.link}
                  target="_blank"
                  rel="noreferrer"
                  title={item.name}
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  className={`w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center transition-all duration-300 ${item.color} hover:bg-white/10`}
                >
                  <item.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="font-display font-bold text-base text-amber-300 uppercase tracking-wider mb-4">
              महत्त्वाचे दुवे (Quick Links)
            </h4>
            <ul className="space-y-2.5 text-sm font-marathi">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="text-slate-300 hover:text-amber-300 hover:translate-x-1 transition-all inline-block"
                >
                  मुख्य पृष्ठ (Home)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('articles')}
                  className="text-slate-300 hover:text-amber-300 hover:translate-x-1 transition-all inline-block"
                >
                  सर्व लेख (Articles)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('meditation')}
                  className="text-slate-300 hover:text-amber-300 hover:translate-x-1 transition-all inline-block"
                >
                  सोऽहं ध्यान (Meditation)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('mantras')}
                  className="text-slate-300 hover:text-amber-300 hover:translate-x-1 transition-all inline-block"
                >
                  मंत्र व जपमाळ (Mantras)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="text-slate-300 hover:text-amber-300 hover:translate-x-1 transition-all inline-block"
                >
                  आमच्याबद्दल (About Us)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="text-slate-300 hover:text-amber-300 hover:translate-x-1 transition-all inline-block"
                >
                  संपर्क व मदत कक्ष (Contact & Helpline)
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Topics */}
          <div>
            <h4 className="font-display font-bold text-base text-purple-300 uppercase tracking-wider mb-4">
              अध्यात्मिक विषय (Topics)
            </h4>
            <ul className="space-y-2.5 text-sm font-marathi">
              {[
                { label: 'जीवन संजीवनी व संकट मुक्ती', cat: 'soul' },
                { label: 'ध्यान आणि मनःशांती (Meditation)', cat: 'meditation' },
                { label: 'कर्म आणि भाग्याचा सिद्धांत (Karma)', cat: 'karma' },
                { label: 'अंतर्मन व आत्मज्ञान (Mind Power)', cat: 'soul' },
                { label: 'सात्त्विक जीवन व वास्तु (Lifestyle)', cat: 'lifestyle' },
                { label: 'हिंदू पंचांग व मुहूर्त (Panchang)', cat: 'panchang' }
              ].map((topic) => (
                <li key={topic.label}>
                  <button
                    onClick={() => {
                      if (topic.cat === 'panchang') onNavigate('panchang');
                      else {
                        onNavigate('articles');
                        if (onFilterCategory) onFilterCategory(topic.cat);
                      }
                    }}
                    className="text-slate-300 hover:text-purple-300 hover:translate-x-1 transition-all text-left"
                  >
                    {topic.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact & Author Info */}
          <div>
            <h4 className="font-display font-bold text-base text-sky-300 uppercase tracking-wider mb-4">
              मार्गदर्शन व संपर्क (Help Center)
            </h4>
            <div className="space-y-3 text-sm font-marathi text-slate-300">
              <div>
                <strong className="text-white">RAHUL KAMALAKAR RAJAM</strong>
                <p className="text-xs text-slate-400">आध्यात्मिक अभ्यासक व जीवन मार्गदर्शक</p>
              </div>

              <div className="p-3 rounded-2xl bg-rose-950/40 border border-rose-500/30 space-y-1">
                <div className="text-[11px] text-rose-300 font-bold flex items-center gap-1">
                  <PhoneCall className="w-3.5 h-3.5" /> आपत्कालीन WhatsApp / फोन:
                </div>
                <a
                  href="tel:+919969977008"
                  className="font-mono text-amber-300 font-bold text-sm block hover:underline"
                >
                  +91 9969977008
                </a>
                <p className="text-[10px] text-slate-300">
                  (केवळ मानसिक संकट, नैराश्य व आत्महत्येचे विचार आल्यास तातडीने संपर्क करा)
                </p>
              </div>

              <div className="flex items-start gap-2 text-xs">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>पनवेल, नवी मुंबई, महाराष्ट्र — ४१०२०६, भारत</span>
              </div>

              <div className="flex items-center gap-2 text-xs">
                <Mail className="w-4 h-4 text-purple-400 shrink-0" />
                <a href="mailto:rhlrjm@gmail.com" className="text-purple-300 hover:underline font-sans">
                  rhlrjm@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 font-marathi text-center sm:text-left">
          <p>
            © {currentYear} <strong>समृद्धीराजम (niranjan369.blogspot.com)</strong>. विचार: <strong>RAHUL KAMALAKAR RAJAM</strong>.
          </p>
          <div className="flex items-center gap-1">
            <span>आत्मिक शांती व जीवन संरक्षणासाठी समर्पित</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
          </div>
        </div>
      </div>
    </footer>
  );
};
