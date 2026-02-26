import React from 'react';
import { X, Flame, Calendar, MapPin } from 'lucide-react';
import { TEAM_MEMBERS, KITS, KIQS, DISCUSSION_CONTEXTS, PRODUCTS, TRIALS } from '../data/demoData';
import UserAvatar from './UserAvatar';
import KitBadge from './KitBadge';
import SentimentBadge from './SentimentBadge';
import LikeButton from './LikeButton';
import CommentThread from './CommentThread';
import SocialPostCard from './SocialPostCard';
import { useAppContext } from '../App';

export default function InsightDetail({ insight, onClose }) {
  const { state } = useAppContext();
  const author = TEAM_MEMBERS.find(m => m.id === insight.authorId);
  const kit = KITS.find(k => k.id === insight.kitId);
  const kiq = KIQS.find(q => q.id === insight.kiqId);
  const context = DISCUSSION_CONTEXTS.find(c => c.id === insight.contextId);
  const products = insight.products.map(pid => PRODUCTS.find(p => p.id === pid)).filter(Boolean);
  const trials = insight.trials.map(tid => TRIALS.find(t => t.id === tid)).filter(Boolean);
  const linkedPosts = state.socialPosts.filter(p => insight.linkedSocialPosts.includes(p.id));

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="bg-aurivian-dark-gray rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-aurivian-gray/30"
        onClick={e => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-aurivian-dark-gray border-b border-aurivian-gray/20 p-4 flex items-center justify-between rounded-t-2xl">
          <div className="flex items-center gap-2">
            {insight.isHot && <Flame size={16} className="text-orange-500" fill="currentColor" />}
            <span className="text-aurivian-white font-medium text-sm">Insight Detail</span>
          </div>
          <button onClick={onClose} className="text-aurivian-gray hover:text-aurivian-white transition-colors">
            <X size={20} />
          </button>
        </div>
        <div className="p-4 space-y-4">
          <div className="flex items-start gap-3">
            <UserAvatar userId={insight.authorId} size="lg" />
            <div>
              <div className="text-aurivian-white font-medium">{author?.name}</div>
              <div className="text-aurivian-gray text-xs">{author?.role}</div>
              <div className="text-aurivian-gray text-xs flex items-center gap-2 mt-1">
                <Calendar size={10} /> Day {insight.day} — {new Date(insight.timestamp).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <KitBadge kitId={insight.kitId} />
            <SentimentBadge sentiment={insight.sentiment} />
            {context && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-aurivian-gray/20 text-aurivian-gray border border-aurivian-gray/30">
                {context.name}
              </span>
            )}
          </div>

          {insight.sessionTitle && (
            <h3 className="text-aurivian-blue font-medium text-sm">{insight.sessionTitle}</h3>
          )}

          {kiq && (
            <div className="bg-aurivian-black/50 rounded-lg p-3 border border-aurivian-gray/20">
              <span className="text-[10px] text-aurivian-gray uppercase tracking-wider">Key Intelligence Question</span>
              <p className="text-aurivian-light-gray text-sm mt-1">{kiq.question}</p>
            </div>
          )}

          <p className="text-aurivian-white text-sm leading-relaxed">{insight.narrative}</p>

          {products.length > 0 && (
            <div>
              <span className="text-[10px] text-aurivian-gray uppercase tracking-wider">Products</span>
              <div className="flex gap-1 mt-1 flex-wrap">
                {products.map(p => (
                  <span key={p.id} className="text-xs px-2 py-0.5 rounded" style={{ backgroundColor: p.color + '20', color: p.color }}>
                    {p.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {trials.length > 0 && (
            <div>
              <span className="text-[10px] text-aurivian-gray uppercase tracking-wider">Trials</span>
              <div className="flex gap-1 mt-1 flex-wrap">
                {trials.map(t => (
                  <span key={t.id} className="text-xs px-2 py-0.5 rounded bg-aurivian-blue/10 text-aurivian-blue border border-aurivian-blue/30">
                    {t.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {insight.tags.length > 0 && (
            <div className="flex gap-1 flex-wrap">
              {insight.tags.map(tag => (
                <span key={tag} className="text-[10px] text-aurivian-gray">#{tag}</span>
              ))}
            </div>
          )}

          <div className="flex items-center gap-4 py-2 border-t border-aurivian-gray/20">
            <LikeButton insightId={insight.id} likes={insight.likes} />
          </div>

          {linkedPosts.length > 0 && (
            <div>
              <span className="text-[10px] text-aurivian-gray uppercase tracking-wider mb-2 block">Linked Social Posts</span>
              <div className="space-y-2">
                {linkedPosts.map(p => <SocialPostCard key={p.id} post={p} />)}
              </div>
            </div>
          )}

          <div className="border-t border-aurivian-gray/20 pt-4">
            <span className="text-xs text-aurivian-gray mb-2 block">Comments ({insight.comments.length})</span>
            <CommentThread insightId={insight.id} comments={insight.comments} />
          </div>
        </div>
      </div>
    </div>
  );
}
