import React from 'react'
import { motion } from 'framer-motion'
import { MdTrendingUp, MdShowChart, MdPeople } from 'react-icons/md'
import { useTheme } from '../../Components/ThemeContext'

export default function Analytics() {
    const { isDark } = useTheme()

    const stats = [
        { label: 'Total Revenue', value: '$45,231', change: '+12.5%', trend: 'up', icon: MdTrendingUp },
        { label: 'Active Users', value: '2,543', change: '+8.2%', trend: 'up', icon: MdPeople },
        { label: 'Conversion Rate', value: '3.24%', change: '-2.1%', trend: 'down', icon: MdShowChart },
        { label: 'Avg. Session', value: '4m 32s', change: '+5.3%', trend: 'up', icon: MdTrendingUp }
    ]

    const heading = isDark ? 'text-gray-100' : 'text-gray-800'
    const sub = isDark ? 'text-gray-400' : 'text-gray-600'
    const card = isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
    const statLabel = isDark ? 'text-gray-400' : 'text-gray-500'
    const statValue = isDark ? 'text-gray-100' : 'text-gray-800'
    const iconBgUp = isDark ? 'bg-green-900/40' : 'bg-green-100'
    const iconBgDown = isDark ? 'bg-red-900/40' : 'bg-red-100'

    return (
        <div className="p-6">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h1 className={`text-3xl font-bold mb-2 ${heading}`}>Analytics Dashboard</h1>
                <p className={`mb-6 ${sub}`}>Track your performance metrics</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => {
                    const IconComponent = stat.icon
                    return (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            whileHover={{ scale: 1.05, y: -5 }}
                            className={`p-6 rounded-xl shadow-lg transition-colors duration-300 ${card}`}
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className={`p-3 rounded-lg ${stat.trend === 'up' ? iconBgUp : iconBgDown}`}>
                                    <IconComponent className={`text-2xl ${stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}`} />
                                </div>
                                <span className={`text-sm font-semibold ${stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                                    {stat.change}
                                </span>
                            </div>
                            <h3 className={`text-sm font-medium mb-1 ${statLabel}`}>{stat.label}</h3>
                            <p className={`text-2xl font-bold ${statValue}`}>{stat.value}</p>
                        </motion.div>
                    )
                })}
            </div>
        </div>
    )
}
