import React from 'react';
import { Loader2 } from 'lucide-react';

export const RouteLoadingFallback: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-[400px] w-full">
      <div className="flex flex-col items-center gap-4">
        {/* Animated Spinner */}
        <div className="relative">
          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-fuchsia-500 to-purple-600 opacity-20 animate-pulse" />
          <Loader2 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 text-fuchsia-400 animate-spin" 
            strokeWidth={2.5}
          />
        </div>
        
        {/* Loading Text */}
        <div className="text-center space-y-1">
          <p className="text-white font-medium">Loading...</p>
          <p className="text-slate-400 text-sm">Please wait</p>
        </div>
      </div>
    </div>
  );
};

export default RouteLoadingFallback;
