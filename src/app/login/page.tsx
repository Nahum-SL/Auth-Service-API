'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AuthFromCard } from "../../../components/auth/AuthFormCard";

export default function LoginPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        
        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                // Guardar token en localStorage
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));

                // Redirigir al Dashboard
                router.push('/dashboard');
            } else {
                setError(data.error || 'Error al iniciar sesión');
            }
        } catch (error) {
            setError('Error de conexión. Por favor, intenta nuevamente.');
        } finally {
            setLoading(false);
        }
    };
    return (
        <AuthFromCard
        title="Iniciar Sesión"
        subtitle="Accede a tu cuenta"
        error={error}
        footerText="¿No tienes cuenta?"
        footerLinkText="Registrate aqui"
        footerLinkHref="/register"
        >
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                    </label>
                    <input 
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
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
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    placeholder="Tu contraseña"
                    required
                    />
                </div>

                <div className="flex items-center justify-end">
                    <Link
                    href="/forgot-password"
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                    >
                    ¿Olvidaste tu contraseña?
                    </Link>
                </div>

                <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? 'Iniciando Sesión..' : 'Iniciar Sesión'}
                </button>
            </form>
        </AuthFromCard>
    );
}