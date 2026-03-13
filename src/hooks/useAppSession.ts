import { useSession } from '@tanstack/react-start/server';

interface SessionData {
    at: string;
    nik: string;
}

export function useAppSession() {
    return useSession<SessionData>({
        name: 'app-session',
        password: process.env.SESSION_SECRET,
        cookie: {
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            httpOnly: true,
        }
    })
}