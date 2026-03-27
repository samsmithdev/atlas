// components/ui/ThinkingIndicator.tsx
import React from 'react';

export const ThinkingIndicator = ({ isThinking = true }: { isThinking?: boolean }) => {
  if (!isThinking) return null;

  return (
    <div className="relative flex items-center justify-center w-24 h-24">
      {/* Core "Brain" - The Static Dot or Logo in the center */}
      <div className="absolute w-4 h-4 bg-teal-500 rounded-full shadow-[0_0_15px_rgba(20,184,166,0.8)] z-10" />

      {/* Ring 1 - Outer Slow */}
      <div className="absolute w-full h-full border-2 border-transparent border-t-teal-500/80 border-b-teal-500/30 rounded-full animate-[spin_3s_linear_infinite]" />
      
      {/* Ring 2 - Middle Reverse */}
      <div className="absolute w-3/4 h-3/4 border-2 border-transparent border-r-sky-500/80 border-l-sky-500/30 rounded-full animate-[spin_2s_linear_infinite_reverse]" />
      
      {/* Ring 3 - Inner Fast/Wobble */}
      <div className="absolute w-1/2 h-1/2 border-2 border-transparent border-t-indigo-500/80 border-b-indigo-500/30 rounded-full animate-[spin_1.5s_linear_infinite]" />
      
      {/* Optional: A subtle pulse effect behind it all */}
      <div className="absolute w-full h-full bg-teal-500/10 rounded-full animate-pulse blur-xl" />
    </div>
  );
};