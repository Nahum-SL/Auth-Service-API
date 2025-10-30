// Autentica usuarios y devuelve un JWT

import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/app/lib/prisma";
import { comparePassword } from "@/app/lib/password";
import { createToken } from "@/app/lib/jwt";

const loginShema = z.object({
    email: z.string().email('Email invalido'),
    password: z.string().min(1, 'La contraseña es requerida'),
});

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const validatedData = loginShema.parse(body);

        // Buscar usuario
        const user = await prisma.user.findUnique({
            where: { email: validatedData.email }
        });

        if (!user || !(await comparePassword(validatedData.password, user.password))) {
            return NextResponse.json(
                { error: 'Credenciales invalidas'},
                { status: 401 }
            );
        }

        // Verificar si el email está verificado
        if (!user.verified) {
            return NextResponse.json(
                { error: 'Por favor, verifique tu email antes de iniciar sesión' },
                { status: 403 }
            );
        }

        // Crear token JWT
        const token = await createToken({
            userId: user.id,
            email: user.email
        });

        return NextResponse.json({
            token,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
            }
        });

    } catch (error) {
        console.error('Error en login:', error);

        if(error instanceof z.ZodError) {
            return NextResponse.json(
                { error: 'Datos inválidos', details: error.issues },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { error: 'Error interno en el servidor' },
            { status: 500 }
        );
    }
}