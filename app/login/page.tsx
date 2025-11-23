"use client";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const adminEmail = "anupingle@gmail.com";
  const adminPassword = "admin@123";

  const handleLogin = () => {
    if (email === adminEmail && password === adminPassword) {
      document.cookie = "admin_auth=true; path=/;";
      window.location.href = "/admin";
    } else {
      alert("Invalid Email or Password!");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-8 w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white">
          Admin Login
        </h2>
        <p className="text-sm text-center text-gray-500 dark:text-gray-400 mb-6">
          Enter your credentials to proceed
        </p>

        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={handleLogin}
            className="w-full bg-blue-600 hover:bg-blue-700 transition rounded-lg text-white font-semibold py-2"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
