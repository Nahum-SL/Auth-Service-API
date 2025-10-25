import { Html, Head, Preview, Body, Container, Text, Link, Tailwind, Section, Heading } from "@react-email/components"

interface WelcomeEmailProps {
    name: string;
    resetUrl: string;
}

export default function PasswordReset({
        name = 'usuario',
        resetUrl = 'https://example.com/verify' 
    }: WelcomeEmailProps) {
    return (
        <Html>
            <Head />
            <Preview> Verifica tu cuenta - API REST Auth </Preview>
            <Tailwind>
                <Body className="bg-gray-100 font-sans">
                    <Container className="mx-auto py-8 px-4 max-w-xl">
                        <Section className="bg-white rounded-lg shadow-lg p-8">
                            <Heading className="text-3xl font-bol text-gray-900 mb-4">
                                Recuperar Contraseña
                            </Heading>
                            
                            <Text className="text-gray-700 text-base leading-relaxed mb-4">
                                Hola {name}.
                            </Text>

                            <Text className="text-gray-700 text-base leading-relaxed mb-4">
                                Recibimos una solcitud para recuperar la contraseña de tu cuenta.
                                Has click en el boton de abajo para crear una nueva contraseña.
                            </Text>

                            <Section className="text-center mb-6">
                                <Link
                                href={resetUrl}
                                className="inline-block bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg no-underline transition-colors"
                                >
                                    Restablecer contraseña
                                </Link>
                            </Section>

                            <Text className="text-gray-600 text-sm leading-relaxed mb-4">
                                O copia este enlace en tu navegador
                            </Text>                                

                            <Text className="text-gray-600 text-sm leading-relaxed mb-4">
                                {resetUrl}                                
                            </Text>

                            <Section className="border-t border-gray-200 pt-6 mt-6">
                                <Text className="text-gray-500 text-xs leading-relaxed">
                                    Este enlace expirara en 1 hora. Si no solicitaste restablecer tu contraseña.
                                    Ignora este Email y tu contraseña permanecera igual.
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