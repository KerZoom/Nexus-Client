// Re-export all user components
// TODO: Add these components later
// export { UserPanel } from './UserPanel';
// export { UserAvatar } from './UserAvatar';
// export { UserProfile } from './UserProfile';

// User and authentication-related type definitions
export interface User {
  id: string;
  username: string;
  displayName: string;
  avatar?: string; // mxc:// URI
  status: 'online' | 'away' | 'busy' | 'invisible' | 'offline';
}
