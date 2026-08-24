import React from 'react';
import { Sparkles } from 'lucide-react';

interface AdSenseBannerProps {
  slot?: string;
  format?: 'horizontal' | 'rectangle' | 'in-feed';
  className?: string;
}

export const AdSenseBanner: React.FC<AdSenseBannerProps> = ({
  format = 'horizontal',
  className = ''
}) => {
  return (
    <div
      className={`my-6 mx-auto w-full max-w-4xl p-3 rounded-xl border border-white/10 bg-slate-950/60 backdrop-blur-md transition-all ${className}`}
    >
      <div className="flex items-center justify-between text-[11px] font-medium text-slate-400 mb-1.5 px-1">
        <span className="flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-amber-400" />
          पुरस्कृत सामग्री / ADVERTISEMENT (Google AdSense)
        </span>
        <span className="text-[10px] text-slate-400 font-mono">pub-3177625082355698</span>
      </div>

      <div
        className={`w-full rounded-lg bg-gradient-to-r from-purple-950/30 via-slate-900/60 to-indigo-950/30 border border-purple-500/10 flex flex-col items-center justify-center text-center p-4 ${
          format === 'horizontal' ? 'min-h-[90px]' : format === 'rectangle' ? 'min-h-[250px]' : 'min-h-[120px]'
        }`}
      >
        {/* Real AdSense Ad Unit Placement Container */}
        <ins
          className="adsbygoogle"
          style={{ display: 'block', textAlign: 'center', width: '100%' }}
          data-ad-layout="in-article"
          data-ad-format="fluid"
          data-ad-client="ca-pub-3177625082355698"
        />

        {/* Fallback / Preview visualization */}
        <div className="flex flex-col items-center gap-1 text-slate-300">
          <p className="text-xs font-marathi text-amber-200/90 font-medium">
            ॥ ध्यान आणि आत्मज्ञानाचा प्रकाश सर्वदूर पसरू द्या ॥
          </p>
          <p className="text-[11px] text-slate-400">
            AdSense Auto-Ads active for publisher <span className="font-mono text-purple-300">ca-pub-3177625082355698</span>
          </p>
        </div>
      </div>
    </div>
  );
};
