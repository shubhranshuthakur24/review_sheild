import React from 'react';

interface FunnelLayoutProps {
  children: React.ReactNode;
}

const FunnelLayout: React.FC<FunnelLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-lg">
        {/* Main Card Container */}
        <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl shadow-slate-200 dark:shadow-none border border-slate-100 dark:border-slate-800 overflow-hidden">
          <div className="p-8 md:p-12">
            {children}
          </div>
          
          {/* Subtle Footer */}
          <div className="px-8 pb-8 text-center">
            <p className="text-[10px] text-slate-400 dark:text-slate-600 uppercase tracking-widest font-semibold flex items-center justify-center gap-2">
              Protected by 
              <span className="text-primary font-bold">Review Shield</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FunnelLayout;
