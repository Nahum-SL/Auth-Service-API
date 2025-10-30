//  Ejemplo de endpoint que requiere autenticación

import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { verifyToken, extractTokenFromHeader } from "@/app/lib/jwt";

export async function GET(request: Request) {
    try {
        // Extraer token del header Authorization
        const token = extractTokenFromHeader(request.headers.get('authorization'));

        if (!token) {
            return NextResponse.json(
                { error: 'No se proporcionó token de autenticación'},
                { status: 401 }
            );
        }

        // Verificar token
        const payload = await verifyToken(token);

        if (!payload) {
            return NextResponse.json(
                { error: 'Token invalido o expirado' },
                { status: 401 }
            );
        }

        // Buscar usuario
        const user = await prisma.user.findUnique({
            where: { id: payload.userId },
            select: {
                id: true,
                email: true,
                name: true,
                verified: true,
                createdAt: true
            },
        });

        if (!user) {
            return NextResponse.json(
                { error: 'Usuario no encontrado' },
                { status: 404 }
            );
        }
        return NextResponse.json({ user });
    } catch(error) {
        console.error( 'Error obteniendo perfil:', error );

        return NextResponse.json(
            { error: 'Error interno en el servidor' },
            { status: 500 }
        );
    }
}