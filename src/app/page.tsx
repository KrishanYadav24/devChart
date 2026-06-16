"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";

export default function Home() {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (username.length < 6 || password.length < 6) {
      setError("Username and password must be at least 6 characters");
      return;
    }

    const endpoint = isLogin ? "/api/auth/login" : "/api/auth/register";

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        if (isLogin) {
          router.push("/dashboard");
        } else {
          alert("Registration successful! Please login.");
          setIsLogin(true);
        }
      } else {
        setError(data.message || "An error occurred");
      }
    } catch (err) {
      setError("Something went wrong. Try again.");
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />

      <div className="flex flex-col lg:flex-row items-center justify-center gap-12 p-8 mt-10">
        <div className="max-w-xl text-center lg:text-left">
          <h1 className="text-8xl font-black text-teal-200 text-outline-black mb-6">
            devChart
          </h1>
          <p className="text-2xl font-medium text-gray-300">
            A powerful Kanban tool for modern developers.
            <br />
            Manage tasks, track time, and stay productive.
          </p>
          <img src="/logo.svg" alt="Logo" className="w-64 h-auto mx-auto lg:mx-0 mt-8 opacity-80" />
        </div>

        <div className="w-full max-w-md bg-gray-800 p-8 rounded-3xl border border-gray-700 shadow-2xl">
          <h2 className="text-3xl font-bold text-teal-200 mb-6 text-center">
            {isLogin ? "Welcome Back" : "Join devChart"}
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {error && (
              <p className="bg-red-500/20 text-red-400 p-3 rounded-xl text-sm text-center border border-red-500/50">
                {error}
              </p>
            )}

            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-gray-400 ml-1">USERNAME</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Minimum 6 characters"
                className="p-4 bg-gray-900 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-gray-400 ml-1">PASSWORD</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimum 6 characters"
                className="p-4 bg-gray-900 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
                required
              />
            </div>

            <button
              type="submit"
              className="mt-4 p-4 bg-teal-500 hover:bg-teal-600 text-black font-black text-lg rounded-xl transition-colors shadow-lg shadow-teal-500/20"
            >
              {isLogin ? "LOGIN" : "REGISTER"}
            </button>
          </form>

          <p className="mt-6 text-center text-gray-400">
            {isLogin ? "New to devChart?" : "Already have an account?"}
            <button
              onClick={() => { setIsLogin(!isLogin); setError(""); }}
              className="ml-2 text-teal-300 hover:underline font-bold"
            >
              {isLogin ? "Create Account" : "Login here"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
