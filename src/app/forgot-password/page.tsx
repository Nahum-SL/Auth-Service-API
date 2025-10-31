'use client'

import { useState } from "react";
import { StatusCard } from "../../../components/auth/StatusCard";
import { AuthFromCard } from "../../../components/auth/AuthFormCard";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await fetch('/api/auth/forgot-password', {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify({ email })
            });

            const data = await response.json();

            if(response.ok) {
                setSuccess(true);
            } else {
                setError(data.error || 'Error al solicitar el restablecimiento');
            }
        } catch (error) {
            console.error('Error de conexión. Por favor intenta nuevamente.')
        } finally {
            setLoading(false);
        }
    }
    if(success) {
        return (
            <StatusCard
            type="success"
            icon="email"
            title="¡Revisa tu Email!"
            message={`Si existe una cuenta con el email <strong>${email}</strong>, recibirias instrucciones para restablecer tu contraseña.`}
            submessage="El enlace expirara en 1 hora"
            linkHref="/login"
            linkText="Volver al Login"
            />        
        );
    }
    return (
        <AuthFromCard
        title="¿Olvidaste tu contraseña?"
        subtitle="Ingresa tu email y te enviaremos un enlace para restablecerla"
        error={error}
        footerText=""
        footerLinkText="Volver al Login"
        footerLinkHref="/login"
        secondaryFooterLinkText="¿No tienes una cuenta? Registrate"
        secondaryFooterLinkHref="/register"
        >
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                    </label>
                    <input 
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="tu@gmail.com"
                    required
                    />
                </div>

                <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? 'Enviando..' : 'Enviar Enlace de Restablecimiento'}
                </button>
            </form>
        </AuthFromCard>
    );        
}