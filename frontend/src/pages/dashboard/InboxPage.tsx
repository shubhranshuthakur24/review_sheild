import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { 
  Search, 
  Filter, 
  RefreshCcw, 
  FilterX,
  LayoutGrid,
  List as ListIcon
} from 'lucide-react';
import ReviewCard from '../../components/inbox/ReviewCard';
import { setFilters, Review } from '../../store/slices/reviewsSlice';

const InboxPage: React.FC = () => {
  const dispatch = useDispatch();
  const { items, filters } = useSelector((state: RootState) => state.reviews);
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');

  const filteredReviews = items.filter((review: Review) => {
    if (filters.platform !== 'all' && review.platform !== filters.platform) return false;
    if (filters.rating !== 'all' && review.rating !== filters.rating) return false;
    if (filters.sentiment !== 'all' && review.sentiment !== filters.sentiment) return false;
    if (filters.isReplied !== 'all' && review.isReplied !== filters.isReplied) return false;
    if (filters.search && !review.text.toLowerCase().includes(filters.search.toLowerCase()) && !review.author.toLowerCase().includes(filters.search.toLowerCase())) return false;
    return true;
  });

  const resetFilters = () => {
    dispatch(setFilters({
      platform: 'all',
      rating: 'all',
      sentiment: 'all',
      isReplied: 'all',
      search: ''
    }));
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Review Inbox</h1>
          <p className="text-slate-500 font-medium">Manage all your cross-platform customer feedback in one place.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="p-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:bg-slate-50 transition-colors">
            <RefreshCcw className="w-5 h-5 text-slate-400" />
          </button>
          <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
            <button 
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-white dark:bg-slate-700 shadow-sm text-primary' : 'text-slate-400'}`}
            >
              <ListIcon className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white dark:bg-slate-700 shadow-sm text-primary' : 'text-slate-400'}`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex-1 min-w-[300px] relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors" />
            <input 
              type="text" 
              placeholder="Search by customer name or review content..." 
              value={filters.search}
              onChange={(e) => dispatch(setFilters({ search: e.target.value }))}
              className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <select 
              value={filters.platform}
              onChange={(e) => dispatch(setFilters({ platform: e.target.value as any }))}
              className="px-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 rounded-2xl font-bold text-sm outline-none focus:ring-2 focus:ring-primary/20"
            >
              <option value="all">Platforms: All</option>
              <option value="google">Google</option>
              <option value="facebook">Facebook</option>
              <option value="trustpilot">Trustpilot</option>
            </select>

            <select 
              value={filters.rating.toString()}
              onChange={(e) => dispatch(setFilters({ rating: e.target.value === 'all' ? 'all' : parseInt(e.target.value) }))}
              className="px-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 rounded-2xl font-bold text-sm outline-none focus:ring-2 focus:ring-primary/20"
            >
              <option value="all">Ratings: All</option>
              <option value="5">5 Stars</option>
              <option value="4">4 Stars</option>
              <option value="3">3 Stars</option>
              <option value="2">2 Stars</option>
              <option value="1">1 Star</option>
            </select>

            <select 
              value={filters.sentiment}
              onChange={(e) => dispatch(setFilters({ sentiment: e.target.value as any }))}
              className="px-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 rounded-2xl font-bold text-sm outline-none focus:ring-2 focus:ring-primary/20"
            >
              <option value="all">Sentiment: All</option>
              <option value="positive">Positive</option>
              <option value="neutral">Neutral</option>
              <option value="negative">Negative</option>
            </select>

            {(filters.platform !== 'all' || filters.rating !== 'all' || filters.sentiment !== 'all' || filters.search) && (
              <button 
                onClick={resetFilters}
                className="flex items-center gap-2 px-4 py-3 text-rose-500 font-bold text-sm hover:bg-rose-50 rounded-2xl transition-colors"
              >
                <FilterX className="w-4 h-4" />
                Clear
              </button>
            )}
          </div>
        </div>
        
        <div className="flex items-center gap-6 pt-2 overflow-x-auto pb-1 no-scrollbar border-t border-slate-100 dark:border-slate-800">
          <button 
            onClick={() => dispatch(setFilters({ isReplied: 'all' }))}
            className={`flex items-center gap-2 pb-2 mt-2 border-b-2 transition-all whitespace-nowrap font-bold text-sm ${filters.isReplied === 'all' ? 'border-primary text-primary' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
          >
            All Reviews
            <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-[10px] font-bold">{items.length}</span>
          </button>
          <button 
            onClick={() => dispatch(setFilters({ isReplied: false }))}
            className={`flex items-center gap-2 pb-2 mt-2 border-b-2 transition-all whitespace-nowrap font-bold text-sm ${filters.isReplied === false ? 'border-primary text-primary' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
          >
            Needs Reply
            <span className="px-2 py-0.5 rounded-full bg-rose-100 text-rose-600 text-[10px] font-black">{items.filter((i: Review) => !i.isReplied).length}</span>
          </button>
          <button 
            onClick={() => dispatch(setFilters({ isReplied: true }))}
            className={`flex items-center gap-2 pb-2 mt-2 border-b-2 transition-all whitespace-nowrap font-bold text-sm ${filters.isReplied === true ? 'border-primary text-primary' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
          >
            Replied
            <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-600 text-[10px] font-black">{items.filter((i: Review) => i.isReplied).length}</span>
          </button>
        </div>
      </div>

      {/* Review List */}
      <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 gap-6' : 'space-y-4'}>
        {filteredReviews.length > 0 ? (
          filteredReviews.map((review: Review) => (
            <ReviewCard key={review.id} review={review} viewMode={viewMode} />
          ))
        ) : (
          <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-3xl border border-dashed border-slate-200 dark:border-slate-800">
            <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <Filter className="w-8 h-8 text-slate-300" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">No reviews found</h3>
            <p className="text-slate-500">Try adjusting your filters or search terms.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default InboxPage;
