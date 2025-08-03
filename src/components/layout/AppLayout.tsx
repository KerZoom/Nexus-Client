import React from 'react';
import styles from './AppLayout.module.css';
import { ServerSidebar } from './ServerSidebar';
import { ChannelSidebar } from './ChannelSidebar';
import { ChatArea } from '../chat/ChatArea';

export const AppLayout: React.FC = () => {
  return (
    <div className={styles['app-layout']}>
      <ServerSidebar />
      <ChannelSidebar />
      <ChatArea />
    </div>
  );
};
