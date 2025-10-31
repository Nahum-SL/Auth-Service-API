import { ReactNode } from "react";
import Link from "next/link";
import { Card } from "../ui/Card";

interface AuthFromCardProps {
    title: string;
    subtitle: string;
    children: ReactNode;
    error?: string
    footerText?: string;
    footerLinkText?: string;
    footerLinkHref?: string;
    secondaryFooterText?: string;
    secondaryFooterLinkText?: string;
    secondaryFooterLinkHref?: string;
}

export function AuthFromCard({
    title,
    subtitle,
    children,
    error,
    footerText,
    footerLinkText,
    footerLinkHref,
    secondaryFooterText,
    secondaryFooterLinkText,
    secondaryFooterLinkHref
} : AuthFromCardProps) {
    return (
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
                <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-800 text-sm">{error}</p>
                </div>
            )}

            {children}

            {(footerText || secondaryFooterText) && (
                <div className="mt-6 text-center space-y-2">
                    {footerText && footerLinkText && footerLinkHref && (
                        <p className="text-sm text-gray-600">
                            {footerText}{' '}
                            <Link href={footerLinkHref} className="text-blue-600 hover:text-blue-700 font-semibold">
                                {footerLinkHref}
                            </Link>
                        </p>
                    )}

                    {secondaryFooterText && secondaryFooterLinkText && secondaryFooterLinkHref && (
                        <Link
                        href={secondaryFooterLinkHref}
                        className="block text-sm text-gray-600 hover:text-gray-700"
                        >
                            {secondaryFooterLinkText}
                        </Link>
                    )}
                </div>
            )}
        </Card>
    );
}