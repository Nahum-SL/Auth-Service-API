import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/app/lib/prisma";
import { generateToken } from "@/app/lib/password";
import { render } from "@react-email/render";
import { Resend } from "resend";
import PasswordReset from "../../../../../emails/PasswordResetEmail";

const resend = new Resend(process.env.RESEND_API_KEY);

const forgotPasswordSchema = z.object({
    email: z.string().email('Email inválido'),
});

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const email = forgotPasswordSchema.parse(body);

        // Buscar usuario
        const user = await prisma.user.findUnique({
            where: { email: email.email },
        });
        
        // Por seguridad, siempre devolvemos el mismo mensaje
        // (no revelamos si el email existe o no)
        const succesMessage = 'Si el email existe, Recibiras instrucciones para restablecer tu contraseña.';    
        
        if(!user) {
            return NextResponse.json({ message: succesMessage });
        }

        // Eliminar tokens anteriores del mismo usuario
        await prisma.verificationToken.deleteMany({
            where: email
        });

        // Crear token de reset (expira en 1 hora)
        const resetToken = generateToken();
        await prisma.verificationToken.create({
            data: {
                email: user.email,
                token: resetToken,
                expires: new Date(Date.now() + 60 * 60 * 1000)
            }
        });

        // Enviar email de verificación
        const resetUrl = `${process.env.NEXT_PUBLIC_URL}/reset-password=${resetToken}`;
        const emailHtml = await render(
            PasswordReset({
                name: user.name || 'Usuario',
                resetUrl,
            })
        );

        await resend.emails.send({
            from: 'Mi App <onboarding@resend.dev>',
            to: user.email,
            subject: 'Restablecer tu contraseña',
            html: emailHtml,
        });

        return NextResponse.json({ message: succesMessage });
    } catch (error) {
        console.error('Error en recuperar la contraseña');

        if(error instanceof z.ZodError) {
            return NextResponse.json(
                    { error: 'Email invalidos', details: error.issues },
                { status: 400 },
            );
        }

        return NextResponse.json(
            { error: 'Error interno del servidor' },
            { status: 500 },
        );
    }
}
