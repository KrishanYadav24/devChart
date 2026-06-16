"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
    const router = useRouter();
    const [username, setUsername] = useState<string | null>(null);

    async function fetchUser() {
        try {
            const res = await fetch("/api/auth/meinfo");
            if (res.ok) {
                const data = await res.json();
                setUsername(data.username);
            }
        } catch (error) {
            console.error("Failed to fetch user", error);
        }
    }

    useEffect(() => {
        fetchUser();
    }, []);

    async function handleLogout() {
        try {
            const response = await fetch("/api/auth/logout", { method: "POST" });
            if (response.ok) {
                router.push("/");
                router.refresh();
            }
        } catch (error) {
            console.error("Logout failed", error);
        }
    }

    return (
        <nav className="flex justify-between items-center h-auto font-bold bg-black text-teal-200 p-4 border-b border-gray-800 shadow-lg">
            <Link href="/">
                <h1 className="text-2xl hover:text-white transition-colors flex items-center gap-2">
                    devChart
                    {username && (
                        <span className="text-xs bg-teal-200 text-black px-2 py-0.5 rounded-full ml-2">
                            @{username}
                        </span>
                    )}
                </h1>
            </Link>
            <div className="flex gap-4 items-center">
                <Link href="/dashboard">
                    <button className="rounded-lg py-1.5 px-4 bg-teal-200 text-black hover:bg-white transition-colors"> Dashboard </button>
                </Link>
                <Link href="/create-task">
                    <button className="rounded-lg py-1.5 px-4 bg-teal-200 text-black hover:bg-white transition-colors"> + Create </button>
                </Link>
                <Link href="/settings">
                    <button className="rounded-lg py-1.5 px-4 border border-teal-200 text-teal-200 hover:bg-teal-200 hover:text-black transition-all"> Settings </button>
                </Link>
                <button
                    onClick={handleLogout}
                    className="rounded-lg py-1.5 px-4 border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-all"
                >
                    Logout
                </button>
            </div>
        </nav>
    );
}
