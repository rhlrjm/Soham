import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Sparkles,
  CheckCircle2,
  Music2,
  Sliders,
  Bell,
  Wind
} from 'lucide-react';
import {
  playSingingBowl,
  ambientSoundManager,
  AMBIENT_SOUND_OPTIONS,
  AmbientSoundType
} from '../utils/audioSynthesizer';
import { triggerHaptic } from '../utils/haptics';
import { getRandomQuote } from '../utils/wisdomQuotes';

export const MeditationTimer: React.FC<{ initialDuration?: number }> = ({ initialDuration = 5 }) => {
  const [durationMins, setDurationMins] = useState<number>(initialDuration);
  const [secondsRemaining, setSecondsRemaining] = useState<number>(initialDuration * 60);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [breathPhase, setBreathPhase] = useState<'inhale' | 'exhale' | 'hold' | null>(null);
  const [sessionCompleted, setSessionCompleted] = useState<boolean>(false);
  const [completedSessionsCount, setCompletedSessionsCount] = useState<number>(() => {
    return parseInt(localStorage.getItem('soaham_meditations_count') || '3', 10);
  });
  const [currentQuote, setCurrentQuote] = useState<string>('');
  
  // Breathing guide states
  const [isBreathingGuide, setIsBreathingGuide] = useState(false);

  // Breathing loop effect (4-7-8)
  useEffect(() => {
    if (!isBreathingGuide) {
      setBreathPhase(null);
      return;
    }

    let timeout: NodeJS.Timeout;
    const runCycle = () => {
      // Inhale (4s)
      setBreathPhase('inhale');
      timeout = setTimeout(() => {
        // Hold (7s)
        setBreathPhase('hold');
        timeout = setTimeout(() => {
          // Exhale (8s)
          setBreathPhase('exhale');
          timeout = setTimeout(runCycle, 8000);
        }, 7000);
      }, 4000);
    };
    runCycle();
    return () => clearTimeout(timeout);
  }, [isBreathingGuide]);

  // Ambient sound states
  const [selectedAmbientSound, setSelectedAmbientSound] = useState<AmbientSoundType>('om_drone');
  const [isAmbientPlaying, setIsAmbientPlaying] = useState<boolean>(false);
  const [ambientVolume, setAmbientVolume] = useState<number>(60);
  const [showSoundSelector, setShowSoundSelector] = useState<boolean>(false);
  const [autoPlayAmbientWithTimer, setAutoPlayAmbientWithTimer] = useState<boolean>(true);

  const timerRef = useRef<number | null>(null);
  const breathIntervalRef = useRef<number | null>(null);

  // Quote effect - change quote every minute
  useEffect(() => {
    if (isActive) {
      // Set initial quote
      setCurrentQuote(getRandomQuote());
      
      const quoteInterval = setInterval(() => {
        setCurrentQuote(getRandomQuote());
      }, 60000); // 1 minute
      
      return () => clearInterval(quoteInterval);
    } else {
      setCurrentQuote('');
    }
  }, [isActive]);

  // Set duration
  const handleSelectDuration = (mins: number) => {
    if (isActive) return;
    triggerHaptic(20);
    setDurationMins(mins);
    setSecondsRemaining(mins * 60);
    setSessionCompleted(false);
  };

  // Start / Pause timer toggle
  const toggleTimer = () => {
    triggerHaptic(30);
    if (!isActive) {
      // Start
      setIsActive(true);
      setSessionCompleted(false);
      playSingingBowl(432, 5);

      if (autoPlayAmbientWithTimer && !isAmbientPlaying) {
        ambientSoundManager.setVolume(ambientVolume / 100);
        ambientSoundManager.play(selectedAmbientSound);
        setIsAmbientPlaying(true);
      }
    } else {
      // Pause
      setIsActive(false);
      if (autoPlayAmbientWithTimer && isAmbientPlaying) {
        ambientSoundManager.stop();
        setIsAmbientPlaying(false);
      }
    }
  };

  // Reset timer
  const resetTimer = () => {
    triggerHaptic(50);
    setIsActive(false);
    setSecondsRemaining(durationMins * 60);
    setBreathPhase('inhale');
    setSessionCompleted(false);
    if (autoPlayAmbientWithTimer) {
      ambientSoundManager.stop();
      setIsAmbientPlaying(false);
    }
  };

  // Dedicated Play / Pause Ambient Sound toggle
  const toggleAmbientSound = () => {
    triggerHaptic(30);
    if (isAmbientPlaying) {
      ambientSoundManager.stop();
      setIsAmbientPlaying(false);
    } else {
      ambientSoundManager.setVolume(ambientVolume / 100);
      ambientSoundManager.play(selectedAmbientSound);
      setIsAmbientPlaying(true);
    }
  };

  // Change ambient sound type
  const handleSelectAmbientType = (type: AmbientSoundType) => {
    setSelectedAmbientSound(type);
    if (isAmbientPlaying) {
      ambientSoundManager.play(type);
    }
  };

  // Volume slider change
  const handleVolumeChange = (newVol: number) => {
    setAmbientVolume(newVol);
    ambientSoundManager.setVolume(newVol / 100);
  };

  // Countdown timer effect
  useEffect(() => {
    if (isActive) {
      timerRef.current = window.setInterval(() => {
        setSecondsRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            setIsActive(false);
            setSessionCompleted(true);
            if (autoPlayAmbientWithTimer) {
              ambientSoundManager.stop();
              setIsAmbientPlaying(false);
            }
            playSingingBowl(528, 6);
            setCompletedSessionsCount((c) => {
              const updated = c + 1;
              localStorage.setItem('soaham_meditations_count', updated.toString());
              return updated;
            });
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive, autoPlayAmbientWithTimer]);

  // Breathing loop effect (4s inhale, 4s exhale) - only for background breathing if not in guide mode
  useEffect(() => {
    if (isActive && !isBreathingGuide) {
      breathIntervalRef.current = window.setInterval(() => {
        setBreathPhase((p) => (p === 'inhale' ? 'exhale' : 'inhale'));
      }, 4000);
    } else {
      if (breathIntervalRef.current) clearInterval(breathIntervalRef.current);
    }

    return () => {
      if (breathIntervalRef.current) clearInterval(breathIntervalRef.current);
    };
  }, [isActive, isBreathingGuide]);

  // Clean up sound on unmount
  useEffect(() => {
    return () => {
      ambientSoundManager.stop();
    };
  }, []);

  const totalSeconds = durationMins * 60;
  const progressPct = ((totalSeconds - secondsRemaining) / totalSeconds) * 100;
  const mins = Math.floor(secondsRemaining / 60);
  const secs = secondsRemaining % 60;
  const formattedTime = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;

  const currentSoundOption =
    AMBIENT_SOUND_OPTIONS.find((s) => s.id === selectedAmbientSound) || AMBIENT_SOUND_OPTIONS[3];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-900/40 text-purple-300 border border-purple-500/30 text-xs font-marathi mb-3">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>सोऽहं श्वासोच्छ्वास ध्यान व ध्वनी थेरपी (Meditation & Ambient Soundscapes)</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mb-2">
          सोऽहं ध्यान कक्ष व शांत ध्वनी
        </h2>
        <p className="text-slate-300 font-marathi text-sm sm:text-base max-w-xl mx-auto">
          श्वास आत घेताना मनात <strong className="text-amber-300">"सो"</strong> (ब्रह्मांड) आणि श्वास सोडताना <strong className="text-purple-300">"हं"</strong> (अहंकार विसर्जन) चा भाव ठेवा.
        </p>
      </div>

      {/* Main Meditation Box */}
      <div className="relative rounded-3xl bg-slate-950/75 border border-purple-500/30 backdrop-blur-xl p-6 sm:p-10 shadow-[0_0_50px_rgba(139,92,246,0.15)] overflow-hidden">
            {/* Breathing Guide UI */}
            {isBreathingGuide && (
              <div className="absolute inset-0 z-20 bg-slate-950/90 backdrop-blur-sm flex flex-col items-center justify-center p-6">
                <button
                  onClick={() => setIsBreathingGuide(false)}
                  className="absolute top-4 right-4 text-slate-400 hover:text-white font-sans"
                >
                  ✕
                </button>
                <motion.div
                  className="w-48 h-48 rounded-full bg-purple-500/20 flex items-center justify-center border-4 border-purple-400/30"
                  animate={{
                    scale: breathPhase === 'inhale' ? 1.5 : breathPhase === 'exhale' ? 1 : 1.2,
                  }}
                  transition={{ duration: breathPhase === 'inhale' ? 4 : breathPhase === 'exhale' ? 8 : 7, ease: "easeInOut" }}
                >
                  <span className="text-white font-bold text-xl uppercase tracking-widest">{breathPhase}</span>
                </motion.div>
                <p className="mt-8 text-amber-200 font-marathi text-lg">
                  {breathPhase === 'inhale' && "हळूवार श्वास घ्या (४ सेकंद)..."}
                  {breathPhase === 'hold' && "श्वास रोखून धरा (७ सेकंद)..."}
                  {breathPhase === 'exhale' && "श्वास सोडा (८ सेकंद)..."}
                </p>
              </div>
            )}

        {/* Top Ambient Sound Quick Controller Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-purple-950/60 via-slate-900/80 to-indigo-950/60 border border-purple-500/30 mb-6">
          <div className="flex items-center gap-3">
            <button
              onClick={toggleAmbientSound}
              className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all shadow-md ${
                isAmbientPlaying
                  ? 'bg-amber-400 text-slate-950 hover:bg-amber-300 scale-105 shadow-amber-400/30 animate-pulse'
                  : 'bg-purple-600 hover:bg-purple-500 text-white shadow-purple-600/30'
              }`}
              title={isAmbientPlaying ? 'पार्श्वध्वनी थांबवा (Pause Sound)' : 'पार्श्वध्वनी सुरू करा (Play Ambient Sound)'}
            >
              {isAmbientPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
            </button>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-300 font-sans">
                  शांत पार्श्वसंगीत (Ambient Sound)
                </span>
                {isAmbientPlaying && (
                  <span className="flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    सुरू आहे
                  </span>
                )}
              </div>
              <p className="text-sm font-bold text-white font-marathi mt-0.5 flex items-center gap-1.5">
                <span>{currentSoundOption.icon}</span>
                <span>{currentSoundOption.marathiLabel}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setIsBreathingGuide(true)}
              className="px-3.5 py-2 rounded-xl text-xs font-marathi font-semibold flex items-center gap-1.5 transition-all border bg-white/5 hover:bg-white/10 text-slate-300 border-white/10"
            >
              <Wind className="w-4 h-4 text-purple-400" />
              <span>श्वासोच्छ्वास मार्गदर्शक</span>
            </button>
            <button
              onClick={() => setShowSoundSelector(!showSoundSelector)}
              className={`px-3.5 py-2 rounded-xl text-xs font-marathi font-semibold flex items-center gap-1.5 transition-all border ${
                showSoundSelector
                  ? 'bg-purple-600 text-white border-purple-400'
                  : 'bg-white/5 hover:bg-white/10 text-slate-300 border-white/10'
              }`}
            >
              <Music2 className="w-4 h-4 text-amber-300" />
              <span>ध्वनी निवडा ({AMBIENT_SOUND_OPTIONS.length})</span>
            </button>
          </div>
        </div>

        {/* Ambient Sound Selector Drawer / Dropdown */}
        {showSoundSelector && (
          <div className="mb-6 p-4 sm:p-5 rounded-2xl bg-slate-900/90 border border-amber-500/30 space-y-4 animate-in fade-in slide-in-from-top-2">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-300 font-sans flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5" />
                <span>पार्श्वसंगीत सूची व ध्वनी स्तर (Soundscapes & Volume)</span>
              </h4>

              {/* Volume Slider */}
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <Volume2 className="w-3.5 h-3.5 text-amber-400" />
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={ambientVolume}
                  onChange={(e) => handleVolumeChange(parseInt(e.target.value, 10))}
                  className="w-24 sm:w-32 h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-400"
                />
                <span className="font-mono text-[11px] w-7 text-right">{ambientVolume}%</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {AMBIENT_SOUND_OPTIONS.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleSelectAmbientType(option.id)}
                  className={`p-3 rounded-xl text-left transition-all border flex flex-col justify-between gap-1.5 ${
                    selectedAmbientSound === option.id
                      ? 'bg-purple-950/70 border-amber-400/80 text-white shadow-[0_0_15px_rgba(246,196,83,0.15)] ring-1 ring-amber-400/50'
                      : 'bg-slate-950/50 border-white/10 text-slate-300 hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{option.icon}</span>
                      <span className="font-bold text-xs sm:text-sm font-marathi text-amber-200">
                        {option.label}
                      </span>
                    </div>
                    {selectedAmbientSound === option.id && isAmbientPlaying && (
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    )}
                  </div>
                  <p className="text-[11px] font-marathi text-slate-300 line-clamp-2">
                    {option.description}
                  </p>
                </button>
              ))}
            </div>

            {/* Quick Singing Bowl Chime Test */}
            <div className="pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-xs font-marathi text-slate-300">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={autoPlayAmbientWithTimer}
                  onChange={(e) => setAutoPlayAmbientWithTimer(e.target.checked)}
                  className="rounded border-slate-700 text-purple-600 focus:ring-purple-500 accent-purple-600"
                />
                <span>ध्यानाचा टायमर सुरू झाल्यावर हा ध्वनी आपोआप सुरू करा</span>
              </label>

              <button
                onClick={() => playSingingBowl(528, 5)}
                className="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-amber-300 text-xs flex items-center gap-1.5"
              >
                <Bell className="w-3.5 h-3.5" />
                <span>५२८ Hz घंटा नाद वाजवा (Singing Bowl)</span>
              </button>
            </div>
          </div>
        )}

        {/* Animated Background Rings & Mandala */}
        <div className="flex flex-col items-center justify-center my-6">
          <div className="relative w-64 h-64 sm:w-80 sm:h-80 flex items-center justify-center">
            {/* Outer Progress Circle */}
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                className="text-slate-800"
                strokeWidth="2.5"
                stroke="currentColor"
                fill="transparent"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                className="text-amber-400 transition-all duration-1000 ease-linear"
                strokeWidth="2.5"
                strokeDasharray="282.7"
                strokeDashoffset={282.7 - (282.7 * progressPct) / 100}
                strokeLinecap="round"
                stroke="currentColor"
                fill="transparent"
              />
            </svg>

            {/* Breathing Mandala Animation */}
            <div
              className={`absolute inset-4 rounded-full flex flex-col items-center justify-center transition-all duration-[4000ms] ease-in-out ${
                isActive
                  ? breathPhase === 'inhale'
                    ? 'scale-100 bg-purple-600/25 border-2 border-amber-300/60 shadow-[0_0_40px_rgba(246,196,83,0.4)]'
                    : 'scale-75 bg-indigo-900/30 border-2 border-purple-400/40 shadow-[0_0_20px_rgba(139,92,246,0.2)]'
                  : 'scale-90 bg-slate-900/60 border border-white/10'
              }`}
            >
              {isActive ? (
                <div className="text-center transition-all">
                  <span className="text-4xl sm:text-5xl font-display font-bold text-amber-300 block mb-1">
                    {breathPhase === 'inhale' ? 'सो' : 'हं'}
                  </span>
                  <span className="text-xs sm:text-sm font-marathi text-slate-200">
                    {breathPhase === 'inhale' ? 'श्वास आत घ्या' : 'श्वास बाहेर सोडा'}
                  </span>
                </div>
              ) : (
                <div className="text-center">
                  <span className="text-4xl font-display font-bold text-slate-300 block mb-1">
                    ॥ ॐ ॥
                  </span>
                  <span className="text-xs font-marathi text-amber-200/80">
                    सुरुवातीसाठी खालील बटण दाबा
                  </span>
                </div>
              )}
            </div>

            {/* Realtime Time Display */}
            <div className="absolute -bottom-4 bg-slate-900/90 border border-white/10 px-4 py-1 rounded-full text-xs sm:text-sm font-mono text-amber-300 shadow-md">
              {formattedTime}
            </div>
          </div>
          
          {/* Quote Display */}
          {isActive && currentQuote && (
            <div className="mt-8 px-6 py-3 rounded-full bg-purple-950/50 border border-purple-500/30 animate-in fade-in zoom-in duration-700">
              <p className="text-sm font-marathi text-amber-200 italic text-center">
                "{currentQuote}"
              </p>
            </div>
          )}
        </div>

        {/* Completion Message */}
        {sessionCompleted && (
          <div className="my-4 p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-center animate-in fade-in">
            <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto mb-1.5" />
            <h3 className="font-marathi text-lg font-bold text-emerald-200">
              अभिनंदन! तुमचे सोऽहं ध्यान पूर्ण झाले.
            </h3>
            <p className="font-marathi text-xs sm:text-sm text-emerald-300/80 mt-1">
              काही क्षण शांत बसा, डोळे हळुवार उघडा आणि हा शांततेचा अनुभव दिवसभर सोबत ठेवा.
            </p>
          </div>
        )}

        {/* Duration Selectors */}
        <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          <span className="text-xs font-marathi text-slate-400 mr-2">वेळ निवडा:</span>
          {[3, 5, 10, 15, 20].map((m) => (
            <button
              key={m}
              onClick={() => handleSelectDuration(m)}
              disabled={isActive}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                durationMins === m
                  ? 'bg-amber-400 text-slate-950 font-bold shadow-[0_0_12px_rgba(246,196,83,0.4)]'
                  : 'bg-white/5 text-slate-300 hover:bg-white/10 disabled:opacity-40'
              }`}
            >
              {m} मिनिटे
            </button>
          ))}
        </div>

        {/* Controls Bar */}
        <div className="mt-6 flex items-center justify-center gap-4">
          <button
            onClick={resetTimer}
            className="p-3.5 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-all"
            title="रीसेट (Reset)"
          >
            <RotateCcw className="w-5 h-5" />
          </button>

          <button
            onClick={toggleTimer}
            className="px-8 py-4 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold font-marathi text-base flex items-center gap-2.5 shadow-[0_0_25px_rgba(246,196,83,0.5)] hover:scale-105 transition-all"
          >
            {isActive ? (
              <>
                <Pause className="w-5 h-5 fill-current" />
                <span>विश्रांती (Pause)</span>
              </>
            ) : (
              <>
                <Play className="w-5 h-5 fill-current" />
                <span>{secondsRemaining === totalSeconds ? 'ध्यान सुरू करा' : 'पुढे सुरू ठेवा'}</span>
              </>
            )}
          </button>

          <button
            onClick={toggleAmbientSound}
            className={`p-3.5 rounded-full border transition-all ${
              isAmbientPlaying
                ? 'bg-amber-400 text-slate-950 border-amber-300 shadow-[0_0_15px_rgba(246,196,83,0.4)]'
                : 'bg-white/5 text-slate-400 hover:text-white border-white/10'
            }`}
            title={isAmbientPlaying ? 'पार्श्वध्वनी चालू आहे (Sound Active)' : 'पार्श्वध्वनी बंद आहे (Sound Off)'}
          >
            {isAmbientPlaying ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
          </button>
        </div>

        {/* Tips & Sound Info Footer */}
        <div className="mt-8 text-center text-xs font-marathi text-slate-400 flex flex-wrap items-center justify-center gap-4">
          <span>पूर्ण केलेली ध्याने: <strong className="text-amber-300 font-sans">{completedSessionsCount}</strong></span>
          <span>•</span>
          <span>सक्रिय ध्वनी: <strong className="text-purple-300">{currentSoundOption.marathiLabel}</strong></span>
          <span>•</span>
          <span>वारंवारता: <strong className="text-sky-300">४३२ Hz व ५२८ Hz</strong></span>
        </div>
      </div>
    </div>
  );
};

