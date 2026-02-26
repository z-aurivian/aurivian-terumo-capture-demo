import React, { useReducer, createContext, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import { Activity, PlusCircle, Trophy, Share2, Bot } from 'lucide-react';
import './App.css';
import { MOCK_INSIGHTS, MOCK_SOCIAL_POSTS, TEAM_MEMBERS, DAILY_SUMMARIES } from './data/demoData';
import CongressHeader from './components/CongressHeader';
import ActivityFeed from './ActivityFeed';
import InsightCapture from './InsightCapture';
import Leaderboard from './Leaderboard';
import SocialStream from './SocialStream';
import AuriChat from './AuriChat';

const AppContext = createContext();
export const useAppContext = () => useContext(AppContext);

function appReducer(state, action) {
  switch (action.type) {
    case 'ADD_INSIGHT': {
      const newInsight = {
        ...action.payload,
        id: `ins-new-${Date.now()}`,
        likes: [],
        comments: [],
        isHot: false,
        linkedSocialPosts: [],
      };
      const updatedMembers = state.teamMembers.map(m =>
        m.id === newInsight.authorId
          ? { ...m, totalInsights: m.totalInsights + 1, points: m.points + 10 }
          : m
      );
      return { ...state, insights: [newInsight, ...state.insights], teamMembers: updatedMembers };
    }
    case 'TOGGLE_LIKE': {
      const { insightId, userId } = action.payload;
      const insights = state.insights.map(ins => {
        if (ins.id !== insightId) return ins;
        const liked = ins.likes.includes(userId);
        return { ...ins, likes: liked ? ins.likes.filter(id => id !== userId) : [...ins.likes, userId] };
      });
      return { ...state, insights };
    }
    case 'ADD_COMMENT': {
      const { insightId, comment } = action.payload;
      const insights = state.insights.map(ins => {
        if (ins.id !== insightId) return ins;
        return { ...ins, comments: [...ins.comments, { ...comment, id: `c-new-${Date.now()}` }] };
      });
      const updatedMembers = state.teamMembers.map(m =>
        m.id === comment.authorId ? { ...m, points: m.points + 3 } : m
      );
      return { ...state, insights, teamMembers: updatedMembers };
    }
    case 'VOTE_HOT_INSIGHT': {
      const insights = state.insights.map(ins =>
        ins.id === action.payload.insightId ? { ...ins, isHot: true } : ins
      );
      return { ...state, insights };
    }
    case 'LINK_SOCIAL_POST': {
      const { insightId, socialPostId } = action.payload;
      const insights = state.insights.map(ins => {
        if (ins.id !== insightId) return ins;
        if (ins.linkedSocialPosts.includes(socialPostId)) return ins;
        return { ...ins, linkedSocialPosts: [...ins.linkedSocialPosts, socialPostId] };
      });
      return { ...state, insights };
    }
    case 'SET_FILTERS':
      return { ...state, filters: { ...state.filters, ...action.payload } };
    default:
      return state;
  }
}

const initialState = {
  insights: MOCK_INSIGHTS,
  socialPosts: MOCK_SOCIAL_POSTS,
  currentUser: TEAM_MEMBERS.find(m => m.isCurrentUser),
  teamMembers: TEAM_MEMBERS,
  dailySummaries: DAILY_SUMMARIES,
  filters: { kit: 'all', day: 'all', author: 'all', sentiment: 'all' },
};

const tabs = [
  { path: '/', label: 'Activity Feed', shortLabel: 'Feed', icon: Activity },
  { path: '/capture', label: 'Capture', shortLabel: 'Capture', icon: PlusCircle },
  { path: '/leaderboard', label: 'Leaderboard', shortLabel: 'Rank', icon: Trophy },
  { path: '/social', label: 'Social', shortLabel: 'Social', icon: Share2 },
  { path: '/auri', label: 'Auri', shortLabel: 'Auri', icon: Bot },
];

function App() {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <Router>
        <div className="App min-h-screen bg-aurivian-black text-aurivian-white">
          <CongressHeader insights={state.insights} />
          <nav className="bg-aurivian-dark-gray border-b border-aurivian-gray/20 sticky top-0 z-40">
            <div className="max-w-7xl mx-auto px-2 sm:px-4">
              <div className="flex justify-between sm:justify-start sm:space-x-1 overflow-x-auto scrollbar-hide">
                {tabs.map(tab => (
                  <NavLink
                    key={tab.path}
                    to={tab.path}
                    end={tab.path === '/'}
                    className={({ isActive }) =>
                      `flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-3 text-xs sm:text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                        isActive
                          ? 'border-aurivian-blue text-aurivian-blue'
                          : 'border-transparent text-aurivian-gray hover:text-aurivian-white hover:border-aurivian-gray/50'
                      }`
                    }
                  >
                    <tab.icon size={16} />
                    <span className="hidden sm:inline">{tab.label}</span>
                    <span className="sm:hidden">{tab.shortLabel}</span>
                  </NavLink>
                ))}
              </div>
            </div>
          </nav>
          <main className="max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-6">
            <Routes>
              <Route path="/" element={<ActivityFeed />} />
              <Route path="/capture" element={<InsightCapture />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/social" element={<SocialStream />} />
              <Route path="/auri" element={<AuriChat />} />
            </Routes>
          </main>
          <footer className="text-center py-4 text-aurivian-gray text-xs border-t border-aurivian-gray/20">
            Powered by <span className="font-['Michroma'] text-aurivian-blue">AURIVIAN</span> — Congress Intelligence Platform
          </footer>
        </div>
      </Router>
    </AppContext.Provider>
  );
}

export default App;
