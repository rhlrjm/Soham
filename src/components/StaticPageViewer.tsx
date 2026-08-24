import React, { useState } from 'react';
import { Mail, MapPin, Clock, Send, CheckCircle2, Shield, AlertTriangle, UserCheck, PhoneCall, MessageCircle, HeartHandshake, LifeBuoy } from 'lucide-react';
import { AdSenseBanner } from './AdSenseBanner';
import { CrisisSupportBanner } from './CrisisSupportBanner';

interface StaticPageViewerProps {
  pageType: 'about' | 'contact' | 'disclaimer' | 'privacy';
}

export const StaticPageViewer: React.FC<StaticPageViewerProps> = ({ pageType }) => {
  // Contact form state
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formSubject, setFormSubject] = useState('');
  const [formMessage, setFormMessage] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  const emergencyWhatsApp = "https://wa.me/919969977008?text=" + encodeURIComponent(
    "नमस्कार राहुलजी, मी खूप मानसिक तणावात / संकटात आहे आणि मला आत्महत्येसारखे टोकाचे विचार येत आहेत. मला आपल्याशी तातडीने बोलायचे आहे."
  );

  const handleSubmitContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formMessage) return;
    setFormSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* 1. ABOUT US PAGE */}
      {pageType === 'about' && (
        <div className="rounded-3xl bg-slate-950/70 border border-purple-500/20 backdrop-blur-xl p-6 sm:p-10 shadow-2xl space-y-8 font-marathi text-slate-200">
          <div className="border-b border-white/10 pb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-900/40 text-purple-300 border border-purple-500/30 text-xs font-marathi mb-3">
              <UserCheck className="w-3.5 h-3.5" />
              <span>आमच्याबद्दल (About Us)</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-display font-bold text-amber-300">
              समृद्धीराजम — सोऽहं
            </h1>
            <p className="text-sm text-purple-200 font-sans italic mt-1">
              Spiritual Wisdom & Guidance by RAHUL KAMALAKAR RAJAM (Panvel, Maharashtra)
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-purple-950/30 border-l-4 border-purple-500 text-lg leading-relaxed text-slate-100">
            <strong>समृद्धीराजम (SamruddhiRajam)</strong> हे एक पवित्र अध्यात्मिक आणि जीवन संजीवनी दालन आहे.
            या व्यासपीठावरील सर्व विचार, जीवन मार्गदर्शक आणि अध्यात्मिक संकल्पना <strong>RAHUL KAMALAKAR RAJAM</strong>
            यांच्या प्रगल्भ अनुभवातून आणि चिंतनातून साकारल्या गेल्या आहेत.
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-amber-300">
              या व्यासपीठाची संकल्पना व उद्दिष्ट
            </h2>
            <p className="leading-relaxed text-slate-300">
              आजच्या धावपळीच्या युगात माणसाकडे सर्व भौतिक सुखे आहेत, पण मनाची शांती हरवली आहे.
              अती विचार (Overthinking), चिंता, नैराश्य, संकटे आणि एकटेपणामुळे अनेक व्यक्ती टोकाचे पाऊल उचलण्याचा विचार करतात.
            </p>
            <p className="leading-relaxed text-slate-300">
              आमचे ध्येय केवळ अध्यात्मिक ज्ञान देणे नसून <strong>प्रत्येक निराश मनाला आशेचा किरण देणे</strong> आणि
              <strong> कोणत्याही व्यक्तीला आत्महत्येसारख्या विनाशापासून वाचवणे</strong> हे आहे.
              सोऽहं साधनेद्वारे स्वतःतील आत्मज्योत ओळखा आणि संकटांवर मात करा.
            </p>
          </div>

          <div className="space-y-4 pt-4 border-t border-white/10">
            <h2 className="text-2xl font-bold text-purple-300">
              मुख्य स्तंभ (Core Pillars)
            </h2>
            <ul className="space-y-2.5 text-slate-300">
              <li className="flex items-start gap-2.5">
                <span className="text-rose-400 font-bold">✦</span>
                <span><strong>जीवन संजीवनी मदत:</strong> २४x७ नैराश्य व आत्महत्येचे विचार रोखण्यासाठी थेट व्यक्तिगत संवाद (Helpline: ९९६९९७७००८).</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-amber-400 font-bold">✦</span>
                <span><strong>सोऽहं ध्यान:</strong> श्वासाच्या नैसर्गिक लयीत मन एकाग्र करणे व ताणमुक्ती.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-amber-400 font-bold">✦</span>
                <span><strong>कर्माचा खरा सिद्धांत:</strong> अपयश, कर्ज आणि दुःखातून बाहेर पडून पुन्हा उभे राहण्याची शक्ती देणे.</span>
              </li>
            </ul>
          </div>

          <div className="p-5 rounded-2xl bg-amber-500/10 border-l-4 border-amber-400 text-amber-200 italic font-marathi">
            <em>"संकट कितीही भयंकर असले तरी जीवन संपवणे हा त्यावरचा उपाय नाही. एका संवादाने जीवन पुन्हा फुलू शकते."</em><br />
            <strong>— RAHUL KAMALAKAR RAJAM</strong>, पनवेल, महाराष्ट्र
          </div>
        </div>
      )}

      {/* 2. CONTACT US PAGE & EMERGENCY CRISIS HELPLINE */}
      {pageType === 'contact' && (
        <div className="rounded-3xl bg-slate-950/70 border border-purple-500/20 backdrop-blur-xl p-6 sm:p-10 shadow-2xl space-y-8 font-marathi text-slate-200">
          <div className="border-b border-white/10 pb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-900/40 text-rose-300 border border-rose-500/30 text-xs font-marathi mb-3">
              <LifeBuoy className="w-3.5 h-3.5 animate-spin text-rose-400" />
              <span>तातडीची मदत व संपर्क (Emergency Support & Contact)</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-display font-bold text-amber-300">
              तातडीचा आत्मीय संपर्क कक्ष
            </h1>
            <p className="text-slate-300 text-sm mt-1">
              मनात टोकाचे विचार येत असल्यास एका क्षणाचाही संकोच न बाळगता थेट संपर्क साधा.
            </p>
          </div>

          {/* Full Emergency Life Support Banner */}
          <CrisisSupportBanner variant="banner" />

          {/* Contact Details Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-rose-950/40 border border-rose-500/40 text-center space-y-2">
              <PhoneCall className="w-6 h-6 text-rose-400 mx-auto animate-pulse" />
              <h3 className="text-base font-bold text-white">तातडीची हेल्पलाईन</h3>
              <a href="tel:+919969977008" className="text-base text-amber-300 font-bold block font-sans hover:underline">
                9969977008
              </a>
              <p className="text-[11px] text-slate-300">WhatsApp Call / Direct Call</p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-white/10 text-center space-y-2">
              <Mail className="w-6 h-6 text-amber-400 mx-auto" />
              <h3 className="text-base font-bold text-slate-100">ईमेल (Email)</h3>
              <a href="mailto:rhlrjm@gmail.com" className="text-sm text-purple-300 hover:underline block font-sans">
                rhlrjm@gmail.com
              </a>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-white/10 text-center space-y-2">
              <MapPin className="w-6 h-6 text-purple-400 mx-auto" />
              <h3 className="text-base font-bold text-slate-100">पत्ता (Location)</h3>
              <p className="text-xs text-slate-300">
                पनवेल, नवी मुंबई, महाराष्ट्र — ४१०२०६
              </p>
            </div>
          </div>

          {/* Interactive Contact Form */}
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-purple-500/30">
            <h2 className="text-xl sm:text-2xl font-bold text-amber-300 mb-2">
              थेट संदेश पाठवा (Send a Confidential Message)
            </h2>
            <p className="text-xs text-slate-400 mb-6">
              तुमची सर्व माहिती आणि संवाद १००% गोपनीय ठेवला जाईल.
            </p>

            {formSubmitted ? (
              <div className="p-6 rounded-2xl bg-emerald-950/60 border border-emerald-500/50 text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                <h3 className="text-xl font-bold text-emerald-200">
                  तुमचा संदेश प्राप्त झाला आहे!
                </h3>
                <p className="text-sm text-emerald-300/80 max-w-md mx-auto">
                  राहुलजी किंवा आमची टीम तुमच्याशी लवकरच संपर्क साधेल. तोपर्यंत स्वतःची काळजी घ्या.
                </p>
                <div className="pt-2">
                  <a
                    href={emergencyWhatsApp}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#25D366] text-slate-950 font-bold text-xs"
                  >
                    <MessageCircle className="w-4 h-4" /> तातडीसाठी WhatsApp वर बोला
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmitContact} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">तुमचे नाव (Name) *</label>
                    <input
                      type="text"
                      required
                      placeholder="उदा. राहुल / मित्र"
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-slate-400 mb-1">फोन नंबर / WhatsApp नंबर *</label>
                    <input
                      type="tel"
                      placeholder="उदा. 98xxxxxxxx"
                      value={formPhone}
                      onChange={(e) => setFormPhone(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-sm text-white placeholder-slate-500 font-sans focus:outline-none focus:border-purple-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-slate-400 mb-1">ईमेल पत्ता (ऐच्छिक)</label>
                  <input
                    type="email"
                    placeholder="name@example.com"
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-sm text-white placeholder-slate-500 font-sans focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-xs text-slate-400 mb-1">तुमची अडचण किंवा भावना व्यक्त करा *</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="मनातील भीती, ताण किंवा जे काही वाटत आहे ते मोकळेपणाने इथे लिहा..."
                    value={formMessage}
                    onChange={(e) => setFormMessage(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-sm flex items-center gap-2 shadow-lg transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>संदेश पाठवा (Send Message)</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* 3. DISCLAIMER PAGE */}
      {pageType === 'disclaimer' && (
        <div className="rounded-3xl bg-slate-950/70 border border-purple-500/20 backdrop-blur-xl p-6 sm:p-10 shadow-2xl space-y-8 font-marathi text-slate-200">
          <div className="border-b border-white/10 pb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-950/50 text-rose-300 border border-rose-500/30 text-xs font-marathi mb-3">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>अस्वीकरण (Disclaimer)</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-display font-bold text-amber-300">
              अस्वीकरण — Disclaimer
            </h1>
            <p className="text-xs text-slate-400 font-sans mt-1">
              Last Updated: 24 August 2026 | Website: समृद्धीराजम (niranjan369.blogspot.com)
            </p>
          </div>

          <div className="space-y-4 text-slate-300 leading-relaxed">
            <h2 className="text-xl font-bold text-amber-200">
              १. सामान्य आणि अध्यात्मिक सल्ल्याबद्दल (Spiritual & Emotional Support)
            </h2>
            <p>
              या वेबसाइटवर प्रकाशित केलेली सर्व माहिती, लेख, ध्यान मार्गदर्शक आणि विचार केवळ
              <strong> सामान्य आध्यात्मिक, नैतिक आणि भावनिक आधाराच्या उद्देशाने</strong> दिलेले आहेत.
              हे कोणत्याही प्रकारच्या क्लिनिकल सायकायट्री किंवा वैद्यकीय उपचारांचे अधिकृत पर्याय नाहीत.
            </p>
            <p>
              तीव्र मानसिक आजारांसाठी आम्ही नेहमी तज्ज्ञ डॉक्टरांचा सल्ला घेण्याची शिफारस करतो.
            </p>

            <h2 className="text-xl font-bold text-amber-200 pt-4 border-t border-white/10">
              २. जाहिराती आणि Google AdSense
            </h2>
            <p>
              या वेबसाइटवर Google AdSense द्वारे स्वयंचलित जाहिराती दाखविल्या जाऊ शकतात (Publisher ID: ca-pub-3177625082355698).
            </p>
          </div>
        </div>
      )}

      {/* 4. PRIVACY POLICY PAGE */}
      {pageType === 'privacy' && (
        <div className="rounded-3xl bg-slate-950/70 border border-purple-500/20 backdrop-blur-xl p-6 sm:p-10 shadow-2xl space-y-8 font-marathi text-slate-200">
          <div className="border-b border-white/10 pb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/50 text-emerald-300 border border-emerald-500/30 text-xs font-marathi mb-3">
              <Shield className="w-3.5 h-3.5" />
              <span>गोपनीयता धोरण (Privacy Policy)</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-display font-bold text-amber-300">
              गोपनीयता धोरण — Privacy Policy
            </h1>
            <p className="text-xs text-slate-400 font-sans mt-1">
              GDPR & AdSense Compliant | समृद्धीराजम
            </p>
          </div>

          <div className="space-y-6 text-slate-300 leading-relaxed">
            <p>
              <strong>समृद्धीराजम</strong> आपल्या गोपनीयतेचा सर्वोच्च आदर करते. संपर्क फॉर्म किंवा हेल्पलाईनद्वारे प्राप्त होणारी कोणतीही माहिती तृतीय पक्षांशी कधीही सामायिक केली जात नाही.
            </p>
          </div>
        </div>
      )}

      {/* AdSense Placement on static pages */}
      <AdSenseBanner format="horizontal" className="mt-8" />
    </div>
  );
};
