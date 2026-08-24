import React, { useState } from 'react';
import { MANTRAS_DATA } from '../data/mantras';
import { MantraItem } from '../types';
import { playBeadClick, playSingingBowl } from '../utils/audioSynthesizer';
import { RotateCcw, Volume2, Sparkles, Award } from 'lucide-react';
import { triggerHaptic } from '../utils/haptics';

export const JapaMalaCounter: React.FC = () => {
  const [selectedMantra, setSelectedMantra] = useState<MantraItem>(MANTRAS_DATA[0]);
  const [count, setCount] = useState<number>(0);
  const [malasCompleted, setMalasCompleted] = useState<number>(0);
  const [targetCount, setTargetCount] = useState<number>(108);

  const incrementCount = () => {
    triggerHaptic(20);
    playBeadClick();
    const nextCount = count + 1;
    if (nextCount >= targetCount) {
      setCount(0);
      setMalasCompleted((prev) => prev + 1);
      playSingingBowl(528, 4);
    } else {
      setCount(nextCount);
    }
  };

  const resetCounter = () => {
    triggerHaptic(50);
    setCount(0);
  };

  const progressPercent = (count / targetCount) * 100;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-900/30 text-amber-300 border border-amber-500/30 text-xs font-marathi mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>१०८ मण्यांची डिजिटल जपमाळ (Japa Mala & Mantra Sadhana)</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mb-2">
          मंत्र साधना व जपमाळ
        </h2>
        <p className="text-slate-300 font-marathi text-sm max-w-lg mx-auto">
          पवित्र मंत्रांची कंपने अंतर्मनातील नकारात्मकता दूर करून आत्मशक्ती जागृत करतात.
        </p>
      </div>

      {/* Mantra Selector Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
        {MANTRAS_DATA.map((mantra) => {
          const isSelected = selectedMantra.id === mantra.id;
          return (
            <button
              key={mantra.id}
              onClick={() => {
                setSelectedMantra(mantra);
                setCount(0);
              }}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all font-marathi ${
                isSelected
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold shadow-[0_0_15px_rgba(246,196,83,0.4)]'
                  : 'bg-white/5 text-slate-300 hover:bg-white/10 border border-white/10'
              }`}
            >
              {mantra.name.split(' (')[0]}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Mantra Details */}
        <div className="lg:col-span-6 rounded-3xl bg-slate-950/70 border border-purple-500/20 backdrop-blur-xl p-6 sm:p-8 space-y-6">
          <div>
            <div className="flex items-center justify-between text-xs text-amber-400 font-mono mb-2">
              <span>॥ महामंत्र ॥</span>
              <span>{selectedMantra.frequencyHz} Hz Frequency</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-display font-bold text-amber-200 leading-relaxed font-marathi mb-2">
              {selectedMantra.sanskrit}
            </h3>
            <p className="text-xs text-slate-400 font-sans italic border-l-2 border-amber-500/40 pl-3 py-0.5">
              {selectedMantra.transliteration}
            </p>
          </div>

          <div className="pt-4 border-t border-white/10">
            <h4 className="text-xs uppercase tracking-wider text-purple-300 font-bold mb-2">
              अर्थ (Sacred Meaning):
            </h4>
            <p className="text-sm text-slate-200 font-marathi leading-relaxed">
              {selectedMantra.meaning}
            </p>
          </div>

          <div className="pt-4 border-t border-white/10">
            <h4 className="text-xs uppercase tracking-wider text-amber-300 font-bold mb-2">
              साधनेचे लाभ (Spiritual Benefits):
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-300 font-marathi">
              {selectedMantra.benefits.map((b, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-amber-400">✦</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right: Interactive 108 Bead Japa Counter */}
        <div className="lg:col-span-6 rounded-3xl bg-gradient-to-b from-purple-950/40 to-slate-950/80 border border-amber-500/20 backdrop-blur-xl p-6 sm:p-8 text-center flex flex-col items-center justify-between shadow-2xl">
          {/* Top stats */}
          <div className="w-full flex items-center justify-between text-xs font-marathi text-slate-400 mb-4">
            <div className="flex items-center gap-1 text-amber-300">
              <Award className="w-4 h-4" />
              <span>पूर्ण माळा: <strong className="font-sans text-sm">{malasCompleted}</strong></span>
            </div>
            <div className="flex items-center gap-1.5">
              <span>लक्ष्य:</span>
              {[21, 54, 108].map((val) => (
                <button
                  key={val}
                  onClick={() => setTargetCount(val)}
                  className={`px-2 py-0.5 rounded text-[11px] font-sans ${
                    targetCount === val
                      ? 'bg-amber-400 text-slate-950 font-bold'
                      : 'bg-white/10 text-slate-300'
                  }`}
                >
                  {val}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Tap Button Bead Dial */}
          <div className="relative my-4">
            <button
              onClick={incrementCount}
              className="group relative w-48 h-48 sm:w-56 sm:h-56 rounded-full bg-gradient-to-br from-purple-900/60 via-slate-900 to-slate-950 border-4 border-amber-400/40 hover:border-amber-300 active:scale-95 shadow-[0_0_40px_rgba(246,196,83,0.3)] transition-all duration-150 flex flex-col items-center justify-center p-4 focus:outline-none"
              title="जप करण्यासाठी टॅप करा"
            >
              {/* Rotating Progress Arc */}
              <div
                className="absolute inset-0 rounded-full border-4 border-amber-400 transition-all duration-200 pointer-events-none"
                style={{
                  clipPath: `polygon(50% 50%, -50% -50%, ${progressPercent * 2}% -50%, 150% 150%)`,
                  opacity: count > 0 ? 0.9 : 0
                }}
              />

              <span className="text-xs uppercase tracking-widest text-purple-300 font-semibold mb-1">
                जप संख्या
              </span>
              <span className="text-5xl sm:text-6xl font-display font-black text-amber-300 group-hover:scale-110 transition-transform">
                {count}
              </span>
              <span className="text-xs text-slate-400 font-sans mt-1">
                / {targetCount} मणी
              </span>
              <span className="text-[11px] font-marathi text-amber-200/70 mt-2">
                (टॅप करा 👆)
              </span>
            </button>
          </div>

          {/* Bottom Bar Controls */}
          <div className="w-full flex items-center justify-between mt-4 pt-4 border-t border-white/10">
            <button
              onClick={resetCounter}
              className="text-xs font-marathi text-slate-400 hover:text-white flex items-center gap-1 p-2 rounded-lg bg-white/5"
            >
              <RotateCcw className="w-3.5 h-3.5" /> रीसेट (Reset)
            </button>

            <button
              onClick={() => playSingingBowl(selectedMantra.frequencyHz, 4)}
              className="text-xs font-marathi text-amber-300 hover:text-amber-200 flex items-center gap-1.5 p-2 rounded-lg bg-amber-500/10 border border-amber-500/20"
            >
              <Volume2 className="w-3.5 h-3.5" /> मंत्र नाद ऐका ({selectedMantra.frequencyHz}Hz)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
