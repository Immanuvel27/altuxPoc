import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
    MdWarning, MdBusiness, MdListAlt, MdPeople,
    MdEmail, MdColorLens, MdReceipt, MdTrendingUp,
} from 'react-icons/md'
import { useTheme } from '../../Components/ThemeContext'
import { clients, orders, users } from '../../mockData/adminData'

const openExceptions = orders.filter(o => o.exceptionFlag && o.exceptions.some(e => !e.resolved))
const activeClients  = clients.filter(c => c.status === 'Active').length
const totalOrdersMTD = clients.reduce((sum, c) => sum + c.ordersMTD, 0)
const totalMembers   = clients.reduce((sum, c) => sum + c.activeMembers, 0)

const recentActivity = [...orders]
    .sort((a, b) => {
        const aLatest = a.statusHistory[a.statusHistory.length - 1]?.timestamp || a.orderDate
        const bLatest = b.statusHistory[b.statusHistory.length - 1]?.timestamp || b.orderDate
        return new Date(bLatest) - new Date(aLatest)
    })
    .slice(0, 5)

const STATUS_COLORS = {
    'Order Received': { bg: 'bg-blue-100',    text: 'text-blue-800'    },
    'Kit Shipped':    { bg: 'bg-indigo-100',  text: 'text-indigo-800'  },
    'Sample Received':{ bg: 'bg-amber-100',   text: 'text-amber-800'   },
    'Processing':     { bg: 'bg-orange-100',  text: 'text-orange-800'  },
    'Results Ready':  { bg: 'bg-emerald-100', text: 'text-emerald-800' },
}

const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { delay, duration: 0.35 },
})

