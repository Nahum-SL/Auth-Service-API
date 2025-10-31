'use client'

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { StatusCard } from "../../../components/auth/StatusCard";

export default function VerifyClient() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [ status, setStatus ] = useState<'loading' | 'success' | 'error'>('loading');
    const [ message, setMessage ] = useState('');
    
    useEffect (() => {
        const token = searchParams.get('token');

        if(!token) {
            setStatus('error');
            setMessage('Token de verificación no proporcionado');
            return;
        }

        // Llamar a un Endpoint de verificación
        const verifyEmail = async() => {
            try {
                const response = await fetch('/api/auth/verify', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ token })
                });

                const data = await response.json();

                if(response.ok) {
                    setStatus('success');
                    setMessage(data.message || '¡Email verificado exitosamente!');

                    // Redirigir el login despues de 3 segundos
                    setTimeout(() => {
                        router.push('/login');
                    }, 3000);
                } else {
                    setStatus('error');
                    setMessage(data.message || 'Error al verificar el email');
                }
            } catch(error) {
                setStatus('error');
                setMessage('Error de conexion. Por favor, intenta nuevamente.');
            }
        };
        
        verifyEmail();
    }, [searchParams, router]);
    if (status === 'loading') {
        return (
            <StatusCard 
            type="loading"
            title="Verificando tu email.."
            message="Por favor espere un momento"
            />
        )
    }

    if (status === 'success') {
        return (
            <StatusCard 
            type="success"
            title="¡Verificacion exitosa!"
            message={message}
            submessage="Seras redirigido al login en unos segundos.."
            />
        );
    }
    return (
        <StatusCard 
        type="error"
        title="Error de verificación"
        message={message}
        linkHref="/login"
        linkText="Ir al Login"
        secondaryLinkHref="/register"
        secondaryLinkText="Registrarme de nuevo"
        />
    );
}