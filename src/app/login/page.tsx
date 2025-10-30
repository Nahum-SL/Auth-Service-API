'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

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
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 to-indigo-50 px-4">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">
                        Iniciar Sesión
                    </h2>
                    <p className="text-gray-600">
                        Accede a tu cuenta
                    </p>
                </div>

                {error && (
                    <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-red-800 text-sm">{error}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            id='email'
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2  focus:ring-blue-500 focus:border-transparent transition-all text-black placeholder-gray-400"
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
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-black placeholder-gray-400"
                            placeholder="Tu contraseña"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:cursor-not-allowed"
                    >
                        {loading ? 'Iniciando Sesión..' : 'Iniciar Sesión'}
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-gray-600">
                    ¿No tienes una cuenta?{' '}
                    <Link href={'/register'} className="text-blue-600 hover:text-blue-700 font-semibold">
                        Registrarse aqui
                    </Link>
                </p>
            </div>
        </div>
    );
}