import { verifyToken } from './auth';

export async function requireAuth(request: Request) {
    const cookieHeader = request.headers.get('cookie') ?? '';
    const token = cookieHeader
        .split('; ')
        .find((c) => c.startsWith('token='))
        ?.split('=')[1];

    if (!token) {
        return { authorized: false as const };
    }

    const payload = await verifyToken(token);

    if (!payload) {
        return { authorized: false as const };
    }

    return { authorized: true as const, payload };
}