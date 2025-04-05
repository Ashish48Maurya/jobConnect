import { Briefcase } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'

export default function Navbar() {
    return (
        <header className="border-b">
            <div className="container flex h-16 items-center justify-between px-4 md:px-6">
                <Link href="/" className="flex items-center gap-2 font-bold text-xl">
                    <Briefcase className="h-6 w-6" />
                    <span>JobConnect</span>
                </Link>
                <nav className="hidden md:flex gap-6">
                    <Link href="/jobs" className="text-sm font-medium hover:underline underline-offset-4">
                        Jobs
                    </Link>
                    <Link href="/employee" className="text-sm font-medium hover:underline underline-offset-4">
                        Dashborad
                    </Link>
                    <Link href="/post-job" className="text-sm font-medium hover:underline underline-offset-4">
                        Post Job
                    </Link>
                    <Link href="/job-seeker" className="text-sm font-medium hover:underline underline-offset-4">
                        My Applications
                    </Link>
                </nav>
                <div className="flex items-center gap-4">
                    <Link href="/signin">
                        <Button variant="outline" size="sm">
                            Sign In
                        </Button>
                    </Link>
                    <Link href="/signup">
                        <Button size="sm">Sign Up</Button>
                    </Link>
                </div>
            </div>
        </header>
    )
}
