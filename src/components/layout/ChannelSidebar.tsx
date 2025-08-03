import React from 'react';
import styles from './ChannelSidebar.module.css';
import { useServerStore } from '@/stores';
import { useCurrentServer } from '@/hooks';

export const ChannelSidebar: React.FC = () => {
  const {
    currentChannelId,
    channelCategories,
    setCurrentChannel,
  } = useServerStore();

  const currentServer = useCurrentServer();

  // UI logic - belongs in component
  const getChannelIcon = (type: 'text' | 'voice') => {
    return type === 'voice' ? '🔊' : '#';
  };

  const handleChannelClick = (channelId: string) => {
    console.log(`Switching to channel: ${channelId}`);
    setCurrentChannel(channelId);
  };

  // UI formatting logic
  const serverName = currentServer?.name || 'Select a Server';

  return (
    <div className={styles['channel-sidebar']}>
      {/* Server Header */}
      <div className={styles['server-header']}>
        <span className={styles['server-name']}>{serverName}</span>
      </div>

      {/* Channel List */}
      <div className={styles['channel-list']}>
        {channelCategories.length > 0 ? (
          channelCategories.map((category) => (
            <div key={category.id} className={styles['category-section']}>
              <div className={styles['channel-category']}>
                {category.name}
              </div>
              {!category.collapsed && category.channels.map((channel) => (
                <div
                  key={channel.id}
                  className={`${styles['channel-item']} ${
                    channel.id === currentChannelId ? styles['channel-item--active'] : ''
                  }`}
                  onClick={() => handleChannelClick(channel.id)}
                  title={channel.topic}
                >
                  <span className={styles['channel-icon']}>
                    {getChannelIcon(channel.type)}
                  </span>
                  <span className={styles['channel-name']}>{channel.name}</span>
                  {channel.unreadCount > 0 && (
                    <span className={styles['unread-badge']}>
                      {channel.unreadCount}
                    </span>
                  )}
                </div>
              ))}
            </div>
          ))
        ) : (
          <div className={styles['no-channels']}>
            <p>No channels available</p>
            <p className={styles['hint']}>Select a server to view channels</p>
          </div>
        )}
      </div>

      {/* User Panel */}
      <div className={styles['user-panel']}>
        <div className={styles['user-info']}>
          <div className={styles['user-avatar']}>U</div>
          <div className={styles['user-details']}>
            <span className={styles['username']}>YourName</span>
            <span className={styles['user-status']}>Online</span>
          </div>
        </div>
      </div>
    </div>
  );
};
