import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
    MdDashboard, MdClose, MdLogout, MdListAlt, MdBusiness,
    MdPeople, MdEmail, MdColorLens, MdReceipt, MdScience,
    MdBarChart, MdNotifications, MdSettings, MdPerson,
} from 'react-icons/md'
import { useTheme } from './ThemeContext'

// ─── Per-role nav config ───────────────────────────────────────────────────
const ROLE_CONFIG = {
    admin: {
        portalName: 'AltusFlow',
        roleLabel: 'Global Admin',
        gradientFrom: 'from-purple-600',
        gradientTo: 'to-indigo-600',
        activeGradient: 'bg-linear-to-r from-purple-600 to-indigo-600',
        footerText: 'AltusDX Admin © 2026',
        navItems: [
            { name: 'Dashboard',          path: '/admin/dashboard',       icon: MdDashboard },
            { name: 'Order Management',   path: '/admin/orders',          icon: MdListAlt },
            // { name: 'Client Management',  path: '/admin/clients',         icon: MdBusiness },
            // { name: 'User Management',    path: '/admin/users',           icon: MdPeople },
            // { name: 'Email Triggers',     path: '/admin/communications',  icon: MdEmail },
            // { name: 'Branding',           path: '/admin/branding',        icon: MdColorLens },
            // { name: 'Invoices',           path: '/admin/invoices',        icon: MdReceipt },
        ],
    },
    pad: {
        portalName: 'AltusFlow',
        roleLabel: 'Program Admin',
        gradientFrom: 'from-cyan-600',
        gradientTo: 'to-blue-600',
        activeGradient: 'bg-linear-to-r from-cyan-600 to-blue-600',
        footerText: 'AltusDX PAD © 2026',
        navItems: [
            { name: 'Dashboard',    path: '/pad/dashboard', icon: MdDashboard },
            { name: 'Members',      path: '/pad/members',   icon: MdPeople },
            { name: 'Orders & Kits',path: '/pad/orders',    icon: MdListAlt },
        ],
    },
    member: {
        portalName: 'AltusFlow',
        roleLabel: 'Member',
        gradientFrom: 'from-emerald-600',
        gradientTo: 'to-teal-600',
        activeGradient: 'bg-linear-to-r from-emerald-600 to-teal-600',
        footerText: 'AltusDX © 2026',
        navItems: [
            { name: 'Dashboard',     path: '/member/dashboard',      icon: MdDashboard },
            { name: 'Lab Results',   path: '/member/results',         icon: MdScience },
            { name: 'Orders & Kits', path: '/member/orders',          icon: MdListAlt },
            { name: 'Notifications', path: '/member/notifications',   icon: MdNotifications },
            { name: 'Settings',      path: '/member/settings',        icon: MdSettings },
        ],
    },
}

export default function PortalSidebar({ isOpen, onToggle, role = 'admin' }) {
    const location = useLocation()
    const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024)
    const { isDark } = useTheme()

    const config = ROLE_CONFIG[role] || ROLE_CONFIG.admin

    useEffect(() => {
        const handleResize = () => setIsDesktop(window.innerWidth >= 1024)
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    const isActive = (path) => location.pathname === path

    const s = {
        bg: isDark
            ? 'bg-linear-to-b from-gray-900 via-gray-800 to-gray-900'
            : 'bg-white',
        shadow: isDark ? 'shadow-2xl' : 'shadow-xl shadow-gray-200',
        border: isDark ? 'border-gray-700/50' : 'border-gray-200',
        itemDefault: isDark
            ? 'text-gray-300 hover:bg-gray-700/50 hover:text-white'
            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900',
        closeBtn: isDark ? 'hover:bg-gray-700/50 text-gray-300' : 'hover:bg-gray-100 text-gray-500',
        logout: isDark
            ? 'text-gray-300 hover:bg-red-500/10 hover:text-red-400 border border-transparent hover:border-red-500/30'
            : 'text-gray-600 hover:bg-red-50 hover:text-red-500 border border-transparent hover:border-red-200',
        footer: isDark ? 'text-gray-500' : 'text-gray-400',
    }

    return (
        <>
            {/* Mobile backdrop */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                        onClick={onToggle}
                    />
                )}
            </AnimatePresence>

            {/* Sidebar panel */}
            <motion.div
                initial={false}
                animate={{ x: (isOpen || isDesktop) ? 0 : -320 }}
                transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                className={`fixed left-0 top-0 h-screen w-64 z-50 flex flex-col transition-colors duration-300 ${s.bg} ${s.shadow}`}
            >
                {/* Logo */}
                <motion.div
                    className={`flex items-center justify-between px-5 h-16 border-b ${s.border}`}
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                >
                    <div className="flex items-center space-x-2">
                        <motion.div
                            className={`w-9 h-9 bg-linear-to-br ${config.gradientFrom} ${config.gradientTo} rounded-lg flex items-center justify-center shadow-lg`}
                            whileHover={{ rotate: 360, scale: 1.1 }}
                            transition={{ duration: 0.5 }}
                        >
                            <span className="text-base font-bold text-white">A</span>
                        </motion.div>
                        <div>
                            <h1 className={`text-lg font-bold bg-linear-to-r ${config.gradientFrom} ${config.gradientTo} bg-clip-text text-transparent leading-tight`}>
                                {config.portalName}
                            </h1>
                            <p className={`text-[10px] font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'} leading-tight`}>
                                {config.roleLabel}
                            </p>
                        </div>
                    </div>
                    <motion.button
                        onClick={onToggle}
                        className={`lg:hidden p-2 rounded-lg transition-colors ${s.closeBtn}`}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <MdClose className="text-xl" />
                    </motion.button>
                </motion.div>

                {/* Nav items */}
                <motion.nav
                    className="flex-1 p-4 space-y-1 overflow-y-auto custom-scrollbar"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    {config.navItems.map((item, i) => {
                        const Icon = item.icon
                        const active = isActive(item.path)
                        return (
                            <motion.div
                                key={item.path}
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.15 + i * 0.05 }}
                                whileHover={{ x: 4 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <Link
                                    to={item.path}
                                    onClick={() => !isDesktop && onToggle()}
                                    className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 ${
                                        active
                                            ? `${config.activeGradient} text-white shadow-lg`
                                            : s.itemDefault
                                    }`}
                                >
                                    <Icon className="text-xl shrink-0" />
                                    <span className="text-sm font-medium">{item.name}</span>
                                </Link>
                            </motion.div>
                        )
                    })}
                </motion.nav>

                {/* Logout */}
                <motion.div
                    className={`p-4 border-t ${s.border}`}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    <motion.div whileHover={{ x: 4 }} whileTap={{ scale: 0.98 }}>
                        <Link
                            to="/login"
                            className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 ${s.logout}`}
                        >
                            <MdLogout className="text-xl" />
                            <span className="text-sm font-medium">Logout</span>
                        </Link>
                    </motion.div>
                </motion.div>

                {/* Footer */}
                <motion.div
                    className={`px-5 pb-4 text-xs ${s.footer}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    <p className="text-center">{config.footerText}</p>
                </motion.div>
            </motion.div>

            <style>{`
                .custom-scrollbar::-webkit-scrollbar { width: 6px; }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)'};
                    border-radius: 3px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: ${isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.15)'};
                    border-radius: 3px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: ${isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.25)'};
                }
            `}</style>
        </>
    )
}
