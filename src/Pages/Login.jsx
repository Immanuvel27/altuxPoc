import React, { useState, useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

export default function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
    const passwordFieldRef = useRef(null)
    const leftEyeRef = useRef(null)
    const rightEyeRef = useRef(null)
    const navigation = useNavigate()

    // Smooth cursor tracking for left eye
    const leftMouseX = useMotionValue(0)
    const leftMouseY = useMotionValue(0)
    
    // Smooth cursor tracking for right eye
    const rightMouseX = useMotionValue(0)
    const rightMouseY = useMotionValue(0)

    const springConfig = { damping: 25, stiffness: 150 }
    const leftEyeX = useSpring(leftMouseX, springConfig)
    const leftEyeY = useSpring(leftMouseY, springConfig)
    const rightEyeX = useSpring(rightMouseX, springConfig)
    const rightEyeY = useSpring(rightMouseY, springConfig)

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY })

            // Track left eye
            if (leftEyeRef.current) {
                const rect = leftEyeRef.current.getBoundingClientRect()
                const eyeCenterX = rect.left + rect.width / 2
                const eyeCenterY = rect.top + rect.height / 2

                if (showPassword && passwordFieldRef.current) {
                    // Look at password field when shown
                    const passwordRect = passwordFieldRef.current.getBoundingClientRect()
                    const passwordCenterX = passwordRect.left + passwordRect.width / 2
                    const passwordCenterY = passwordRect.top + passwordRect.height / 2

                    const deltaX = passwordCenterX - eyeCenterX
                    const deltaY = passwordCenterY - eyeCenterY
                    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)

                    leftMouseX.set((deltaX / distance) * 8)
                    leftMouseY.set((deltaY / distance) * 8)
                } else {
                    // Follow cursor normally when password is hidden
                    const deltaX = e.clientX - eyeCenterX
                    const deltaY = e.clientY - eyeCenterY
                    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)

                    const maxDistance = 10
                    leftMouseX.set((deltaX / distance) * Math.min(distance / 30, maxDistance))
                    leftMouseY.set((deltaY / distance) * Math.min(distance / 30, maxDistance))
                }
            }

            // Track right eye
            if (rightEyeRef.current) {
                const rect = rightEyeRef.current.getBoundingClientRect()
                const eyeCenterX = rect.left + rect.width / 2
                const eyeCenterY = rect.top + rect.height / 2

                if (showPassword && passwordFieldRef.current) {
                    // Look at password field when shown
                    const passwordRect = passwordFieldRef.current.getBoundingClientRect()
                    const passwordCenterX = passwordRect.left + passwordRect.width / 2
                    const passwordCenterY = passwordRect.top + passwordRect.height / 2

                    const deltaX = passwordCenterX - eyeCenterX
                    const deltaY = passwordCenterY - eyeCenterY
                    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)

                    rightMouseX.set((deltaX / distance) * 8)
                    rightMouseY.set((deltaY / distance) * 8)
                } else {
                    // Follow cursor normally when password is hidden
                    const deltaX = e.clientX - eyeCenterX
                    const deltaY = e.clientY - eyeCenterY
                    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)

                    const maxDistance = 10
                    rightMouseX.set((deltaX / distance) * Math.min(distance / 30, maxDistance))
                    rightMouseY.set((deltaY / distance) * Math.min(distance / 30, maxDistance))
                }
            }
        }

        window.addEventListener('mousemove', handleMouseMove)
        return () => window.removeEventListener('mousemove', handleMouseMove)
    }, [showPassword, leftMouseX, leftMouseY, rightMouseX, rightMouseY])

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('Username:', username, 'Password:', password)
        if (username === 'admin' && password === '123') {
            navigation('/Home')
        }
    }

    const cards = [
        { id: 1, title: 'Feature One', description: 'Discover amazing features' },
        { id: 2, title: 'Feature Two', description: 'Experience seamless integration' }
    ]

    return (
        <div className="flex h-screen p-50 relative overflow-hidden">
            {/* Animated Eye Icon - Follows Cursor */}


            {/* Left Side - Image Background with Cards */}
            <motion.div
                className="w-1/2 bg-cover bg-center relative"
                style={{
                    backgroundImage: 'url(https://images.unsplash.com/photo-1497206365907-4d71bcdd2085?w=800)',
                    backgroundPosition: 'center'
                }}
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
            >
                <div className="absolute z-10 inset-0 flex items-center justify-center gap-16">
                    {/* Left eye */}
                    <motion.div
                        ref={leftEyeRef}
                        className="flex items-center justify-center"
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: "spring", duration: 1, delay: 0.2 }}
                    >
                        <motion.div
                            className="relative w-24 h-24 bg-white rounded-full flex items-center justify-center overflow-hidden shadow-2xl"
                            whileHover={{ scale: 1.1 }}
                            animate={{
                                boxShadow: showPassword
                                    ? "0 20px 60px rgba(59, 130, 246, 0.5)"
                                    : "0 20px 60px rgba(0, 0, 0, 0.3)"
                            }}
                        >
                            {/* Eye White */}
                            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center relative overflow-hidden">
                                {/* Iris - Follows Cursor */}
                                <motion.div
                                    className="absolute w-12 h-12 rounded-full flex items-center justify-center"
                                    style={{
                                        x: leftEyeX,
                                        y: leftEyeY,
                                        background: showPassword
                                            ? "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)"
                                            : "linear-gradient(135deg, #6b7280 0%, #374151 100%)"
                                    }}
                                >
                                    {/* Pupil */}
                                    <motion.div
                                        className="w-5 h-5 bg-black rounded-full"
                                        animate={{
                                            scale: showPassword ? [1, 1.2, 1] : 1
                                        }}
                                        transition={{ duration: 0.3 }}
                                    />
                                    {/* Glint */}
                                    <div className="absolute w-2 h-2 bg-white rounded-full top-2 left-2 opacity-80" />
                                </motion.div>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Right eye */}
                    <motion.div
                        ref={rightEyeRef}
                        className="flex items-center justify-center"
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: "spring", duration: 1, delay: 0.3 }}
                    >
                        <motion.div
                            className="relative w-24 h-24 bg-white rounded-full flex items-center justify-center overflow-hidden shadow-2xl"
                            whileHover={{ scale: 1.1 }}
                            animate={{
                                boxShadow: showPassword
                                    ? "0 20px 60px rgba(59, 130, 246, 0.5)"
                                    : "0 20px 60px rgba(0, 0, 0, 0.3)"
                            }}
                        >
                            {/* Eye White */}
                            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center relative overflow-hidden">
                                {/* Iris - Follows Cursor */}
                                <motion.div
                                    className="absolute w-12 h-12 rounded-full flex items-center justify-center"
                                    style={{
                                        x: rightEyeX,
                                        y: rightEyeY,
                                        background: showPassword
                                            ? "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)"
                                            : "linear-gradient(135deg, #6b7280 0%, #374151 100%)"
                                    }}
                                >
                                    {/* Pupil */}
                                    <motion.div
                                        className="w-5 h-5 bg-black rounded-full"
                                        animate={{
                                            scale: showPassword ? [1, 1.2, 1] : 1
                                        }}
                                        transition={{ duration: 0.3 }}
                                    />
                                    {/* Glint */}
                                    <div className="absolute w-2 h-2 bg-white rounded-full top-2 left-2 opacity-80" />
                                </motion.div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-black"></div>
            </motion.div>

            {/* Right Side - Login Form */}
            <motion.div
                className="w-1/2 bg-gray-50 flex flex-col justify-center items-center px-8"
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
            >
                <div className="w-full max-w-md">
                    <motion.h1
                        className="text-4xl font-bold text-gray-800 mb-8 text-center"
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                    >
                        Login
                    </motion.h1>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Username Field */}
                        <motion.div
                            initial={{ x: 20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.4, duration: 0.5 }}
                        >
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Username
                            </label>
                            <motion.input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Enter your username"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                required
                                whileFocus={{ scale: 1.02 }}
                            />
                        </motion.div>

                        {/* Password Field */}
                        <motion.div
                            initial={{ x: 20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.5, duration: 0.5 }}
                        >
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <motion.input
                                    ref={passwordFieldRef}
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter your password"
                                    className="w-full px-4 py-2 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                    required
                                    whileFocus={{ scale: 1.02 }}
                                />
                                <motion.button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    {showPassword ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                            <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                                        </svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                                            <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                                        </svg>
                                    )}
                                </motion.button>
                            </div>
                        </motion.div>

                        {/* Submit Button */}
                        <motion.button
                            type="submit"
                            className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.6, duration: 0.5 }}
                            whileHover={{ scale: 1.02, boxShadow: "0 10px 30px rgba(59, 130, 246, 0.3)" }}
                            whileTap={{ scale: 0.98 }}
                        >
                            Sign In
                        </motion.button>
                    </form>

                    {/* Additional Links */}
                    <motion.div
                        className="text-center mt-6 text-sm text-gray-600"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7, duration: 0.5 }}
                    >
                        <p>Don't have an account? <a href="#" className="text-blue-600 hover:underline font-semibold">Sign up</a></p>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    )
}
