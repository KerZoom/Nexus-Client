// Re-export all server components
export { ServerIcon } from './ServerIcon';

// Server and channel-related type definitions
export interface Server {
  id: string;
  name: string;
  icon?: string; // mxc:// URI
  unreadCount: number;
  hasUnread: boolean;
  isCurrentServer: boolean;
}

export interface Channel {
  id: string;
  name: string;
  type: 'text' | 'voice';
  topic?: string;
  unreadCount: number;
  isCurrentChannel: boolean;
}

export interface ChannelCategory {
  id: string;
  name: string;
  channels: Channel[];
  collapsed: boolean;
}
