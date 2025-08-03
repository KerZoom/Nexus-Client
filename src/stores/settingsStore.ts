import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Theme {
  name: string;
  colors: Record<string, string>;
  images?: Record<string, string>;
  fonts?: Record<string, string>;
}

export interface NotificationSettings {
  enabled: boolean;
  playSound: boolean;
  showBadge: boolean;
  muteChannels: string[]; // Channel IDs
  muteServers: string[]; // Server IDs
}

export interface AppearanceSettings {
  theme: string;
  customTheme?: Theme;
  fontSize: 'small' | 'medium' | 'large';
  messageGrouping: boolean;
  showTimestamps: boolean;
  compactMode: boolean;
  animationsEnabled: boolean;
}

export interface PrivacySettings {
  showOnlineStatus: boolean;
  allowDirectMessages: 'everyone' | 'friends' | 'none';
  shareReadReceipts: boolean;
  shareTypingIndicators: boolean;
}

export interface SettingsState {
  appearance: AppearanceSettings;
  notifications: NotificationSettings;
  privacy: PrivacySettings;
  language: string;
  version: string;
}

export interface SettingsActions {
  // Appearance
  setTheme: (theme: string) => void;
  setCustomTheme: (theme: Theme) => void;
  setFontSize: (size: 'small' | 'medium' | 'large') => void;
  setMessageGrouping: (enabled: boolean) => void;
  setShowTimestamps: (enabled: boolean) => void;
  setCompactMode: (enabled: boolean) => void;
  setAnimationsEnabled: (enabled: boolean) => void;

  // Notifications
  setNotificationsEnabled: (enabled: boolean) => void;
  setPlaySound: (enabled: boolean) => void;
  setShowBadge: (enabled: boolean) => void;
  muteChannel: (channelId: string) => void;
  unmuteChannel: (channelId: string) => void;
  muteServer: (serverId: string) => void;
  unmuteServer: (serverId: string) => void;

  // Privacy
  setShowOnlineStatus: (show: boolean) => void;
  setAllowDirectMessages: (setting: 'everyone' | 'friends' | 'none') => void;
  setShareReadReceipts: (share: boolean) => void;
  setShareTypingIndicators: (share: boolean) => void;

  // General
  setLanguage: (language: string) => void;
  resetToDefaults: () => void;
}

export type SettingsStore = SettingsState & SettingsActions;

const defaultSettings: SettingsState = {
  appearance: {
    theme: 'dark',
    fontSize: 'medium',
    messageGrouping: true,
    showTimestamps: true,
    compactMode: false,
    animationsEnabled: true,
  },
  notifications: {
    enabled: true,
    playSound: true,
    showBadge: true,
    muteChannels: [],
    muteServers: [],
  },
  privacy: {
    showOnlineStatus: true,
    allowDirectMessages: 'friends',
    shareReadReceipts: true,
    shareTypingIndicators: true,
  },
  language: 'en',
  version: '1.0.0',
};

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set) => ({
      ...defaultSettings,

      // Appearance
      setTheme: (theme: string) =>
        set((state) => ({
          appearance: { ...state.appearance, theme },
        })),

      setCustomTheme: (customTheme: Theme) =>
        set((state) => ({
          appearance: { ...state.appearance, customTheme },
        })),

      setFontSize: (fontSize: 'small' | 'medium' | 'large') =>
        set((state) => ({
          appearance: { ...state.appearance, fontSize },
        })),

      setMessageGrouping: (messageGrouping: boolean) =>
        set((state) => ({
          appearance: { ...state.appearance, messageGrouping },
        })),

      setShowTimestamps: (showTimestamps: boolean) =>
        set((state) => ({
          appearance: { ...state.appearance, showTimestamps },
        })),

      setCompactMode: (compactMode: boolean) =>
        set((state) => ({
          appearance: { ...state.appearance, compactMode },
        })),

      setAnimationsEnabled: (animationsEnabled: boolean) =>
        set((state) => ({
          appearance: { ...state.appearance, animationsEnabled },
        })),

      // Notifications
      setNotificationsEnabled: (enabled: boolean) =>
        set((state) => ({
          notifications: { ...state.notifications, enabled },
        })),

      setPlaySound: (playSound: boolean) =>
        set((state) => ({
          notifications: { ...state.notifications, playSound },
        })),

      setShowBadge: (showBadge: boolean) =>
        set((state) => ({
          notifications: { ...state.notifications, showBadge },
        })),

      muteChannel: (channelId: string) =>
        set((state) => ({
          notifications: {
            ...state.notifications,
            muteChannels: [...state.notifications.muteChannels, channelId],
          },
        })),

      unmuteChannel: (channelId: string) =>
        set((state) => ({
          notifications: {
            ...state.notifications,
            muteChannels: state.notifications.muteChannels.filter((id) => id !== channelId),
          },
        })),

      muteServer: (serverId: string) =>
        set((state) => ({
          notifications: {
            ...state.notifications,
            muteServers: [...state.notifications.muteServers, serverId],
          },
        })),

      unmuteServer: (serverId: string) =>
        set((state) => ({
          notifications: {
            ...state.notifications,
            muteServers: state.notifications.muteServers.filter((id) => id !== serverId),
          },
        })),

      // Privacy
      setShowOnlineStatus: (showOnlineStatus: boolean) =>
        set((state) => ({
          privacy: { ...state.privacy, showOnlineStatus },
        })),

      setAllowDirectMessages: (allowDirectMessages: 'everyone' | 'friends' | 'none') =>
        set((state) => ({
          privacy: { ...state.privacy, allowDirectMessages },
        })),

      setShareReadReceipts: (shareReadReceipts: boolean) =>
        set((state) => ({
          privacy: { ...state.privacy, shareReadReceipts },
        })),

      setShareTypingIndicators: (shareTypingIndicators: boolean) =>
        set((state) => ({
          privacy: { ...state.privacy, shareTypingIndicators },
        })),

      // General
      setLanguage: (language: string) => set({ language }),

      resetToDefaults: () => set(defaultSettings),
    }),
    {
      name: 'nexus-settings',
      version: 1,
    }
  )
);
