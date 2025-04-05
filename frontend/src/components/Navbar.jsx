"use client"
import { Briefcase } from 'lucide-react'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import { Button } from './ui/button'

export default function Navbar() {
    const [token, setToken] = useState(null)
    const [userData, setUserData] = useState(null)

    useEffect(() => {
        const storedToken = localStorage.getItem('token')
        const storedUser = localStorage.getItem('user')

        setToken(storedToken)

        if (storedUser) {
            try {
                setUserData(JSON.parse(storedUser))
            } catch (err) {
                console.error("Failed to parse user data", err)
            }
        }
    }, [])


    const logOut = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        window.location.href = '/signin'
    }

    return (
        <header className="border-b">
            <div className="container flex h-16 items-center justify-between px-4 md:px-6">
                <Link href="/" className="flex items-center gap-2 font-bold text-xl">
                    <Briefcase className="h-6 w-6" />
                    <span>JobConnect</span>
                </Link>
                {userData && token && (
                    <nav className="hidden md:flex gap-6">
                        {token && userData?.role === 'employer' && (
                            <>
                                <Link href="/employee" className="text-sm font-medium hover:underline underline-offset-4">
                                    Dashboard
                                </Link>
                                <Link href="/post-job" className="text-sm font-medium hover:underline underline-offset-4">
                                    Post Job
                                </Link>
                            </>
                        )}

                        {token && userData?.role === 'job-seeker' && (
                            <>
                                <Link href="/jobs" className="text-sm font-medium hover:underline underline-offset-4">
                                    Jobs
                                </Link>
                                <Link href="/job-seeker" className="text-sm font-medium hover:underline underline-offset-4">
                                    My Applications
                                </Link>
                            </>
                        )}
                    </nav>
                )}

                <div className="flex items-center gap-4">
                    {
                        token ?
                            <Button size="sm" onClick={logOut}>Log Out</Button> : <><Link href="/signin">
                                <Button variant="outline" size="sm">
                                    Sign In
                                </Button>
                            </Link>
                                <Link href="/signup">
                                    <Button size="sm">Sign Up</Button>
                                </Link></>
                    }
                </div>
            </div>
        </header>
    )
}
