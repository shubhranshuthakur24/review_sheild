import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Star } from 'lucide-react';
import { setRating, nextStep } from '../../store/slices/funnelSlice';
import { RootState } from '../../store';

const RatingPage: React.FC = () => {
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);
  const dispatch = useDispatch();
  const { businessName } = useSelector((state: RootState) => state.funnel);

  const handleRatingClick = (selectedRating: number) => {
    dispatch(setRating(selectedRating));
    dispatch(nextStep());
  };

  const getRatingText = (rating: number) => {
    if (rating === 5) return 'Excellent! Loved it.';
    if (rating === 4) return 'Very Good experience.';
    if (rating === 3) return 'It was okay.';
    if (rating === 2) return 'Could have been better.';
    if (rating === 1) return 'Disappointing experience.';
    return 'Select your rating';
  };

  return (
    <div className="text-center space-y-10 animate-in fade-in zoom-in-95 duration-500">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Rate your visit to <br />
          <span className="text-primary">{businessName}</span>
        </h2>
        <p className="text-slate-500 font-medium">Click on a star to provide your rating</p>
      </div>

      {/* Star Selector */}
      <div className="space-y-6">
        <div className="flex justify-center gap-3">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onMouseEnter={() => setHoveredRating(star)}
              onMouseLeave={() => setHoveredRating(null)}
              onClick={() => handleRatingClick(star)}
              className="relative p-1 transition-transform active:scale-90 hover:scale-110"
            >
              <Star
                className={`w-12 h-12 md:w-14 md:h-14 transition-colors duration-200 
                  ${(hoveredRating || 0) >= star ? 'text-amber-400 fill-current' : 'text-slate-200 dark:text-slate-800'}
                `}
              />
            </button>
          ))}
        </div>
        
        {/* Rating description */}
        <div className="h-6">
          <p className={`text-sm font-bold uppercase tracking-wider transition-all duration-300
            ${hoveredRating ? 'text-slate-900 dark:text-white opacity-100' : 'text-slate-400 opacity-0'}
          `}>
            {hoveredRating ? getRatingText(hoveredRating) : ''}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RatingPage;
