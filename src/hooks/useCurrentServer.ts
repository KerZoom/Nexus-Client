import { useServerStore } from '@/stores';

/**
 * Hook to get the currently selected server
 */
export const useCurrentServer = () => {
  const { servers, currentServerId } = useServerStore();
  return servers.find(s => s.id === currentServerId) || null;
};
