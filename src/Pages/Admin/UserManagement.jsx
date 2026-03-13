import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MdClose, MdAdd, MdSearch } from 'react-icons/md'
import { useTheme } from '../../Components/ThemeContext'
import { users as initialUsers, clients } from '../../mockData/adminData'

const ROLE_STYLE = {
    GlobalAdmin: { bg: 'bg-purple-100', text: 'text-purple-700' },
    PAD:         { bg: 'bg-cyan-100',   text: 'text-cyan-700'   },
    Member:      { bg: 'bg-emerald-100',text: 'text-emerald-700'},
}
const STATUS_STYLE = {
    Active:   { bg: 'bg-emerald-100', text: 'text-emerald-700' },
    Pending:  { bg: 'bg-amber-100',   text: 'text-amber-700'   },
    Inactive: { bg: 'bg-gray-100',    text: 'text-gray-600'    },
}

function InviteModal({ onClose, onInvite, isDark }) {
    const [form, setForm] = useState({ email: '', role: 'PAD', clientId: '' })
    const [error, setError] = useState('')

    const input = isDark
        ? 'bg-gray-800 border-gray-700 text-gray-100 placeholder-gray-500 focus:border-purple-500'
        : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400 focus:border-purple-500'

    const submit = () => {
        if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) { setError('Valid email required'); return }
        if (form.role === 'PAD' && !form.clientId) { setError('Client is required for PAD role'); return }
        onInvite({
            id: 'USR' + Date.now(),
            name: form.email.split('@')[0],
            email: form.email,
            role: form.role,
            clientId: form.clientId || null,
            clientName: clients.find(c => c.id === form.clientId)?.name || null,
            lastLogin: null,
            status: 'Pending',
            invitedDate: new Date().toISOString().slice(0, 10),
        })
        onClose()
    }

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
            <motion.div initial={{ scale: 0.93, y: 20, opacity: 0 }} animate={{ scale: 1, y: 0, opacity: 1 }} exit={{ scale: 0.93, opacity: 0 }}
                className={`w-full max-w-sm rounded-2xl shadow-2xl ${isDark ? 'bg-gray-900' : 'bg-white'}`} onClick={e => e.stopPropagation()}>
                <div className={`flex items-center justify-between px-6 py-4 border-b ${isDark ? 'border-gray-700' : 'border-gray-100'}`}>
                    <h2 className="font-semibold">Invite User</h2>
                    <button onClick={onClose} className={`p-2 rounded-lg ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}><MdClose /></button>
                </div>
                <div className="px-6 py-5 space-y-4">
                    <div>
                        <label className={`block text-xs font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Email Address</label>
                        <input value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} placeholder="user@example.com"
                            className={`w-full px-3 py-2 text-sm rounded-lg border outline-none transition-colors ${input}`} />
                    </div>
                    <div>
                        <label className={`block text-xs font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Role</label>
                        <select value={form.role} onChange={e => setForm(p => ({ ...p, role: e.target.value, clientId: '' }))}
                            className={`w-full px-3 py-2 text-sm rounded-lg border outline-none ${input}`}>
                            <option value="GlobalAdmin">GlobalAdmin</option>
                            <option value="PAD">PAD</option>
                        </select>
                    </div>
                    {form.role === 'PAD' && (
                        <div>
                            <label className={`block text-xs font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Assign to Client</label>
                            <select value={form.clientId} onChange={e => setForm(p => ({ ...p, clientId: e.target.value }))}
                                className={`w-full px-3 py-2 text-sm rounded-lg border outline-none ${input}`}>
                                <option value="">Select client...</option>
                                {clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                            </select>
                        </div>
                    )}
                    {error && <p className="text-xs text-red-500">{error}</p>}
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        A magic link invitation will be sent. Expires in 72 hours.
                    </p>
                </div>
                <div className={`flex justify-end gap-3 px-6 py-4 border-t ${isDark ? 'border-gray-700' : 'border-gray-100'}`}>
                    <button onClick={onClose} className={`px-4 py-2 text-sm rounded-lg ${isDark ? 'text-gray-300 hover:bg-gray-800' : 'text-gray-600 hover:bg-gray-100'}`}>Cancel</button>
                    <button onClick={submit} className="px-4 py-2 text-sm font-medium rounded-lg bg-purple-600 hover:bg-purple-700 text-white transition-colors">Send Invitation</button>
                </div>
            </motion.div>
        </motion.div>
    )
}

