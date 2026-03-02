import React from 'react'
import { motion } from 'framer-motion'
import { MdNotifications, MdSecurity, MdColorLens, MdLanguage } from 'react-icons/md'
import { useTheme } from '../Components/ThemeContext'

export default function Settings() {
    const { isDark } = useTheme()

    const settingsSections = [
        { icon: MdNotifications, title: 'Notifications', description: 'Manage your notification preferences', color: 'from-blue-500 to-blue-600' },
        { icon: MdSecurity, title: 'Security', description: 'Update password and security settings', color: 'from-green-500 to-green-600' },
        { icon: MdColorLens, title: 'Appearance', description: 'Customize theme and display options', color: 'from-purple-500 to-purple-600' },
        { icon: MdLanguage, title: 'Language', description: 'Change language and region settings', color: 'from-orange-500 to-orange-600' }
    ]

    const heading = isDark ? 'text-gray-100' : 'text-gray-800'
    const sub = isDark ? 'text-gray-400' : 'text-gray-600'
    const card = isDark
        ? 'bg-gray-800 border border-gray-700'
        : 'bg-white border border-gray-200'

    return (
        <div className="p-6">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h1 className={`text-3xl font-bold mb-2 ${heading}`}>Settings</h1>
                <p className={`mb-6 ${sub}`}>Customize your experience</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {settingsSections.map((section, index) => {
                    const IconComponent = section.icon
                    return (
                        <motion.div
                            key={section.title}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ scale: 1.05, y: -5 }}
                            className={`p-6 rounded-xl shadow-lg cursor-pointer transition-colors duration-300 ${card}`}
                        >
                            <div className={`w-12 h-12 bg-linear-to-br ${section.color} rounded-lg flex items-center justify-center mb-4`}>
                                <IconComponent className="text-2xl text-white" />
                            </div>
                            <h3 className={`text-xl font-bold mb-2 ${heading}`}>{section.title}</h3>
                            <p className={sub}>{section.description}</p>
                        </motion.div>
                    )
                })}
            </div>
        </div>
    )
}
