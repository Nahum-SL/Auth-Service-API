'use client'

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function VerifyPage() {
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
                setMessage('Error de conexion por favor intente nuevamente');
            }
        };
        
        verifyEmail();
    }, [searchParams, router]);
    
    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 to-indigo-100 px-4">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
                {status === 'loading' && (
                    <div className="text-center">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mb-4"></div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">
                            Verificando tu email..
                        </h2>
                        <p className="text-gray-600"> 
                            Por favor espera un momento
                        </p>
                    </div>
                )}

                {status === 'success' && (
                    <div className="text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                            <svg
                                className="w-8 h-8 text-green-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M5 1314 4L19 7"
                            />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bol text-gray-900 mb-2">
                            ¡Verificación exitorsa!
                        </h2>
                        <p className="text-gray-600 mb-4">{message}</p>
                        <p className="text-sm text-gray-500">
                            Serás redirido al login en unos segundos..
                        </p>
                    </div>
                )}

                {status === 'error' && (
                    <div className="text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
                            <svg
                                className="w-8 h-8 text-red-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                            <path 
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                            </svg>    
                        </div>
                        <h2 className="text-2xl font-bol text-gray-900 mb-2">
                            Error de verificación 
                        </h2>
                        <p className="text-gray-600 mb-6">{message}</p>
                        <div className="space-y-3">
                            <button 
                                onClick={() => router.push('/login')}
                                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
                            >
                                Registrarse de nuevo
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}