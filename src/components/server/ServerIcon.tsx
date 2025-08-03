import React, { useState } from 'react';
import styles from './ServerIcon.module.css';
import { mxcToHttp } from '@/utils';

export interface ServerIconProps {
  serverId: string;
  name: string;
  icon?: string; // mxc:// URI or null
  homeserver: string;
  isSelected?: boolean;
  hasUnread?: boolean;
  unreadCount?: number;
  onClick?: () => void;
}

export const ServerIcon: React.FC<ServerIconProps> = ({
  serverId,
  name,
  icon,
  homeserver,
  isSelected = false,
  hasUnread = false,
  unreadCount = 0,
  onClick,
}) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  // Get first letter for fallback
  const firstLetter = name.charAt(0).toUpperCase();

  // Convert mxc:// to HTTP URL if we have an icon
  const imageUrl = icon && !imageError ? mxcToHttp(icon, homeserver) : null;

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoading(false);
  };

  const handleClick = () => {
    onClick?.();
  };

  return (
    <div 
      className={`${styles['server-icon']} ${isSelected ? styles['server-icon--selected'] : ''}`}
      onClick={handleClick}
      title={name}
    >
      <div className={styles['icon-wrapper']}>
        {imageUrl && !imageError ? (
          <>
            {imageLoading && (
              <div className={styles['loading-placeholder']}>
                {firstLetter}
              </div>
            )}
            <img
              src={imageUrl}
              alt={`${name} icon`}
              className={`${styles['server-image']} ${imageLoading ? styles['server-image--loading'] : ''}`}
              onLoad={handleImageLoad}
              onError={handleImageError}
            />
          </>
        ) : (
          <div className={styles['server-letter']}>
            {firstLetter}
          </div>
        )}
      </div>

      {/* Unread indicator */}
      {hasUnread && (
        <div className={styles['unread-indicator']}>
          {unreadCount > 0 && unreadCount < 100 ? unreadCount : unreadCount >= 100 ? '99+' : ''}
        </div>
      )}

      {/* Selection indicator */}
      {isSelected && <div className={styles['selection-indicator']} />}
    </div>
  );
};
