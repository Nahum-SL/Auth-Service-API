'use client'

import { use, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { StatusCard } from "../../../components/auth/StatusCard";
import { AuthFromCard } from "../../../components/auth/AuthFormCard";

export default function ResetPasswordPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [validatingToken, setValidatingToken] = useState(true);
    const [tokenValid, setTokenValid] = useState(false);

    useEffect(() => {
        const token = searchParams.get('token');
        
        if(!token) {
            setError('Token de reset no proporcionado');
            setValidatingToken(false);
            return;
        }

        setTokenValid(true);
        setValidatingToken(false);
    }, [searchParams]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if(password !== confirmPassword) {
            setError('Las contraseñas no coinciden');
            return;
        }

        if(password.length < 8) {
            setError('La contraseña debe tener como minimo 8 caracteres');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const token = searchParams.get('token');

            const response = await fetch('/api/auth/reset-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token, password }),
            });

            const data = await response.json();

            if(response.ok) {
                setSuccess(true);
                setTimeout(() => {
                    router.push('/login');
                }, 3000);
            } else {
                setError(data.error || 'Error al restablecer la contraseña');
            }
        } catch(error) {
            console.error('Error de conexión. Por favor, intenta nuevamente.');
        } finally {
            setLoading(true);
        }
    };
    
    if(validatingToken) {
        return (
            <StatusCard 
            type="loading"
            title="Validando token.."
            message="Por favor espera un momento"
            />
        )
    }

    if(!tokenValid) {
        return (
            <StatusCard 
            type="error"
            title="Token invalido"
            message={error}
            linkHref="/forgot-password"
            linkText="Solicitar Nuevo Enlace"
            />
        );
    }

    if(success) {
        return (
            <StatusCard 
            type="success"
            title="¡Contraseña Actualizada!"
            message="Tu contraseña ha sido restablecida exitosamente."
            submessage="Seras redirigido al login en unos segundos.."
            />
        );
    }

    return (
        <AuthFromCard 
        title="Nueva Contraseña"
        subtitle="Ingresa tu nueva contraseña"
        error={error}
        footerText=""
        footerLinkText="Volver al login"
        footerLinkHref="/login"
        >
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                        Nueva Contraseña
                    </label>
                    <input 
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Minimo 8 caracteres"
                    minLength={8}
                    required
                    />
                </div>

                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                        Confirmar Contraseña
                    </label>
                    <input 
                    type="password"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Repite tu contraseña"
                    minLength={8}
                    required
                    />
                </div>

                <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? 'Registrando..' : 'Crear Cuenta'}
                </button>
            </form>
        </AuthFromCard>
    )
}