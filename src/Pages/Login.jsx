import React, { useState } from 'react'

export default function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('Username:', username, 'Password:', password)
    }

    const cards = [
        { id: 1, title: 'Feature One', description: 'Discover amazing features' },
        { id: 2, title: 'Feature Two', description: 'Experience seamless integration' }
    ]

    return (
        <div className="flex h-screen p-50">
            {/* Left Side - Image Background with Cards */}
            <div className="w-1/2 bg-cover bg-center relative" style={{
                backgroundImage: 'url(https://images.unsplash.com/photo-1497206365907-4d71bcdd2085?w=800)',
                backgroundPosition: 'center'
            }}>
                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-40"></div>

            </div>

            {/* Right Side - Login Form */}
            <div className="w-1/2 bg-gray-50 flex flex-col justify-center items-center px-8">
                <div className="w-full max-w-md">
                    <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
                        Login
                    </h1>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Username Field */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Username
                            </label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Enter your username"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                required
                            />
                        </div>

                        {/* Password Field */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Password
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                required
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
                        >
                            Sign In
                        </button>
                    </form>

                    {/* Additional Links */}
                    <div className="text-center mt-6 text-sm text-gray-600">
                        <p>Don't have an account? <a href="#" className="text-blue-600 hover:underline font-semibold">Sign up</a></p>
                    </div>
                </div>
            </div>
        </div>
    )
}
