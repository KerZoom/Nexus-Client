import React from 'react';
import styles from './ServerSidebar.module.css';
import { ServerIcon } from '@/components/server';
import { useServerStore, useAuthStore } from '@/stores';
import { useServerData } from '@/hooks';
import { mockHomeserver } from '@/data/mockData.ts';

export const ServerSidebar: React.FC = () => {
  const { servers, currentServerId } = useServerStore();
  const { homeserver } = useAuthStore();
  const { switchToServer } = useServerData();

  const handleServerClick = (serverId: string) => {
    switchToServer(serverId);
  };

  return (
    <div className={styles['server-sidebar']}>
      <div className={styles['server-list']}>
        {servers.map((server) => (
          <ServerIcon
            key={server.id}
            serverId={server.id}
            name={server.name}
            icon={server.icon}
            homeserver={homeserver || mockHomeserver}
            isSelected={server.id === currentServerId}
            hasUnread={server.hasUnread}
            unreadCount={server.unreadCount}
            onClick={() => handleServerClick(server.id)}
          />
        ))}
        
        {/* Add Server placeholder - we can implement this later */}
        <div className={styles['add-server-placeholder']}>
          <div className={styles['add-server-icon']}>
            +
          </div>
        </div>
      </div>
    </div>
  );
};
