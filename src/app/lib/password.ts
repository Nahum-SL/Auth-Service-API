import bcrypt from "bcryptjs";
import crypto from 'crypto';

/**
 * Hashea una contraseña usando SHA-256
 * El hash protege las contraseñas en la base de datos
 */

export async function hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
}

/**
 * Compara una contraseña en texto plano con su hash
 */

export async function comparePassword(password: string, hash: string): Promise<boolean> {
    const isMatch = await bcrypt.compare(password, hash);
    return isMatch;
}

/**
 * Genera un token aleatorio seguro
 */

export function generateToken(bytes: number = 32): string {
    return crypto.randomBytes(bytes).toString('hex');
}

