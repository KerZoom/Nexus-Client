export interface ButtonProps {
    variant?: 'primary' | 'secondary' | 'danger';
    size?: 'sm' | 'md' | 'lg';
    disabled?: boolean;
    loading?: boolean;
    children: React.ReactNode;
    onClick?: () => void;
}

export interface InputProps {
    type?: 'text' | 'password' | 'email';
    placeholder?: string;
    value: string;
    onChange: (value: string) => void;
    disabled?: boolean;
    error?: string;
}

export interface AvatarProps {
    src?: string;
    alt: string;
    size?: 'sm' | 'md' | 'lg';
    status?: 'online' | 'away' | 'busy' | 'offline';
}