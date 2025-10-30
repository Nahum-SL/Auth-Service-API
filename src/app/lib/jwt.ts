import { SignJWT, jwtVerify, JWTPayload } from "jose";

/**
 * JWT Crea tokens seguros para autenticar usuarios sin sesiones
 * Los tokens contienen información del usuario (userId, email)
 */

const secret = new TextEncoder().encode(
    process.env.JWT_SECRET || 'tu-secreto-super-seguro-cambiar-en-produccion'
)

interface TokenPayload extends JWTPayload {
    userId: string;
    email: string;
}

export async function createToken(payload: TokenPayload, expiresIn = '7d'): Promise<string> {
    const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256'})
    .setIssuedAt()
    .setExpirationTime(expiresIn)
    .sign(secret)
    
    
    return token;
}

export async function verifyToken( token: string ): Promise <TokenPayload | null> {
    try {
        const { payload } = await jwtVerify(token, secret);
        return payload as unknown as TokenPayload; 
    } catch (error) {
        console.error('Error verificando token:', error);
        return null;
    }
}

export function extractTokenFromHeader(authorization?: string | null): string | null {
    if (!authorization || !authorization.startsWith('bearer')) {
        return null;
    }
    return authorization.substring(7);
}