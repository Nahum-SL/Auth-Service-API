// Verifica el email del usuario con el token

import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/app/lib/prisma";

const verifySchema = z.object({
    token: z.string().min(1, 'Token requerido'),
})

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { token } = verifySchema.parse(body);

        //Buscar token de verificación
        const verificationToken = await prisma.verificationToken.findUnique({
            where: { token }
        });

        if (!verificationToken) {
            return NextResponse.json(
                { error: 'Token de verificación inválido'},
                { status: 400 }
            );
        }

        // Verificar si el token ha expirado
        if (verificationToken.expires < new Date()) {
            await prisma.verificationToken.delete({
                where: { token }
            });

            return NextResponse.json(
                { error: 'El token de verificación ha expirado' },
                { status: 400 }
            );
        }

        // Actualizar usuario como verificado
        await prisma.user.update({
            where: { email: verificationToken.email },
            data: { verified: true },
        });

        // Eliminar token usado
        await prisma.verificationToken.delete({
            where: { token },
        });

        return NextResponse.json({
            message: '¡Email verificado exitosamente! Ya puedes iniciar sesión.',
        });

    } catch(error) {
        console.error( 'Error en verificación:', error );

        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { error: 'Datos invalidos', details: error.issues },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { error: 'Error interno en el servidor' },
            { status: 500 }
        );
    }
}