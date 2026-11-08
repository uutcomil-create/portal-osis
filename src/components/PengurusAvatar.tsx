import React, { useState } from 'react';
import { Pengurus, getPengurusImagePath } from '../data/pengurusData';
import { User, Shield, Award } from 'lucide-react';

interface PengurusAvatarProps {
  pengurus: Pengurus;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  shape?: 'circle' | 'rounded';
  className?: string;
  showBadge?: boolean;
}

export const PengurusAvatar: React.FC<PengurusAvatarProps> = ({
  pengurus,
  size = 'md',
  shape = 'rounded',
  className = '',
  showBadge = false
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const imageSrc = getPengurusImagePath(pengurus);

  // Size styling maps
  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-16 h-16 sm:w-20 sm:h-20',
    lg: 'w-20 h-20 sm:w-24 sm:h-24',
    xl: 'w-24 h-24 sm:w-28 sm:h-28'
  };

  const iconSizes = {
    sm: 'w-5 h-5',
    md: 'w-7 h-7',
    lg: 'w-9 h-9',
    xl: 'w-11 h-11'
  };

  const shapeClass = shape === 'circle' ? 'rounded-full' : 'rounded-2xl';
  const innerShapeClass = shape === 'circle' ? 'rounded-full' : 'rounded-xl';

  const isBPH = pengurus.kategori === 'BPH';

  return (
    <div
      className={`relative inline-block ${sizeClasses[size]} ${className}`}
      title={`${pengurus.nama} - ${pengurus.jabatan} (File: ${pengurus.fotoFileName})`}
    >
      {/* Outer border ring with gold/navy gradient */}
      <div
        className={`w-full h-full p-0.5 ${shapeClass} ${
          isBPH
            ? 'bg-gradient-to-tr from-amber-400 via-amber-200 to-amber-500 shadow-md shadow-amber-500/20'
            : 'bg-gradient-to-tr from-amber-500/70 via-blue-700 to-slate-700 shadow-sm'
        } flex items-center justify-center overflow-hidden`}
      >
        <div className={`w-full h-full ${innerShapeClass} bg-slate-950 overflow-hidden relative flex items-center justify-center`}>
          {/* Real Photo Image Tag (when not errored) */}
          {!hasError && (
            <img
              src={imageSrc}
              alt={`${pengurus.jabatan} - ${pengurus.nama}`}
              onLoad={() => setIsLoaded(true)}
              onError={() => {
                setHasError(true);
                setIsLoaded(false);
              }}
              className={`w-full h-full object-cover transition-opacity duration-300 ${innerShapeClass} ${
                isLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              referrerPolicy="no-referrer"
            />
          )}

          {/* Professional Fallback Placeholder when image is not yet loaded or file not found in public/images/ */}
          {(hasError || !isLoaded) && (
            <div
              className={`absolute inset-0 w-full h-full ${innerShapeClass} bg-gradient-to-b from-slate-900 to-slate-950 flex flex-col items-center justify-center text-center p-1 select-none`}
            >
              <div className="relative">
                <User className={`${iconSizes[size]} text-amber-400/80 mb-0.5`} />
              </div>
              <span className="text-[10px] sm:text-xs font-mono font-extrabold text-amber-400 tabular-nums leading-none">
                #{pengurus.nomorUrut < 10 ? `0${pengurus.nomorUrut}` : pengurus.nomorUrut}
              </span>
              {size !== 'sm' && (
                <span className="text-[7px] sm:text-[8px] uppercase tracking-wider text-slate-400 font-semibold mt-0.5">
                  Foto {pengurus.nomorUrut}
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Optional floating badge */}
      {showBadge && (
        <span
          className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 px-1.5 py-0.2 rounded text-[9px] font-bold bg-slate-950 border border-amber-400/40 text-amber-300 whitespace-nowrap shadow-sm z-10"
        >
          {pengurus.kelas}
        </span>
      )}
    </div>
  );
};
