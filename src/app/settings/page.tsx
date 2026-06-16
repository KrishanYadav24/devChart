"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";

export default function Settings() {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [message, setMessage] = useState({ text: "", isError: false });
    const router = useRouter();

    async function handlePasswordChange(e: React.FormEvent) {
        e.preventDefault();
        setMessage({ text: "", isError: false });

        if (newPassword.length < 6) {
            setMessage({ text: "New password must be at least 6 characters", isError: true });
            return;
        }

        try {
            const response = await fetch("/api/auth/changepassword", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ currentPassword, newPassword }),
            });

            let data;
            try {
                data = await response.json();
            } catch (e) {
                data = { message: `Server error (${response.status})` };
            }

            if (response.ok) {
                setMessage({ text: "Password updated successfully!", isError: false });
                setCurrentPassword("");
                setNewPassword("");
            } else {
                setMessage({ text: data.message || "Failed to update password", isError: true });
            }
        } catch (err) {
            setMessage({ text: "Network error. Try again.", isError: true });
        }
    }

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <Navbar />

            <div className="max-w-2xl mx-auto p-8 mt-10">
                <h1 className="text-5xl font-black text-teal-200 text-outline-black mb-8">
                    Settings
                </h1>

                <div className="bg-gray-800 p-8 rounded-3xl border border-gray-700 shadow-2xl">
                    <h2 className="text-2xl font-bold text-teal-200 mb-6">Change Password</h2>

                    <form onSubmit={handlePasswordChange} className="flex flex-col gap-6">
                        {message.text && (
                            <p className={`p-4 rounded-xl text-sm text-center border ${
                                message.isError
                                    ? "bg-red-500/20 text-red-400 border-red-500/50"
                                    : "bg-green-500/20 text-green-400 border-green-500/50"
                            }`}>
                                {message.text}
                            </p>
                        )}

                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-bold text-gray-400 ml-1">CURRENT PASSWORD</label>
                            <input
                                type="password"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                className="p-4 bg-gray-900 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
                                required
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-bold text-gray-400 ml-1">NEW PASSWORD</label>
                            <input
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                placeholder="Minimum 6 characters"
                                className="p-4 bg-gray-900 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="mt-4 p-4 bg-teal-500 hover:bg-teal-600 text-black font-black text-lg rounded-xl transition-colors shadow-lg shadow-teal-500/20"
                        >
                            UPDATE PASSWORD
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
