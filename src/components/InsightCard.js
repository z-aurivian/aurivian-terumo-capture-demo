import React, { useState } from 'react';
import { MessageSquare, Flame, Clock, LinkIcon } from 'lucide-react';
import { TEAM_MEMBERS, DISCUSSION_CONTEXTS, PRODUCTS } from '../data/demoData';
import UserAvatar from './UserAvatar';
import KitBadge from './KitBadge';
import SentimentBadge from './SentimentBadge';
import LikeButton from './LikeButton';
import InsightDetail from './InsightDetail';

function timeAgo(timestamp) {
  const now = new Date('2025-05-12T19:00:00Z');
  const then = new Date(timestamp);
  const mins = Math.floor((now - then) / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

export default function InsightCard({ insight }) {
  const [showDetail, setShowDetail] = useState(false);
  const author = TEAM_MEMBERS.find(m => m.id === insight.authorId);
  const context = DISCUSSION_CONTEXTS.find(c => c.id === insight.contextId);
  const products = insight.products.map(pid => PRODUCTS.find(p => p.id === pid)).filter(Boolean);

  return (
    <>
      <div
        className={`bg-aurivian-dark-gray rounded-xl p-4 border transition-colors cursor-pointer hover:border-aurivian-blue/40 ${
          insight.isHot ? 'border-orange-500/50 ring-1 ring-orange-500/20' : 'border-aurivian-gray/20'
        }`}
        onClick={() => setShowDetail(true)}
      >
        <div className="flex items-start gap-3">
          <UserAvatar userId={insight.authorId} />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-aurivian-white text-sm font-medium">{author?.name}</span>
              <span className="text-aurivian-gray text-xs">{author?.role}</span>
              <span className="text-aurivian-gray text-xs flex items-center gap-1">
                <Clock size={10} /> {timeAgo(insight.timestamp)}
              </span>
              {insight.isHot && (
                <span className="flex items-center gap-0.5 text-orange-500 text-xs font-medium">
                  <Flame size={12} fill="currentColor" /> Hot
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 mt-1 flex-wrap">
              <KitBadge kitId={insight.kitId} size="sm" />
              <SentimentBadge sentiment={insight.sentiment} />
              {context && <span className="text-aurivian-gray text-[10px]">{context.name}</span>}
            </div>
            {insight.sessionTitle && (
              <p className="text-aurivian-blue text-xs mt-1 font-medium">{insight.sessionTitle}</p>
            )}
            <p className="text-aurivian-light-gray text-sm mt-2 line-clamp-3">{insight.narrative}</p>
            {products.length > 0 && (
              <div className="flex gap-1 mt-2 flex-wrap">
                {products.map(p => (
                  <span key={p.id} className="text-[10px] px-1.5 py-0.5 rounded bg-aurivian-gray/20 text-aurivian-gray">
                    {p.name}
                  </span>
                ))}
              </div>
            )}
            <div className="flex items-center gap-4 mt-3">
              <LikeButton insightId={insight.id} likes={insight.likes} />
              <span className="flex items-center gap-1 text-xs text-aurivian-gray">
                <MessageSquare size={14} /> {insight.comments.length}
              </span>
              {insight.linkedSocialPosts.length > 0 && (
                <span className="flex items-center gap-1 text-xs text-aurivian-gray">
                  <LinkIcon size={14} /> {insight.linkedSocialPosts.length} linked
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
      {showDetail && <InsightDetail insight={insight} onClose={() => setShowDetail(false)} />}
    </>
  );
}
