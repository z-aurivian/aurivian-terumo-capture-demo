import React, { useState, useMemo } from 'react';
import { MapPin, Calendar, Zap, MessageSquare, Users, Flame } from 'lucide-react';
import { CONGRESS_CONFIG } from '../data/demoData';
import DailySummaryModal from './DailySummaryModal';
import { useAppContext } from '../App';

export default function CongressHeader({ insights }) {
  const { state } = useAppContext();
  const [showSummary, setShowSummary] = useState(false);

  const stats = useMemo(() => {
    const totalInsights = insights.length;
    const todayInsights = insights.filter(i => i.day === CONGRESS_CONFIG.currentDay).length;
    const totalComments = insights.reduce((sum, i) => sum + i.comments.length, 0);
    const hotInsights = insights.filter(i => i.isHot).length;
    return { totalInsights, todayInsights, totalComments, hotInsights };
  }, [insights]);

  return (
    <>
      <header className="bg-gradient-to-r from-aurivian-dark-gray via-aurivian-black to-aurivian-dark-gray border-b border-aurivian-blue/30">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-3 sm:gap-4">
              <div>
                <h1 className="font-['Michroma'] text-sm sm:text-lg text-aurivian-blue tracking-wider">
                  {CONGRESS_CONFIG.name}
                </h1>
                <div className="flex items-center gap-2 sm:gap-3 text-aurivian-gray text-[10px] sm:text-xs mt-1">
                  <span className="flex items-center gap-1"><MapPin size={12} /> {CONGRESS_CONFIG.location}</span>
                  <span className="flex items-center gap-1 hidden sm:flex"><Calendar size={12} /> Sept 13-17, 2025</span>
                </div>
              </div>
              <div className="bg-aurivian-blue/20 border border-aurivian-blue/40 rounded-lg px-2 sm:px-3 py-1 sm:py-1.5">
                <span className="text-aurivian-blue font-bold text-xs sm:text-sm">
                  Day {CONGRESS_CONFIG.currentDay}/{CONGRESS_CONFIG.totalDays}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="flex items-center gap-3 sm:gap-5 text-[10px] sm:text-xs">
                <div className="flex items-center gap-1">
                  <Zap size={14} className="text-aurivian-blue" />
                  <span className="text-aurivian-white font-bold">{stats.totalInsights}</span>
                  <span className="text-aurivian-gray hidden sm:inline">insights</span>
                </div>
                <div className="flex items-center gap-1 hidden sm:flex">
                  <MessageSquare size={14} className="text-aurivian-purple" />
                  <span className="text-aurivian-white font-bold">{stats.totalComments}</span>
                  <span className="text-aurivian-gray">comments</span>
                </div>
                <div className="flex items-center gap-1">
                  <Flame size={14} className="text-orange-500" />
                  <span className="text-aurivian-white font-bold">{stats.hotInsights}</span>
                  <span className="text-aurivian-gray hidden sm:inline">hot</span>
                </div>
                <div className="flex items-center gap-1 hidden md:flex">
                  <Users size={14} className="text-aurivian-cyan" />
                  <span className="text-aurivian-white font-bold">{state.teamMembers.length}</span>
                  <span className="text-aurivian-gray">team</span>
                </div>
              </div>
              <button
                onClick={() => setShowSummary(true)}
                className="bg-aurivian-blue/20 hover:bg-aurivian-blue/30 text-aurivian-blue text-[10px] sm:text-xs px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg border border-aurivian-blue/40 transition-colors whitespace-nowrap"
              >
                Daily Brief
              </button>
            </div>
          </div>
        </div>
      </header>
      {showSummary && (
        <DailySummaryModal
          summary={state.dailySummaries.find(s => s.day === CONGRESS_CONFIG.currentDay)}
          onClose={() => setShowSummary(false)}
        />
      )}
    </>
  );
}
