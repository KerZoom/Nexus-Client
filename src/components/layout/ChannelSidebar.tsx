import React from 'react';
import styles from './ChannelSidebar.module.css';

export const ChannelSidebar: React.FC = () => {
  return (
    <div className={styles['channel-sidebar']}>
      <div className={styles['server-header']}>
        <span className={styles['server-name']}>My Server</span>
      </div>
      <div className={styles['channel-list']}>
        <div className={styles['channel-category']}>TEXT CHANNELS</div>
        <div className={styles['channel-item']}># general</div>
        <div className={styles['channel-item']}># random</div>
        <div className={styles['channel-item']}># development</div>
        
        <div className={styles['channel-category']}>VOICE CHANNELS</div>
        <div className={styles['channel-item']}>🔊 General</div>
        <div className={styles['channel-item']}>🔊 Meeting Room</div>
      </div>
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
