import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { Review, toggleSelection } from '../../store/slices/reviewsSlice';
import { 
  Star, 
  Reply, 
  MessageSquare, 
  MoreVertical, 
  ExternalLink, 
  CheckCircle2,
  Clock,
  MapPin,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import ReplyEditor from './ReplyEditor';

interface ReviewCardProps {
  review: Review;
  viewMode: 'list' | 'grid';
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review, viewMode }) => {
  const dispatch = useDispatch();
  const [isExpanding, setIsExpanding] = useState(false);
  const [isReplying, setIsReplying] = useState(false);
  const selectedIds = useSelector((state: RootState) => state.reviews.selectedIds);
  const isSelected = selectedIds.includes(review.id);

  const getSentimentStyles = (sentiment: Review['sentiment']) => {
    switch (sentiment) {
      case 'positive': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case 'negative': return 'bg-rose-50 text-rose-600 border-rose-100';
      default: return 'bg-slate-50 text-slate-500 border-slate-100';
    }
  };

  const getPlatformIcon = (platform: Review['platform']) => {
    switch (platform) {
      case 'google': return <div className="w-6 h-6 flex items-center justify-center bg-white border border-slate-100 rounded shadow-sm text-xs font-black">G</div>;
      case 'facebook': return <div className="w-6 h-6 flex items-center justify-center bg-[#1877F2] text-white rounded shadow-sm text-xs font-black">f</div>;
      case 'trustpilot': return <div className="w-6 h-6 flex items-center justify-center bg-[#00b67a] text-white rounded shadow-sm text-[10px] font-black uppercase">T</div>;
      default: return <div className="w-6 h-6 flex items-center justify-center bg-slate-900 text-white rounded shadow-sm text-[10px] font-black uppercase">{platform.charAt(0)}</div>;
    }
  };

  return (
    <div className={`bg-white dark:bg-slate-900 border transition-all hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-none overflow-hidden group relative rounded-3xl ${isSelected ? 'border-primary ring-1 ring-primary' : 'border-slate-200 dark:border-slate-800'} ${isReplying ? 'ring-2 ring-primary/20' : ''}`}>
      
      {/* Selection Checkbox (Overlay) */}
      <div className={`absolute top-4 left-4 z-10 transition-opacity ${isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
        <input 
          type="checkbox" 
          checked={isSelected}
          onChange={() => dispatch(toggleSelection(review.id))}
          className="w-5 h-5 rounded-lg border-2 border-slate-200 text-primary focus:ring-primary/20 transition-all cursor-pointer shadow-sm"
        />
      </div>

      <div className={`p-6 ${viewMode === 'list' ? 'flex flex-col md:flex-row gap-6' : 'space-y-4'} ${isSelected ? 'bg-primary/5' : ''}`}>
        
        {/* Left Side: Meta & Rating */}
        <div className={`${viewMode === 'list' ? 'w-full md:w-56 shrink-0' : 'flex justify-between items-start w-full'} ${viewMode === 'list' ? 'pl-8' : ''}`}>
          <div className="space-y-3 w-full">
            <div className="flex items-center justify-between">
              {getPlatformIcon(review.platform)}
              <div className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${getSentimentStyles(review.sentiment)}`}>
                {review.sentiment}
              </div>
            </div>
            
            <div className="flex items-center gap-1 text-amber-400">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'fill-current' : 'text-slate-100 dark:text-slate-800'}`} />
              ))}
            </div>

            <div className="space-y-1">
              <h4 className="font-bold text-slate-900 dark:text-white truncate">{review.author}</h4>
              <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
                <Clock className="w-3 h-3" />
                {formatDistanceToNow(new Date(review.date), { addSuffix: true })}
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
                <MapPin className="w-3 h-3" />
                {review.location}
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Content & Actions */}
        <div className="flex-1 space-y-4">
          <p className={`text-slate-600 dark:text-slate-300 leading-relaxed font-medium ${!isExpanding ? 'line-clamp-3' : ''}`}>
            {review.text}
          </p>
          
          {review.text.length > 200 && (
            <button 
              onClick={() => setIsExpanding(!isExpanding)}
              className="text-primary text-xs font-bold flex items-center gap-1 hover:underline"
            >
              {isExpanding ? <><ChevronUp className="w-3 h-3" /> Show Less</> : <><ChevronDown className="w-3 h-3" /> Read More</>}
            </button>
          )}

          {review.isReplied && (
            <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-1 relative">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black text-primary uppercase tracking-widest">Business Reply</span>
                <span className="text-[10px] text-slate-400 font-bold">{formatDistanceToNow(new Date(review.replyDate || ''), { addSuffix: true })}</span>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400 italic">"{review.replyText}"</p>
              <CheckCircle2 className="absolute -top-2 -right-2 w-5 h-5 text-emerald-500 fill-white" />
            </div>
          )}

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-4">
              {!review.isReplied && (
                <button 
                  onClick={() => setIsReplying(!isReplying)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${isReplying ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-primary/10 text-primary hover:bg-primary/20'}`}
                >
                  <Reply className="w-4 h-4" />
                  {isReplying ? 'Cancel' : 'Reply Now'}
                </button>
              )}
              <button className="flex items-center gap-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 font-bold text-sm transition-colors">
                <MessageSquare className="w-4 h-4" />
                Add Note
              </button>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 text-slate-300 hover:text-slate-500 transition-colors">
                <ExternalLink className="w-4 h-4" />
              </button>
              <button className="p-2 text-slate-300 hover:text-slate-500 transition-colors">
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {isReplying && (
        <div className="border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20 p-6 animate-in slide-in-from-top-4 duration-300">
          <ReplyEditor 
            reviewId={review.id} 
            onCancel={() => setIsReplying(false)}
            onSuccess={() => setIsReplying(false)}
          />
        </div>
      )}
    </div>
  );
};

export default ReviewCard;
