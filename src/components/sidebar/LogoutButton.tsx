'use client'

import { useSession, signIn, signOut } from "next-auth/react"
import { CiLogin, CiLogout } from "react-icons/ci"
import { IoShieldOutline } from "react-icons/io5";

export const LogoutButton = () => {
    const { data: session, status } = useSession();

    if (status === 'loading') {
        return (
            <button
                className="cursor-pointer px-10 py-3 flex flex-row items-center space-x-1 rounded-md text-gray-600 group border-2 border-blue-600">
                <IoShieldOutline size={30} />
                <span className="group-hover:text-gray-700">Espere..</span>
            </button>
        )
    }

    if (status === 'unauthenticated') {
        return (
            <button
                onClick={() => signIn()}
                className="cursor-pointer px-10 py-3 flex flex-row items-center space-x-1 rounded-md text-gray-600 group border-2 border-blue-600">
                <CiLogin size={30} />
                <span className="group-hover:text-gray-700">Ingresar</span>
            </button>
        )
    }


    return (
        <button
            onClick={() => signOut()}
            className="cursor-pointer px-10 py-3 flex flex-row items-center space-x-1 rounded-md text-gray-600 group border-2 border-blue-600">
            <CiLogout size={30} />

            <span className="group-hover:text-gray-700">Logout</span>
        </button>

    )


}
