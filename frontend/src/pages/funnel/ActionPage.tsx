import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  MessageSquare, 
  ExternalLink, 
  Heart, 
  AlertCircle,
  ArrowRight,
  LifeBuoy
} from 'lucide-react';
import { RootState } from '../../store';
import { setStep } from '../../store/slices/funnelSlice';

const ActionPage: React.FC = () => {
  const dispatch = useDispatch();
  const { rating, businessName, branding } = useSelector((state: RootState) => state.funnel);
  
  const isHighRating = (rating || 0) >= 4;

  const handlePublicReview = () => {
    dispatch(setStep('redirect'));
  };

  const handlePrivateFeedback = () => {
    dispatch(setStep('feedback'));
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header Section */}
      <div className="space-y-3">
        <div 
          className="w-16 h-16 rounded-2xl mx-auto flex items-center justify-center"
          style={{ 
            backgroundColor: isHighRating ? `${branding.primaryColor}15` : 'rgb(254 243 199)', 
            color: isHighRating ? branding.primaryColor : 'rgb(217 119 6)' 
          }}
        >
          {isHighRating ? <Heart className="w-8 h-8 fill-current" /> : <AlertCircle className="w-8 h-8" />}
        </div>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
          {isHighRating ? "We're so glad you enjoyed it!" : "We'd love to make it right."}
        </h1>
        <p className="text-slate-500 dark:text-slate-400 font-medium">
          {isHighRating 
            ? "Your support means the world to us. Would you mind sharing your experience publicly?" 
            : "We strive for excellence and it seems we missed the mark. How can we improve?"}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="space-y-4 pt-4">
        {isHighRating ? (
          <>
            {/* Primary: Public Review */}
            <button
              onClick={handlePublicReview}
              className="w-full py-4 text-white rounded-2xl font-bold flex items-center justify-center gap-3 transition-all active:scale-95 group"
              style={{ backgroundColor: branding.primaryColor, boxShadow: `0 10px 20px -5px ${branding.primaryColor}40` }}
            >
              <ExternalLink className="w-5 h-5" />
              Review us on Google
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Secondary: Private Feedback */}
            <button
              onClick={handlePrivateFeedback}
              className="w-full py-4 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all"
            >
              <MessageSquare className="w-5 h-5" />
              Share private feedback instead
            </button>
          </>
        ) : (
          <>
            {/* Primary: Private Feedback/Support */}
            <button
              onClick={handlePrivateFeedback}
              className="w-full py-4 text-white rounded-2xl font-bold flex items-center justify-center gap-3 transition-all active:scale-95 group"
              style={{ backgroundColor: branding.primaryColor, boxShadow: `0 10px 20px -5px ${branding.primaryColor}40` }}
            >
              <LifeBuoy className="w-5 h-5" />
              Talk to our Support Team
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Secondary: Public Review (Compliance-safe) */}
            <button
              onClick={handlePublicReview}
              className="w-full py-4 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all opacity-60 hover:opacity-100"
            >
              <ExternalLink className="w-5 h-5" />
              Write a public review
            </button>
          </>
        )}
      </div>

      <p className="text-xs text-slate-400">
        Your feedback is handled by Review Shield to ensure {businessName} receives it instantly.
      </p>
    </div>
  );
};

export default ActionPage;
