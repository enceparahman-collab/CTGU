
import { TeamMember, Memory, NewsItem, GuestMessage } from '../types';
import { TEAM_MEMBERS, MEMORIES, NEWS_ITEMS } from '../constants';

const KEYS = {
  TEAM: 'x450_db_team',
  MEMORIES: 'x450_db_memories',
  NEWS: 'x450_db_news',
  GUESTBOOK: 'x450_db_guestbook'
};

export const StorageService = {
  // Team Database
  getTeam: (): TeamMember[] => {
    const data = localStorage.getItem(KEYS.TEAM);
    return data ? JSON.parse(data) : TEAM_MEMBERS;
  },
  saveTeam: (data: TeamMember[]) => {
    localStorage.setItem(KEYS.TEAM, JSON.stringify(data));
  },

  // Memories Database
  getMemories: (): Memory[] => {
    const data = localStorage.getItem(KEYS.MEMORIES);
    return data ? JSON.parse(data) : MEMORIES;
  },
  saveMemories: (data: Memory[]) => {
    localStorage.setItem(KEYS.MEMORIES, JSON.stringify(data));
  },

  // News Database
  getNews: (): NewsItem[] => {
    const data = localStorage.getItem(KEYS.NEWS);
    return data ? JSON.parse(data) : NEWS_ITEMS;
  },
  saveNews: (data: NewsItem[]) => {
    localStorage.setItem(KEYS.NEWS, JSON.stringify(data));
  },

  // Guestbook Database
  getMessages: (): GuestMessage[] => {
    const data = localStorage.getItem(KEYS.GUESTBOOK);
    return data ? JSON.parse(data) : [];
  },
  saveMessages: (data: GuestMessage[]) => {
    localStorage.setItem(KEYS.GUESTBOOK, JSON.stringify(data));
  },

  // Global Reset
  clearAll: () => {
    Object.values(KEYS).forEach(key => localStorage.removeItem(key));
  }
};
