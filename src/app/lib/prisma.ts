import { PrismaClient } from '@prisma/client';

/**
 * Singleton de Prisma evita demasiadas conexiones a la DB en desarrollo
 */

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined;
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
    globalForPrisma.prisma = prisma;
}

