export const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const validateUsername = (username: string): boolean => {
    return username.length >= 3 && username.length <= 32;
};

export const validateHomeserver = (url: string): boolean => {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
};