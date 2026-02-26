import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useAppContext } from './App';
import { askAuri } from './api/auriApi';
import { TEAM_MEMBERS, PRODUCTS, KITS } from './data/demoData';

const SUGGESTED_QUESTIONS = [
  "What are the top themes from Day 2?",
  "Which KITs need more coverage?",
  "Summarize what we know about EMERALD-1 from this congress",
  "What competitive signals have we picked up on DC Bead LUMI?",
  "Generate a Day 3 morning brief",
  "What's the KOL sentiment on TACE-IO combinations?",
  "How does LifePearl compare to DC Bead and HepaSphere?",
  "What are the key safety takeaways?",
];

export default function AuriChat() {
  const { state } = useAppContext();
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: `**Welcome to Auri** — your CIRSE 2025 congress intelligence co-pilot.\n\nI have access to **${state.insights.length} captured insights** from your team. I can help you:\n\n- Summarize insights by KIT, session, or product\n- Identify coverage gaps and suggest priorities\n- Answer competitive landscape questions\n- Generate daily briefs\n\nWhat would you like to explore?`,
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const prepareInsightsForRag = () => {
    return state.insights.map(ins => {
      const author = TEAM_MEMBERS.find(m => m.id === ins.authorId);
      const prods = ins.products.map(pid => PRODUCTS.find(p => p.id === pid)?.name).filter(Boolean);
      const kit = KITS.find(k => k.id === ins.kitId);
      return {
        ...ins,
        kit: kit?.name || '',
        kol: author?.name || '',
        products: prods,
        title: ins.sessionTitle || '',
        session: ins.sessionTitle || '',
      };
    });
  };

  const handleSend = async (text) => {
    const msg = text || input.trim();
    if (!msg || loading) return;

    setMessages(prev => [...prev, { role: 'user', content: msg }]);
    setInput('');
    setLoading(true);

    try {
      const insightsForRag = prepareInsightsForRag();
      const { response, provider } = await askAuri(msg, insightsForRag);
      setMessages(prev => [...prev, { role: 'assistant', content: response, provider }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'assistant', content: `Error: ${err.message}. Please try again.` }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-180px)] sm:h-[calc(100vh-220px)]">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-full bg-aurivian-blue/20 flex items-center justify-center">
          <Bot size={18} className="text-aurivian-blue" />
        </div>
        <div>
          <h2 className="text-aurivian-white text-sm font-['Michroma']">Auri</h2>
          <span className="text-aurivian-gray text-[10px]">CIRSE 2025 Congress Intelligence Co-Pilot</span>
        </div>
      </div>

      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2">
        {messages.map((msg, i) => (
          <div key={i} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}>
            {msg.role === 'assistant' && (
              <div className="w-7 h-7 rounded-full bg-aurivian-blue/20 flex items-center justify-center flex-shrink-0 mt-1">
                <Sparkles size={14} className="text-aurivian-blue" />
              </div>
            )}
            <div
              className={`max-w-[80%] rounded-xl p-4 ${
                msg.role === 'user'
                  ? 'bg-aurivian-blue/20 border border-aurivian-blue/30 text-aurivian-white'
                  : 'bg-aurivian-dark-gray border border-aurivian-gray/20 text-aurivian-light-gray'
              }`}
            >
              {msg.role === 'assistant' ? (
                <div className="prose prose-invert prose-sm max-w-none prose-headings:text-aurivian-white prose-h2:text-aurivian-blue prose-h3:text-aurivian-light-gray prose-p:text-aurivian-light-gray prose-strong:text-aurivian-white prose-li:text-aurivian-light-gray prose-a:text-aurivian-blue prose-table:text-aurivian-light-gray prose-th:text-aurivian-white prose-th:border-aurivian-gray/30 prose-td:border-aurivian-gray/20">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{msg.content}</ReactMarkdown>
                </div>
              ) : (
                <p className="text-sm">{msg.content}</p>
              )}
              {msg.provider && (
                <span className="text-[9px] text-aurivian-gray mt-2 block opacity-50">
                  via {msg.provider === 'keyword' ? 'local engine' : msg.provider}
                </span>
              )}
            </div>
            {msg.role === 'user' && (
              <div className="w-7 h-7 rounded-full bg-aurivian-blue flex items-center justify-center flex-shrink-0 mt-1">
                <User size={14} className="text-white" />
              </div>
            )}
          </div>
        ))}
        {loading && (
          <div className="flex gap-3">
            <div className="w-7 h-7 rounded-full bg-aurivian-blue/20 flex items-center justify-center flex-shrink-0">
              <Sparkles size={14} className="text-aurivian-blue" />
            </div>
            <div className="bg-aurivian-dark-gray border border-aurivian-gray/20 rounded-xl px-4 py-3 flex items-center gap-2">
              <Loader2 size={14} className="text-aurivian-blue animate-spin" />
              <span className="text-aurivian-gray text-sm">Auri is thinking...</span>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Suggested questions */}
      {messages.length <= 2 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {SUGGESTED_QUESTIONS.map((q, i) => (
            <button
              key={i}
              onClick={() => handleSend(q)}
              className="text-xs text-aurivian-blue bg-aurivian-blue/10 hover:bg-aurivian-blue/20 border border-aurivian-blue/30 rounded-full px-3 py-1.5 transition-colors"
            >
              {q}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <form
        onSubmit={e => { e.preventDefault(); handleSend(); }}
        className="flex gap-2"
      >
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Ask Auri about congress insights, DEB competitive landscape, KITs..."
          className="flex-1 bg-aurivian-dark-gray border border-aurivian-gray/30 rounded-xl px-4 py-3 text-sm text-aurivian-white placeholder:text-aurivian-gray focus:border-aurivian-blue focus:outline-none"
          disabled={loading}
        />
        <button
          type="submit"
          disabled={!input.trim() || loading}
          className="bg-aurivian-blue hover:bg-aurivian-blue/80 disabled:opacity-30 text-white px-4 rounded-xl transition-colors"
        >
          <Send size={16} />
        </button>
      </form>
    </div>
  );
}
