import React, { useState } from 'react'
import Sidebar from './Sidebar'

export default function Layout({ title, children }) {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar Component */}
            <Sidebar isOpen={isOpen} onToggle={() => setIsOpen(!isOpen)} />

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Top Bar */}
                <div className="bg-white shadow-sm p-4 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        {/* Hamburger Menu - Mobile Only */}
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition"
                        >
                            ☰
                        </button>
                        {/* <h2 className="text-xl font-semibold text-gray-800">ALtux</h2> */}
                    </div>
                    <div className="flex items-center space-x-4">
                        <h2 className='text-2xl text-center text-primary font-bold'>{title}</h2>
                    </div>
                    <div className="flex items-center space-x-4">
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition">🔔</button>
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition">👤</button>
                    </div>
                </div>

                {/* Content Area */}
                <div className="flex-1 p-6">
                    {children}
                </div>
            </div>
        </div>
    )
}
