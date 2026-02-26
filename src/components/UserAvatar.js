import React from 'react';
import { TEAM_MEMBERS } from '../data/demoData';

export default function UserAvatar({ userId, size = 'md' }) {
  const user = TEAM_MEMBERS.find(m => m.id === userId);
  if (!user) return null;

  const sizes = { sm: 'w-6 h-6 text-[10px]', md: 'w-8 h-8 text-xs', lg: 'w-10 h-10 text-sm' };

  return (
    <div
      className={`${sizes[size]} rounded-full flex items-center justify-center font-bold text-white flex-shrink-0`}
      style={{ backgroundColor: user.color }}
      title={`${user.name} — ${user.role}`}
    >
      {user.initials}
    </div>
  );
}
