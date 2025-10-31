import { NextResponse } from "next/server";
import { email, z } from "zod";
import { prisma } from "@/app/lib/prisma";
import { hashPassword } from "@/app/lib/password";

const resetPasswordSchema = z.object({
    token: z.string().min(1, 'Token requerido'),
    password: z.string().min(8, 'La contraseña debe tener minimo 8 caracteres'),
});

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const {token, password} = resetPasswordSchema.parse(body);

        // Buscar token
        const resetToken = await prisma.verificationToken.findUnique({
            where: { token },
        });

        if(!resetToken) {
            return NextResponse.json(
                { message: 'Token invalido o expirado'},
                { status: 400 },
            )
        };

        // Verificar si el token existe
        if(resetToken.expires < new Date()) {
            await prisma.verificationToken.delete({
                where: { token },
            });

            return NextResponse.json(
                { error: 'El token a expirado'},
                { status: 400 },
            );
        }

        // Buscar usuario
        const user = await prisma.user.findUnique({
            where: { email: resetToken.email }
        });

        if(!user) {
            return NextResponse.json(
                { error: 'El usuario no a sido encontrado'},
                { status: 404 },
            );
        }

        // Actualizar contraseña
        const hashedPassword = await hashPassword(password);
        await prisma.user.update({
            where: { email: user.email },
            data: { password: user.password },
        });

        // Eliminar token usado
        await prisma.verificationToken.delete({
            where: { token },
        });

        return NextResponse.json({
            message: 'Contraseña actualizada exitosamente. Ya puedes iniciar sesión.',
        });
    } catch(error) {
        console.error('Error en la actualización de contraseña', error);

        if(error instanceof z.ZodError){
            return NextResponse.json(
                { error: 'Contraseña invalida', details: error.issues },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { error: 'Error interno del servidor' },
            { status: 500 }
        );
    }
}