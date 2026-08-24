import React, { useState } from 'react';
import { getTodayPanchang } from '../data/panchangData';
import { PanchangInfo, PageType } from '../types';
import { PanchangCircularChart } from './PanchangCircularChart';
import {
  Calendar,
  Sun,
  Moon,
  Clock,
  Compass,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Flame,
  Volume2,
  CheckCircle2,
  AlertCircle,
  Share2,
  Copy,
  Check,
  Wind
} from 'lucide-react';

interface PanchangWidgetProps {
  onNavigate?: (page: PageType) => void;
}

export const PanchangWidget: React.FC<PanchangWidgetProps> = ({ onNavigate }) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [copiedReminder, setCopiedReminder] = useState(false);
  const panchang: PanchangInfo = getTodayPanchang(selectedDate);
  const reminder = panchang.spiritualReminder;

  // Prepare periods for the chart
  const periods = [
    { label: 'शुभ मुहूर्त', start: panchang.shubhMuhurat.split(' - ')[0], end: panchang.shubhMuhurat.split(' - ')[1], type: 'auspicious' as const },
    { label: 'राहुकाळ', start: panchang.rahukaal.split(' - ')[0], end: panchang.rahukaal.split(' - ')[1], type: 'inauspicious' as const }
  ];

  const changeDay = (days: number) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(selectedDate.getDate() + days);
    setSelectedDate(newDate);
  };

  const resetToToday = () => {
    setSelectedDate(new Date());
  };

  const handleShareReminder = () => {
    const shareText = `🕉️ *आजचे पंचांग व अध्यात्मिक स्मरण (Soaham - niranjan369)*\n\n📅 *तारीख:* ${panchang.dateStr} (${panchang.marathiDate})\n✨ *तिथी:* ${panchang.tithi}\n🌟 *नक्षत्र:* ${panchang.nakshatra} | *योग:* ${panchang.yoga}\n\n🧘 *आजचे स्मरण:* ${reminder.headline}\n📖 *साधना:* ${reminder.dailySadhana}\n📿 *आजचा मंत्र:* ${reminder.recommendedMantra.sanskrit} (${reminder.recommendedMantra.name})\n\nवाचा आणि ध्यान करा: https://niranjan369.blogspot.com`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareText);
      setCopiedReminder(true);
      setTimeout(() => setCopiedReminder(false), 2500);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-900/30 text-sky-300 border border-sky-500/30 text-xs font-marathi mb-3">
          <Calendar className="w-3.5 h-3.5" />
          <span>हिंदू पंचांग व शुभ मुहूर्त (Daily Vedic Panchang & Spiritual Wisdom)</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mb-2">
          आजचे पंचांग आणि कालनिर्णय
        </h2>
        <p className="text-slate-300 font-marathi text-sm max-w-lg mx-auto">
          सूर्य, चंद्र आणि नक्षत्रांच्या गतीवर आधारित दैनिक वैदिक कालगणना व आजची आध्यात्मिक साधना.
        </p>
      </div>

      {/* Date Navigation Bar */}
      <div className="flex items-center justify-between bg-slate-900/80 border border-white/10 rounded-2xl p-3 sm:p-4 backdrop-blur-md">
        <button
          onClick={() => changeDay(-1)}
          className="p-2 sm:px-3 sm:py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 flex items-center gap-1 text-xs font-marathi transition-colors"
          title="मागील दिवस"
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="hidden sm:inline">मागील दिवस</span>
        </button>

        <div className="text-center">
          <h3 className="text-base sm:text-lg font-bold font-marathi text-amber-300">
            {panchang.dateStr}
          </h3>
          <span className="text-xs text-slate-400 font-marathi block mt-0.5">
            {panchang.marathiDate}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={resetToToday}
            className="px-3 py-1.5 rounded-xl bg-amber-500/20 text-amber-300 text-xs font-marathi border border-amber-500/30 hover:bg-amber-500/30 transition-colors"
          >
            आज (Today)
          </button>
          <button
            onClick={() => changeDay(1)}
            className="p-2 sm:px-3 sm:py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 flex items-center gap-1 text-xs font-marathi transition-colors"
            title="पुढील दिवस"
          >
            <span className="hidden sm:inline">पुढील दिवस</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 🌟 TODAY'S SPIRITUAL REMINDER (आजचे अध्यात्मिक स्मरण व साधना मार्गदर्शक) 🌟 */}
      {/* ========================================================================= */}
      <section className="rounded-3xl bg-gradient-to-br from-purple-950/80 via-slate-950/90 to-indigo-950/80 border-2 border-amber-500/40 p-6 sm:p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden">
        {/* Glow decorative blobs */}
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-purple-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-6">
          {/* Top Badges & Share button */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-400 text-slate-950 font-marathi font-bold text-xs shadow-md">
                <Sparkles className="w-3.5 h-3.5" />
                <span>आजचे अध्यात्मिक स्मरण (Spiritual Reminder)</span>
              </span>

              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-purple-900/60 text-purple-200 border border-purple-400/30 text-xs font-marathi">
                <Flame className="w-3 h-3 text-amber-400" />
                <span>सात्त्विक ऊर्जा: {reminder.sattvicRating}</span>
              </span>

              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-sky-900/60 text-sky-200 border border-sky-400/30 text-xs font-marathi">
                <Wind className="w-3 h-3 text-sky-400" />
                <span>{reminder.elementEnergy}</span>
              </span>
            </div>

            <button
              onClick={handleShareReminder}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-amber-300 border border-amber-500/30 text-xs font-marathi transition-all"
              title="हे स्मरण कॉपी किंवा शेअर करा"
            >
              {copiedReminder ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copiedReminder ? 'स्मरण कॉपी झाले!' : 'शेअर / कॉपी करा'}</span>
            </button>
          </div>

          {/* Headline & Core Significance */}
          <div className="space-y-2">
            <h3 className="text-xl sm:text-2xl font-bold font-marathi text-amber-200 leading-snug">
              {reminder.headline}
            </h3>
            <p className="text-sm sm:text-base font-marathi text-slate-200 leading-relaxed">
              {reminder.tithiSignificance}
            </p>
          </div>

          {/* Daily Sadhana & Breathwork Box */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Box 1: Core Sadhana */}
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-purple-500/30 space-y-2">
              <div className="flex items-center gap-2 text-purple-300 font-bold font-marathi text-xs uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-purple-400" />
                <span>आजची मुख्य साधना (Today's Sadhana)</span>
              </div>
              <p className="text-sm font-marathi text-slate-200 leading-relaxed">
                {reminder.dailySadhana}
              </p>
            </div>

            {/* Box 2: Soaham Breathwork Focus */}
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-sky-500/30 space-y-2">
              <div className="flex items-center gap-2 text-sky-300 font-bold font-marathi text-xs uppercase tracking-wider">
                <Wind className="w-4 h-4 text-sky-400" />
                <span>सोऽहं श्वास ध्यान सूत्र (Breath Focus)</span>
              </div>
              <p className="text-sm font-marathi text-slate-200 leading-relaxed">
                {reminder.soahamBreathFocus}
              </p>
            </div>
          </div>

          {/* Recommended Mantra Card */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-950/40 via-purple-950/40 to-slate-900 border border-amber-500/30 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-amber-300 font-bold font-marathi text-xs sm:text-sm">
                <Volume2 className="w-4 h-4 text-amber-400" />
                <span>आजचा शिफारसीत मंत्र: {reminder.recommendedMantra.name}</span>
              </div>
              <span className="text-xs text-amber-200/80 font-marathi font-medium">
                {reminder.recommendedMantra.repetitions}
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-amber-500/20 text-center font-display font-semibold text-base sm:text-lg text-amber-200 tracking-wide font-marathi">
              {reminder.recommendedMantra.sanskrit}
            </div>

            <p className="text-xs font-marathi text-slate-300 italic">
              <strong>अर्थ:</strong> {reminder.recommendedMantra.meaning}
            </p>

            {/* Quick Action Navigation Buttons */}
            {onNavigate && (
              <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-white/10">
                <button
                  onClick={() => onNavigate('mantras')}
                  className="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs font-marathi flex items-center gap-1.5 transition-transform hover:scale-105 shadow-md"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>१०८ जपमाळ उघडा (Start Japa)</span>
                </button>

                <button
                  onClick={() => onNavigate('meditation')}
                  className="px-3.5 py-1.5 rounded-xl bg-purple-600/80 hover:bg-purple-500 text-white font-semibold text-xs font-marathi flex items-center gap-1.5 border border-purple-400/40 transition-transform hover:scale-105"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>सोऽहं ध्यान सुरू करा (Meditate)</span>
                </button>
              </div>
            )}
          </div>

          {/* Do's and Don'ts Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            {/* Do's (सात्त्विक कृती) */}
            <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 space-y-2.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-300 font-marathi flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>आज काय करावे (Auspicious Actions)</span>
              </h4>
              <ul className="space-y-1.5 text-xs sm:text-sm font-marathi text-slate-200">
                {reminder.sattvicActions.map((action, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold mt-0.5">•</span>
                    <span>{action}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Don'ts (काय टाळावे) */}
            <div className="p-4 rounded-2xl bg-rose-950/30 border border-rose-500/30 space-y-2.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-rose-300 font-marathi flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-rose-400" />
                <span>काय टाळावे (Things to Avoid)</span>
              </h4>
              <ul className="space-y-1.5 text-xs sm:text-sm font-marathi text-slate-200">
                {reminder.thingsToAvoid.map((avoid, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-rose-400 font-bold mt-0.5">•</span>
                    <span>{avoid}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 🧭 GRID OF PANCHANG ELEMENTS (तिथी, नक्षत्र, योग, मुहूर्त, राहुकाळ) 🧭 */}
      {/* ========================================================================= */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold font-marathi text-white flex items-center gap-2">
          <Compass className="w-5 h-5 text-sky-400" />
          <span>दैनिक पंचांग घटक व शुभ-अशुभ वेळा</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Tithi & Paksha */}
          <div className="p-5 rounded-2xl bg-slate-950/70 border border-purple-500/20 backdrop-blur-md">
            <div className="flex items-center gap-3 text-purple-400 mb-2">
              <Moon className="w-5 h-5" />
              <span className="text-xs uppercase tracking-wider font-semibold">तिथी आणि पक्ष</span>
            </div>
            <p className="text-lg font-bold font-marathi text-slate-100">{panchang.tithi}</p>
            <span className="text-xs text-slate-400 font-marathi">चंद्रकला आणि तिथी प्रभाव</span>
          </div>

          {/* Nakshatra */}
          <div className="p-5 rounded-2xl bg-slate-950/70 border border-sky-500/20 backdrop-blur-md">
            <div className="flex items-center gap-3 text-sky-400 mb-2">
              <Sparkles className="w-5 h-5" />
              <span className="text-xs uppercase tracking-wider font-semibold">नक्षत्र (Constellation)</span>
            </div>
            <p className="text-lg font-bold font-marathi text-slate-100">{panchang.nakshatra}</p>
            <span className="text-xs text-slate-400 font-marathi">२७ नक्षत्रांपैकी चंद्र भ्रमण</span>
          </div>

          {/* Yoga & Karan */}
          <div className="p-5 rounded-2xl bg-slate-950/70 border border-amber-500/20 backdrop-blur-md">
            <div className="flex items-center gap-3 text-amber-400 mb-2">
              <Compass className="w-5 h-5" />
              <span className="text-xs uppercase tracking-wider font-semibold">योग आणि करण</span>
            </div>
            <p className="text-lg font-bold font-marathi text-slate-100">{panchang.yoga} योग</p>
            <span className="text-xs text-slate-400 font-marathi">{panchang.karan}</span>
          </div>

          {/* Sun Timings */}
          <div className="p-5 rounded-2xl bg-slate-950/70 border border-orange-500/20 backdrop-blur-md">
            <div className="flex items-center gap-3 text-orange-400 mb-2">
              <Sun className="w-5 h-5" />
              <span className="text-xs uppercase tracking-wider font-semibold">सूर्योदय आणि सूर्यास्त</span>
            </div>
            <div className="flex items-center justify-between text-sm font-marathi text-slate-200 mt-1">
              <span>सूर्योदय: {panchang.sunrise}</span>
              <span>सूर्यास्त: {panchang.sunset}</span>
            </div>
          </div>

          {/* Shubh Muhurat */}
          <div className="p-5 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 backdrop-blur-md">
            <div className="flex items-center gap-3 text-emerald-400 mb-2">
              <Clock className="w-5 h-5" />
              <span className="text-xs uppercase tracking-wider font-semibold">शुभ मुहूर्त (Auspicious)</span>
            </div>
            <p className="text-sm font-bold font-marathi text-emerald-200">{panchang.shubhMuhurat}</p>
            <span className="text-xs text-emerald-300/70 font-marathi">सर्व शुभ कार्यासाठी सर्वोत्तम काळ</span>
          </div>

          {/* Rahukaal */}
          <div className="p-5 rounded-2xl bg-rose-950/40 border border-rose-500/30 backdrop-blur-md">
            <div className="flex items-center gap-3 text-rose-400 mb-2">
              <Clock className="w-5 h-5" />
              <span className="text-xs uppercase tracking-wider font-semibold">राहुकाळ (अशुभ वेळ)</span>
            </div>
            <p className="text-sm font-bold font-marathi text-rose-200">{panchang.rahukaal}</p>
            <span className="text-xs text-rose-300/70 font-marathi">महत्त्वाचे नवीन करार टाळावेत</span>
          </div>

          {/* Circular Chart */}
          <div className="p-5 rounded-2xl bg-slate-950/70 border border-purple-500/20 backdrop-blur-md sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 text-purple-400 mb-2">
              <Compass className="w-5 h-5" />
              <span className="text-xs uppercase tracking-wider font-semibold">दिनचर्या चक्र (Daily Cycle)</span>
            </div>
            <PanchangCircularChart periods={periods} />
          </div>
        </div>
      </div>
    </div>
  );
};

