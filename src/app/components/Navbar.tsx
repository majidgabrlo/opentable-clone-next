"use client"
import Link from "next/link"
import { useUser } from "../context/AuthContext"
import { useAuth } from "../hooks/useAuth"
import AuthModal from "./AuthModal"


function Navbar() {
    const { loading, data } = useUser()
    const { signOut } = useAuth()

    return (
        <nav className="bg-white p-2 flex justify-between">
            <Link href="/" className="font-bold text-gray-700 text-2xl"> OpenTable </Link>
            <div>
                <div className="flex">
                    {
                        loading ? null :
                            !!data ?
                                <button onClick={signOut} className="bg-red-400 text-white border p-1 px-4 rounded mr-3">
                                    Log out
                                </button> :
                                <>
                                    <AuthModal isSignIn={true} />
                                    <AuthModal isSignIn={false} />
                                </>
                    }

                </div>
            </div>
        </nav>
    )
}

export default Navbar