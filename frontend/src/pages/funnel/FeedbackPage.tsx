import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { 
  MessageSquare, 
  Send,
  Camera,
  Layers
} from 'lucide-react';
import { setFeedback, setStep } from '../../store/slices/funnelSlice';
import { RootState } from '../../store';
import { useSelector } from 'react-redux';

const FeedbackPage: React.FC = () => {
  const dispatch = useDispatch();
  const { branding } = useSelector((state: RootState) => state.funnel);
  const [message, setMessage] = useState('');
  const [category, setCategory] = useState('service');
  const [contact, setContact] = useState('');

  const categories = [
    { id: 'staff', name: 'Staff' },
    { id: 'pricing', name: 'Pricing' },
    { id: 'service', name: 'Service' },
    { id: 'delay', name: 'Delay' },
    { id: 'cleanliness', name: 'Cleanliness' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message) return;

    dispatch(setFeedback({ message, category, contact }));
    dispatch(setStep('success'));
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 text-left">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">Private Feedback</h1>
        <p className="text-slate-500 font-medium">Your comments go directly to the management team.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Category Selection */}
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
            <Layers className="w-4 h-4" />
            What is this about?
          </label>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-sm font-bold transition-all border ${
                  category === cat.id 
                    ? 'border-transparent text-white' 
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-500 hover:border-slate-300'
                }`}
                style={category === cat.id ? { backgroundColor: branding.primaryColor } : {}}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Message */}
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
            <MessageSquare className="w-4 h-4" />
            Your Experience
          </label>
          <textarea
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Tell us what happened..."
            className="w-full h-32 p-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl outline-none resize-none transition-all focus:ring-2"
            style={{ '--tw-ring-color': branding.primaryColor } as React.CSSProperties}
          />
        </div>

        {/* Contact Info (Optional) */}
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-500 uppercase tracking-wider">
            Contact Info (Optional)
          </label>
          <input
            type="text"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            placeholder="Email or phone number"
            className="w-full p-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl outline-none transition-all focus:ring-2"
            style={{ '--tw-ring-color': branding.primaryColor } as React.CSSProperties}
          />
        </div>

        {/* Mock Attachment */}
        <button
          type="button"
          className="w-full py-4 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl text-slate-400 flex items-center justify-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all group"
        >
          <Camera className="w-5 h-5 group-hover:scale-110 transition-transform" />
          <span className="font-bold text-sm tracking-tight text-slate-500">Add Photo Evidence (Optional)</span>
        </button>

        <button
          type="submit"
          className="w-full py-5 text-white rounded-2xl font-bold flex items-center justify-center gap-3 shadow-xl transition-all active:scale-95 disabled:opacity-50"
          disabled={!message}
          style={!message ? {} : { backgroundColor: branding.primaryColor, boxShadow: `0 10px 20px -5px ${branding.primaryColor}40` }}
        >
          Submit Feedback
          <Send className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
};

export default FeedbackPage;
