import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MdMenu, MdNotifications, MdDarkMode, MdLightMode } from 'react-icons/md'
import PortalSidebar from './PortalSidebar'
import { useTheme } from './ThemeContext'

// User info per role (mock — will come from auth context in real app)
const ROLE_USER = {
    admin:  { name: 'Alex Thompson', initials: 'AT', avatarGradient: 'from-purple-500 to-indigo-600', roleLabel: 'Global Admin' },
    pad:    { name: 'Mike Chen',     initials: 'MC', avatarGradient: 'from-cyan-500 to-blue-600',    roleLabel: 'Program Admin' },
    member: { name: 'Sarah Johnson', initials: 'SJ', avatarGradient: 'from-emerald-500 to-teal-600', roleLabel: 'Member' },
}

export default function PortalLayout({ title, children, role = 'admin' }) {
    const [isOpen, setIsOpen] = useState(false)
    const [showNotif, setShowNotif] = useState(false)
    const [showUserMenu, setShowUserMenu] = useState(false)
    const { isDark, toggleTheme } = useTheme()

    const user = ROLE_USER[role] || ROLE_USER.admin

    useEffect(() => {
        document.title = `${title} | AltusFlow`
    }, [title])

    const t = {
        bg:      isDark ? 'bg-gray-950' : 'bg-gray-100',
        topbar:  isDark ? 'bg-gray-900 border-gray-700/50 text-white' : 'bg-white border-gray-200 text-gray-800',
        iconBtn: isDark ? 'text-gray-300 hover:text-white hover:bg-gray-700/60' : 'text-gray-500 hover:text-gray-800 hover:bg-gray-100',
        content: isDark ? 'text-gray-100' : 'text-gray-800',
        dropdown: isDark ? 'bg-gray-800 border-gray-700 text-gray-100' : 'bg-white border-gray-200 text-gray-800',
        dropItem: isDark ? 'border-gray-700 hover:bg-gray-700/50' : 'border-gray-100 hover:bg-gray-50',
    }

    return (
        <div className={`flex min-h-screen ${t.bg} transition-colors duration-300`}>
            <PortalSidebar isOpen={isOpen} onToggle={() => setIsOpen(!isOpen)} role={role} />

            {/* Main content */}
            <div className="flex-1 flex flex-col lg:ml-64 min-w-0">

                {/* Top bar */}
                <motion.div
                    className={`sticky top-0 z-30 border-b ${t.topbar} transition-colors duration-300`}
                    initial={{ y: -60, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ type: 'spring', damping: 25, stiffness: 260 }}
                >
                    <div className="flex items-center justify-between px-4 h-16 gap-4">

                        {/* Left — hamburger (mobile) */}
                        <motion.button
                            onClick={() => setIsOpen(!isOpen)}
                            className={`lg:hidden p-2 rounded-lg transition-colors ${t.iconBtn}`}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <MdMenu className="text-xl" />
                        </motion.button>

                        {/* Spacer */}
                        <div className="flex-1" />

                        {/* Right — actions */}
                        <div className="flex items-center gap-1">

                            {/* Theme toggle */}
                            <motion.button
                                onClick={toggleTheme}
                                className={`p-2 rounded-lg transition-colors ${t.iconBtn}`}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                title={isDark ? 'Switch to Light' : 'Switch to Dark'}
                            >
                                <AnimatePresence mode="wait">
                                    {isDark ? (
                                        <motion.span key="light" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                                            <MdLightMode className="text-xl text-yellow-400" />
                                        </motion.span>
                                    ) : (
                                        <motion.span key="dark" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                                            <MdDarkMode className="text-xl" />
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                            </motion.button>

                            {/* Notifications */}
                            <div className="relative">
                                <motion.button
                                    onClick={() => { setShowNotif(!showNotif); setShowUserMenu(false) }}
                                    className={`p-2 rounded-lg transition-colors relative ${t.iconBtn}`}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <MdNotifications className="text-xl" />
                                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
                                </motion.button>

                                <AnimatePresence>
                                    {showNotif && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 8, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 8, scale: 0.95 }}
                                            transition={{ duration: 0.15 }}
                                            className={`absolute right-0 mt-2 w-72 rounded-xl shadow-xl border overflow-hidden z-50 ${t.dropdown}`}
                                        >
                                            <div className={`px-4 py-3 border-b font-semibold text-sm ${isDark ? 'border-gray-700' : 'border-gray-100'}`}>
                                                Notifications
                                            </div>
                                            {[
                                                'Exception on ORD005 — CrelioHealth timeout',
                                                'New client OptimizeHealth created',
                                                'Lisa Wong invitation pending',
                                            ].map((n, i) => (
                                                <div key={i} className={`px-4 py-3 text-sm border-b last:border-0 cursor-pointer transition-colors ${t.dropItem}`}>
                                                    {n}
                                                </div>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* User avatar + menu */}
                            <div className="relative ml-1">
                                <motion.button
                                    onClick={() => { setShowUserMenu(!showUserMenu); setShowNotif(false) }}
                                    className="flex items-center gap-2 p-1 rounded-lg transition-colors"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <div className={`w-8 h-8 rounded-full bg-linear-to-br ${user.avatarGradient} flex items-center justify-center shadow-md`}>
                                        <span className="text-white text-xs font-bold leading-none">{user.initials}</span>
                                    </div>
                                    <div className="hidden sm:block text-left">
                                        <p className={`text-xs font-semibold leading-tight ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>{user.name}</p>
                                        <p className={`text-[10px] leading-tight ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{user.roleLabel}</p>
                                    </div>
                                </motion.button>

                                <AnimatePresence>
                                    {showUserMenu && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 8, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 8, scale: 0.95 }}
                                            transition={{ duration: 0.15 }}
                                            className={`absolute right-0 mt-2 w-48 rounded-xl shadow-xl border overflow-hidden z-50 ${t.dropdown}`}
                                        >
                                            <div className={`px-4 py-3 border-b ${isDark ? 'border-gray-700' : 'border-gray-100'}`}>
                                                <p className="text-sm font-semibold">{user.name}</p>
                                                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{user.roleLabel}</p>
                                            </div>
                                            <a href="/login" className={`block px-4 py-2.5 text-sm text-red-500 cursor-pointer transition-colors ${isDark ? 'hover:bg-gray-700/50' : 'hover:bg-gray-50'}`}>
                                                Sign out
                                            </a>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Page content */}
                <motion.div
                    className={`flex-1 p-6 transition-colors duration-300 ${t.content}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                >
                    {children}
                </motion.div>
            </div>

            {/* Click-away backdrops */}
            {(showNotif || showUserMenu) && (
                <div className="fixed inset-0 z-20" onClick={() => { setShowNotif(false); setShowUserMenu(false) }} />
            )}
        </div>
    )
}
