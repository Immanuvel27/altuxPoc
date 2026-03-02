import React from 'react'
import { motion } from 'framer-motion'
import { MdPerson, MdEmail, MdPhone, MdLocationOn } from 'react-icons/md'
import { useTheme } from '../Components/ThemeContext'

export default function Profile() {
    const { isDark } = useTheme()

    const card = isDark
        ? 'bg-gray-800 border border-gray-700'
        : 'bg-white'
    const field = isDark
        ? 'border border-gray-700 bg-gray-700/30'
        : 'border border-gray-200'
    const heading = isDark ? 'text-gray-100' : 'text-gray-800'
    const sub = isDark ? 'text-gray-400' : 'text-gray-600'
    const label = isDark ? 'text-gray-400' : 'text-gray-500'
    const value = isDark ? 'text-gray-100' : 'text-gray-800'

    return (
        <div className="p-6">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h1 className={`text-3xl font-bold mb-2 ${heading}`}>Profile</h1>
                <p className={`mb-6 ${sub}`}>Manage your account information</p>
            </motion.div>

            <div className={`max-w-3xl rounded-xl shadow-lg p-8 ${card}`}>
                <div className="flex items-center space-x-6 mb-8">
                    <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className="w-24 h-24 bg-linear-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center"
                    >
                        <MdPerson className="text-5xl text-white" />
                    </motion.div>
                    <div>
                        <h2 className={`text-2xl font-bold ${heading}`}>Admin User</h2>
                        <p className={sub}>admin@altux.com</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <motion.div whileHover={{ scale: 1.02 }} className={`p-4 rounded-lg ${field}`}>
                        <div className="flex items-center space-x-3">
                            <MdEmail className="text-2xl text-blue-500 shrink-0" />
                            <div>
                                <p className={`text-sm ${label}`}>Email</p>
                                <p className={`font-medium ${value}`}>admin@altux.com</p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div whileHover={{ scale: 1.02 }} className={`p-4 rounded-lg ${field}`}>
                        <div className="flex items-center space-x-3">
                            <MdPhone className="text-2xl text-green-500 shrink-0" />
                            <div>
                                <p className={`text-sm ${label}`}>Phone</p>
                                <p className={`font-medium ${value}`}>+1 234 567 8900</p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div whileHover={{ scale: 1.02 }} className={`p-4 rounded-lg md:col-span-2 ${field}`}>
                        <div className="flex items-center space-x-3">
                            <MdLocationOn className="text-2xl text-red-500 shrink-0" />
                            <div>
                                <p className={`text-sm ${label}`}>Location</p>
                                <p className={`font-medium ${value}`}>San Francisco, CA, USA</p>
                            </div>
                        </div>
                    </motion.div>
                </div>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-8 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors duration-200"
                >
                    Edit Profile
                </motion.button>
            </div>
        </div>
    )
}
