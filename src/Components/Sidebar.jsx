import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
    MdDashboard,
    MdPerson,
    MdSettings,
    MdLogout,
    MdClose,
    MdChevronRight,
    MdAnalytics,
    MdBarChart,
    MdShowChart,
    MdTableChart,
    MdNotifications,
    MdSecurity,
    MdLanguage,
    MdColorLens,
} from 'react-icons/md'
import {
    FaUsers,
    FaFileAlt,
    FaBox,
    FaSpinner
} from 'react-icons/fa'
import { useTheme } from './ThemeContext'

export default function Sidebar({ isOpen, onToggle }) {
    const location = useLocation()
    const [expandedItems, setExpandedItems] = useState({})
    const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024)
    const { isDark } = useTheme()

    useEffect(() => {
        const handleResize = () => setIsDesktop(window.innerWidth >= 1024)
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    const isActive = (path) => location.pathname === path
    const isParentActive = (children) => children?.some(child => location.pathname === child.path)

    const toggleExpand = (itemName) => {
        setExpandedItems(prev => ({
            ...prev,
            [itemName]: !prev[itemName]
        }))
    }

    // Theme tokens
    const s = {
        bg: isDark
            ? 'bg-linear-to-b from-gray-900 via-gray-800 to-gray-900'
            : 'bg-white',
        shadow: isDark ? 'shadow-2xl' : 'shadow-xl shadow-gray-200',
        border: isDark ? 'border-gray-700/50' : 'border-gray-200',
        itemDefault: isDark
            ? 'text-gray-300 hover:bg-gray-700/50 hover:text-white'
            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900',
        itemActive: 'bg-linear-to-r from-blue-600 to-blue-500 text-white shadow-lg',
        childDefault: isDark
            ? 'border-transparent text-gray-400 hover:bg-gray-700/30 hover:text-gray-200 hover:border-gray-600'
            : 'border-transparent text-gray-500 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300',
        childActive: isDark
            ? 'bg-blue-500/20 border-blue-500 text-blue-400'
            : 'bg-blue-50 border-blue-500 text-blue-600',
        closeBtn: isDark
            ? 'hover:bg-gray-700/50 text-gray-300'
            : 'hover:bg-gray-100 text-gray-500',
        logout: isDark
            ? 'text-gray-300 hover:bg-red-500/10 hover:text-red-400 border border-transparent hover:border-red-500/30'
            : 'text-gray-600 hover:bg-red-50 hover:text-red-500 border border-transparent hover:border-red-200',
        footer: isDark ? 'text-gray-500' : 'text-gray-400',
    }

    const menuItems = [
        {
            name: 'Dashboard',
            path: '/home',
            icon: MdDashboard,
            children: [
                { name: 'Analytics', path: '/home/analytics', icon: MdAnalytics },
                { name: 'Reports', path: '/home/reports', icon: MdBarChart },
                { name: 'Statistics', path: '/home/statistics', icon: MdShowChart },
                { name: 'Data Tables', path: '/home/tables', icon: MdTableChart }
            ]
        },
        {
            name: 'Users',
            path: '/users',
            icon: FaUsers,
            children: [
                { name: 'All Users', path: '/users/all', icon: MdPerson },
                { name: 'User Roles', path: '/users/roles', icon: MdSecurity }
            ]
        },
        {
            name: 'Products',
            path: '/products',
            icon: FaBox,
            children: [
                { name: 'All Products', path: '/products/all', icon: FaBox },
                { name: 'Categories', path: '/products/categories', icon: MdTableChart }
            ]
        },
        { name: 'Profile', path: '/profile', icon: MdPerson },
        { name: 'Loader Demo', path: '/loader-demo', icon: FaSpinner },
        {
            name: 'Settings',
            path: '/settings',
            icon: MdSettings,
            children: [
                { name: 'Notifications', path: '/settings/notifications', icon: MdNotifications },
                { name: 'Security', path: '/settings/security', icon: MdSecurity },
                { name: 'Appearance', path: '/settings/appearance', icon: MdColorLens },
                { name: 'Language', path: '/settings/language', icon: MdLanguage }
            ]
        }
    ]

    const renderMenuItem = (item) => {
        const hasChildren = item.children && item.children.length > 0
        const isExpanded = expandedItems[item.name]
        const IconComponent = item.icon

        if (hasChildren) {
            return (
                <div key={item.name}>
                    <motion.button
                        onClick={() => toggleExpand(item.name)}
                        className={`w-full flex items-center justify-between p-3 rounded-lg transition-all duration-200 ${
                            isParentActive(item.children) ? s.itemActive : s.itemDefault
                        }`}
                        whileHover={{ x: 4 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <div className="flex items-center space-x-3">
                            <IconComponent className="text-xl" />
                            <span className="text-sm font-medium">{item.name}</span>
                        </div>
                        <motion.div
                            animate={{ rotate: isExpanded ? 90 : 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <MdChevronRight className="text-lg" />
                        </motion.div>
                    </motion.button>

                    <AnimatePresence>
                        {isExpanded && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="overflow-hidden ml-4 mt-1 space-y-1"
                            >
                                {item.children.map((child) => {
                                    const ChildIconComponent = child.icon
                                    return (
                                        <motion.div
                                            key={child.path}
                                            initial={{ x: -10, opacity: 0 }}
                                            animate={{ x: 0, opacity: 1 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <Link
                                                to={child.path}
                                                onClick={onToggle}
                                                className={`flex items-center space-x-3 p-2.5 pl-4 rounded-lg transition-all duration-200 border-l-2 ${
                                                    isActive(child.path) ? s.childActive : s.childDefault
                                                }`}
                                            >
                                                <ChildIconComponent className="text-base" />
                                                <span className="text-sm">{child.name}</span>
                                            </Link>
                                        </motion.div>
                                    )
                                })}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            )
        }

        return (
            <motion.div
                key={item.path}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
            >
                <Link
                    to={item.path}
                    onClick={onToggle}
                    className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 ${
                        isActive(item.path) ? s.itemActive : s.itemDefault
                    }`}
                >
                    <IconComponent className="text-xl" />
                    <span className="text-sm font-medium">{item.name}</span>
                </Link>
            </motion.div>
        )
    }

    return (
        <>
            {/* Off-canvas Backdrop - Mobile Only */}
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

            {/* Sidebar */}
            <motion.div
                initial={false}
                animate={{ x: (isOpen || isDesktop) ? 0 : -320 }}
                transition={{ type: "spring", damping: 30, stiffness: 300 }}
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
                            className="w-10 h-10 bg-linear-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg"
                            whileHover={{ rotate: 360, scale: 1.1 }}
                            transition={{ duration: 0.5 }}
                        >
                            <span className="text-xl font-bold text-white">A</span>
                        </motion.div>
                        <h1 className="text-2xl font-bold bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                            AltuxDX
                        </h1>
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

                {/* Menu Items */}
                <motion.nav
                    className="flex-1 p-4 space-y-1 overflow-y-auto custom-scrollbar"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    {menuItems.map((item) => renderMenuItem(item))}
                </motion.nav>

                {/* Logout Button */}
                <motion.div
                    className={`p-4 border-t ${s.border}`}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    <motion.div whileHover={{ x: 4 }} whileTap={{ scale: 0.98 }}>
                        <Link
                            to="/login"
                            onClick={onToggle}
                            className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 ${s.logout}`}
                        >
                            <MdLogout className="text-xl" />
                            <span className="text-sm font-medium">Logout</span>
                        </Link>
                    </motion.div>
                </motion.div>

                {/* Footer */}
                <motion.div
                    className={`p-4 border-t ${s.border} text-xs ${s.footer}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    <p className="text-center">ALtux © 2026</p>
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
