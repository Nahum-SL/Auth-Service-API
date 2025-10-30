import { Html, Head, Preview, Body, Container, Text, Link, Section, Tailwind, Heading } from "@react-email/components"

interface WelcomeEmailProps {
    name: string;
    verificationUrl?: string;
}

export default function WelcomeEmail({
        name = 'usuario',
        verificationUrl,
    }: WelcomeEmailProps) {
        const baseUrl = process.env.NEXT_PUBLIC_URL || "https://Localhost:3000";
        const finallyVerificactionUrl = verificationUrl || `$(baseUrl)/verify`;
    return (
        <Html>
                <Head />
            <Preview> Verifica tu cuenta - API REST Auth </Preview>
            <Tailwind>
                <Body className="bg-gray-100 font-sans">
                    <Container className="mx-auto py-8 px-4 max-w-xl">
                        <Section className="bg-white rounded-lg shadow-lg p-8">
                            <Heading className="text-3xl font-bol text-gray-900 mb-4">
                                ¡Bienvenido {name}!
                            </Heading>
                            
                            <Text className="text-gray-700 text-base leading-relaxed mb-4">
                                Gracias por registrarte en nuestra plataforma.
                            </Text>

                            <Text className="text-gray-700 text-base leading-relaxed mb-4">
                                Para comenzar a usar tu cuenta, necesitas verificar tu correo electronico.
                                Has click en el boton de abajo.
                            </Text>

                            <Section className="text-center mb-6">
                                <Link
                                href={finallyVerificactionUrl}
                                className="inline-block bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg no-underline transition-colors"
                                >
                                    Verificar mi Email
                                </Link>
                            </Section>

                            <Text className="text-gray-600 text-sm leading-relaxed mb-4">
                                O copia este enlace en tu navegador
                            </Text>

                            <Text className="text-gray-600 text-sm leading-relaxed mb-4">
                                {finallyVerificactionUrl}                                
                            </Text>

                            <Section className="border-t border-gray-200 pt-6 mt-6">
                                <Text className="text-gray-500 text-xs leading-relaxed">
                                    Este enlace expirara en 24 horas. Si no solicitaste esta verificación puedes ignorar esta verificación
                                </Text>
                            </Section>
                        </Section>

                        <Section className="text-center mt-6">
                            <Text>
                                © {new Date().getFullYear()} API REST Auth. Todos los derechos reservados
                            </Text>
                        </Section>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    )
}