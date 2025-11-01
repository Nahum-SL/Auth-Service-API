'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AuthFromCard } from "../../../components/auth/AuthFormCard";
import { StatusCard } from "../../../components/auth/StatusCard";

export default function RegisterPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if(response.ok) {
                setSuccess(true);
                // Redirigir en 3 segundos
                setTimeout(() => {
                    router.push('/login');
                }, 3000);
            } else {
                setError(data.error || 'Error al regístrar usuario');
            }
        } catch(error) {
            setError('Error de conexion. Por favor, intenta nuevamente.')
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <StatusCard 
            type="success"
            title="¡Registro Exitoso!"
            message={`Hemos enviado un email de verificación a <strong>${formData.email}</strong>`}
            />
        );
    }

    return (
        <AuthFromCard 
        title="Crear Cuenta"
        subtitle="Completa el siguiente formulario para registrarte"
        error={error}
        footerText="¿Ya tienes una Cuena?"
        footerLinkText="Inicia Sesión"
        footerLinkHref="/login"
        >
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Nombre Completo
                    </label>
                    <input 
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Escriba aqui"
                    required
                    />
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                    </label>
                    <input 
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="tu@email.com"
                    required
                    />
                </div>

                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                        Contraseña
                    </label>
                    <input 
                    type="password"
                    id="password"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Minimo 8 caracteres"
                    minLength={8}
                    required
                    />
                </div>

                <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? 'Restableciendo..' : 'Restablecer Contraseña'}
                </button>
            </form>
        </AuthFromCard>
    );
}