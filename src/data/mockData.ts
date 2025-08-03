import type { Server, Channel, ChannelCategory } from '@/components/server';
import type { Message, MessageAuthor } from '@/components/chat';

/**
 * Mock Matrix data for development and testing
 * Using realistic Matrix IDs and structure
 */

// Mock servers (Matrix Spaces) with realistic Matrix IDs
export const mockServers: Server[] = [
  {
    id: '!MatrixHQ:matrix.org',
    name: 'Matrix HQ',
    icon: 'mxc://matrix.org/GCmhgzMPRjqgpODLsNQzVuHZ',
    unreadCount: 3,
    hasUnread: true,
    isCurrentServer: true,
  },
  {
    id: '!DevTeam:matrix.org',
    name: 'Dev Team',
    icon: undefined, // Will show "D"
    unreadCount: 0,
    hasUnread: false,
    isCurrentServer: false,
  },
  {
    id: '!GamingHub:matrix.org',
    name: 'Gaming Hub',
    icon: 'mxc://matrix.org/XbXfGzMNOjqgpKDLsNQzVuHW',
    unreadCount: 12,
    hasUnread: true,
    isCurrentServer: false,
  },
  {
    id: '!TechTalks:example.com',
    name: 'Tech Talks',
    icon: undefined, // Will show "T"
    unreadCount: 0,
    hasUnread: false,
    isCurrentServer: false,
  },
  {
    id: '!OpenSource:matrix.org',
    name: 'Open Source',
    icon: 'mxc://matrix.org/YcYgHaNPSkrhqRQLtOSaWvIX',
    unreadCount: 1,
    hasUnread: true,
    isCurrentServer: false,
  },
];

// Mock channels for different servers (Matrix Rooms)
export const mockChannelData: Record<string, Channel[]> = {
  // Matrix HQ channels
  '!MatrixHQ:matrix.org': [
    {
      id: '!general:matrix.org',
      name: 'general',
      type: 'text',
      topic: 'General discussion about Matrix',
      unreadCount: 0,
      isCurrentChannel: true,
    },
    {
      id: '!development:matrix.org',
      name: 'development',
      type: 'text',
      topic: 'Development discussions and updates',
      unreadCount: 2,
      isCurrentChannel: false,
    },
    {
      id: '!announcements:matrix.org',
      name: 'announcements',
      type: 'text',
      topic: 'Official Matrix announcements',
      unreadCount: 1,
      isCurrentChannel: false,
    },
    {
      id: '!voice-general:matrix.org',
      name: 'General Voice',
      type: 'voice',
      unreadCount: 0,
      isCurrentChannel: false,
    },
  ],

  // Dev Team channels
  '!DevTeam:matrix.org': [
    {
      id: '!team-chat:matrix.org',
      name: 'team-chat',
      type: 'text',
      topic: 'Daily team discussions',
      unreadCount: 0,
      isCurrentChannel: false,
    },
    {
      id: '!code-review:matrix.org',
      name: 'code-review',
      type: 'text',
      topic: 'Code reviews and feedback',
      unreadCount: 0,
      isCurrentChannel: false,
    },
    {
      id: '!standup:matrix.org',
      name: 'standup',
      type: 'text',
      topic: 'Daily standup updates',
      unreadCount: 0,
      isCurrentChannel: false,
    },
  ],

  // Gaming Hub channels
  '!GamingHub:matrix.org': [
    {
      id: '!gaming-general:matrix.org',
      name: 'gaming-general',
      type: 'text',
      topic: 'General gaming discussions',
      unreadCount: 5,
      isCurrentChannel: false,
    },
    {
      id: '!minecraft:matrix.org',
      name: 'minecraft',
      type: 'text',
      topic: 'Minecraft server coordination',
      unreadCount: 3,
      isCurrentChannel: false,
    },
    {
      id: '!valorant:matrix.org',
      name: 'valorant',
      type: 'text',
      topic: 'Valorant team coordination',
      unreadCount: 4,
      isCurrentChannel: false,
    },
    {
      id: '!game-voice:matrix.org',
      name: 'Game Voice',
      type: 'voice',
      unreadCount: 0,
      isCurrentChannel: false,
    },
  ],

  // Tech Talks channels
  '!TechTalks:example.com': [
    {
      id: '!presentations:example.com',
      name: 'presentations',
      type: 'text',
      topic: 'Weekly tech presentations',
      unreadCount: 0,
      isCurrentChannel: false,
    },
    {
      id: '!discussion:example.com',
      name: 'discussion',
      type: 'text',
      topic: 'Post-talk discussions',
      unreadCount: 0,
      isCurrentChannel: false,
    },
  ],

  // Open Source channels
  '!OpenSource:matrix.org': [
    {
      id: '!projects:matrix.org',
      name: 'projects',
      type: 'text',
      topic: 'Open source project discussions',
      unreadCount: 1,
      isCurrentChannel: false,
    },
    {
      id: '!help:matrix.org',
      name: 'help',
      type: 'text',
      topic: 'Help with open source contributions',
      unreadCount: 0,
      isCurrentChannel: false,
    },
  ],
};

