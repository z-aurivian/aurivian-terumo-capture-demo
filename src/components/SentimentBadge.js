import React from 'react';
import { SENTIMENTS } from '../data/demoData';

export default function SentimentBadge({ sentiment }) {
  const s = SENTIMENTS.find(x => x.id === sentiment);
  if (!s) return null;

  return (
    <span className="flex items-center gap-1 text-xs">
      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: s.color }} />
      <span style={{ color: s.color }}>{s.label}</span>
    </span>
  );
}
