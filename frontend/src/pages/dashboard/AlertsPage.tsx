import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { 
  Bell, 
  ShieldAlert, 
  Clock, 
  CheckCircle2, 
  Mail, 
  MessageSquare, 
  Settings as SettingsIcon,
  Trash2
} from 'lucide-react';
import { updateAlertStatus, Alert } from '../../store/slices/alertsSlice';
import { formatDistanceToNow } from 'date-fns';

const AlertsPage: React.FC = () => {
  const dispatch = useDispatch();
  const alertsState = useSelector((state: RootState) => state.alerts);
  const items = alertsState?.items || [];
  const rules = alertsState?.rules || { urgentThreshold: 3, reminderHours: 24 };

  const getUrgencyColor = (type: string) => {
    switch (type) {
      case 'URGENT': return 'text-rose-500 bg-rose-50 border-rose-100';
      case 'REVIEW_SPIKE': return 'text-amber-600 bg-amber-50 border-amber-100';
      default: return 'text-blue-500 bg-blue-50 border-blue-100';
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Smart Alerts</h1>
          <p className="text-slate-500 font-medium">Proactive notifications triggered by your reputation engine.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl font-bold text-sm hover:bg-slate-50 transition-all">
          <SettingsIcon className="w-4 h-4" />
          Alert Rules
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Alerts Timeline */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between mb-2 px-2">
            <h3 className="font-bold text-slate-400 text-xs uppercase tracking-widest">Recent Activity</h3>
            <button className="text-xs font-bold text-primary hover:underline">Mark all as read</button>
          </div>
          
          {items.map((alert: Alert) => (
            <div 
              key={alert.id}
              className={`p-5 bg-white dark:bg-slate-900 border rounded-3xl transition-all hover:shadow-lg hover:shadow-slate-200/50 group ${alert.status === 'pending' ? 'border-l-4 border-l-primary shadow-md shadow-primary/5' : 'border-slate-200/60 opacity-70'}`}
            >
              <div className="flex gap-4">
                <div className={`shrink-0 w-12 h-12 rounded-2xl border flex items-center justify-center ${getUrgencyColor(alert.type)}`}>
                  {alert.type === 'URGENT' ? <ShieldAlert className="w-6 h-6" /> : <Bell className="w-6 h-6" />}
                </div>
                
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{alert.type}</span>
                    <span className="text-[10px] text-slate-400 font-bold flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {formatDistanceToNow(new Date(alert.timestamp), { addSuffix: true })}
                    </span>
                  </div>
                  <p className="text-slate-900 dark:text-white font-bold leading-tight">{alert.message}</p>
                  
                  <div className="flex items-center gap-4 pt-3">
                    {alert.status === 'pending' ? (
                      <button 
                        onClick={() => dispatch(updateAlertStatus({ id: alert.id, status: 'resolved' }))}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase rounded-lg hover:bg-emerald-100 transition-all"
                      >
                        <CheckCircle2 className="w-3 h-3" />
                        Resolve
                      </button>
                    ) : (
                      <span className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 text-slate-500 text-[10px] font-black uppercase rounded-lg">
                        <CheckCircle2 className="w-3 h-3" />
                        Resolved
                      </span>
                    )}
                    <button className="flex items-center gap-1.5 px-3 py-1.5 text-slate-400 hover:text-rose-500 text-[10px] font-black uppercase transition-all">
                      <Trash2 className="w-3 h-3" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {items.length === 0 && (
            <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-3xl border border-dashed border-slate-200 dark:border-slate-800">
              <p className="text-slate-400 font-bold">No active alerts</p>
            </div>
          )}
        </div>

        {/* Rule Summary & Channels */}
        <div className="space-y-8">
          <div className="bg-slate-900 text-white p-8 rounded-[2rem] shadow-2xl shadow-slate-900/20 relative overflow-hidden">
            <div className="relative z-10 space-y-6">
              <h3 className="font-bold text-xl">Active Rules</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-white/5 rounded-2xl border border-white/10">
                  <div>
                    <p className="text-white/60 text-xs font-bold uppercase tracking-wider">Urgency Threshold</p>
                    <p className="text-lg font-black">Under {rules.urgentThreshold} Stars</p>
                  </div>
                  <ShieldAlert className="w-5 h-5 text-rose-400" />
                </div>
                <div className="flex justify-between items-center p-3 bg-white/5 rounded-2xl border border-white/10">
                  <div>
                    <p className="text-white/60 text-xs font-bold uppercase tracking-wider">Response Goal</p>
                    <p className="text-lg font-black">{rules.reminderHours} Hours</p>
                  </div>
                  <Clock className="w-5 h-5 text-blue-400" />
                </div>
              </div>
            </div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-[60px] rounded-full -mr-16 -mt-16" />
          </div>

          <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800 space-y-6">
            <h3 className="font-bold text-xl">Delivery Channels</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-500">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-sm">Email Digest</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase">Immediate</p>
                  </div>
                </div>
                <div className="w-10 h-5 bg-emerald-500 rounded-full relative shadow-inner">
                  <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full shadow-sm" />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-500">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-sm">WhatsApp</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase">Urgent Only</p>
                  </div>
                </div>
                <div className="w-10 h-5 bg-slate-200 rounded-full relative shadow-inner">
                  <div className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full shadow-sm" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertsPage;
