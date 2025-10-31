'use client'

import { Suspense } from "react"
import VerifyClient from "../../../components/auth/verify-client"

export default function VerifyPage() {
    return (
        <Suspense fallback={<p>Cargando verificación</p>}>
            <VerifyClient />
        </Suspense>
    )
}