export default function UserManagement() {
    const { isDark } = useTheme()
    const [users, setUsers]         = useState(initialUsers)
    const [showInvite, setShowInvite] = useState(false)
    const [filterRole,   setFilterRole]   = useState('all')
    const [filterClient, setFilterClient] = useState('all')
    const [search, setSearch]             = useState('')

    const card   = isDark ? 'bg-gray-900 border-gray-700/50' : 'bg-white border-gray-200'
    const muted  = isDark ? 'text-gray-400' : 'text-gray-500'
    const border = isDark ? 'border-gray-700/50' : 'border-gray-100'
    const input  = isDark ? 'bg-gray-800 border-gray-700 text-gray-100 placeholder-gray-500' : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400'

    const filtered = users.filter(u => {
        if (filterRole   !== 'all' && u.role     !== filterRole)   return false
        if (filterClient !== 'all' && u.clientId !== filterClient) return false
        if (search && ![u.name, u.email].some(f => f?.toLowerCase().includes(search.toLowerCase()))) return false
        return true
    })

    const deactivate   = (id) => setUsers(prev => prev.map(u => u.id === id ? { ...u, status: 'Inactive' } : u))
    const changeRole   = (id, role) => setUsers(prev => prev.map(u => u.id === id ? { ...u, role } : u))
    const resendInvite = (id) => alert(`Invitation resent to ${users.find(u => u.id === id)?.email}`)

    return (
        <div className="space-y-5 max-w-7xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">User Management</h1>
                    <p className={`text-sm mt-1 ${muted}`}>Invite and manage platform users</p>
                </div>
                <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={() => setShowInvite(true)}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-xl bg-purple-600 hover:bg-purple-700 text-white transition-colors shadow-sm">
                    <MdAdd className="text-lg" /> Invite User
                </motion.button>
            </motion.div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                    { label: 'Total Users',   value: users.length,                                      color: 'text-purple-500' },
                    { label: 'Global Admins', value: users.filter(u => u.role === 'GlobalAdmin').length, color: 'text-indigo-500' },
                    { label: 'PAD Users',     value: users.filter(u => u.role === 'PAD').length,         color: 'text-cyan-600'   },
                    { label: 'Pending',       value: users.filter(u => u.status === 'Pending').length,   color: 'text-amber-500'  },
                ].map((s, i) => (
                    <motion.div key={s.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 + i * 0.05 }} className={`rounded-2xl border p-4 shadow-sm ${card}`}>
                        <p className={`text-xs font-medium ${muted}`}>{s.label}</p>
                        <p className={`text-3xl font-bold mt-1 ${s.color}`}>{s.value}</p>
                    </motion.div>
                ))}
            </div>

            {/* Table */}
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className={`rounded-2xl border shadow-sm ${card}`}>
                {/* Filters */}
                <div className={`flex flex-wrap items-center gap-3 px-5 py-4 border-b ${border}`}>
                    <div className="relative flex-1 min-w-[160px]">
                        <MdSearch className={`absolute left-3 top-1/2 -translate-y-1/2 text-lg ${muted}`} />
                        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search users..."
                            className={`w-full pl-9 pr-3 py-2 text-sm rounded-lg border outline-none ${input}`} />
                    </div>
                    <select value={filterRole} onChange={e => setFilterRole(e.target.value)} className={`text-sm px-3 py-2 rounded-lg border outline-none ${input}`}>
                        <option value="all">All Roles</option>
                        <option value="GlobalAdmin">GlobalAdmin</option>
                        <option value="PAD">PAD</option>
                    </select>
                    <select value={filterClient} onChange={e => setFilterClient(e.target.value)} className={`text-sm px-3 py-2 rounded-lg border outline-none ${input}`}>
                        <option value="all">All Clients</option>
                        {clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                    <span className={`text-xs ml-auto ${muted}`}>{filtered.length} user{filtered.length !== 1 ? 's' : ''}</span>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className={`text-xs uppercase tracking-wide ${muted} ${isDark ? 'bg-gray-800/50' : 'bg-gray-50'}`}>
                                <th className="text-left px-5 py-3 font-medium">User</th>
                                <th className="text-left px-5 py-3 font-medium">Role</th>
                                <th className="text-left px-5 py-3 font-medium">Client</th>
                                <th className="text-left px-5 py-3 font-medium">Last Login</th>
                                <th className="text-left px-5 py-3 font-medium">Status</th>
                                <th className="text-right px-5 py-3 font-medium">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map((u, i) => {
                                const rs = ROLE_STYLE[u.role]   || { bg: 'bg-gray-100', text: 'text-gray-700' }
                                const ss = STATUS_STYLE[u.status] || { bg: 'bg-gray-100', text: 'text-gray-700' }
                                return (
                                    <motion.tr key={u.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }}
                                        className={`border-t ${border}`}>
                                        <td className="px-5 py-3.5">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-linear-to-br from-purple-500 to-indigo-600 flex items-center justify-center shrink-0">
                                                    <span className="text-white text-xs font-bold">{u.name.charAt(0)}</span>
                                                </div>
                                                <div>
                                                    <p className="font-medium">{u.name}</p>
                                                    <p className={`text-xs ${muted}`}>{u.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-5 py-3.5">
                                            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${rs.bg} ${rs.text}`}>{u.role}</span>
                                        </td>
                                        <td className={`px-5 py-3.5 ${muted}`}>{u.clientName || '—'}</td>
                                        <td className={`px-5 py-3.5 text-xs ${muted}`}>
                                            {u.lastLogin ? new Date(u.lastLogin).toLocaleDateString('en-US', { dateStyle: 'medium' }) : 'Never'}
                                        </td>
                                        <td className="px-5 py-3.5">
                                            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${ss.bg} ${ss.text}`}>{u.status}</span>
                                        </td>
                                        <td className="px-5 py-3.5">
                                            <div className="flex items-center justify-end gap-3">
                                                {u.status === 'Pending' && (
                                                    <button onClick={() => resendInvite(u.id)} className="text-xs text-purple-500 hover:text-purple-400 font-medium">Resend</button>
                                                )}
                                                {u.status === 'Active' && (
                                                    <>
                                                        <select value={u.role} onChange={e => changeRole(u.id, e.target.value)}
                                                            className={`text-xs px-2 py-1 rounded-lg border outline-none ${isDark ? 'bg-gray-800 border-gray-700 text-gray-100' : 'bg-gray-50 border-gray-200'}`}>
                                                            <option value="GlobalAdmin">GlobalAdmin</option>
                                                            <option value="PAD">PAD</option>
                                                        </select>
                                                        <button onClick={() => deactivate(u.id)} className="text-xs text-red-500 hover:text-red-400 font-medium">Deactivate</button>
                                                    </>
                                                )}
                                                {u.status === 'Inactive' && (
                                                    <span className={`text-xs ${muted}`}>Deactivated</span>
                                                )}
                                            </div>
                                        </td>
                                    </motion.tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </motion.div>

            <AnimatePresence>
                {showInvite && <InviteModal onClose={() => setShowInvite(false)} onInvite={u => setUsers(prev => [...prev, u])} isDark={isDark} />}
            </AnimatePresence>
        </div>
    )
}
