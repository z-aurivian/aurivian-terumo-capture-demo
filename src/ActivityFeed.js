import React, { useMemo } from 'react';
import { Flame, Zap, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from './App';
import { CONGRESS_CONFIG, KITS } from './data/demoData';
import InsightCard from './components/InsightCard';
import FilterBar from './components/FilterBar';

export default function ActivityFeed() {
  const { state } = useAppContext();
  const navigate = useNavigate();
  const { insights, filters } = state;

  const filtered = useMemo(() => {
    return insights.filter(ins => {
      if (filters.kit !== 'all' && ins.kitId !== filters.kit) return false;
      if (filters.day !== 'all' && ins.day !== Number(filters.day)) return false;
      if (filters.author !== 'all' && ins.authorId !== filters.author) return false;
      if (filters.sentiment !== 'all' && ins.sentiment !== filters.sentiment) return false;
      return true;
    }).sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  }, [insights, filters]);

  const hotInsights = insights.filter(i => i.isHot && i.day === CONGRESS_CONFIG.currentDay);
  const todayCount = insights.filter(i => i.day === CONGRESS_CONFIG.currentDay).length;

  const kitCoverage = useMemo(() => {
    return KITS.map(kit => ({
      ...kit,
      count: insights.filter(i => i.kitId === kit.id && i.day === CONGRESS_CONFIG.currentDay).length,
    }));
  }, [insights]);

  return (
    <div className="space-y-6">
      {/* Stats bar */}
      <div className="flex items-center gap-6 flex-wrap">
        <div className="flex items-center gap-2">
          <Zap size={16} className="text-aurivian-blue" />
          <span className="text-aurivian-white text-sm font-bold">{todayCount}</span>
          <span className="text-aurivian-gray text-sm">insights today</span>
        </div>
        <div className="flex items-center gap-2">
          <Flame size={16} className="text-orange-500" />
          <span className="text-aurivian-white text-sm font-bold">{hotInsights.length}</span>
          <span className="text-aurivian-gray text-sm">hot insights</span>
        </div>
        <div className="flex items-center gap-2">
          <TrendingUp size={16} className="text-aurivian-cyan" />
          <span className="text-aurivian-white text-sm font-bold">{filtered.length}</span>
          <span className="text-aurivian-gray text-sm">showing</span>
        </div>
      </div>

      {/* KIT coverage mini-bar */}
      <div className="flex gap-1">
        {kitCoverage.map(kit => (
          <div
            key={kit.id}
            className="flex-1 h-1.5 rounded-full"
            style={{
              backgroundColor: kit.count >= 3 ? kit.color : kit.count >= 1 ? kit.color + '60' : '#2D2C2C',
            }}
            title={`${kit.shortName}: ${kit.count} insights today`}
          />
        ))}
      </div>

      {/* Hot insight spotlight */}
      {hotInsights.length > 0 && (
        <div className="bg-gradient-to-r from-orange-500/10 to-aurivian-dark-gray rounded-xl p-4 border border-orange-500/30">
          <div className="flex items-center gap-2 mb-3">
            <Flame size={16} className="text-orange-500" fill="currentColor" />
            <span className="text-orange-500 font-medium text-sm">Hot Insights Today</span>
          </div>
          <div className="space-y-2">
            {hotInsights.slice(0, 2).map(ins => (
              <InsightCard key={ins.id} insight={ins} />
            ))}
          </div>
        </div>
      )}

      <FilterBar />

      {/* Insight feed */}
      <div className="space-y-3">
        {filtered.map(ins => (
          <InsightCard key={ins.id} insight={ins} />
        ))}
        {filtered.length === 0 && (
          <div className="text-center py-12 text-aurivian-gray">
            <p>No insights match your filters.</p>
          </div>
        )}
      </div>

      {/* Floating capture button */}
      <button
        onClick={() => navigate('/capture')}
        className="fixed bottom-6 right-6 bg-aurivian-blue hover:bg-aurivian-blue/80 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg shadow-aurivian-blue/30 transition-colors z-30"
      >
        <Zap size={24} />
      </button>
    </div>
  );
}
