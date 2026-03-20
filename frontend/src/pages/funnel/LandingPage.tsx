import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Star, ArrowRight, Store } from 'lucide-react';
import { nextStep } from '../../store/slices/funnelSlice';
import { RootState } from '../../store';

const LandingPage: React.FC = () => {
  const dispatch = useDispatch();
  const { businessName } = useSelector((state: RootState) => state.funnel);

  return (
    <div className="text-center space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Business Branding */}
      <div className="space-y-4">
        <div className="w-20 h-20 bg-primary/10 rounded-3xl mx-auto flex items-center justify-center text-primary">
          <Store className="w-10 h-10 " />
        </div>
        <div>
          <span className="text-primary">{businessName}</span>
        </div>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
          How was your experience with us ?
        </h1>
        <p className="text-md text-slate-500 dark:text-slate-400 font-medium max-w-xs mx-auto">
          Your feedback helps us serve you better. It only takes 30 seconds.
        </p>
      </div>

      {/* CTA Button */}
      <div className="pt-4">
        <button
          onClick={() => dispatch(nextStep())}
          className="w-full py-5 bg-primary hover:bg-primary-dark text-white rounded-2xl font-bold text-md shadow-xl shadow-primary/30 transition-all active:scale-95 flex items-center justify-center gap-3 group"
        >
          Share My Experience
          <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
