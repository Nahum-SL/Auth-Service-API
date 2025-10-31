'use client'

import { Suspense } from "react"
import ResetPasswordClientPage from "../reset-password-client/page"

export default function ResetPasswordPage() {
    return (
        <Suspense fallback={<p>Cargando el cambio de contraseña</p>}>
            <ResetPasswordClientPage />
        </Suspense>
    )
}