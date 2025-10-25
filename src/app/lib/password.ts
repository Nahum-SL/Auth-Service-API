import crypto from 'crypto';

/**
 * Hashea una contraseña usando SHA-256
 * NOTA: En producción, considera usar bcrypt o argon2 para mayor seguridad
 * El hash protege las contraseñas en la base de datos
 */

export function hashPassword(password: string): string {
    return crypto
    .createHash('sha256')
    .update(password + (process.env.PASSWORD_SALT || 'default-salt'))
    .digest('hex');
}

/**
 * Compara una contraseña en texto plano con su hash
 */

export function comparePassword(password: string, hash: string): boolean {
    return hashPassword(password) === hash;
}

/**
 * Genera un token aleatorio seguro
 */

export function generateToken(bytes: number = 32): string {
    return crypto.randomBytes(bytes).toString('hex');
}

