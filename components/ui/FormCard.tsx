import { ReactNode } from "react";
import { Card } from "./Card";

interface FormCardProps {
    title: string;
    subtitle: string;
    children: ReactNode;
    error?: string;
}

export function FormCard({ title, subtitle, children, error} : FormCardProps) {
    return(
        <Card>
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    {title}
                </h2>
                <p className="text-gray-600">
                    {subtitle}
                </p>
            </div>

            {error && (
                <div className="mb-4 p-4 bg-red-50 border-red-200 rounded-lg">
                    <p className="text-red-800 text-sm">{error}</p>
                </div>
            )}
            {children}
        </Card>
    )
}