import React from 'react';
import styles from './ChatArea.module.css';
import { MessageInput } from '@/components';
import { useServerStore } from '@/stores';
import { useCurrentServer, useCurrentChannel } from '@/hooks';

export const ChatArea: React.FC = () => {
  const { currentServerId, currentChannelId } = useServerStore();
  const currentServer = useCurrentServer();
  const currentChannel = useCurrentChannel();

  const handleSendMessage = (content: string) => {
    console.log('Sending message:', content);
    console.log('Current channel:', currentChannelId);
    console.log('Current server:', currentServerId);
    // TODO: Implement actual message sending
  };

  // UI formatting logic - belongs in component
  const placeholder = currentChannel 
    ? `Message #${currentChannel.name}`
    : 'Select a channel';

  const channelDisplayName = currentChannel ? `#${currentChannel.name}` : null;

  // Generate welcome message content
  const getWelcomeContent = () => {
    if (currentChannel && currentServer) {
      return {
        title: `Welcome to ${channelDisplayName}!`,
        description: `This is the beginning of the ${channelDisplayName} channel${
          currentChannel.topic ? ` - ${currentChannel.topic}` : ''
        }.`,
        serverInfo: `You're in the **${currentServer.name}** server.`,
      };
    } else {
      return {
        title: 'Welcome to Nexus!',
        description: 'Select a server from the left sidebar to get started.',
        serverInfo: 'Choose a server, then select a channel to begin chatting.',
      };
    }
  };

  const welcomeContent = getWelcomeContent();

  return (
    <div className={styles['chat-area']}>
      <div className={styles['chat-header']}>
        <span className={styles['channel-name']}>
          {channelDisplayName || 'Select a channel'}
        </span>
        {currentChannel?.topic && (
          <span className={styles['channel-topic']}>
            {currentChannel.topic}
          </span>
        )}
      </div>
      
      <div className={styles['chat-content']}>
        <div className={styles['welcome-message']}>
          <h2>{welcomeContent.title}</h2>
          <p>{welcomeContent.description}</p>
          <p className={currentChannel ? styles['server-info'] : styles['hint']}>
            {welcomeContent.serverInfo}
          </p>
        </div>
      </div>
      
      <div className={styles['message-input-area']}>
        <MessageInput 
          onSendMessage={handleSendMessage}
          placeholder={placeholder}
          disabled={!currentChannel}
        />
      </div>
    </div>
  );
};
