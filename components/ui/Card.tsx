import { ReactNode } from "react";

interface CardProps {
    children: ReactNode;
    className?: string;
}

export function Card({ children, className = ''}: CardProps) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 to-indigo-50 px-4">
            <div className={`max-w-md w-full bg-white rounded-2xl shadow-xl p-8 ${className}`}>
                {children}
            </div>
        </div>
    )
}