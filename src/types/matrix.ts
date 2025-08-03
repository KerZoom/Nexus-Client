export interface MatrixServer {
    id: string;
    name: string;
    avatar?: string;
    memberCount: number;
}

export interface MatrixChannel {
    id: string;
    serverId: string;
    name: string;
    type: 'text' | 'voice';
    unreadCount: number;
}

export interface MatrixMessage {
    id: string;
    channelId: string;
    author: MatrixUser;
    content: string;
    timestamp: number;
    edited?: number;
}

export interface MatrixUser {
    id: string;
    username: string;
    displayName?: string;
    avatar?: string;
    status: 'online' | 'away' | 'busy' | 'offline';
}