import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MdMenu, MdNotifications, MdDarkMode, MdLightMode } from 'react-icons/md'
import Sidebar from './Sidebar'
import { useTheme } from './ThemeContext'

export default function Layout({ title, children }) {
    const [isOpen, setIsOpen] = useState(false)
    const [showNotif, setShowNotif] = useState(false)
    const { isDark, toggleTheme } = useTheme()

    useEffect(() => {
        document.title = `${title} | AltuxDX`
    }, [title])

    const user = { name: 'Admin User' }
    const avatarLetter = user.name?.trim().charAt(0).toUpperCase() || '?'

    const theme = {
        bg: isDark ? 'bg-gray-950' : 'bg-gray-100',
        topbar: isDark
            ? 'bg-gray-900 border-gray-700/50 text-white'
            : 'bg-white border-gray-200 text-gray-800',
        iconBtn: isDark
            ? 'text-gray-300 hover:text-white hover:bg-gray-700/60'
            : 'text-gray-500 hover:text-gray-800 hover:bg-gray-100',
        content: isDark ? 'text-gray-100' : 'text-gray-800',
    }

    return (
        <div className={`flex min-h-screen ${theme.bg} transition-colors duration-300`}>
            <Sidebar isOpen={isOpen} onToggle={() => setIsOpen(!isOpen)} />

            {/* Main Content */}
            <div className="flex-1 flex flex-col lg:ml-64">

                {/* Top Bar */}
                <motion.div
                    className={`sticky top-0 z-30 border-b ${theme.topbar} transition-colors duration-300`}
                    initial={{ y: -60, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ type: 'spring', damping: 25, stiffness: 260 }}
                >
                    <div className="flex items-center justify-between px-4 h-16 gap-4">

                        {/* Left — Hamburger */}
                        <div className="flex items-center">
                            <motion.button
                                onClick={() => setIsOpen(!isOpen)}
                                className={`lg:hidden p-2 rounded-lg transition-colors ${theme.iconBtn}`}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <MdMenu className="text-xl" />
                            </motion.button>
                        </div>

                        {/* Center — Page Title */}
                        {/* <AnimatePresence mode="wait">
                            <motion.h2
                                key={title}
                                className="text-lg font-bold tracking-wide bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent whitespace-nowrap"
                                initial={{ opacity: 0, y: -8 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 8 }}
                                transition={{ duration: 0.25 }}
                            >
                                {title}
                            </motion.h2>
                        </AnimatePresence> */}

                        {/* Right — Actions */}
                        <div className="flex items-center gap-1">

                            {/* Theme Toggle */}
                            <motion.button
                                onClick={toggleTheme}
                                className={`p-2 rounded-lg transition-colors ${theme.iconBtn}`}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                title={isDark ? 'Switch to Light' : 'Switch to Dark'}
                            >
                                <AnimatePresence mode="wait">
                                    {isDark ? (
                                        <motion.span
                                            key="light"
                                            initial={{ rotate: -90, opacity: 0 }}
                                            animate={{ rotate: 0, opacity: 1 }}
                                            exit={{ rotate: 90, opacity: 0 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <MdLightMode className="text-xl text-yellow-400" />
                                        </motion.span>
                                    ) : (
                                        <motion.span
                                            key="dark"
                                            initial={{ rotate: 90, opacity: 0 }}
                                            animate={{ rotate: 0, opacity: 1 }}
                                            exit={{ rotate: -90, opacity: 0 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <MdDarkMode className="text-xl" />
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                            </motion.button>

                            {/* Notifications */}
                            <div className="relative">
                                <motion.button
                                    onClick={() => setShowNotif(!showNotif)}
                                    className={`p-2 rounded-lg transition-colors relative ${theme.iconBtn}`}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <MdNotifications className="text-xl" />
                                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-offset-1 ring-transparent" />
                                </motion.button>

                                <AnimatePresence>
                                    {showNotif && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 8, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 8, scale: 0.95 }}
                                            transition={{ duration: 0.15 }}
                                            className={`absolute right-0 mt-2 w-72 rounded-xl shadow-xl border overflow-hidden z-50 ${isDark ? 'bg-gray-800 border-gray-700 text-gray-100' : 'bg-white border-gray-200 text-gray-800'}`}
                                        >
                                            <div className="px-4 py-3 border-b border-current/10 font-semibold text-sm">Notifications</div>
                                            {['New user registered', 'Report generated', 'System update available'].map((n, i) => (
                                                <div key={i} className={`px-4 py-3 text-sm border-b last:border-0 cursor-pointer transition-colors ${isDark ? 'border-gray-700 hover:bg-gray-700/50' : 'border-gray-100 hover:bg-gray-50'}`}>
                                                    {n}
                                                </div>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* User Avatar */}
                            <motion.button
                                className="ml-1 flex items-center gap-2 p-1 rounded-lg transition-colors"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <div className="w-8 h-8 rounded-full bg-linear-to-br from-orange-500 to-rose-500 flex items-center justify-center shadow-md">
                                    <span className="text-white text-sm font-bold leading-none">{avatarLetter}</span>
                                </div>
                            </motion.button>
                        </div>
                    </div>
                </motion.div>

                {/* Content Area */}
                <motion.div
                    className={`flex-1 p-6 transition-colors duration-300 ${theme.content}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                >
                    {children}
                </motion.div>
            </div>

            {/* Notif backdrop */}
            {showNotif && (
                <div className="fixed inset-0 z-20" onClick={() => setShowNotif(false)} />
            )}
        </div>
    )
}
