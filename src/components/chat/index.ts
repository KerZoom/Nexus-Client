// Re-export all chat components
export { ChatArea } from './ChatArea';
export { MessageInput } from './MessageInput';
// TODO: Add these components later
// export { MessageList } from './MessageList';
// export { MessageItem } from './MessageItem';
// export { TypingIndicator } from './TypingIndicator';

// Chat and message-related type definitions
export interface MessageAuthor {
  id: string;
  username: string;
  displayName: string;
  avatar?: string; // mxc:// URI
}

export interface MessageReaction {
  emoji: string;
  count: number;
  users: string[]; // User IDs who reacted
  hasUserReacted: boolean;
}

export interface Message {
  id: string;
  content: string;
  author: MessageAuthor;
  timestamp: Date;
  editedTimestamp?: Date;
  channelId: string;
  serverId: string;
  type: 'text' | 'image' | 'file' | 'system';
  reactions?: MessageReaction[];
  replyTo?: string; // Message ID this is replying to
  isEditing?: boolean;
}

export interface TypingUser {
  userId: string;
  username: string;
  timestamp: Date;
}
