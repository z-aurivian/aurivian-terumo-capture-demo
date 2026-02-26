import React from 'react';
import { KITS, TEAM_MEMBERS, SENTIMENTS, CONGRESS_CONFIG } from '../data/demoData';
import { useAppContext } from '../App';

export default function FilterBar() {
  const { state, dispatch } = useAppContext();
  const { filters } = state;

  const setFilter = (key, value) => dispatch({ type: 'SET_FILTERS', payload: { [key]: value } });

  const selectClass = 'bg-aurivian-dark-gray border border-aurivian-gray/30 text-aurivian-white text-xs rounded-lg px-2 py-1.5 focus:border-aurivian-blue focus:outline-none';

  return (
    <div className="flex flex-wrap gap-2 items-center">
      <span className="text-aurivian-gray text-xs">Filter:</span>
      <select value={filters.kit} onChange={e => setFilter('kit', e.target.value)} className={selectClass}>
        <option value="all">All KITs</option>
        {KITS.map(k => <option key={k.id} value={k.id}>{k.shortName} — {k.name}</option>)}
      </select>
      <select value={filters.day} onChange={e => setFilter('day', e.target.value)} className={selectClass}>
        <option value="all">All Days</option>
        {Array.from({ length: CONGRESS_CONFIG.totalDays }, (_, i) => (
          <option key={i + 1} value={String(i + 1)}>Day {i + 1}</option>
        ))}
      </select>
      <select value={filters.author} onChange={e => setFilter('author', e.target.value)} className={selectClass}>
        <option value="all">All Authors</option>
        {TEAM_MEMBERS.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
      </select>
      <select value={filters.sentiment} onChange={e => setFilter('sentiment', e.target.value)} className={selectClass}>
        <option value="all">All Sentiments</option>
        {SENTIMENTS.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}
      </select>
      {(filters.kit !== 'all' || filters.day !== 'all' || filters.author !== 'all' || filters.sentiment !== 'all') && (
        <button
          onClick={() => dispatch({ type: 'SET_FILTERS', payload: { kit: 'all', day: 'all', author: 'all', sentiment: 'all' } })}
          className="text-aurivian-blue text-xs hover:underline"
        >
          Clear all
        </button>
      )}
    </div>
  );
}
