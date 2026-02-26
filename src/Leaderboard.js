import React, { useMemo } from 'react';
import { Trophy, Flame, TrendingUp, Zap } from 'lucide-react';
import { useAppContext } from './App';
import { KITS, CONGRESS_CONFIG, TEAM_MEMBERS } from './data/demoData';
import UserAvatar from './components/UserAvatar';
import KitBadge from './components/KitBadge';

export default function Leaderboard() {
  const { state } = useAppContext();

  const rankings = useMemo(() => {
    return [...state.teamMembers]
      .map(m => {
        const memberInsights = state.insights.filter(i => i.authorId === m.id);
        const likesReceived = memberInsights.reduce((sum, i) => sum + i.likes.length, 0);
        const hotCount = memberInsights.filter(i => i.isHot).length;
        const points = (memberInsights.length * 10) + (likesReceived * 2) + (hotCount * 25) + (m.streak * 15);
        return { ...m, dynamicPoints: points, insightCount: memberInsights.length, likesReceived, hotCount };
      })
      .sort((a, b) => b.dynamicPoints - a.dynamicPoints);
  }, [state.teamMembers, state.insights]);

  const kitHeatmap = useMemo(() => {
    return KITS.map(kit => {
      const count = state.insights.filter(i => i.kitId === kit.id).length;
      const level = count >= 5 ? 'high' : count >= 2 ? 'mid' : 'low';
      return { ...kit, count, level };
    });
  }, [state.insights]);

  const hotInsights = state.insights.filter(i => i.isHot).slice(0, 3);

  const medalColors = ['text-yellow-400', 'text-gray-300', 'text-amber-600'];

  return (
    <div className="space-y-8">
      <h2 className="text-aurivian-white text-lg font-['Michroma']">Team Leaderboard</h2>

      {/* Rankings */}
      <div className="bg-aurivian-dark-gray rounded-xl border border-aurivian-gray/20 overflow-hidden">
        {/* Desktop header - hidden on mobile */}
        <div className="hidden md:grid grid-cols-[auto_1fr_auto_auto_auto_auto_auto] gap-4 px-4 py-2 text-[10px] text-aurivian-gray uppercase tracking-wider border-b border-aurivian-gray/20">
          <span>#</span>
          <span>Team Member</span>
          <span>Insights</span>
          <span>Likes</span>
          <span>Hot</span>
          <span>Streak</span>
          <span>Points</span>
        </div>
        {rankings.map((member, i) => (
          <div
            key={member.id}
            className={`border-b border-aurivian-gray/10 ${member.isCurrentUser ? 'bg-aurivian-blue/5' : ''}`}
          >
            {/* Desktop row */}
            <div className="hidden md:grid grid-cols-[auto_1fr_auto_auto_auto_auto_auto] gap-4 px-4 py-3 items-center">
              <span className={`text-sm font-bold w-6 text-center ${medalColors[i] || 'text-aurivian-gray'}`}>
                {i < 3 ? <Trophy size={16} /> : i + 1}
              </span>
              <div className="flex items-center gap-2">
                <UserAvatar userId={member.id} size="sm" />
                <div>
                  <span className="text-aurivian-white text-sm">{member.name}</span>
                  {member.isCurrentUser && <span className="text-aurivian-blue text-[10px] ml-1">(You)</span>}
                  <span className="text-aurivian-gray text-xs block">{member.role}</span>
                </div>
              </div>
              <span className="text-aurivian-white text-sm text-center">{member.insightCount}</span>
              <span className="text-aurivian-white text-sm text-center">{member.likesReceived}</span>
              <span className="text-orange-500 text-sm text-center">{member.hotCount}</span>
              <span className="flex items-center gap-0.5 justify-center">
                {member.streak > 0 ? (
                  <>
                    <Flame size={14} className="text-orange-500" fill="currentColor" />
                    <span className="text-orange-500 text-sm font-bold">{member.streak}</span>
                  </>
                ) : (
                  <span className="text-aurivian-gray text-sm">—</span>
                )}
              </span>
              <span className="text-aurivian-blue text-sm font-bold text-center">{member.dynamicPoints}</span>
            </div>
            {/* Mobile card */}
            <div className="md:hidden px-4 py-3 flex items-center gap-3">
              <span className={`text-sm font-bold w-5 text-center flex-shrink-0 ${medalColors[i] || 'text-aurivian-gray'}`}>
                {i < 3 ? <Trophy size={14} /> : i + 1}
              </span>
              <UserAvatar userId={member.id} size="sm" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1">
                  <span className="text-aurivian-white text-sm truncate">{member.name}</span>
                  {member.isCurrentUser && <span className="text-aurivian-blue text-[10px]">(You)</span>}
                </div>
                <div className="flex items-center gap-3 text-[10px] text-aurivian-gray mt-0.5">
                  <span>{member.insightCount} insights</span>
                  <span>{member.likesReceived} likes</span>
                  {member.streak > 0 && (
                    <span className="flex items-center gap-0.5 text-orange-500">
                      <Flame size={10} fill="currentColor" />{member.streak}
                    </span>
                  )}
                </div>
              </div>
              <span className="text-aurivian-blue text-sm font-bold">{member.dynamicPoints}pts</span>
            </div>
          </div>
        ))}
      </div>

      {/* KIT Coverage Heatmap */}
      <div>
        <h3 className="text-aurivian-white text-sm font-medium mb-3 flex items-center gap-2">
          <TrendingUp size={16} className="text-aurivian-cyan" /> KIT Coverage Heatmap
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {kitHeatmap.map(kit => (
            <div
              key={kit.id}
              className={`rounded-lg p-3 border text-center ${
                kit.level === 'high'
                  ? 'bg-green-500/15 border-green-500/40'
                  : kit.level === 'mid'
                  ? 'bg-yellow-500/15 border-yellow-500/40'
                  : 'bg-red-500/15 border-red-500/40'
              }`}
            >
              <KitBadge kitId={kit.id} size="sm" />
              <div className={`text-lg font-bold mt-1 ${
                kit.level === 'high' ? 'text-green-400' : kit.level === 'mid' ? 'text-yellow-400' : 'text-red-400'
              }`}>
                {kit.count}
              </div>
              <div className="text-[10px] text-aurivian-gray">{kit.name}</div>
            </div>
          ))}
        </div>
        <div className="flex gap-4 mt-2 text-[10px] text-aurivian-gray justify-center">
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-500" /> 5+ insights</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-yellow-500" /> 2-4 insights</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500" /> 0-1 insights</span>
        </div>
      </div>

      {/* Hot Insight Showcase */}
      {hotInsights.length > 0 && (
        <div>
          <h3 className="text-aurivian-white text-sm font-medium mb-3 flex items-center gap-2">
            <Flame size={16} className="text-orange-500" fill="currentColor" /> Hot Insight Showcase
          </h3>
          <div className="space-y-3">
            {hotInsights.map(ins => {
              const author = TEAM_MEMBERS.find(m => m.id === ins.authorId);
              return (
                <div key={ins.id} className="bg-aurivian-dark-gray rounded-xl p-4 border border-orange-500/30">
                  <div className="flex items-center gap-2 mb-2">
                    <UserAvatar userId={ins.authorId} size="sm" />
                    <span className="text-aurivian-white text-sm">{author?.name}</span>
                    <KitBadge kitId={ins.kitId} size="sm" />
                    <Flame size={12} className="text-orange-500" fill="currentColor" />
                  </div>
                  <p className="text-aurivian-light-gray text-sm line-clamp-2">{ins.narrative}</p>
                  <div className="flex items-center gap-3 mt-2 text-xs text-aurivian-gray">
                    <span>{ins.likes.length} likes</span>
                    <span>{ins.comments.length} comments</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
