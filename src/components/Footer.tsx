
export default function Footer() {
    return (
        <footer className="bg-linear-to-br from-slate-900 to-slate-800 text-center py-4 text-sm text-gray-200 border-t">
            © {new Date().getFullYear()} Mi Proyecto de API REST usando JWD
        </footer>
    )
}