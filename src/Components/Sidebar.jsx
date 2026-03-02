import React from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Sidebar({ isOpen, onToggle }) {
    const location = useLocation()

    const isActive = (path) => location.pathname === path

    const menuItems = [
        { name: 'Dashboard', path: '/home', icon: '📊' },
        { name: 'Profile', path: '/profile', icon: '👤' },
        { name: 'Settings', path: '/settings', icon: '⚙️' }
    ]

    return (
        <>
            {/* Off-canvas Backdrop - Mobile Only */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={onToggle}
                />
            )}

            {/* Sidebar */}
            <div
                className={`fixed lg:static left-0 top-0 min-h-screen lg:h-auto z-50 lg:z-auto w-64 bg-gray-800 text-white transition-all duration-300 flex flex-col ${
                    isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
                }`}
            >
                {/* Logo */}
                <div className="flex items-center justify-between p-4 border-b border-gray-700">
                    <h1 className="text-2xl font-bold text-black">ALtux</h1>
                    <button
                        onClick={onToggle}
                        className="lg:hidden p-2 hover:bg-gray-700 rounded-lg transition"
                    >
                        ✕
                    </button>
                </div>

                {/* Menu Items */}
                <nav className="flex-1 p-4 space-y-2">
                    {menuItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            onClick={onToggle}
                            className={`flex items-center space-x-3 p-3 rounded-lg transition ${
                                isActive(item.path)
                                    ? 'bg-blue-600 text-white'
                                    : 'text-gray-300 hover:bg-gray-700'
                            }`}
                        >
                            <span className="text-xl">{item.icon}</span>
                            <span className="text-sm font-medium">{item.name}</span>
                        </Link>
                    ))}
                </nav>

                {/* Logout Button */}
                <div className="p-4 border-t border-gray-700">
                    <Link
                        to="/login"
                        onClick={onToggle}
                        className="flex items-center space-x-3 p-3 rounded-lg transition text-gray-300 hover:bg-gray-700 hover:text-white"
                    >
                        <span className="text-xl">🚪</span>
                        <span className="text-sm font-medium">Logout</span>
                    </Link>
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-gray-700 text-xs text-gray-400">
                    <p>ALtux © 2024</p>
                </div>
            </div>
        </>
    )
}
