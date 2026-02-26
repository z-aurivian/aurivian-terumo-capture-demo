import React, { useState, useMemo } from 'react';
import { Send, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from './App';
import { KITS, KIQS, DISCUSSION_CONTEXTS, PRODUCTS, TRIALS, SENTIMENTS, CONGRESS_CONFIG } from './data/demoData';

const HCP_PERSONAS = [
  { id: 'tier1-kol', label: 'Tier 1 KOL' },
  { id: 'tier2-kol', label: 'Tier 2 KOL' },
  { id: 'hcp', label: 'HCP' },
  { id: 'nurse', label: 'Nurse / APN' },
  { id: 'fellow', label: 'Fellow / Trainee' },
];

export default function InsightCapture() {
  const { state, dispatch } = useAppContext();
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState({
    kitId: '',
    kiqId: '',
    contextId: '',
    sessionTitle: '',
    track: '',
    products: [],
    trials: [],
    sentiment: 'neutral',
    narrative: '',
    tags: '',
    hcpName: '',
    hcpPersona: '',
  });

  const filteredKiqs = useMemo(() => {
    return KIQS.filter(q => q.kitId === form.kitId);
  }, [form.kitId]);

  const set = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

  const toggleMulti = (field, value) => {
    setForm(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(v => v !== value)
        : [...prev[field], value],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.narrative.trim()) return;

    dispatch({
      type: 'ADD_INSIGHT',
      payload: {
        authorId: state.currentUser.id,
        timestamp: new Date().toISOString(),
        day: CONGRESS_CONFIG.currentDay,
        kitId: form.kitId || null,
        kiqId: form.kiqId || null,
        contextId: form.contextId || null,
        sessionTitle: form.sessionTitle,
        track: form.track,
        products: form.products,
        trials: form.trials,
        sentiment: form.sentiment,
        narrative: form.narrative.trim(),
        tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
        hcpName: form.hcpName.trim() || null,
        hcpPersona: form.hcpPersona || null,
      },
    });

    setSubmitted(true);
    setTimeout(() => navigate('/'), 1500);
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <CheckCircle size={48} className="text-aurivian-cyan mb-4" />
        <h2 className="text-aurivian-white text-xl font-medium">Insight Captured!</h2>
        <p className="text-aurivian-gray text-sm mt-2">+10 points earned. Redirecting to feed...</p>
      </div>
    );
  }

  const labelClass = 'text-aurivian-gray text-xs uppercase tracking-wider mb-1 block';
  const inputClass = 'w-full bg-aurivian-black border border-aurivian-gray/30 rounded-lg px-3 py-2 text-sm text-aurivian-white placeholder:text-aurivian-gray focus:border-aurivian-blue focus:outline-none';
  const selectClass = inputClass;

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-aurivian-white text-lg font-['Michroma'] mb-6">Capture Insight</h2>
      <form onSubmit={handleSubmit} className="space-y-5">

        {/* HCP Name & Persona */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>HCP Name</label>
            <input type="text" value={form.hcpName} onChange={e => set('hcpName', e.target.value)} placeholder="e.g., Prof. Thomas Vogl" className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>HCP Persona</label>
            <select value={form.hcpPersona} onChange={e => set('hcpPersona', e.target.value)} className={selectClass}>
              <option value="">Select persona...</option>
              {HCP_PERSONAS.map(p => <option key={p.id} value={p.id}>{p.label}</option>)}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>KIT</label>
            <select value={form.kitId} onChange={e => { set('kitId', e.target.value); set('kiqId', ''); }} className={selectClass}>
              <option value="">Select KIT...</option>
              {KITS.map(k => <option key={k.id} value={k.id}>{k.shortName} — {k.name}</option>)}
            </select>
          </div>
          <div>
            <label className={labelClass}>KIQ</label>
            <select value={form.kiqId} onChange={e => set('kiqId', e.target.value)} className={selectClass} disabled={!form.kitId}>
              <option value="">Select KIQ...</option>
              {filteredKiqs.map(q => <option key={q.id} value={q.id}>{q.question.slice(0, 60)}...</option>)}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Discussion Context</label>
            <select value={form.contextId} onChange={e => set('contextId', e.target.value)} className={selectClass}>
              <option value="">Select context...</option>
              {DISCUSSION_CONTEXTS.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
          <div>
            <label className={labelClass}>Track</label>
            <select value={form.track} onChange={e => set('track', e.target.value)} className={selectClass}>
              <option value="">Select track...</option>
              {CONGRESS_CONFIG.tracks.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
            </select>
          </div>
        </div>

        <div>
          <label className={labelClass}>Session / Event Title</label>
          <input type="text" value={form.sessionTitle} onChange={e => set('sessionTitle', e.target.value)} placeholder="e.g., Late-Breaking: EMERALD-1 Updated OS" className={inputClass} />
        </div>

        <div>
          <label className={labelClass}>Products Mentioned</label>
          <div className="flex flex-wrap gap-2">
            {PRODUCTS.map(p => (
              <button
                key={p.id}
                type="button"
                onClick={() => toggleMulti('products', p.id)}
                className={`text-xs px-2.5 py-1 rounded-full border transition-colors ${
                  form.products.includes(p.id)
                    ? 'border-aurivian-blue bg-aurivian-blue/20 text-aurivian-blue'
                    : 'border-aurivian-gray/30 text-aurivian-gray hover:border-aurivian-gray/60'
                }`}
              >
                {p.name}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className={labelClass}>Trials Referenced</label>
          <div className="flex flex-wrap gap-2">
            {TRIALS.map(t => (
              <button
                key={t.id}
                type="button"
                onClick={() => toggleMulti('trials', t.id)}
                className={`text-xs px-2.5 py-1 rounded-full border transition-colors ${
                  form.trials.includes(t.id)
                    ? 'border-aurivian-blue bg-aurivian-blue/20 text-aurivian-blue'
                    : 'border-aurivian-gray/30 text-aurivian-gray hover:border-aurivian-gray/60'
                }`}
              >
                {t.name}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className={labelClass}>Sentiment</label>
          <div className="flex gap-2">
            {SENTIMENTS.map(s => (
              <button
                key={s.id}
                type="button"
                onClick={() => set('sentiment', s.id)}
                className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border transition-colors ${
                  form.sentiment === s.id
                    ? 'border-current bg-opacity-20'
                    : 'border-aurivian-gray/30 text-aurivian-gray'
                }`}
                style={form.sentiment === s.id ? { color: s.color, borderColor: s.color, backgroundColor: s.color + '20' } : {}}
              >
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: s.color }} />
                {s.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className={labelClass}>Narrative / Notes *</label>
          <textarea
            value={form.narrative}
            onChange={e => set('narrative', e.target.value)}
            placeholder="Describe what you observed, heard, or discussed. Include specific quotes, data points, and KOL reactions where possible..."
            className={`${inputClass} h-32 resize-none`}
            required
          />
          <div className="text-right text-[10px] text-aurivian-gray mt-1">{form.narrative.length} characters</div>
        </div>

        <div>
          <label className={labelClass}>Tags (comma separated)</label>
          <input type="text" value={form.tags} onChange={e => set('tags', e.target.value)} placeholder="e.g., head-to-head, late-breaking, TACE-IO" className={inputClass} />
        </div>

        <button
          type="submit"
          disabled={!form.narrative.trim()}
          className="w-full bg-aurivian-blue hover:bg-aurivian-blue/80 disabled:opacity-30 disabled:cursor-not-allowed text-white font-medium py-3 rounded-xl flex items-center justify-center gap-2 transition-colors"
        >
          <Send size={16} /> Submit Insight
        </button>
      </form>
    </div>
  );
}
