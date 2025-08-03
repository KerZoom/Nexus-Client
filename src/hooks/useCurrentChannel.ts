import { useServerStore } from '@/stores';

/**
 * Hook to get the currently selected channel
 */
export const useCurrentChannel = () => {
  const { channels, currentChannelId } = useServerStore();
  return channels.find(c => c.id === currentChannelId) || null;
};
