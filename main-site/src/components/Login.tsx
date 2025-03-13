import { useState } from "react";
import React, { type FormEvent } from "react";

export default function Login(): JSX.Element {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>("");

    const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await fetch("/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                window.location.href = "/admin";
            } else {
                setError("Invalid credentials");
            }
        } catch (err) {
            setError("An error occurred. Please try again.");
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-gray-900 text-white rounded-md shadow-lg border border-orange-500">
            <h2 className="text-xl font-bold text-center text-orange-500 mb-4">Admin Login</h2>
            {error && <p className="text-red-500 text-center">{error}</p>}
            <form onSubmit={handleLogin} className="space-y-4">
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full p-2 bg-gray-800 border border-gray-600 rounded-md focus:ring-2 focus:ring-orange-500 focus:outline-none"
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-2 bg-gray-800 border border-gray-600 rounded-md focus:ring-2 focus:ring-orange-500 focus:outline-none"
                    required
                />
                <button
                    type="submit"
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-md transition duration-200"
                >
                    Login
                </button>
            </form>
        </div>
    );
}