export default function AdminDashboard() {
    const { isDark } = useTheme()
    const navigate   = useNavigate()

    const card   = isDark ? 'bg-gray-900 border-gray-700/50' : 'bg-white border-gray-200'
    const muted  = isDark ? 'text-gray-400' : 'text-gray-500'
    const border = isDark ? 'border-gray-700/50' : 'border-gray-100'

    const quickLinks = [
        { label: 'Order Management',  path: '/admin/orders',         icon: MdListAlt,   color: 'text-indigo-500' },
        { label: 'Client Management', path: '/admin/clients',        icon: MdBusiness,  color: 'text-cyan-500'   },
        { label: 'User Management',   path: '/admin/users',          icon: MdPeople,    color: 'text-violet-500' },
        { label: 'Email Triggers',    path: '/admin/communications', icon: MdEmail,     color: 'text-amber-500'  },
        { label: 'Branding',          path: '/admin/branding',       icon: MdColorLens, color: 'text-pink-500'   },
        { label: 'Invoices',          path: '/admin/invoices',       icon: MdReceipt,   color: 'text-emerald-500'},
    ]

    return (
        <div className="space-y-6 max-w-7xl mx-auto">

            {/* Page header */}
            <motion.div {...fadeUp(0)}>
                <h1 className="text-2xl font-bold">Admin Dashboard</h1>
                <p className={`text-sm mt-1 ${muted}`}>Platform-wide overview — AltusFlow 2.0</p>
            </motion.div>

            {/* Primary metric cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Open Exceptions — clickable */}
                <motion.button
                    {...fadeUp(0.05)}
                    onClick={() => navigate('/admin/orders', { state: { filterExceptions: true } })}
                    className={`relative text-left rounded-2xl border p-5 shadow-sm hover:shadow-md transition-all group ${card}`}
                >
                    <div className="flex items-start justify-between">
                        <div>
                            <p className={`text-xs font-medium uppercase tracking-wide ${muted}`}>Open Exceptions</p>
                            <p className="text-4xl font-bold mt-1 text-red-500">{openExceptions.length}</p>
                            <p className={`text-xs mt-1 ${muted}`}>Requires attention</p>
                        </div>
                        <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <MdWarning className="text-xl text-red-500" />
                        </div>
                    </div>
                    <p className="text-xs text-red-400 mt-3 font-medium">Click to view exception queue →</p>
                </motion.button>

                {/* Active Clients */}
                <motion.div {...fadeUp(0.1)} className={`rounded-2xl border p-5 shadow-sm ${card}`}>
                    <div className="flex items-start justify-between">
                        <div>
                            <p className={`text-xs font-medium uppercase tracking-wide ${muted}`}>Active Clients</p>
                            <p className="text-4xl font-bold mt-1">{activeClients}</p>
                            <p className={`text-xs mt-1 ${muted}`}>Live programs</p>
                        </div>
                        <div className="w-10 h-10 rounded-xl bg-cyan-100 flex items-center justify-center">
                            <MdBusiness className="text-xl text-cyan-600" />
                        </div>
                    </div>
                </motion.div>

                {/* Orders MTD */}
                <motion.div {...fadeUp(0.15)} className={`rounded-2xl border p-5 shadow-sm ${card}`}>
                    <div className="flex items-start justify-between">
                        <div>
                            <p className={`text-xs font-medium uppercase tracking-wide ${muted}`}>Orders This Month</p>
                            <p className="text-4xl font-bold mt-1">{totalOrdersMTD}</p>
                            <p className={`text-xs mt-1 ${muted}`}>Across all clients</p>
                        </div>
                        <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center">
                            <MdListAlt className="text-xl text-indigo-600" />
                        </div>
                    </div>
                </motion.div>

                {/* Total Members */}
                <motion.div {...fadeUp(0.2)} className={`rounded-2xl border p-5 shadow-sm ${card}`}>
                    <div className="flex items-start justify-between">
                        <div>
                            <p className={`text-xs font-medium uppercase tracking-wide ${muted}`}>Total Members</p>
                            <p className="text-4xl font-bold mt-1">{totalMembers}</p>
                            <p className={`text-xs mt-1 ${muted}`}>Active enrollments</p>
                        </div>
                        <div className="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center">
                            <MdPeople className="text-xl text-violet-600" />
                        </div>
                    </div>
                </motion.div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Recent Activity */}
                <motion.div {...fadeUp(0.25)} className={`lg:col-span-2 rounded-2xl border shadow-sm ${card}`}>
                    <div className={`flex items-center justify-between px-5 py-4 border-b ${border}`}>
                        <div className="flex items-center gap-2">
                            <MdTrendingUp className="text-lg text-purple-500" />
                            <h2 className="font-semibold text-sm">Recent Order Activity</h2>
                        </div>
                        <button
                            onClick={() => navigate('/admin/orders')}
                            className="text-xs text-purple-500 hover:text-purple-400 font-medium"
                        >
                            View all →
                        </button>
                    </div>
                    <div className="divide-y divide-gray-100 dark:divide-gray-700/30">
                        {recentActivity.map((order, i) => {
                            const latestStep = order.statusHistory[order.statusHistory.length - 1]
                            const sc = STATUS_COLORS[order.status] || { bg: 'bg-gray-100', text: 'text-gray-700' }
                            return (
                                <motion.div
                                    key={order.id}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.3 + i * 0.06 }}
                                    className={`flex items-center justify-between px-5 py-3.5 cursor-pointer transition-colors ${isDark ? 'hover:bg-gray-800/50' : 'hover:bg-gray-50'}`}
                                    onClick={() => navigate('/admin/orders')}
                                >
                                    <div className="min-w-0">
                                        <p className="text-sm font-medium truncate">{order.memberName}</p>
                                        <p className={`text-xs truncate ${muted}`}>{order.id} · {order.clientName} · {order.serviceName}</p>
                                    </div>
                                    <div className="flex items-center gap-2 shrink-0 ml-3">
                                        {order.exceptionFlag && (
                                            <MdWarning className="text-sm text-red-500" />
                                        )}
                                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${sc.bg} ${sc.text}`}>
                                            {order.status}
                                        </span>
                                    </div>
                                </motion.div>
                            )
                        })}
                    </div>
                </motion.div>

                {/* Quick Links */}
                <motion.div {...fadeUp(0.3)} className={`rounded-2xl border shadow-sm ${card}`}>
                    <div className={`px-5 py-4 border-b ${border}`}>
                        <h2 className="font-semibold text-sm">Quick Navigation</h2>
                    </div>
                    <div className="p-4 grid grid-cols-2 gap-2">
                        {quickLinks.map((link, i) => {
                            const Icon = link.icon
                            return (
                                <motion.button
                                    key={link.path}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.35 + i * 0.05 }}
                                    whileHover={{ scale: 1.04 }}
                                    whileTap={{ scale: 0.96 }}
                                    onClick={() => navigate(link.path)}
                                    className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border transition-all ${isDark ? 'border-gray-700/50 hover:bg-gray-800' : 'border-gray-100 hover:bg-gray-50'}`}
                                >
                                    <Icon className={`text-2xl ${link.color}`} />
                                    <span className={`text-[11px] font-medium text-center leading-tight ${muted}`}>{link.label}</span>
                                </motion.button>
                            )
                        })}
                    </div>
                </motion.div>
            </div>

            {/* Client summary strip */}
            <motion.div {...fadeUp(0.4)} className={`rounded-2xl border shadow-sm ${card}`}>
                <div className={`px-5 py-4 border-b ${border}`}>
                    <h2 className="font-semibold text-sm">Client Overview</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className={`text-xs uppercase tracking-wide ${muted} ${isDark ? 'bg-gray-800/50' : 'bg-gray-50'}`}>
                                <th className="text-left px-5 py-3 font-medium">Client</th>
                                <th className="text-left px-5 py-3 font-medium">Program</th>
                                <th className="text-center px-5 py-3 font-medium">Members</th>
                                <th className="text-center px-5 py-3 font-medium">Orders MTD</th>
                                <th className="text-left px-5 py-3 font-medium">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {clients.map((c, i) => (
                                <motion.tr
                                    key={c.id}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.45 + i * 0.06 }}
                                    className={`border-t cursor-pointer transition-colors ${border} ${isDark ? 'hover:bg-gray-800/40' : 'hover:bg-gray-50'}`}
                                    onClick={() => navigate('/admin/clients')}
                                >
                                    <td className="px-5 py-3.5">
                                        <div className="flex items-center gap-2.5">
                                            <div className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-bold" style={{ backgroundColor: c.primaryColor }}>
                                                {c.name.charAt(0)}
                                            </div>
                                            <span className="font-medium">{c.name}</span>
                                        </div>
                                    </td>
                                    <td className={`px-5 py-3.5 ${muted}`}>{c.programName}</td>
                                    <td className="px-5 py-3.5 text-center font-medium">{c.activeMembers}</td>
                                    <td className="px-5 py-3.5 text-center font-medium">{c.ordersMTD}</td>
                                    <td className="px-5 py-3.5">
                                        <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">{c.status}</span>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </motion.div>
        </div>
    )
}
