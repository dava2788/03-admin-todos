'use client'

import { SessionProvider } from "next-auth/react"
import React from "react"

interface Props {
    children: React.ReactNode
}

//Esto seria un High Order Component para agregar a los Client componentes 
//la info de la SessionProvider
export const AuthProvider = ({ children, ...rest }: Props) => {
    return (
        <SessionProvider>
            {children}
        </SessionProvider>
    )
}
