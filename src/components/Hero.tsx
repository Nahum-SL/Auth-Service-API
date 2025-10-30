import Link from "next/link"

export default function HeroSection() {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="text-center">
                <h2 className="text-5xl font-bold text-gray-900 mb-6">
                    API REST con Autenticación JWT
                </h2>
                <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                    Sistema completo de autenticación con verificación por email,
                    tokens JWT y endpoints protegidos.
                </p>
                <div className="flex justify-center space-x-4">
                    <Link
                    href="/register"
                    className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg"
                    >
                    Comenzar Ahora
                    </Link>
                    <Link
                    href="/login"
                    className="bg-white text-blue-600 px-8 py-3 rounded-lg text-lg font-semibold border-2 border-blue-600 hover:bg-blue-50 transition-colors"
                    >
                    Ya tengo cuenta
                    </Link>
                </div>
            </div>
        </div>
    );
}