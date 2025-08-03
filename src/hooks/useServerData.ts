import { useEffect } from 'react';
import { useServerStore } from '@/stores';
import { mockServers, getChannelsForServer, getCategoriesForServer } from '@/data/mockData';

/**
 * Hook to manage server data initialization and switching
 */
export const useServerData = () => {
  const { 
    servers, 
    currentServerId, 
    setServers, 
    setCurrentServer,
    setChannels,
    setChannelCategories,
    setCurrentChannel,
  } = useServerStore();

  // Initialize with mock data on mount
  useEffect(() => {
    if (servers.length === 0) {
      setServers(mockServers);
      // Set the first server as current if none is selected
      if (!currentServerId && mockServers.length > 0) {
        const firstServerId = mockServers[0].id;
        setCurrentServer(firstServerId);
        // Load channels for the first server
        const serverChannels = getChannelsForServer(firstServerId);
        const serverCategories = getCategoriesForServer(firstServerId);
        setChannels(serverChannels);
        setChannelCategories(serverCategories);
        // Set first channel as current
        if (serverChannels.length > 0) {
          setCurrentChannel(serverChannels[0].id);
        }
      }
    }
  }, [servers.length, setServers, currentServerId, setCurrentServer, setChannels, setChannelCategories, setCurrentChannel]);

  // Handler for switching servers
  const switchToServer = (serverId: string) => {
    console.log(`Switching to server: ${serverId}`);
    
    // Update current server
    setCurrentServer(serverId);
    
    // Load channels and categories for the new server
    const serverChannels = getChannelsForServer(serverId);
    const serverCategories = getCategoriesForServer(serverId);
    
    console.log(`Loaded ${serverChannels.length} channels for server ${serverId}`);
    
    setChannels(serverChannels);
    setChannelCategories(serverCategories);
    
    // Set the first channel as current if channels exist
    if (serverChannels.length > 0) {
      const firstChannel = serverChannels[0];
      setCurrentChannel(firstChannel.id);
      console.log(`Set current channel to: ${firstChannel.name}`);
    }
  };

  return {
    switchToServer,
  };
};
