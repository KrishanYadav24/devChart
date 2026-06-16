"use client";

import Navbar from '@/components/Navbar'
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const CreateTask = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("low");
    const router = useRouter();

    useEffect(() => {
        // Simple check to see if user is logged in via an API call
        async function checkAuth() {
            const res = await fetch("/api/tasks");
            if (res.status === 401) {
                router.push("/");
            }
        }
        checkAuth();
    }, []);

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault();

        try {
            const response = await fetch("/api/tasks", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ title, description, priority }),
            });

            if (response.status === 401) {
                router.push("/");
                return;
            }

            if (response.ok) {
                setTitle("");
                setDescription("");
                setPriority("low");
                alert("Task created successfully!");
                router.push("/dashboard");
            } else {
                alert("Failed to create task.");
            }
        } catch (error) {
            console.error("Error creating task:", error);
            alert("Failed to create task.");
        }
    }

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <Navbar />
            <div className="max-w-4xl mx-auto p-6 mt-10">
                <h1 className="text-6xl font-black mb-8 text-teal-200 text-outline-black">Want to create a new task?</h1>

                <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-3xl border border-gray-700 shadow-2xl flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                        <label className="text-xl font-bold text-gray-400">What's the task name?</label>
                        <input
                            type="text"
                            placeholder="e.g. Drink water"
                            value={title}
                            onChange={(event) => setTitle(event.target.value)}
                            className="p-4 bg-gray-900 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                            required
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-xl font-bold text-gray-400">Describe it!!</label>
                        <textarea
                            placeholder="e.g. 5 liters a day"
                            value={description}
                            onChange={(event) => setDescription(event.target.value)}
                            className="p-4 bg-gray-900 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 h-32"
                            required
                        ></textarea>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-xl font-bold text-gray-400">How important is it?</label>
                        <select
                            value={priority}
                            onChange={(event) => setPriority(event.target.value)}
                            className="p-4 bg-gray-900 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 appearance-none"
                        >
                            <option value="low">🟢 Low</option>
                            <option value="medium">🟡 Medium</option>
                            <option value="high">🔴 High</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        className="mt-4 p-4 bg-teal-500 text-black font-black text-xl rounded-xl hover:bg-teal-600 transition-all shadow-lg shadow-teal-500/20"
                    >
                        CREATE TASK
                    </button>
                </form>
            </div>
        </div>
    )
}

export default CreateTask;
