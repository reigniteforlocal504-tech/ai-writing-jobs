'use client';

// components/AudienceSwitcher.tsx

import { Track } from '@/lib/types';

interface AudienceSwitcherProps {
  activeTrack: Track;
  onTrackChange: (track: Track) => void;
}

export default function AudienceSwitcher({ activeTrack, onTrackChange }: AudienceSwitcherProps) {
  return (
    <div className="flex gap-4 border-b border-border mb-6">
      <button
        onClick={() => onTrackChange('writing')}
        className={`pb-3 px-2 font-semibold transition-colors relative ${
          activeTrack === 'writing'
            ? 'text-white'
            : 'text-gray-400 hover:text-gray-300'
        }`}
      >
        ✍️ AI Writing Jobs
        {activeTrack === 'writing' && (
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent" />
        )}
      </button>

      <button
        onClick={() => onTrackChange('cs')}
        className={`pb-3 px-2 font-semibold transition-colors relative ${
          activeTrack === 'cs'
            ? 'text-white'
            : 'text-gray-400 hover:text-gray-300'
        }`}
      >
        🔄 CS Pivot Jobs
        {activeTrack === 'cs' && (
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent" />
        )}
      </button>
    </div>
  );
}
