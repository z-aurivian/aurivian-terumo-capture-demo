import React from 'react';
import { Heart, Repeat2, Twitter, Linkedin, LinkIcon } from 'lucide-react';

export default function SocialPostCard({ post, onLinkToInsight }) {
  const isTwitter = post.platform === 'twitter';

  return (
    <div className="bg-aurivian-dark-gray rounded-xl p-4 border border-aurivian-gray/20">
      <div className="flex items-start gap-3">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
          isTwitter ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-700/20 text-blue-300'
        }`}>
          {isTwitter ? <Twitter size={16} /> : <Linkedin size={16} />}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-aurivian-white text-sm font-medium truncate">{post.author.split('@')[0].trim()}</span>
            {post.verified && <span className="text-aurivian-blue text-[10px]">✓</span>}
            {isTwitter && <span className="text-aurivian-gray text-xs truncate">{post.handle}</span>}
          </div>
          <p className="text-aurivian-light-gray text-sm mt-2 whitespace-pre-wrap">{post.content}</p>
          <div className="flex items-center gap-4 mt-3 text-xs text-aurivian-gray">
            <span className="flex items-center gap-1"><Heart size={12} /> {post.likes.toLocaleString()}</span>
            {isTwitter && <span className="flex items-center gap-1"><Repeat2 size={12} /> {post.retweets}</span>}
            <div className="flex gap-1 flex-wrap ml-auto">
              {post.hashtags.map(h => (
                <span key={h} className="text-aurivian-blue">{h}</span>
              ))}
            </div>
          </div>
          {onLinkToInsight && (
            <button
              onClick={() => onLinkToInsight(post.id)}
              className="flex items-center gap-1 text-xs text-aurivian-blue hover:text-aurivian-blue/80 mt-2 transition-colors"
            >
              <LinkIcon size={12} /> Link to Insight
            </button>
          )}
          {post.linkedInsightId && (
            <span className="text-[10px] text-aurivian-gray mt-1 inline-block">Linked to insight</span>
          )}
        </div>
      </div>
    </div>
  );
}
