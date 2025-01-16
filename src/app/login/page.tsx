"use client"

import React, { useState } from 'react';
import { UserCircle, Lock } from 'lucide-react';
import { useRouter } from "next/navigation";
import axios from 'axios';
import { storage } from '../../../utils/storage';

const LoginInterface = () => {
    const [email, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        console.log("wer")
        const user = {
            email,
            password
        }

        const res = await axios.post('/api/login', user);

        const data = await res.data;
        const existingUser = storage.findUserByEmail(data.user.email);
        if (!existingUser) {
            setError("user not found");
            return;
        } else {
            localStorage.setItem("email", data.user.email);
            router.push("/");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center    p-6" style={{ backgroundImage: "url('/images/bg3.jpg')" }}>
            <div className="w-full max-w-md ">
                <div className="space-y-6 ">
                    <div className="text-center text-[2rem]">Login</div>
                    <form onSubmit={handleLogin} className="space-y-4">
                        {/* Username Input */}
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <UserCircle className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                value={email}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full pl-10 pr-3 py-2 rounded-md bg-gray-700 bg-opacity-50 text-white placeholder-gray-400 border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                placeholder="email"
                                required
                            />
                        </div>

                        {/* Password Input */}
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Lock className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full pl-10 pr-3 py-2 rounded-md bg-gray-700 bg-opacity-50 text-white placeholder-gray-400 border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                placeholder="Password"
                                required
                            />
                        </div>

                        {/* Remember Me and Forgot Password */}
                        <div className="flex items-center justify-between text-sm">
                            <label className="flex items-center text-gray-300">
                                <input
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                    className="mr-2 rounded border-gray-600 text-blue-500 focus:ring-blue-500"
                                />
                                Remember Me
                            </label>
                            <button type="button" className="text-gray-400 hover:text-blue-300">
                                Forgot Password?
                            </button>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="text-red-500 text-sm text-center">
                                {error}
                            </div>
                        )}

                        {/* Login Button */}
                        <button
                            type="submit"
                            className="w-full py-2 px-4 bg-gray-600 hover:bg-gray-700 text-white rounded-md transition-colors duration-200"
                        >
                            LOGIN
                        </button>

                        {/* Register Button */}
                        <button
                            type="button"
                            onClick={() => router.push("/register")}
                            className="w-full py-2 px-4 bg-transparent hover:bg-gray-700 text-white border border-gray-600 rounded-md transition-colors duration-200"
                        >
                            REGISTER
                        </button>
                    </form>
                </div>
            </div>

        </div>
    );
};

export default LoginInterface;

