import { create } from 'zustand';
import type { Server, Channel, ChannelCategory } from '@/components/server';

export interface ServerState {
  servers: Server[];
  currentServerId: string | null;
  currentChannelId: string | null;
  channels: Channel[];
  channelCategories: ChannelCategory[];
  isLoading: boolean;
  error: string | null;
}

export interface ServerActions {
  // Server actions
  setServers: (servers: Server[]) => void;
  addServer: (server: Server) => void;
  removeServer: (serverId: string) => void;
  setCurrentServer: (serverId: string) => void;
  updateServerUnreadCount: (serverId: string, count: number) => void;

  // Channel actions
  setChannels: (channels: Channel[]) => void;
  setChannelCategories: (categories: ChannelCategory[]) => void;
  setCurrentChannel: (channelId: string) => void;
  updateChannelUnreadCount: (channelId: string, count: number) => void;
  toggleCategoryCollapsed: (categoryId: string) => void;

  // Utility actions
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
}

export type ServerStore = ServerState & ServerActions;

const initialState: ServerState = {
  servers: [],
  currentServerId: null,
  currentChannelId: null,
  channels: [],
  channelCategories: [],
  isLoading: false,
  error: null,
};

export const useServerStore = create<ServerStore>((set) => ({
  ...initialState,

  // Server actions
  setServers: (servers: Server[]) => set({ servers }),

  addServer: (server: Server) =>
    set((state) => ({
      servers: [...state.servers, server],
    })),

  removeServer: (serverId: string) =>
    set((state) => ({
      servers: state.servers.filter((s) => s.id !== serverId),
      currentServerId: state.currentServerId === serverId ? null : state.currentServerId,
    })),

  setCurrentServer: (serverId: string) =>
    set((state) => ({
      currentServerId: serverId,
      currentChannelId: null, // Reset channel when switching servers
      servers: state.servers.map((s) => ({
        ...s,
        isCurrentServer: s.id === serverId,
      })),
    })),

  updateServerUnreadCount: (serverId: string, count: number) =>
    set((state) => ({
      servers: state.servers.map((s) =>
        s.id === serverId
          ? { ...s, unreadCount: count, hasUnread: count > 0 }
          : s
      ),
    })),

  // Channel actions
  setChannels: (channels: Channel[]) => set({ channels }),

  setChannelCategories: (channelCategories: ChannelCategory[]) =>
    set({ channelCategories }),

  setCurrentChannel: (channelId: string) =>
    set((state) => ({
      currentChannelId: channelId,
      channels: state.channels.map((c) => ({
        ...c,
        isCurrentChannel: c.id === channelId,
      })),
      channelCategories: state.channelCategories.map((category) => ({
        ...category,
        channels: category.channels.map((c) => ({
          ...c,
          isCurrentChannel: c.id === channelId,
        })),
      })),
    })),

  updateChannelUnreadCount: (channelId: string, count: number) =>
    set((state) => ({
      channels: state.channels.map((c) =>
        c.id === channelId ? { ...c, unreadCount: count } : c
      ),
      channelCategories: state.channelCategories.map((category) => ({
        ...category,
        channels: category.channels.map((c) =>
          c.id === channelId ? { ...c, unreadCount: count } : c
        ),
      })),
    })),

  toggleCategoryCollapsed: (categoryId: string) =>
    set((state) => ({
      channelCategories: state.channelCategories.map((category) =>
        category.id === categoryId
          ? { ...category, collapsed: !category.collapsed }
          : category
      ),
    })),

  // Utility actions
  setLoading: (isLoading: boolean) => set({ isLoading }),

  setError: (error: string | null) => set({ error }),

  clearError: () => set({ error: null }),
}));
