import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ArrowRight, Store } from 'lucide-react';
import { nextStep } from '../../store/slices/funnelSlice';
import { RootState } from '../../store';

const LandingPage: React.FC = () => {
  const dispatch = useDispatch();
  const { businessName, branding } = useSelector((state: RootState) => state.funnel);

  return (
    <div className="text-center space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Business Branding */}
      <div className="space-y-4">
        <div 
          className="w-20 h-20 rounded-3xl mx-auto flex items-center justify-center shadow-lg shadow-black/5"
          style={{ backgroundColor: `${branding.primaryColor}15`, color: branding.primaryColor }}
        >
          <Store className="w-10 h-10 " />
        </div>
        <div>
          <span className="font-bold" style={{ color: branding.primaryColor }}>{businessName}</span>
        </div>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
          {branding.tone === 'professional' ? "We value your professional feedback" : "How was your experience with us?"}
        </h1>
        <p className="text-md text-slate-500 dark:text-slate-400 font-medium max-w-xs mx-auto">
          {branding.tone === 'minimal' ? "Quick 30-second review." : "Your feedback helps us serve you better. It only takes 30 seconds."}
        </p>
      </div>

      {/* CTA Button */}
      <div className="pt-4">
        <button
          onClick={() => dispatch(nextStep())}
          className="w-full py-5 text-white rounded-2xl font-bold text-md shadow-xl transition-all active:scale-95 flex items-center justify-center gap-3 group"
          style={{ backgroundColor: branding.primaryColor, boxShadow: `0 10px 25px -5px ${branding.primaryColor}40` }}
        >
          {branding.ctaText}
          <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
