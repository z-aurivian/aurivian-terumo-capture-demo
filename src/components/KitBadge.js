import React from 'react';
import { KITS } from '../data/demoData';

export default function KitBadge({ kitId, size = 'md' }) {
  const kit = KITS.find(k => k.id === kitId);
  if (!kit) return null;

  const sizes = { sm: 'text-[10px] px-1.5 py-0.5', md: 'text-xs px-2 py-0.5' };

  return (
    <span
      className={`${sizes[size]} rounded-full font-medium inline-flex items-center`}
      style={{ backgroundColor: kit.color + '20', color: kit.color, border: `1px solid ${kit.color}40` }}
    >
      {kit.shortName}
    </span>
  );
}
