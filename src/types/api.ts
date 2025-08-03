export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
}

export interface LoginRequest {
    homeserver: string;
    username: string;
    password: string;
}

export interface LoginResponse {
    accessToken: string;
    userId: string;
    deviceId: string;
}