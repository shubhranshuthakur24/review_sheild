import React from 'react';
import { 
  TrendingUp, 
  Users, 
  ArrowUpRight, 
  Zap,
  Target,
  ChevronRight
} from 'lucide-react';

const InsightsPage: React.FC = () => {
  // Mock data for AI Insights
  const keywords = [
    { word: 'staff', count: 42, sentiment: 'positive' },
    { word: 'waiting time', count: 28, sentiment: 'negative' },
    { word: 'atmosphere', count: 25, sentiment: 'positive' },
    { word: 'parking', count: 18, sentiment: 'neutral' },
    { word: 'pricing', count: 15, sentiment: 'negative' },
    { word: 'cleanliness', count: 12, sentiment: 'positive' },
  ];

  const staffMentions = [
    { name: 'Sarah L.', mentions: 15, rating: 4.9 },
    { name: 'David K.', mentions: 12, rating: 4.7 },
    { name: 'Marcus R.', mentions: 8, rating: 4.8 },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-12">
      <div>
        <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">AI Sentiment Engine</h1>
        <p className="text-slate-500 font-medium">Deep insights extracted from thousands of customer reviews.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Core Sentiment Card */}
        <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group">
          <div className="relative z-10 space-y-6">
            <div className="flex items-center justify-between">
              <div className="p-3 bg-primary/10 rounded-2xl text-primary">
                <Target className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-emerald-500 bg-emerald-50 px-3 py-1 rounded-full">+4% vs last month</span>
            </div>
            <div>
              <p className="text-slate-500 font-bold text-sm tracking-wide uppercase">Net Sentiment Score</p>
              <h2 className="text-5xl font-black text-slate-900 dark:text-white mt-1">84<span className="text-2xl text-slate-400">/100</span></h2>
            </div>
            <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-primary transition-all duration-1000" style={{ width: '84%' }} />
            </div>
          </div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-[50px] rounded-full group-hover:bg-primary/10 transition-colors" />
        </div>

        {/* Complaint Trends */}
        <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm space-y-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-bold text-xl">Top Recurring Themes</h3>
            <button className="text-xs font-bold text-slate-400 hover:text-primary flex items-center gap-1 transition-colors">
              Full Analysis <ChevronRight className="w-3 h-3" />
            </button>
          </div>
          <div className="flex flex-wrap gap-3">
            {keywords.map((kw) => (
              <div 
                key={kw.word}
                className={`px-6 py-4 rounded-[1.5rem] border transition-all hover:-translate-y-1 cursor-default flex items-center gap-4 ${kw.sentiment === 'positive' ? 'bg-emerald-50/50 border-emerald-100 text-emerald-700' : kw.sentiment === 'negative' ? 'bg-rose-50/50 border-rose-100 text-rose-700' : 'bg-slate-50 border-slate-200 text-slate-600'}`}
              >
                <div>
                  <p className="text-xs font-black uppercase opacity-60 leading-none mb-1">{kw.sentiment}</p>
                  <p className="font-black text-lg tracking-tight">{kw.word}</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center font-black text-sm shadow-sm">
                  {kw.count}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Staff Performance Mentions */}
        <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm space-y-8">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h3 className="font-bold text-xl tracking-tight">Staff Service Impact</h3>
              <p className="text-slate-400 text-sm font-medium">Automatic extraction of staff names from positive reviews.</p>
            </div>
            <Users className="w-8 h-8 text-primary/20" />
          </div>
          
          <div className="space-y-4">
            {staffMentions.map((staff) => (
              <div key={staff.name} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary text-white flex items-center justify-center font-black">
                    {staff.name[0]}
                  </div>
                  <div>
                    <p className="font-black text-slate-900 dark:text-white leading-none mb-1">{staff.name}</p>
                    <p className="text-xs text-slate-400 font-bold uppercase">{staff.mentions} Mentions</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 text-amber-500 font-black text-lg">
                    <TrendingUp className="w-4 h-4" />
                    {staff.rating}
                  </div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Avg Impact</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Actionable Recommendations */}
        <div className="bg-indigo-600 p-8 rounded-[2.5rem] text-white shadow-2xl shadow-indigo-600/20 flex flex-col justify-between">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-xl backdrop-blur-md">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="font-black text-xl tracking-tight uppercase">AI Priority Actions</h3>
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-white/10 rounded-2xl border border-white/10 backdrop-blur-sm">
                <p className="font-bold mb-1 flex items-center gap-2">
                  <span className="w-2 h-2 bg-rose-400 rounded-full" />
                  Wait Time Alert
                </p>
                <p className="text-sm text-white/70 leading-relaxed font-medium">"Waiting time" mentions increased by 18% in the last 48 hours. Consider staff reallocation for peak hours.</p>
              </div>
              <div className="p-4 bg-white/10 rounded-2xl border border-white/10 backdrop-blur-sm">
                <p className="font-bold mb-1 flex items-center gap-2">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full" />
                  Service Recognition
                </p>
                <p className="text-sm text-white/70 leading-relaxed font-medium">Sarah L. was mentioned in 5 positive reviews this week. Consider a performance bonus or recognition.</p>
              </div>
            </div>
          </div>
          <button className="w-full py-4 mt-8 bg-white text-indigo-600 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
            Implement All Actions
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default InsightsPage;
