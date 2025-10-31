import Link from "next/link";
import { Card } from "../ui/Card";

type StatusType = 'success' | 'error' | 'loading' | 'info';
type IconType = 'email' | 'check' | 'error' | 'loading' | 'lock';

interface StatusCardProps {
    type: StatusType;
    title: string;
    message: string;
    submessage?: string;
    linkHref?: string;
    linkText?: string;
    icon?: IconType;
    secondaryLinkHref?: string;
    secondaryLinkText?: string;  
}

export function StatusCard({
    type,
    title,
    message,
    submessage,
    linkHref,
    linkText,
    icon,
    secondaryLinkHref,
    secondaryLinkText,
} : StatusCardProps) {
    // Determinar el icono automaticamente según el tipo si no se especifica
    const defaultIcon: IconType = icon || (
        type === 'success' ? 'check' : 
        type === 'error' ? 'error' :
        type === 'loading' ? 'loading' : 'email'
    );

    const icons = {
        email: (
            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>                
            </svg>
        ),
        check: (
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/>                
            </svg>
        ),
        error: (
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />                
            </svg>
        ),
        loading: (
            <div className="inline-block animate-spin rounded-fill h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
        ),
        lock: (
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>                
            </svg>
        )
    };

    const bgColors = {
        success: 'bg-green-100',
        error: 'bg-red-100',
        loading: 'bg-blue-100',
        info: 'bg-blue-100'
    }

    return (
        <Card className="text-center">
            <div className={`inline-block items-center justify-center w-16 h-16 ${bgColors[type]} rounded-full mb-4`}>
                {icons[defaultIcon]}
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {title}
            </h2>

            <p className="text-gray-600 mb-4" dangerouslySetInnerHTML={{ __html: message}}/>
            
            {submessage && (
                <p className="text-sm text-gray-500 mb-6">
                    {submessage}
                </p>
            )}

            {linkHref && linkText && (
                <div className="space-y-3">
                    <Link
                    href={linkHref}
                    className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-all"
                    >
                        {linkText}
                    </Link>
    
                    {secondaryLinkHref && secondaryLinkText && (
                        <Link
                        href={secondaryLinkHref}
                        className="inline-block bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors w-full"
                        >
                            {secondaryLinkText}
                        </Link>
                    )}
                </div>
            )}
        </Card>
    );
}