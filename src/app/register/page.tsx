'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

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
                    router.push('/register');
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

    if(success) {
        return (
            <div className="min-h-screen flext items-center justify-center bg-linear-to-br from-blue-50 to-indigo-100 px-4">
                <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
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
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                            />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        ¡Registro Exitoso!
                    </h2>
                    <p className="text-gray-600 mb-4">
                        Hemos enviado un email de verificación a <strong>{formData.email}</strong>
                    </p>
                    <p className="text-sm text-gray-500">
                        Por favor, revisa tu bandeja de entrada y haz click en el enlace de verificación.
                    </p>
                </div>
            </div>
        );
    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 to-indigo-100 px-4">
            <div className="max-w-md w-full bg-white rounded-xl shadow-xl p-8">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">
                        Crear Cuenta
                    </h2>
                    <p className="text-gray-600">
                        Completa el formulario para registrarte
                    </p>
                </div>

                {error && (
                    <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-red-800 text-sm">{error}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                            Nombre Completo
                        </label>
                        <input
                            type="text"
                            id="name"
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-black placeholder-gray-400"
                            placeholder="Ingrese su nombre"
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
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-black placeholder-gray-400"
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
                            placeholder="tu@password.com"
                            required
                            />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Registrando...' : 'Crear Cuenta'}
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-gray-600">
                    ¿Ya tienes una cuenta?{' '}
                    <Link href={'/login'} className="text-blue-600 hover:text-blue-700 font-semibold">
                        Iniciar Sesión
                    </Link>
                </p>
            </div>
        </div>
    );
}