// Channel categories per server
export const mockChannelCategories: Record<string, ChannelCategory[]> = {
  '!MatrixHQ:matrix.org': [
    {
      id: 'text-channels-1',
      name: 'TEXT CHANNELS',
      collapsed: false,
      channels: mockChannelData['!MatrixHQ:matrix.org'].filter(c => c.type === 'text'),
    },
    {
      id: 'voice-channels-1',
      name: 'VOICE CHANNELS',
      collapsed: false,
      channels: mockChannelData['!MatrixHQ:matrix.org'].filter(c => c.type === 'voice'),
    },
  ],
  '!DevTeam:matrix.org': [
    {
      id: 'text-channels-2',
      name: 'DEVELOPMENT',
      collapsed: false,
      channels: mockChannelData['!DevTeam:matrix.org'],
    },
  ],
  '!GamingHub:matrix.org': [
    {
      id: 'text-channels-3',
      name: 'GAME CHANNELS',
      collapsed: false,
      channels: mockChannelData['!GamingHub:matrix.org'].filter(c => c.type === 'text'),
    },
    {
      id: 'voice-channels-3',
      name: 'VOICE CHANNELS',
      collapsed: false,
      channels: mockChannelData['!GamingHub:matrix.org'].filter(c => c.type === 'voice'),
    },
  ],
  '!TechTalks:example.com': [
    {
      id: 'text-channels-4',
      name: 'TALKS',
      collapsed: false,
      channels: mockChannelData['!TechTalks:example.com'],
    },
  ],
  '!OpenSource:matrix.org': [
    {
      id: 'text-channels-5',
      name: 'PROJECTS',
      collapsed: false,
      channels: mockChannelData['!OpenSource:matrix.org'],
    },
  ],
};

// Mock message authors
export const mockAuthors: MessageAuthor[] = [
  {
    id: '@alice:matrix.org',
    username: 'alice',
    displayName: 'Alice Cooper',
    avatar: 'mxc://matrix.org/AliceMockAvatarUri123',
  },
  {
    id: '@bob:matrix.org',
    username: 'bob',
    displayName: 'Bob Smith',
    avatar: undefined,
  },
  {
    id: '@charlie:matrix.org',
    username: 'charlie',
    displayName: 'Charlie Brown',
    avatar: 'mxc://matrix.org/CharlieMockAvatarUri456',
  },
];

// Mock messages per channel
export const mockMessagesData: Record<string, Message[]> = {
  '!general:matrix.org': [
    {
      id: '$msg1:matrix.org',
      content: 'Welcome to #general! This is the beginning of the Matrix HQ server.',
      author: mockAuthors[0],
      timestamp: new Date(Date.now() - 86400000),
      channelId: '!general:matrix.org',
      serverId: '!MatrixHQ:matrix.org',
      type: 'text',
    },
    {
      id: '$msg2:matrix.org',
      content: 'Hey everyone! Excited to be here 🎉',
      author: mockAuthors[1],
      timestamp: new Date(Date.now() - 3600000),
      channelId: '!general:matrix.org',
      serverId: '!MatrixHQ:matrix.org',
      type: 'text',
    },
    {
      id: '$msg3:matrix.org',
      content: 'Has anyone tried the new Matrix 2.0 features yet?',
      author: mockAuthors[2],
      timestamp: new Date(Date.now() - 1800000),
      channelId: '!general:matrix.org',
      serverId: '!MatrixHQ:matrix.org',
      type: 'text',
    },
  ],
  '!development:matrix.org': [
    {
      id: '$dev1:matrix.org',
      content: 'Working on the new federation improvements',
      author: mockAuthors[0],
      timestamp: new Date(Date.now() - 7200000),
      channelId: '!development:matrix.org',
      serverId: '!MatrixHQ:matrix.org',
      type: 'text',
    },
  ],
  '!gaming-general:matrix.org': [
    {
      id: '$game1:matrix.org',
      content: 'Anyone up for some Minecraft tonight?',
      author: mockAuthors[1],
      timestamp: new Date(Date.now() - 3600000),
      channelId: '!gaming-general:matrix.org',
      serverId: '!GamingHub:matrix.org',
      type: 'text',
    },
  ],
};

// Default homeserver for mxc:// URL resolution
export const mockHomeserver = 'matrix.org';

/**
 * Get channels for a specific server
 */
export function getChannelsForServer(serverId: string): Channel[] {
  return mockChannelData[serverId] || [];
}

/**
 * Get channel categories for a specific server
 */
export function getCategoriesForServer(serverId: string): ChannelCategory[] {
  return mockChannelCategories[serverId] || [];
}

/**
 * Get messages for a specific channel
 */
export function getMessagesForChannel(channelId: string): Message[] {
  return mockMessagesData[channelId] || [];
}

/**
 * Initialize the stores with mock data
 */
export function initializeMockData() {
  return {
    servers: mockServers,
    homeserver: mockHomeserver,
    getChannelsForServer,
    getCategoriesForServer,
    getMessagesForChannel,
  };
}
