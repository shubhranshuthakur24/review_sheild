import React from 'react';
import { 
  Users, 
  MessageSquare, 
  Star, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight,
  Plus,
  RefreshCcw,
  ExternalLink
} from 'lucide-react';

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
  const stats = [
    { title: 'Total Reviews', value: '1,284', change: 12.5, isPositive: true, icon: MessageSquare },
    { title: 'Average Rating', value: '4.8', change: 0.2, isPositive: true, icon: Star },
    { title: 'Total Customers', value: '8,420', change: 8.1, isPositive: true, icon: Users },
    { title: 'Response Rate', value: '94%', change: 2.4, isPositive: false, icon: TrendingUp },
  ];

  const recentReviews = [
    { id: 1, author: 'Alex Rivera', platform: 'Google', rating: 5, text: 'Amazing service and very professional staff. Highly recommend!', date: '2 hours ago' },
    { id: 2, author: 'Sarah Chen', platform: 'Facebook', rating: 4, text: 'Great experience overall, slightly slow checkout but the quality is top notch.', date: '5 hours ago' },
    { id: 3, author: 'Marcus Wright', platform: 'Google', rating: 5, text: 'The best decision I made for my business was using Review Shield!', date: '1 day ago' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Dashboard Overview</h1>
          <p className="text-slate-500">Welcome back! Here's what's happening today.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:bg-slate-50 transition-colors">
            <RefreshCcw className="w-4 h-4" />
            Sync Now
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl hover:bg-primary-dark transition-colors shadow-lg shadow-primary/20">
            <Plus className="w-4 h-4" />
            Create Campaign
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      {/* Main Content Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Reviews Table */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Recent Reviews</h2>
            <button className="text-primary text-sm font-bold hover:underline">View All</button>
          </div>
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Author</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Platform</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Rating</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {recentReviews.map((review) => (
                    <tr key={review.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors cursor-pointer group">
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="font-medium">{review.author}</span>
                          <span className="text-xs text-slate-400">{review.date}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
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
                        <button className="p-2 text-slate-400 hover:text-primary opacity-0 group-hover:opacity-100 transition-all">
                          <ExternalLink className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Quick Actions / Summary */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold">Health Score</h2>
          <div className="bg-gradient-to-br from-primary to-primary-dark p-8 rounded-3xl text-white shadow-xl shadow-primary/20 flex flex-col items-center text-center">
            <div className="relative w-32 h-32 mb-4">
              <svg className="w-full h-full" viewBox="0 0 36 36">
                <path
                  className="stroke-white/20"
                  strokeWidth="3"
                  strokeDasharray="100, 100"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="stroke-white"
                  strokeWidth="3"
                  strokeDasharray="92, 100"
                  strokeLinecap="round"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center text-3xl font-bold">
                92
              </div>
            </div>
            <h4 className="text-lg font-bold">Excellent</h4>
            <p className="text-white/80 text-sm mt-2 leading-relaxed">
              Your reputation is in top 5% of your category. Keep up the good work!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
