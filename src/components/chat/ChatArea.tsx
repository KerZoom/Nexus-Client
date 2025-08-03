import React from 'react';
import styles from './ChatArea.module.css';
import { MessageInput } from './MessageInput';

export const ChatArea: React.FC = () => {
  const handleSendMessage = (content: string) => {
    console.log('Sending message:', content);
    // TODO: Implement actual message sending
  };

  return (
    <div className={styles['chat-area']}>
      <div className={styles['chat-header']}>
        <span className={styles['channel-name']}># general</span>
      </div>
      <div className={styles['chat-content']}>
        <div className={styles['welcome-message']}>
          <h2>Welcome to #general!</h2>
          <p>This is the beginning of the #general channel.</p>
        </div>
      </div>
      <div className={styles['message-input-area']}>
        <MessageInput 
          onSendMessage={handleSendMessage}
          placeholder="Message #general"
        />
      </div>
    </div>
  );
};
