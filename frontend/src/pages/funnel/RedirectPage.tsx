import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Globe, 
  ChevronRight
} from 'lucide-react';
import { setStep } from '../../store/slices/funnelSlice';
import { RootState } from '../../store';

const RedirectPage: React.FC = () => {
  const dispatch = useDispatch();
  const { branding } = useSelector((state: RootState) => state.funnel);

  const platforms = [
    { id: 'google', name: 'Google', color: 'bg-white', textColor: 'text-slate-700', icon: 'G' },
    { id: 'facebook', name: 'Facebook', color: 'bg-[#1877F2]', textColor: 'text-white', icon: 'f' },
    { id: 'trustpilot', name: 'Trustpilot', color: 'bg-[#00b67a]', textColor: 'text-white', icon: '★' },
    { id: 'zomato', name: 'Zomato', color: 'bg-[#E23744]', textColor: 'text-white', icon: 'Z' },
    { id: 'practo', name: 'Practo', color: 'bg-[#28328c]', textColor: 'text-white', icon: 'P' },
  ];

  const handleRedirect = (platformId: string) => {
    // Mock redirect
    console.log(`Redirecting to ${platformId}...`);
    dispatch(setStep('success'));
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="space-y-2">
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">Where would you like to review us?</h1>
        <p className="text-slate-500 font-medium">Choose your preferred platform to share your experience.</p>
      </div>

      <div className="grid grid-cols-1 gap-3 text-left">
        {platforms.map((platform) => (
          <button
            key={platform.id}
            onClick={() => handleRedirect(platform.id)}
            className="flex items-center justify-between p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl hover:shadow-lg transition-all group active:scale-[0.98]"
            style={{ 
              '--hover-border': branding.primaryColor,
              '--hover-shadow': `${branding.primaryColor}20`
            } as React.CSSProperties}
          >
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl ${platform.color} ${platform.textColor} flex items-center justify-center font-black text-xl shadow-sm border border-slate-100 dark:border-slate-700 transition-transform group-hover:scale-110`}>
                {platform.icon}
              </div>
              <span className="font-bold text-slate-700 dark:text-slate-200 tracking-tight text-lg">{platform.name}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-400 group-hover:text-primary transition-colors" style={{ color: `var(--hover-border)` }}>
              <span className="text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">Select</span>
              <ChevronRight className="w-6 h-6" />
            </div>
          </button>
        ))}
      </div>

      <div className="flex items-center justify-center gap-2 text-slate-400 text-sm">
        <Globe className="w-4 h-4" />
        <span>Securely handled by Review Shield</span>
      </div>
    </div>
  );
};

export default RedirectPage;
