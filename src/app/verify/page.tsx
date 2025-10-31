'use client'

import { Suspense } from "react"
import VerifyClient from "../verify-client/page"

export default function VerifyPage() {
    return (
        <Suspense fallback={<p>Cargando verificación</p>}>
            <VerifyClient />
        </Suspense>
    )
}