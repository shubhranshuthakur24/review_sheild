import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { 
  Sparkles, 
  Send, 
  Trash2,
  Wand2,
  RefreshCcw,
  X
} from 'lucide-react';
import { updateReviewReply } from '../../store/slices/reviewsSlice';

interface ReplyEditorProps {
  reviewId: string;
  onCancel: () => void;
  onSuccess: () => void;
}

type Tone = 'professional' | 'empathetic' | 'premium' | 'casual';

const templates = [
  { id: 'thank_you', name: 'General Thank You', text: 'Thank you for your kind words! We hope to see you again soon.' },
  { id: 'apology', name: 'Service Apology', text: 'We apologize for the inconvenience. We have shared your feedback with our team for immediate action.' },
  { id: 'resolution', name: 'Follow-up Request', text: 'Thank you for sharing. Could you please reach out to us at support@business.com so we can resolve this?' },
];

const ReplyEditor: React.FC<ReplyEditorProps> = ({ reviewId, onCancel, onSuccess }) => {
  const dispatch = useDispatch();
  const [text, setText] = useState('');
  const [tone, setTone] = useState<Tone>('professional');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateAI = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const suggestions: Record<Tone, string> = {
        professional: "Thank you for taking the time to provide us with your feedback. We appreciate your patronage and will ensure your comments are reviewed by our management team.",
        empathetic: "We truly appreciate your honest feedback. We're committed to providing the best experience possible and feel your perspective helps us grow. Thank you for being with us.",
        premium: "We are delighted to hear you enjoyed the Review Shield experience. We strive to maintain the highest standards of service for our distinguished clients. Looking forward to your next visit.",
        casual: "Thanks for the shout-out! We're stoked you had a good time. See you around soon! 🚀"
      };
      setText(suggestions[tone]);
      setIsGenerating(false);
    }, 800);
  };

  const handleApplyTemplate = (templateId: string) => {
    const template = templates.find(t => t.id === templateId);
    if (template) setText(template.text);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    dispatch(updateReviewReply({ id: reviewId, replyText: text }));
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="flex items-center justify-between">
        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Response Composer</label>
        <div className="flex items-center gap-2">
          {templates.map(t => (
            <button
              key={t.id}
              type="button"
              onClick={() => handleApplyTemplate(t.id)}
              className="px-3 py-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-[10px] font-bold text-slate-500 hover:border-primary hover:text-primary transition-all"
            >
              {t.name}
            </button>
          ))}
        </div>
      </div>

      <div className="relative group">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type your response here or use AI to generate one..."
          className="w-full h-32 p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium text-slate-700 dark:text-slate-300 resize-none leading-relaxed"
        />
        <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button type="button" onClick={() => setText('')} className="p-1.5 bg-slate-100 hover:bg-rose-100 hover:text-rose-500 rounded-lg text-slate-400 transition-all">
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl w-full sm:w-auto h-12">
          {(['professional', 'empathetic', 'premium', 'casual']as Tone[]).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTone(t)}
              className={`flex-1 sm:px-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${tone === t ? 'bg-white dark:bg-slate-700 shadow-sm text-primary' : 'text-slate-400 hover:text-slate-600'}`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button 
            type="button"
            onClick={onCancel}
            className="px-6 h-12 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 rounded-2xl font-bold hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
          >
            <X className="w-4 h-4" />
            Cancel
          </button>
          <button 
            type="button"
            onClick={handleGenerateAI}
            disabled={isGenerating}
            className="flex h-12 items-center justify-center gap-2 px-6 bg-indigo-500 hover:bg-indigo-600 text-white rounded-2xl font-bold transition-all shadow-lg shadow-indigo-200 dark:shadow-none active:scale-95 disabled:opacity-50"
          >
            {isGenerating ? <RefreshCcw className="w-4 h-4 animate-spin" /> : <Wand2 className="w-4 h-4" />}
            AI Write
          </button>
          <button 
            type="submit"
            disabled={!text.trim()}
            className="flex h-12 items-center justify-center gap-2 px-8 bg-primary hover:bg-primary-dark text-white rounded-2xl font-bold transition-all shadow-lg shadow-primary/20 active:scale-95 disabled:opacity-50"
          >
            Post Reply
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex items-center gap-2 text-[10px] text-slate-400 font-bold">
        <Sparkles className="w-3 h-3 text-amber-400" />
        AI is reviewing your tone for maximum impact.
      </div>
    </form>
  );
};

export default ReplyEditor;
