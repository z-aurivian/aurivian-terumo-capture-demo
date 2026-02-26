import React, { useState, useMemo } from 'react';
import { Hash, LinkIcon } from 'lucide-react';
import { useAppContext } from './App';
import { CONGRESS_CONFIG } from './data/demoData';
import SocialPostCard from './components/SocialPostCard';

export default function SocialStream() {
  const { state, dispatch } = useAppContext();
  const [dayFilter, setDayFilter] = useState('all');
  const [platformFilter, setPlatformFilter] = useState('all');
  const [linkingPostId, setLinkingPostId] = useState(null);

  const filtered = useMemo(() => {
    return state.socialPosts
      .filter(p => {
        if (dayFilter !== 'all' && p.day !== Number(dayFilter)) return false;
        if (platformFilter !== 'all' && p.platform !== platformFilter) return false;
        return true;
      })
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  }, [state.socialPosts, dayFilter, platformFilter]);

  const handleLinkToInsight = (postId) => {
    setLinkingPostId(postId);
  };

  const confirmLink = (insightId) => {
    dispatch({ type: 'LINK_SOCIAL_POST', payload: { insightId, socialPostId: linkingPostId } });
    setLinkingPostId(null);
  };

  const allHashtags = useMemo(() => {
    const set = new Set();
    state.socialPosts.forEach(p => p.hashtags.forEach(h => set.add(h)));
    return [...set].sort();
  }, [state.socialPosts]);

  const selectClass = 'bg-aurivian-dark-gray border border-aurivian-gray/30 text-aurivian-white text-xs rounded-lg px-2 py-1.5 focus:border-aurivian-blue focus:outline-none';

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h2 className="text-aurivian-white text-lg font-['Michroma']">Social Stream</h2>
        <div className="flex gap-2">
          <select value={dayFilter} onChange={e => setDayFilter(e.target.value)} className={selectClass}>
            <option value="all">All Days</option>
            {Array.from({ length: CONGRESS_CONFIG.totalDays }, (_, i) => (
              <option key={i + 1} value={String(i + 1)}>Day {i + 1}</option>
            ))}
          </select>
          <select value={platformFilter} onChange={e => setPlatformFilter(e.target.value)} className={selectClass}>
            <option value="all">All Platforms</option>
            <option value="twitter">Twitter/X</option>
            <option value="linkedin">LinkedIn</option>
          </select>
        </div>
      </div>

      {/* Trending hashtags */}
      <div className="flex flex-wrap gap-2 items-center">
        <Hash size={14} className="text-aurivian-gray" />
        {allHashtags.slice(0, 10).map(h => (
          <span key={h} className="text-xs text-aurivian-blue bg-aurivian-blue/10 px-2 py-0.5 rounded-full">
            {h}
          </span>
        ))}
      </div>

      {/* Link to insight modal */}
      {linkingPostId && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4" onClick={() => setLinkingPostId(null)}>
          <div className="bg-aurivian-dark-gray rounded-2xl max-w-md w-full p-4 border border-aurivian-gray/30" onClick={e => e.stopPropagation()}>
            <h3 className="text-aurivian-white font-medium mb-3 flex items-center gap-2">
              <LinkIcon size={16} className="text-aurivian-blue" /> Link to Insight
            </h3>
            <p className="text-aurivian-gray text-xs mb-3">Select an insight to link this social post to:</p>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {state.insights.slice(0, 10).map(ins => (
                <button
                  key={ins.id}
                  onClick={() => confirmLink(ins.id)}
                  className="w-full text-left bg-aurivian-black rounded-lg p-2 border border-aurivian-gray/20 hover:border-aurivian-blue/40 transition-colors"
                >
                  <p className="text-aurivian-white text-xs line-clamp-2">{ins.narrative}</p>
                </button>
              ))}
            </div>
            <button onClick={() => setLinkingPostId(null)} className="mt-3 text-aurivian-gray text-xs hover:text-aurivian-white">
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Social posts */}
      <div className="space-y-3">
        {filtered.map(post => (
          <SocialPostCard key={post.id} post={post} onLinkToInsight={handleLinkToInsight} />
        ))}
        {filtered.length === 0 && (
          <div className="text-center py-12 text-aurivian-gray">
            <p>No social posts match your filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}
