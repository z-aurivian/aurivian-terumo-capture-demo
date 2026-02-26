import React from 'react';
import { Heart } from 'lucide-react';
import { useAppContext } from '../App';

export default function LikeButton({ insightId, likes }) {
  const { state, dispatch } = useAppContext();
  const isLiked = likes.includes(state.currentUser.id);

  return (
    <button
      onClick={() => dispatch({ type: 'TOGGLE_LIKE', payload: { insightId, userId: state.currentUser.id } })}
      className={`flex items-center gap-1 text-xs transition-colors ${
        isLiked ? 'text-aurivian-red' : 'text-aurivian-gray hover:text-aurivian-red'
      }`}
    >
      <Heart size={14} fill={isLiked ? 'currentColor' : 'none'} />
      {likes.length > 0 && <span>{likes.length}</span>}
    </button>
  );
}
