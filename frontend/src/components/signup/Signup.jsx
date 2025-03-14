import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setUser } from "../../features/userSlice/slice";
import { config } from "../../config"

export default function Signup() {
    const dispatch = useDispatch()
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [userrole, setUserrole] = useState("student");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState({ username: "", userrole: "", email: "", password: "", confirmPassword: "" });
    const roleOptions = ["student", "teacher"]

    const navigate = useNavigate();
    // Email format validation
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    // Form submission handler
    const handleSubmit = async (e) => {
        e.preventDefault();

        let hasErrors = false;
        const newErrors = { username: "", userrole: "", email: "", password: "", confirmPassword: "" };

        // Validate email
        if (!validateEmail(email)) {
            newErrors.email = "Please enter a valid email address.";
            hasErrors = true;
        }

        // Validate password length
        if (password.length < 8) {
            newErrors.password = "Password must be at least 8 characters long.";
            hasErrors = true;
        }

        // Validate confirm password match
        if (password !== confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match.";
            hasErrors = true;
        }

        setErrors(newErrors);

        if (!hasErrors) {
            // Send data to backend
            try {
                const response = await fetch(`${config.backend_url}/api/auth/signup`,
                    {
                        method: "POST",
                        credentials: "include",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ name: username, role: userrole, email, password }),
                    });

                if (response.ok) {
                    const data = await response.json();
                    dispatch(setUser(data))
                    const res = await fetch(`${config.backend_url}/api/auth/sendEmail`,
                        {
                            method: "POST",
                            credentials: "include",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({ email, subject: "EmailVerification" }),
                        });
                    if (res.ok) {
                        alert("Verification email sent");
                        navigate("/verifyemailsent", { state: { email } });
                    }
                    else {
                        const er = await res.json();
                        alert(`Error: ${er.message}`);
                    }
                } else {
                    const errorData = await response.json();
                    alert(`Error: ${errorData.message}`);
                }
            } catch (error) {
                alert(`Network error: ${error.message}`);
            }
        }
    };

    return (
        <div className="mx-auto w-full max-w-7xl">
            {/* Signup Section */}
            <aside className="relative overflow-hidden text-black rounded-lg sm:mx-16 mx-2 sm:py-16">
                <div className="relative z-10 max-w-screen-md px-4 py-12 sm:py-20 mx-auto sm:px-6 lg:px-8 bg-white rounded-lg shadow-md">
                    <h2 className="text-3xl font-bold text-center sm:text-4xl">Create an Account</h2>
                    <p className="text-gray-600 text-center mt-4">Join Quizzers and start your journey today!</p>

                    <form className="space-y-6 mt-10" onSubmit={handleSubmit}>

                        {/* Name Input */}
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                                Username
                            </label>
                            <input
                                type="text"
                                id="username"
                                placeholder="Enter your name"
                                className={`mt-1 block w-full px-4 py-3 border ${errors.username ? "border-red-500" : "border-gray-300"
                                    } rounded-lg shadow-sm focus:ring-orange-700 focus:border-orange-700 sm:text-sm`}
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                            {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
                        </div>

                        {/* Role Input */}
                        <div>
                            <label htmlFor="userrole" className="block text-sm font-medium text-gray-700">
                                Role
                            </label>
                            <select value={userrole} onChange={(e) => setUserrole(e.target.value)} 
                                className={`mt-1 block w-full px-4 py-3 border ${errors.username ? "border-red-500" : "border-gray-300"
                                } rounded-lg shadow-sm focus:ring-orange-700 focus:border-orange-700 sm:text-sm`}    
                            >
                                {roleOptions.map((option, index) => (
                                    <option key={index} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                            {errors.userrole && <p className="text-red-500 text-sm mt-1">{errors.userrole}</p>}
                        </div>

                        {/* Email Input */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                placeholder="Enter your email"
                                className={`mt-1 block w-full px-4 py-3 border ${errors.email ? "border-red-500" : "border-gray-300"
                                    } rounded-lg shadow-sm focus:ring-orange-700 focus:border-orange-700 sm:text-sm`}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                        </div>

                        {/* Password Input */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                placeholder="Enter your password"
                                className={`mt-1 block w-full px-4 py-3 border ${errors.password ? "border-red-500" : "border-gray-300"
                                    } rounded-lg shadow-sm focus:ring-orange-700 focus:border-orange-700 sm:text-sm`}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                        </div>

                        {/* Confirm Password Input */}
                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                id="confirmPassword"
                                placeholder="Re-enter your password"
                                className={`mt-1 block w-full px-4 py-3 border ${errors.confirmPassword ? "border-red-500" : "border-gray-300"
                                    } rounded-lg shadow-sm focus:ring-orange-700 focus:border-orange-700 sm:text-sm`}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                            {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
                        </div>

                        {/* Signup Button */}
                        <button
                            type="submit"
                            className="w-full px-6 py-3 text-white bg-orange-700 rounded-lg font-medium hover:opacity-75"
                        >
                            Sign Up
                        </button>
                    </form>

                    {/* Login Link */}
                    <p className="text-center mt-4 text-gray-600">
                        Already have an account?{" "}
                        <Link to="/login" className="text-orange-700 hover:underline">
                            Log in here
                        </Link>
                    </p>
                </div>
            </aside>
        </div>
    );
}
