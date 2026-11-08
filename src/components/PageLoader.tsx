import React, { useEffect, useState } from 'react';
import { Shield } from 'lucide-react';

interface PageLoaderProps {
  onFinished?: () => void;
}

export const PageLoader: React.FC<PageLoaderProps> = ({ onFinished }) => {
  const [progress, setProgress] = useState(15);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // If user prefers reduced motion, skip quickly
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      setIsDone(true);
      if (onFinished) onFinished();
      return;
    }

    const timer1 = setTimeout(() => setProgress(45), 150);
    const timer2 = setTimeout(() => setProgress(85), 350);
    const timer3 = setTimeout(() => setProgress(100), 550);
    const timer4 = setTimeout(() => setIsFadingOut(true), 750);
    const timer5 = setTimeout(() => {
      setIsDone(true);
      if (onFinished) onFinished();
    }, 1050);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(timer5);
    };
  }, [onFinished]);

  if (isDone) return null;

  return (
    <div
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={progress}
      aria-label="Memuat Portal OSIS SMP Negeri 1 Ungaran"
      onClick={() => {
        setIsFadingOut(true);
        setTimeout(() => {
          setIsDone(true);
          if (onFinished) onFinished();
        }, 200);
      }}
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950 transition-opacity duration-300 ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="relative flex flex-col items-center text-center px-6 max-w-sm">
        {/* Emblem Crest Pulse */}
        <div className="relative mb-6">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-amber-400 via-amber-200 to-amber-500 p-0.5 shadow-xl shadow-amber-500/20 animate-pulse">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center overflow-hidden">
              <img
                src="/src/assets/images/osis_emblem_gold_1794066879358.jpg"
                alt="Lambang Emas OSIS"
                className="w-full h-full object-cover rounded-[14px]"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>

        {/* Brand Wordmark & School Title */}
        <span className="text-xs uppercase font-extrabold tracking-widest text-amber-400 mb-1">
          SMP NEGERI 1 UNGARAN
        </span>
        <h2 className="text-xl font-bold text-white tracking-tight">
          PORTAL DIGITAL OSIS
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Masa Bakti 2025/2026 · Mitreka Satata
        </p>

        {/* Sleek Progress Bar */}
        <div className="w-52 h-1 bg-slate-900 rounded-full mt-6 overflow-hidden border border-slate-800">
          <div
            style={{ width: `${progress}%` }}
            className="h-full bg-gradient-to-r from-amber-400 to-amber-500 transition-all duration-300 ease-out rounded-full"
          />
        </div>

        <span className="text-[10px] text-slate-500 font-mono mt-3">
          Memuat sistem & data...
        </span>
      </div>
    </div>
  );
};
