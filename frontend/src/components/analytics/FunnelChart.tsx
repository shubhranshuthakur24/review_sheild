import React from 'react';
import { TrendingDown, Users, Star, MousePointer2 as CursorClick, CheckCircle } from 'lucide-react';

interface FunnelStepProps {
  label: string;
  value: number;
  total: number;
  icon: React.ElementType;
  color: string;
}

const FunnelStep: React.FC<FunnelStepProps> = ({ label, value, total, icon: Icon, color }) => {
  const percentage = Math.round((value / total) * 100);
  
  return (
    <div className="relative flex flex-col items-center">
      <div 
        className="w-full max-w-[200px] aspect-[4/1] rounded-2xl flex items-center justify-between px-6 mb-2 transition-all hover:scale-105 group"
        style={{ backgroundColor: `${color}15`, border: `2px solid ${color}30` }}
      >
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-white dark:bg-slate-900 shadow-sm" style={{ color }}>
            <Icon className="w-4 h-4" />
          </div>
          <span className="font-bold text-slate-700 dark:text-slate-200 text-sm tracking-tight">{label}</span>
        </div>
        <div className="text-right">
          <div className="font-black text-slate-900 dark:text-white leading-none">{value}</div>
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{percentage}%</div>
        </div>
      </div>
    </div>
  );
};

const FunnelConnector: React.FC<{ dropPercentage: number }> = ({ dropPercentage }) => (
  <div className="flex flex-col items-center py-1 opacity-50">
    <div className="w-[2px] h-4 bg-slate-200 dark:bg-slate-800" />
    <div className="flex items-center gap-1 text-[10px] font-bold text-rose-500">
      <TrendingDown className="w-3 h-3" />
      {dropPercentage}% drop
    </div>
    <div className="w-[2px] h-4 bg-slate-200 dark:bg-slate-800" />
  </div>
);

const FunnelChart: React.FC = () => {
  // Mock data representing a typical funnel performance
  const steps = [
    { label: 'Landing', value: 1420, icon: Users, color: '#6366f1' },
    { label: 'Rating', value: 980, icon: Star, color: '#f59e0b' },
    { label: 'Action', value: 642, icon: CursorClick, color: '#10b981' },
    { label: 'Success', value: 584, icon: CheckCircle, color: '#8b5cf6' },
  ];

  const total = steps[0].value;

  return (
    <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm h-full flex flex-col">
      <div className="flex items-center justify-between mb-8">
        <h3 className="font-bold text-lg tracking-tight">Funnel Conversion</h3>
        <span className="text-xs font-bold text-emerald-500 bg-emerald-50 px-3 py-1 rounded-full">+12% this week</span>
      </div>

      <div className="flex-1 flex flex-col justify-center">
        {steps.map((step, index) => (
          <React.Fragment key={step.label}>
            <FunnelStep 
              label={step.label} 
              value={step.value} 
              total={total} 
              icon={step.icon} 
              color={step.color} 
            />
            {index < steps.length - 1 && (
              <FunnelConnector 
                dropPercentage={Math.round((1 - (steps[index+1].value / step.value)) * 100)} 
              />
            )}
          </React.Fragment>
        ))}
      </div>

      <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-sm font-medium text-slate-500">
        <span>Overall Efficiency</span>
        <span className="text-primary font-bold text-lg">{Math.round((steps[steps.length-1].value / total) * 100)}%</span>
      </div>
    </div>
  );
};

export default FunnelChart;
