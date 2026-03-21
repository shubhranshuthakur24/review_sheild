import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { 
  Users, 
  MessageSquare, 
  Star, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight,
  Plus,
  ExternalLink
} from 'lucide-react';
import FunnelChart from '../components/analytics/FunnelChart';

interface StatCardProps {
  title: string;
  value: string;
  change: number;
  isPositive: boolean;
  icon: React.ElementType;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, change, isPositive, icon: Icon }) => (
  <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex items-center justify-between mb-4">
      <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
        <Icon className="w-6 h-6" />
      </div>
      <div className={`flex items-center gap-1 text-sm font-medium ${isPositive ? 'text-emerald-500' : 'text-rose-500'}`}>
        {isPositive ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
        {change}%
      </div>
    </div>
    <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">{title}</p>
    <h3 className="text-2xl font-bold mt-1">{value}</h3>
  </div>
);

const Home = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { metrics } = useSelector((state: RootState) => state.funnel);

  const stats = [
    { title: 'Funnel Visits', value: '1,420', change: 12.5, isPositive: true, icon: Users },
    { title: 'Avg. Rating', value: '4.8', change: 0.2, isPositive: true, icon: Star },
    { title: 'Conversion Rate', value: `${metrics.conversionRate}%`, change: 5.1, isPositive: true, icon: TrendingUp },
    { title: 'Private Feedback', value: `${metrics.feedbackRate}%`, change: 2.4, isPositive: false, icon: MessageSquare },
  ];

  const recentReviews = [
    { id: 1, author: 'Alex Rivera', platform: 'Google', rating: 5, text: 'Amazing service and very professional staff. Highly recommend!', date: '2 hours ago' },
    { id: 2, author: 'Sarah Chen', platform: 'Facebook', rating: 4, text: 'Great experience overall, slightly slow checkout but the quality is top notch.', date: '5 hours ago' },
    { id: 3, author: 'Marcus Wright', platform: 'Google', rating: 5, text: 'The best decision I made for my business was using Review Shield!', date: '1 day ago' },
  ];

  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
        <div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-500 dark:from-white dark:to-slate-400 tracking-tight">
            Reputation Insights
          </h1>
          <p className="text-slate-500 font-medium">
            {user ? `Welcome back, ${user.name}! Your funnel is performing at peak efficiency.` : "Welcome! See how businesses manage their reputation."}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link 
            to="/f/demo-business" 
            className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-xl font-bold hover:bg-primary/20 transition-all border border-primary/20"
          >
            <ExternalLink className="w-4 h-4" />
            Live Funnel
          </Link>
          {user && (
            <button className="flex items-center gap-2 px-5 py-2 bg-primary text-white rounded-xl font-bold hover:bg-primary-dark transition-all shadow-lg shadow-primary/20">
              <Plus className="w-4 h-4" />
              New Campaign
            </button>
          )}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      {/* Advanced Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Rating Distribution */}
        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-lg">Rating Distribution</h3>
            <span className="text-xs font-bold bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full text-slate-500">Last 30 Days</span>
          </div>
          <div className="space-y-4">
            {[5, 4, 3, 2, 1].map((rating) => {
              const count = metrics.ratingDistribution[rating];
              const total = Object.values(metrics.ratingDistribution).reduce((a, b) => a + b, 0);
              const percentage = (count / total) * 100;
              return (
                <div key={rating} className="flex items-center gap-4">
                  <div className="flex items-center gap-1 w-8">
                    <span className="text-sm font-bold text-slate-500">{rating}</span>
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  </div>
                  <div className="flex-1 h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-amber-400 rounded-full transition-all duration-1000"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="text-sm font-bold text-slate-400 w-10 text-right">{count}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Funnel Chart */}
        <FunnelChart />
      </div>

      {/* Redirect Performance Section */}
      <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-lg">Platform Redirect CTR</h3>
          <span className="text-primary text-sm font-bold">Total: 482 clicks</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {Object.entries(metrics.redirectCTR).map(([platform, ctr]) => (
            <div key={platform} className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800 transition-transform hover:-translate-y-1">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">{platform}</span>
              <div className="text-2xl font-black text-slate-900 dark:text-white mt-1">{ctr}%</div>
              <div className="mt-2 h-1 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                <div className="h-full bg-primary" style={{ width: `${ctr}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Secondary Content Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Reviews Table */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Latest Public Feedback</h2>
            <button className="text-primary text-sm font-bold hover:underline">Manage All</button>
          </div>
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Author</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Platform</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Rating</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {recentReviews.map((review) => (
                    <tr key={review.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors cursor-pointer group">
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="font-medium text-slate-700 dark:text-slate-200">{review.author}</span>
                          <span className="text-xs text-slate-400">{review.date}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 border border-blue-200 dark:border-blue-800">
                          {review.platform}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1 text-amber-400">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star key={i} className={`w-3.5 h-3.5 ${i < review.rating ? 'fill-current' : 'text-slate-200 dark:text-slate-700'}`} />
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-xs font-bold text-emerald-500 flex items-center gap-1">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          Synced
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Campaign Summary */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold">Campaign Performance</h2>
          <div className="bg-gradient-to-br from-primary to-indigo-700 p-8 rounded-3xl text-white shadow-xl shadow-primary/20 flex flex-col items-center text-center relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:rotate-12 transition-transform">
              <TrendingUp className="w-24 h-24 text-white" />
            </div>
            
            <div className="relative z-10">
              <div className="text-4xl font-black mb-1">84%</div>
              <h4 className="text-lg font-bold opacity-90">Positive Sentiment</h4>
            </div>
            
            <div className="w-full mt-6 space-y-3">
              <div className="flex justify-between text-xs font-bold uppercase tracking-widest opacity-80">
                <span>Monthly Goal</span>
                <span>8.4k / 10k</span>
              </div>
              <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                <div className="h-full bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,0.5)]" style={{ width: '84%' }} />
              </div>
            </div>
            
            <p className="text-white/70 text-sm mt-6 leading-relaxed font-medium italic">
              "Your recent 'Spring Sale' SMS campaign drove 42% of this month's 5-star reviews."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
