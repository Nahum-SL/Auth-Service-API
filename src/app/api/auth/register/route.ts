// Registra nuevos usuarios y envía email de verificación

import { NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/app/lib/prisma';
import { hashPassword, generateToken } from '@/app/lib/password';
import { render } from '@react-email/render';
import { Resend } from 'resend';
import WelcomeEmail from '../../../../../emails/welcome';

const resend = new Resend(process.env.RESEND_API_KEY);

const registerSchema = z.object({
    email: z.string().email('Email inválido'),
    password: z.string().min(8, 'La contraseña debe tener mínimo 8 caracteres'),
    name: z.string().min(2, 'El nombre debe tener mínimo 2 caracteres'),
});

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const validatedData = registerSchema.parse(body);
        
        // Verificar si el usuario ya existe
        const existingUser = await prisma.user.findUnique({
        where: { email: validatedData.email },
        });
        
        if (existingUser) {
        return NextResponse.json(
            { error: 'Este email ya está registrado' },
            { status: 400 }
        );
        }
        
        // Crear usuario
        const hashedPassword = await hashPassword(validatedData.password);
        const user = await prisma.user.create({
        data: {
            email: validatedData.email,
            password: hashedPassword,
            name: validatedData.name,
        },
        });
        
        // Crear token de verificación
        const verificationToken = generateToken();
        await prisma.verificationToken.create({
        data: {
            email: user.email,
            token: verificationToken,
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 horas
        },
        });
        
        // Enviar email de verificación
        const baseUrl = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000';
        const verificationUrl = `${baseUrl}/verify?token=${verificationToken}`;
        
        try {
            const emailHtml = await render(
            WelcomeEmail({ name: user.name || 'Usuario', verificationUrl })
            );

            await resend.emails.send({
            from: 'Mi App <onboarding@resend.dev>',
            to: user.email,
            subject: '¡Bienvenido! Verifica tu cuenta',
            html: emailHtml,
            });
        } catch(emailError) {
            console.error("Error al enviar el email", emailError);
        }
        
        
        return NextResponse.json(
        { 
            message: 'Usuario creado exitosamente. Por favor, revisa tu email para verificar tu cuenta.',
            user: {
            id: user.id,
            email: user.email,
            name: user.name,
            }
        },
        { status: 201 }
        );
    } catch (error) {
        console.error('Error en registro:', error);
        
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { error: 'Datos inválidos', details: error.issues },
                { status: 400 }
            );
        }
        
        return NextResponse.json(
            { error: 'Error interno del servidor' },
            { status: 500 }
        );
    }
}