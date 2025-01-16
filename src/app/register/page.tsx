"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, User, Phone, Lock } from "lucide-react";
import axios from "axios";
import { storage } from "../../../utils/storage";
interface user {
    email: string
    username: string
    mobile: string
    password: string
    createdAt: Date
}
export default function Register() {
    const [formData, setFormData] = useState({
        email: "",
        username: "",
        mobile: "",
        password: "",
        confirmPassword: ""
    });
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        // Validate passwords match
        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        if (!formData.email) {
            setError("Please enter email")
            return
        }

        // Validate mobile number
        const mobileRegex = /^[0-9]{10}$/;
        if (!mobileRegex.test(formData.mobile)) {
            setError("Please enter a valid 10-digit mobile number");
            return;
        }

        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setError("Please enter a valid email address");
            return;
        }


        const newUser = {
            email: formData.email,
            username: formData.username,
            mobile: formData.mobile,
            password: formData.password,
            createdAt: new Date().toISOString()
        };

        try {
            const response = await axios.post('/api/register', newUser);
            const data = await response.data;

            if (!data.success) {
                setError(data.error);
            } else {
                localStorage.setItem('users', JSON.stringify(data.users));
                localStorage.setItem('email', JSON.stringify(data.user.email));
                router.push('/login');
            }
        } catch (err) {
            setError("An error occurred during registration");
        }
    };

    return (
        <div
            className="min-h-screen flex items-center justify-center p-6"
            style={{ backgroundImage: "url('/images/bg3.jpg')" }}
        >
            <div className="w-full max-w-md">
                <div className="space-y-6">
                    <div className="text-center text-[2rem] text-white">Register</div>

                    <form onSubmit={handleRegister} className="space-y-4">
                        {/* Email Input */}
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Mail className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full pl-10 pr-3 py-2 rounded-md bg-gray-700 bg-opacity-50 text-white placeholder-gray-400 border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                placeholder="Email"

                            />
                        </div>

                        {/* Username Input */}
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <User className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                className="w-full pl-10 pr-3 py-2 rounded-md bg-gray-700 bg-opacity-50 text-white placeholder-gray-400 border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                placeholder="Username"
                                required
                            />
                        </div>

                        {/* Mobile Input */}
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Phone className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="tel"
                                name="mobile"
                                value={formData.mobile}
                                onChange={handleChange}
                                className="w-full pl-10 pr-3 py-2 rounded-md bg-gray-700 bg-opacity-50 text-white placeholder-gray-400 border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                placeholder="Mobile Number"
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
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full pl-10 pr-3 py-2 rounded-md bg-gray-700 bg-opacity-50 text-white placeholder-gray-400 border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                placeholder="Password"
                                required
                            />
                        </div>

                        {/* Confirm Password Input */}
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Lock className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className="w-full pl-10 pr-3 py-2 rounded-md bg-gray-700 bg-opacity-50 text-white placeholder-gray-400 border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                placeholder="Confirm Password"
                                required
                            />
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="text-red-500 text-sm text-center">
                                {error}
                            </div>
                        )}

                        {/* Register Button */}
                        <button
                            type="submit"
                            className="w-full py-2 px-4 bg-gray-600 hover:bg-gray-700 text-white rounded-md transition-colors duration-200"
                        >
                            REGISTER
                        </button>

                        {/* Login Link */}
                        <button
                            type="button"
                            onClick={() => router.push("/login")}
                            className="w-full py-2 px-4 bg-transparent hover:bg-gray-700 text-white border border-gray-600 rounded-md transition-colors duration-200"
                        >
                            BACK TO LOGIN
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}