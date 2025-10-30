import Link from "next/link";

export default function Navbar() {

    return (
        <nav className="bg-gray-900 text-white fixed w-full z-50 shadow-md">
            <div className="w-full px-8 flex items-center justify-between h-20">
                {/* Logo */}
                <Link href="/" className="text-2xl font-bold">
                    Auth Service
                </Link>

                {/* Menu desktop */}
                <div className="hidden md:flex space-x-16">

                    <Link href="/login" className="px-8 py-3 border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-cyan-900 transition-all duration-300 font-semibold inline-block">
                        Iniciar Sesión
                    </Link>

                    <Link href="/register" className="px-8 py-3 border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-cyan-900 transition-all duration-300 font-semibold inline-block">
                        Registrarse
                    </Link>

                </div>
            </div>
        </nav>
    );
}
