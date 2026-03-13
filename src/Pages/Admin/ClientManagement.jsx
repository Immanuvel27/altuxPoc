import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MdClose, MdBusiness, MdAdd, MdChevronRight, MdCheck, MdPeople, MdListAlt } from 'react-icons/md'
import { useTheme } from '../../Components/ThemeContext'
import { clients as initialClients, serviceCodes, users } from '../../mockData/adminData'

function CreateClientModal({ onClose, onCreate, isDark }) {
    const [form, setForm] = useState({ name: '', programName: '', primaryContact: '', primaryContactEmail: '', subdomainPrefix: '' })
    const [errors, setErrors] = useState({})

    const input = isDark
        ? 'bg-gray-800 border-gray-700 text-gray-100 placeholder-gray-500 focus:border-purple-500'
        : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400 focus:border-purple-500'
    const label = isDark ? 'text-gray-300' : 'text-gray-700'

    const validate = () => {
        const e = {}
        if (!form.name.trim())               e.name = 'Client name is required'
        if (!form.programName.trim())         e.programName = 'Program name is required'
        if (!form.primaryContact.trim())      e.primaryContact = 'Primary contact is required'
        if (!form.subdomainPrefix.trim())     e.subdomainPrefix = 'Subdomain prefix is required'
        if (/\s/.test(form.subdomainPrefix))  e.subdomainPrefix = 'No spaces allowed'
        setErrors(e)
        return Object.keys(e).length === 0
    }

    const submit = () => {
        if (!validate()) return
        onCreate({
            id: 'CLT00' + Date.now(),
            ...form,
            logo: null,
            primaryColor: '#6d28d9',
            activeMembers: 0,
            ordersMTD: 0,
            totalOrders: 0,
            status: 'Active',
            createdDate: new Date().toISOString().slice(0, 10),
            serviceCodes: [],
            sslStatus: 'Pending',
        })
        onClose()
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.93, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.93, opacity: 0 }}
                className={`w-full max-w-md rounded-2xl shadow-2xl ${isDark ? 'bg-gray-900' : 'bg-white'}`}
                onClick={e => e.stopPropagation()}
            >
                <div className={`flex items-center justify-between px-6 py-4 border-b ${isDark ? 'border-gray-700' : 'border-gray-100'}`}>
                    <h2 className="font-semibold">Create New Client</h2>
                    <button onClick={onClose} className={`p-2 rounded-lg ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}><MdClose /></button>
                </div>

                <div className="px-6 py-5 space-y-4">
                    {[
                        { key: 'name',                label: 'Client Name',           placeholder: 'e.g. BodyHealth' },
                        { key: 'programName',         label: 'Program Name',          placeholder: 'e.g. BodyHealth Wellness Program' },
                        { key: 'primaryContact',      label: 'Primary Contact',        placeholder: 'Full name' },
                        { key: 'primaryContactEmail', label: 'Contact Email',          placeholder: 'contact@client.com' },
                        { key: 'subdomainPrefix',     label: 'Subdomain Prefix',       placeholder: 'e.g. bodyhealth → bodyhealth.altusflow.com' },
                    ].map(({ key, label: lbl, placeholder }) => (
                        <div key={key}>
                            <label className={`block text-xs font-medium mb-1 ${label}`}>{lbl}</label>
                            <input
                                value={form[key]}
                                onChange={e => setForm(prev => ({ ...prev, [key]: e.target.value }))}
                                placeholder={placeholder}
                                className={`w-full px-3 py-2 text-sm rounded-lg border outline-none transition-colors ${input}`}
                            />
                            {errors[key] && <p className="text-xs text-red-500 mt-1">{errors[key]}</p>}
                        </div>
                    ))}
                </div>

                <div className={`flex justify-end gap-3 px-6 py-4 border-t ${isDark ? 'border-gray-700' : 'border-gray-100'}`}>
                    <button onClick={onClose} className={`px-4 py-2 text-sm rounded-lg ${isDark ? 'text-gray-300 hover:bg-gray-800' : 'text-gray-600 hover:bg-gray-100'}`}>Cancel</button>
                    <button onClick={submit} className="px-4 py-2 text-sm font-medium rounded-lg bg-purple-600 hover:bg-purple-700 text-white transition-colors">
                        Create Client
                    </button>
                </div>
            </motion.div>
        </motion.div>
    )
}

function ClientDetailPanel({ client, onClose, onUpdateServiceCodes, isDark }) {
    const border = isDark ? 'border-gray-700/50' : 'border-gray-100'
    const muted  = isDark ? 'text-gray-400' : 'text-gray-500'
    const card   = isDark ? 'bg-gray-800' : 'bg-gray-50'

    const clientUsers = users.filter(u => u.clientId === client.id)
    const [assigned, setAssigned] = useState(new Set(client.serviceCodes))

    const toggleCode = (code) => {
        setAssigned(prev => {
            const next = new Set(prev)
            next.has(code) ? next.delete(code) : next.add(code)
            return next
        })
    }

    const save = () => {
        onUpdateServiceCodes(client.id, [...assigned])
        onClose()
    }

    return (
        <AnimatePresence>
            <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 30, stiffness: 280 }}
                className={`fixed right-0 top-0 h-full w-full max-w-lg z-50 flex flex-col shadow-2xl overflow-y-auto ${isDark ? 'bg-gray-900' : 'bg-white'}`}
            >
                <div className={`flex items-center justify-between px-5 py-4 border-b ${border} sticky top-0 z-10 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg flex items-center justify-center text-white font-bold text-sm" style={{ backgroundColor: client.primaryColor }}>
                            {client.name.charAt(0)}
                        </div>
                        <div>
                            <p className="font-semibold">{client.name}</p>
                            <p className={`text-xs ${muted}`}>{client.programName}</p>
                        </div>
                    </div>
                    <button onClick={onClose} className={`p-2 rounded-lg ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}><MdClose /></button>
                </div>

                <div className="p-5 space-y-5">
                    {/* Profile */}
                    <div className={`rounded-xl p-4 ${card}`}>
                        <p className={`text-xs font-semibold uppercase tracking-wide ${muted} mb-3`}>Client Profile</p>
                        <div className="grid grid-cols-2 gap-2">
                            {[
                                ['Primary Contact', client.primaryContact],
                                ['Contact Email',   client.primaryContactEmail],
                                ['Subdomain',       `${client.subdomainPrefix}.altusflow.com`],
                                ['SSL Status',      client.sslStatus],
                                ['Created',         client.createdDate],
                                ['GHL Sub-Account', client.ghlSubAccount],
                            ].map(([k, v]) => (
                                <div key={k}>
                                    <p className={`text-[10px] font-medium uppercase tracking-wide ${muted}`}>{k}</p>
                                    <p className="text-xs font-medium mt-0.5">{v}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-3">
                        {[
                            { label: 'Members', value: client.activeMembers, icon: MdPeople },
                            { label: 'Orders MTD', value: client.ordersMTD, icon: MdListAlt },
                            { label: 'Total Orders', value: client.totalOrders, icon: MdListAlt },
                        ].map(({ label, value, icon: Icon }) => (
                            <div key={label} className={`rounded-xl p-3 text-center ${card}`}>
                                <p className="text-xl font-bold">{value}</p>
                                <p className={`text-[10px] ${muted} mt-0.5`}>{label}</p>
                            </div>
                        ))}
                    </div>

                    {/* Service Codes */}
                    <div>
                        <p className={`text-xs font-semibold uppercase tracking-wide ${muted} mb-3`}>Assigned Service Codes</p>
                        <div className="space-y-2">
                            {serviceCodes.map(sc => (
                                <div
                                    key={sc.code}
                                    onClick={() => toggleCode(sc.code)}
                                    className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                                        assigned.has(sc.code)
                                            ? 'border-purple-400 bg-purple-50'
                                            : isDark ? 'border-gray-700 bg-gray-800 hover:border-gray-600' : 'border-gray-200 hover:border-gray-300'
                                    }`}
                                >
                                    <div>
                                        <p className="text-sm font-medium">{sc.name}</p>
                                        <p className={`text-xs ${muted}`}>{sc.description} · ${sc.price}</p>
                                    </div>
                                    <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-colors ${assigned.has(sc.code) ? 'bg-purple-600 border-purple-600' : isDark ? 'border-gray-600' : 'border-gray-300'}`}>
                                        {assigned.has(sc.code) && <MdCheck className="text-white text-xs" />}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button onClick={save} className="w-full mt-3 py-2 text-sm font-medium rounded-xl bg-purple-600 hover:bg-purple-700 text-white transition-colors">
                            Save Service Codes
                        </button>
                    </div>

                    {/* Users */}
                    <div>
                        <p className={`text-xs font-semibold uppercase tracking-wide ${muted} mb-3`}>Users ({clientUsers.length})</p>
                        {clientUsers.length === 0 ? (
                            <p className={`text-sm ${muted}`}>No users assigned to this client.</p>
                        ) : (
                            <div className="space-y-2">
                                {clientUsers.map(u => (
                                    <div key={u.id} className={`flex items-center justify-between p-3 rounded-xl ${card}`}>
                                        <div>
                                            <p className="text-sm font-medium">{u.name}</p>
                                            <p className={`text-xs ${muted}`}>{u.email}</p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${u.role === 'PAD' ? 'bg-cyan-100 text-cyan-700' : 'bg-purple-100 text-purple-700'}`}>{u.role}</span>
                                            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${u.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : u.status === 'Pending' ? 'bg-amber-100 text-amber-700' : 'bg-gray-100 text-gray-700'}`}>{u.status}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    )
}

export default function ClientManagement() {
    const { isDark } = useTheme()
    const [clients, setClients] = useState(initialClients)
    const [showCreate, setShowCreate]   = useState(false)
    const [selectedClient, setSelectedClient] = useState(null)

    const card   = isDark ? 'bg-gray-900 border-gray-700/50' : 'bg-white border-gray-200'
    const muted  = isDark ? 'text-gray-400' : 'text-gray-500'
    const border = isDark ? 'border-gray-700/50' : 'border-gray-100'

    const handleCreate = (newClient) => setClients(prev => [...prev, newClient])
    const handleUpdateServiceCodes = (id, codes) => {
        setClients(prev => prev.map(c => c.id === id ? { ...c, serviceCodes: codes } : c))
    }

    return (
        <div className="space-y-5 max-w-7xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">Client Management</h1>
                    <p className={`text-sm mt-1 ${muted}`}>Onboard and configure client programs</p>
                </div>
                <motion.button
                    whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                    onClick={() => setShowCreate(true)}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-xl bg-purple-600 hover:bg-purple-700 text-white transition-colors shadow-sm"
                >
                    <MdAdd className="text-lg" /> Create Client
                </motion.button>
            </motion.div>

            {/* Summary cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                    { label: 'Total Clients',   value: clients.length,                                   color: 'text-purple-500', bg: 'bg-purple-100' },
                    { label: 'Active Clients',  value: clients.filter(c => c.status === 'Active').length, color: 'text-emerald-600', bg: 'bg-emerald-100' },
                    { label: 'Total Members',   value: clients.reduce((s, c) => s + c.activeMembers, 0),  color: 'text-cyan-600',    bg: 'bg-cyan-100'    },
                ].map((stat, i) => (
                    <motion.div key={stat.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 + i * 0.05 }} className={`rounded-2xl border p-5 shadow-sm ${card}`}>
                        <p className={`text-xs font-medium uppercase tracking-wide ${muted}`}>{stat.label}</p>
                        <p className={`text-3xl font-bold mt-1 ${stat.color}`}>{stat.value}</p>
                    </motion.div>
                ))}
            </div>

            {/* Table */}
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className={`rounded-2xl border shadow-sm ${card}`}>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className={`text-xs uppercase tracking-wide ${muted} ${isDark ? 'bg-gray-800/50' : 'bg-gray-50'}`}>
                                <th className="text-left px-5 py-3 font-medium">Client</th>
                                <th className="text-left px-5 py-3 font-medium">Program</th>
                                <th className="text-center px-5 py-3 font-medium">Members</th>
                                <th className="text-center px-5 py-3 font-medium">Orders MTD</th>
                                <th className="text-left px-5 py-3 font-medium">Created</th>
                                <th className="text-left px-5 py-3 font-medium">Status</th>
                                <th className="text-left px-5 py-3 font-medium">Service Codes</th>
                                <th className="px-5 py-3" />
                            </tr>
                        </thead>
                        <tbody>
                            {clients.map((c, i) => (
                                <motion.tr
                                    key={c.id}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.2 + i * 0.06 }}
                                    onClick={() => setSelectedClient(c)}
                                    className={`border-t cursor-pointer transition-colors ${border} ${isDark ? 'hover:bg-gray-800/50' : 'hover:bg-gray-50'}`}
                                >
                                    <td className="px-5 py-4">
                                        <div className="flex items-center gap-2.5">
                                            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm shrink-0" style={{ backgroundColor: c.primaryColor }}>
                                                {c.name.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="font-medium">{c.name}</p>
                                                <p className={`text-xs ${muted}`}>{c.subdomainPrefix}.altusflow.com</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className={`px-5 py-4 ${muted}`}>{c.programName}</td>
                                    <td className="px-5 py-4 text-center font-medium">{c.activeMembers}</td>
                                    <td className="px-5 py-4 text-center font-medium">{c.ordersMTD}</td>
                                    <td className={`px-5 py-4 text-xs ${muted}`}>{c.createdDate}</td>
                                    <td className="px-5 py-4">
                                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${c.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-600'}`}>{c.status}</span>
                                    </td>
                                    <td className="px-5 py-4">
                                        <div className="flex flex-wrap gap-1">
                                            {c.serviceCodes.map(sc => (
                                                <span key={sc} className="text-[10px] font-medium px-1.5 py-0.5 rounded-md bg-purple-100 text-purple-700">{sc}</span>
                                            ))}
                                        </div>
                                    </td>
                                    <td className="px-5 py-4"><MdChevronRight className={`text-lg ${muted}`} /></td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </motion.div>

            <AnimatePresence>
                {showCreate && <CreateClientModal onClose={() => setShowCreate(false)} onCreate={handleCreate} isDark={isDark} />}
            </AnimatePresence>

            {selectedClient && (
                <>
                    <div className="fixed inset-0 bg-black/40 z-40" onClick={() => setSelectedClient(null)} />
                    <ClientDetailPanel client={selectedClient} onClose={() => setSelectedClient(null)} onUpdateServiceCodes={handleUpdateServiceCodes} isDark={isDark} />
                </>
            )}
        </div>
    )
}
