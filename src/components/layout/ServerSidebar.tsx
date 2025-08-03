import React from 'react';
import styles from './ServerSidebar.module.css';

export const ServerSidebar: React.FC = () => {
  return (
    <div className={styles['server-sidebar']}>
      <div className={styles['server-list']}>
        {/* Placeholder server icons */}
        <div className={styles['server-item']}>M</div>
        <div className={styles['server-item']}>D</div>
        <div className={styles['server-item']}>T</div>
      </div>
    </div>
  );
};
