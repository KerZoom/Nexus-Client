import { create } from 'zustand';
import type { Message, TypingUser } from '@/components/chat';

export interface MessageState {
  messages: Record<string, Message[]>; // channelId -> messages
  typingUsers: Record<string, TypingUser[]>; // channelId -> typing users
  isLoading: boolean;
  hasMoreHistory: Record<string, boolean>; // channelId -> has more
  error: string | null;
}

export interface MessageActions {
  // Message management
  setMessages: (channelId: string, messages: Message[]) => void;
  addMessage: (message: Message) => void;
  updateMessage: (messageId: string, updates: Partial<Message>) => void;
  deleteMessage: (messageId: string, channelId: string) => void;
  prependMessages: (channelId: string, messages: Message[]) => void; // For loading history

  // Typing indicators
  setTypingUsers: (channelId: string, users: TypingUser[]) => void;
  addTypingUser: (channelId: string, user: TypingUser) => void;
  removeTypingUser: (channelId: string, userId: string) => void;

  // Message actions
  startEditing: (messageId: string, channelId: string) => void;
  stopEditing: (messageId: string, channelId: string) => void;
  addReaction: (messageId: string, channelId: string, emoji: string, userId: string) => void;
  removeReaction: (messageId: string, channelId: string, emoji: string, userId: string) => void;

  // Utility
  setLoading: (loading: boolean) => void;
  setHasMoreHistory: (channelId: string, hasMore: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
  clearChannelMessages: (channelId: string) => void;
}

export type MessageStore = MessageState & MessageActions;

const initialState: MessageState = {
  messages: {},
  typingUsers: {},
  isLoading: false,
  hasMoreHistory: {},
  error: null,
};

export const useMessageStore = create<MessageStore>((set, get) => ({
  ...initialState,

  // Message management
  setMessages: (channelId: string, messages: Message[]) =>
    set((state) => ({
      messages: {
        ...state.messages,
        [channelId]: messages.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime()),
      },
    })),

  addMessage: (message: Message) =>
    set((state) => {
      const channelMessages = state.messages[message.channelId] || [];
      return {
        messages: {
          ...state.messages,
          [message.channelId]: [...channelMessages, message].sort(
            (a, b) => a.timestamp.getTime() - b.timestamp.getTime()
          ),
        },
      };
    }),

  updateMessage: (messageId: string, updates: Partial<Message>) =>
    set((state) => {
      const newMessages = { ...state.messages };
      Object.keys(newMessages).forEach((channelId) => {
        newMessages[channelId] = newMessages[channelId].map((msg) =>
          msg.id === messageId ? { ...msg, ...updates } : msg
        );
      });
      return { messages: newMessages };
    }),

  deleteMessage: (messageId: string, channelId: string) =>
    set((state) => ({
      messages: {
        ...state.messages,
        [channelId]: (state.messages[channelId] || []).filter((msg) => msg.id !== messageId),
      },
    })),

  prependMessages: (channelId: string, messages: Message[]) =>
    set((state) => {
      const existingMessages = state.messages[channelId] || [];
      const allMessages = [...messages, ...existingMessages];
      const uniqueMessages = allMessages.filter(
        (msg, index, arr) => arr.findIndex((m) => m.id === msg.id) === index
      );
      return {
        messages: {
          ...state.messages,
          [channelId]: uniqueMessages.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime()),
        },
      };
    }),

  // Typing indicators
  setTypingUsers: (channelId: string, users: TypingUser[]) =>
    set((state) => ({
      typingUsers: {
        ...state.typingUsers,
        [channelId]: users,
      },
    })),

  addTypingUser: (channelId: string, user: TypingUser) =>
    set((state) => {
      const currentUsers = state.typingUsers[channelId] || [];
      const filteredUsers = currentUsers.filter((u) => u.userId !== user.userId);
      return {
        typingUsers: {
          ...state.typingUsers,
          [channelId]: [...filteredUsers, user],
        },
      };
    }),

  removeTypingUser: (channelId: string, userId: string) =>
    set((state) => ({
      typingUsers: {
        ...state.typingUsers,
        [channelId]: (state.typingUsers[channelId] || []).filter((u) => u.userId !== userId),
      },
    })),

  // Message actions
  startEditing: (messageId: string, channelId: string) =>
    set((state) => ({
      messages: {
        ...state.messages,
        [channelId]: (state.messages[channelId] || []).map((msg) =>
          msg.id === messageId ? { ...msg, isEditing: true } : { ...msg, isEditing: false }
        ),
      },
    })),

  stopEditing: (messageId: string, channelId: string) =>
    set((state) => ({
      messages: {
        ...state.messages,
        [channelId]: (state.messages[channelId] || []).map((msg) =>
          msg.id === messageId ? { ...msg, isEditing: false } : msg
        ),
      },
    })),

  addReaction: (messageId: string, channelId: string, emoji: string, userId: string) =>
    set((state) => ({
      messages: {
        ...state.messages,
        [channelId]: (state.messages[channelId] || []).map((msg) => {
          if (msg.id !== messageId) return msg;

          const reactions = msg.reactions || [];
          const existingReaction = reactions.find((r) => r.emoji === emoji);

          if (existingReaction) {
            if (existingReaction.users.includes(userId)) return msg; // Already reacted
            return {
              ...msg,
              reactions: reactions.map((r) =>
                r.emoji === emoji
                  ? {
                      ...r,
                      count: r.count + 1,
                      users: [...r.users, userId],
                      hasUserReacted: true,
                    }
                  : r
              ),
            };
          } else {
            return {
              ...msg,
              reactions: [
                ...reactions,
                {
                  emoji,
                  count: 1,
                  users: [userId],
                  hasUserReacted: true,
                },
              ],
            };
          }
        }),
      },
    })),

  removeReaction: (messageId: string, channelId: string, emoji: string, userId: string) =>
    set((state) => ({
      messages: {
        ...state.messages,
        [channelId]: (state.messages[channelId] || []).map((msg) => {
          if (msg.id !== messageId) return msg;

          const reactions = (msg.reactions || [])
            .map((r) =>
              r.emoji === emoji
                ? {
                    ...r,
                    count: r.count - 1,
                    users: r.users.filter((id) => id !== userId),
                    hasUserReacted: false,
                  }
                : r
            )
            .filter((r) => r.count > 0);

          return { ...msg, reactions };
        }),
      },
    })),

  // Utility
  setLoading: (isLoading: boolean) => set({ isLoading }),

  setHasMoreHistory: (channelId: string, hasMore: boolean) =>
    set((state) => ({
      hasMoreHistory: {
        ...state.hasMoreHistory,
        [channelId]: hasMore,
      },
    })),

  setError: (error: string | null) => set({ error }),

  clearError: () => set({ error: null }),

  clearChannelMessages: (channelId: string) =>
    set((state) => {
      const newMessages = { ...state.messages };
      delete newMessages[channelId];
      return { messages: newMessages };
    }),
}));
