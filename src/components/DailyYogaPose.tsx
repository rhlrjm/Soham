import React, { useState, useEffect } from 'react';
import { YogaPose } from '../types';
import { YOGA_POSES_DATA, getTodayYogaPose } from '../data/yogaPoses';
import { 
  Activity, 
  Sparkles, 
  Clock, 
  Sun, 
  Heart, 
  CheckCircle2, 
  ChevronRight, 
  RotateCcw, 
  Play, 
  Pause, 
  Info,
  Calendar,
  ShieldAlert,
  Wind
} from 'lucide-react';

interface DailyYogaPoseProps {
  onNavigateToMeditation?: (duration: number) => void;
}

export const DailyYogaPose: React.FC<DailyYogaPoseProps> = ({ onNavigateToMeditation }) => {
  const [selectedPose, setSelectedPose] = useState<YogaPose>(getTodayYogaPose());
  const [imageError, setImageError] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'benefits' | 'steps' | 'precautions'>('benefits');
  
  // Posture practice timer state
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [timerSeconds, setTimerSeconds] = useState<number>(45);
  const [initialSeconds, setInitialSeconds] = useState<number>(45);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds(prev => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0 && isTimerRunning) {
      setIsTimerRunning(false);
      // Optional subtle vibration or sound when timer ends
      if (typeof window !== 'undefined' && 'vibrate' in navigator) {
        try {
          navigator.vibrate([200, 100, 200]);
        } catch {
          // Ignore vibration error
        }
      }
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, timerSeconds]);

  const handleSelectPose = (pose: YogaPose) => {
    setSelectedPose(pose);
    setImageError(false);
    setIsTimerRunning(false);
    setTimerSeconds(45);
    setInitialSeconds(45);
  };

  const toggleTimer = () => {
    if (timerSeconds === 0) {
      setTimerSeconds(initialSeconds);
    }
    setIsTimerRunning(!isTimerRunning);
  };

  const resetTimer = (secs: number = 45) => {
    setIsTimerRunning(false);
    setInitialSeconds(secs);
    setTimerSeconds(secs);
  };

  const todayPose = getTodayYogaPose();
  const isToday = selectedPose.id === todayPose.id;

  const progressPercent = initialSeconds > 0 ? ((initialSeconds - timerSeconds) / initialSeconds) * 100 : 0;

  return (
    <section 
      id="daily-yoga-pose-section"
      aria-label="Daily Yoga Pose and Health Benefits" 
      className="rounded-3xl bg-slate-950/85 border border-purple-500/30 p-6 sm:p-8 lg:p-10 backdrop-blur-2xl shadow-[0_12px_40px_rgba(139,92,246,0.15)] relative overflow-hidden transition-all duration-300"
    >
      {/* Background ambient lighting */}
      <div className="absolute -top-24 -left-24 w-72 h-72 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10 relative z-10">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-marathi font-bold bg-amber-400/20 text-amber-300 border border-amber-400/40">
              <Activity className="w-3.5 h-3.5 text-amber-400" />
              आजचे नित्य योगासन — Daily Asana
            </span>
            {isToday ? (
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-marathi font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                आजचा दिवस
              </span>
            ) : (
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-marathi text-purple-300 bg-purple-950/60 border border-purple-500/30">
                {selectedPose.dayNameMarathi}
              </span>
            )}
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-white font-marathi flex items-center gap-2">
            <span>{selectedPose.sanskritName}</span>
          </h2>
          <p className="text-xs sm:text-sm text-purple-300 font-sans italic mt-0.5">
            {selectedPose.englishName} • {selectedPose.meaning}
          </p>
        </div>

        {/* Day selector pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full scrollbar-thin">
          {YOGA_POSES_DATA.map((pose) => {
            const isCurrentSelected = pose.id === selectedPose.id;
            const isActualToday = pose.id === todayPose.id;
            const shortDay = pose.dayNameMarathi.split(' ')[0];

            return (
              <button
                key={pose.id}
                onClick={() => handleSelectPose(pose)}
                className={`px-3 py-1.5 rounded-xl text-xs font-marathi font-medium whitespace-nowrap transition-all duration-200 flex items-center gap-1 ${
                  isCurrentSelected
                    ? 'bg-amber-400 text-slate-950 font-bold shadow-md scale-105'
                    : 'bg-slate-900/80 text-slate-300 hover:text-white hover:bg-slate-800 border border-white/5'
                }`}
              >
                {isActualToday && <span className="w-1.5 h-1.5 rounded-full bg-amber-400 inline-block mr-0.5" />}
                <span>{shortDay}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6 relative z-10">
        
        {/* Left Column: Image & Quick Stats */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
          <div className="relative rounded-2xl overflow-hidden bg-slate-900 border border-white/10 shadow-xl group aspect-[4/3]">
            {!imageError ? (
              <img
                src={selectedPose.imageUrl}
                alt={selectedPose.sanskritName}
                referrerPolicy="no-referrer"
                loading="lazy"
                onError={() => setImageError(true)}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-purple-950/40">
                <Activity className="w-12 h-12 text-amber-400 mb-2" />
                <span className="font-marathi text-sm text-slate-300 font-medium">
                  {selectedPose.sanskritName}
                </span>
              </div>
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

            {/* Badges on Image */}
            <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
              <span className="px-3 py-1 rounded-full text-[11px] font-marathi font-medium bg-slate-950/80 text-amber-300 border border-amber-400/30 backdrop-blur-md">
                {selectedPose.difficulty}
              </span>
              <span className="px-3 py-1 rounded-full text-[11px] font-marathi font-medium bg-purple-950/90 text-purple-200 border border-purple-500/40 backdrop-blur-md">
                {selectedPose.targetChakra}
              </span>
            </div>

            {/* Summary Overlay at Bottom */}
            <div className="absolute bottom-3 left-4 right-4">
              <p className="text-xs sm:text-sm text-slate-200 font-marathi leading-relaxed line-clamp-2">
                {selectedPose.summary}
              </p>
            </div>
          </div>

          {/* Key Metrics row */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-white/5 flex items-center gap-3">
              <div className="p-2 rounded-lg bg-amber-400/10 text-amber-400 shrink-0">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-marathi block">कालावधी (Duration)</span>
                <span className="text-xs font-semibold text-slate-200 font-marathi">{selectedPose.idealDuration}</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-white/5 flex items-center gap-3">
              <div className="p-2 rounded-lg bg-purple-400/10 text-purple-400 shrink-0">
                <Sun className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-marathi block">उत्तम वेळ (Best Time)</span>
                <span className="text-xs font-semibold text-slate-200 font-marathi">{selectedPose.bestTime}</span>
              </div>
            </div>
          </div>

          {/* Interactive Posture Hold Timer */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-950/60 to-slate-900/80 border border-purple-500/30 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Wind className="w-4 h-4 text-cyan-400 animate-pulse" />
                <span className="text-xs font-marathi font-bold text-slate-200">
                  आसन स्थिरता टायमर (Pose Hold Timer)
                </span>
              </div>
              <div className="flex items-center gap-1 text-[11px] font-mono font-bold text-amber-300">
                <span>{timerSeconds}s</span>
                <span className="text-slate-500">/</span>
                <span className="text-slate-400">{initialSeconds}s</span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden mb-3">
              <div 
                className="h-full bg-gradient-to-r from-amber-400 to-purple-500 transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                {[30, 45, 60].map((secs) => (
                  <button
                    key={secs}
                    onClick={() => resetTimer(secs)}
                    className={`px-2 py-0.5 rounded text-[10px] font-marathi transition-colors ${
                      initialSeconds === secs && !isTimerRunning
                        ? 'bg-purple-600 text-white font-bold'
                        : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {secs} से.
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={toggleTimer}
                  className={`px-3 py-1 rounded-full text-xs font-marathi font-bold flex items-center gap-1 transition-all ${
                    isTimerRunning
                      ? 'bg-rose-500 hover:bg-rose-600 text-white'
                      : 'bg-amber-400 hover:bg-amber-300 text-slate-950'
                  }`}
                >
                  {isTimerRunning ? (
                    <>
                      <Pause className="w-3 h-3" />
                      <span>थांबवा</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3 h-3" />
                      <span>सुरू करा</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => resetTimer(initialSeconds)}
                  className="p-1 rounded-full text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-700"
                  title="पुन्हा सुरू करा"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Health Benefits & Guidance Tabs */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
          <div>
            {/* View Switcher Tabs */}
            <div className="flex items-center gap-2 p-1 bg-slate-900/80 rounded-xl border border-white/5 mb-5 w-fit">
              <button
                onClick={() => setActiveTab('benefits')}
                className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-marathi font-semibold transition-all flex items-center gap-1.5 ${
                  activeTab === 'benefits'
                    ? 'bg-amber-400 text-slate-950 shadow-md font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Heart className="w-3.5 h-3.5" />
                <span>आरोग्यदायी फायदे (Health Benefits)</span>
              </button>

              <button
                onClick={() => setActiveTab('steps')}
                className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-marathi font-semibold transition-all flex items-center gap-1.5 ${
                  activeTab === 'steps'
                    ? 'bg-amber-400 text-slate-950 shadow-md font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Info className="w-3.5 h-3.5" />
                <span>कृती व पायऱ्या (Step-by-Step)</span>
              </button>

              <button
                onClick={() => setActiveTab('precautions')}
                className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-marathi font-semibold transition-all flex items-center gap-1.5 ${
                  activeTab === 'precautions'
                    ? 'bg-amber-400 text-slate-950 shadow-md font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>सावधगिरी (Precautions)</span>
              </button>
            </div>

            {/* Tab 1: Health Benefits */}
            {activeTab === 'benefits' && (
              <div className="space-y-4 animate-in fade-in duration-300">
                <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-400/20 text-amber-200 text-xs sm:text-sm font-marathi flex items-start gap-2.5">
                  <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>श्वसन समन्वय:</strong> {selectedPose.breathGuide}
                  </span>
                </div>

                <div className="space-y-2.5">
                  {selectedPose.healthBenefits.map((benefit, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-slate-900/50 hover:bg-slate-900/80 border border-white/5 hover:border-purple-500/30 transition-all flex items-start gap-3 group"
                    >
                      <div className="w-6 h-6 rounded-full bg-purple-950 text-amber-400 border border-purple-500/40 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold font-mono group-hover:scale-110 transition-transform">
                        {idx + 1}
                      </div>
                      <p className="text-sm text-slate-200 font-marathi leading-relaxed">
                        {benefit}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 2: Step-by-Step Practice Steps */}
            {activeTab === 'steps' && (
              <div className="space-y-3 animate-in fade-in duration-300">
                {selectedPose.steps.map((step, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-slate-900/50 border border-white/5 flex items-start gap-3"
                  >
                    <div className="w-6 h-6 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                      {idx + 1}
                    </div>
                    <div>
                      <span className="text-[11px] uppercase tracking-wider text-purple-300 font-bold font-sans block">
                        टप्पा {idx + 1}
                      </span>
                      <p className="text-sm text-slate-200 font-marathi leading-relaxed mt-0.5">
                        {step}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Tab 3: Precautions */}
            {activeTab === 'precautions' && (
              <div className="space-y-3 animate-in fade-in duration-300">
                <div className="p-4 rounded-2xl bg-rose-950/30 border border-rose-500/30 text-rose-200 font-marathi text-sm">
                  <div className="flex items-center gap-2 font-bold mb-2 text-rose-300">
                    <ShieldAlert className="w-4 h-4" />
                    <span>खालील बाबींची विशेष काळजी घ्या:</span>
                  </div>
                  <ul className="space-y-2 list-disc list-inside text-slate-300">
                    {selectedPose.precautions.map((precaution, idx) => (
                      <li key={idx} className="leading-relaxed">
                        {precaution}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <p className="text-xs text-slate-400 font-marathi italic p-2">
                  टीप: जर तुम्हाला गंभीर शारीरिक तक्रारी असतील तर नेहमी प्रमाणित योगाचार्यांच्या मार्गदर्शनाखालीच आसने करावीत.
                </p>
              </div>
            )}
          </div>

          {/* Bottom Action bar */}
          <div className="pt-4 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs text-slate-400 font-marathi">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>नियमित योगाभ्यास आत्मिक आणि शारीरिक स्वास्थ्य देतो.</span>
            </div>

            {onNavigateToMeditation && (
              <button
                onClick={() => {
                  let duration = 5;
                  if (selectedPose.difficulty === 'सोपे') duration = 3;
                  else if (selectedPose.difficulty === 'मध्यम') duration = 5;
                  else if (selectedPose.difficulty === 'कठीण') duration = 10;
                  onNavigateToMeditation(duration);
                }}
                className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-purple-900/60 hover:bg-purple-800 text-amber-300 hover:text-amber-200 border border-purple-500/40 font-marathi text-xs sm:text-sm font-semibold flex items-center justify-center gap-1.5 transition-all"
              >
                <span>आसनांतर ध्यान करा (Set Timer)</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
