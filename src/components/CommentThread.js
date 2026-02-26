import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { TEAM_MEMBERS } from '../data/demoData';
import UserAvatar from './UserAvatar';
import { useAppContext } from '../App';

function formatTime(ts) {
  return new Date(ts).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
}

export default function CommentThread({ insightId, comments }) {
  const { state, dispatch } = useAppContext();
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    dispatch({
      type: 'ADD_COMMENT',
      payload: {
        insightId,
        comment: { authorId: state.currentUser.id, text: text.trim(), timestamp: new Date().toISOString() },
      },
    });
    setText('');
  };

  return (
    <div className="space-y-3">
      {comments.map(c => {
        const author = TEAM_MEMBERS.find(m => m.id === c.authorId);
        return (
          <div key={c.id} className="flex items-start gap-2">
            <UserAvatar userId={c.authorId} size="sm" />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-aurivian-white text-xs font-medium">{author?.name}</span>
                <span className="text-aurivian-gray text-[10px]">{formatTime(c.timestamp)}</span>
              </div>
              <p className="text-aurivian-light-gray text-sm mt-0.5">{c.text}</p>
            </div>
          </div>
        );
      })}
      <form onSubmit={handleSubmit} className="flex gap-2 mt-2">
        <input
          type="text"
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Add a comment..."
          className="flex-1 bg-aurivian-black border border-aurivian-gray/30 rounded-lg px-3 py-2 text-sm text-aurivian-white placeholder:text-aurivian-gray focus:border-aurivian-blue focus:outline-none"
        />
        <button
          type="submit"
          disabled={!text.trim()}
          className="bg-aurivian-blue hover:bg-aurivian-blue/80 disabled:opacity-30 text-white p-2 rounded-lg transition-colors"
        >
          <Send size={14} />
        </button>
      </form>
    </div>
  );
}
