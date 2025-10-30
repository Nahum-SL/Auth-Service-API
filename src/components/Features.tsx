
export default function Features() {
    return (
        <div className="mt-20 grid md:grid-cols-3 gap-3">
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 ">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <svg 
                        className="w-6 h-6 text-blue-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path 
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 15v2m-6 4h12a2 2 0  002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        />
                    </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">
                    Autenticación Segura 
                </h3>
                <p className="text-gray-600">
                    JWT tokens encriptación SHA-256 para máxima seguridad.
                </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md border-gray-100">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                    <svg 
                        className=""
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path 
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" 
                        />
                    </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">
                    Verificación por Email
                </h3>
                <p className="text-gray-600">
                    Emails Hermosos con React Email y entrega confiable con Resend.
                </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md border-gray-100">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                    <svg 
                        className=""
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path 
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" 
                        />
                    </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">
                    Endpoints Protegidos
                </h3>
                <p className="text-gray-600">
                    Rutas seguras que requieren autenticación con middleware JWT.
                </p>
            </div>


        </div>
    )
}