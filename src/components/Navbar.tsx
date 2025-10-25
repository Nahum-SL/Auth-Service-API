import Link from "next/link"

export default function Navbar() {
    return (
        <nav className="bg-gray-900 text-white fixed w-full z-50 shadow-md">
            <div className="w-full px-8 flex items-center justify-between h-20">
                <Link href="/" className="text-3xl font-bold">
                    Home
                </Link>
            </div>
        </nav>
    )
}