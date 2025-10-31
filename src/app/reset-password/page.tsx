'use client'

import { Suspense } from "react"
import ResetPasswordClient from "../../../components/auth/reset-password-client"
export default function ResetPasswordPage() {
    return (
        <Suspense fallback={<p>Cargando el cambio de contraseña</p>}>
            <ResetPasswordClient />
        </Suspense>
    )
}