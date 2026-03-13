import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { MdUpload, MdCheckCircle, MdWarning, MdBusiness, MdColorLens, MdLink } from 'react-icons/md'
import { useTheme } from '../../Components/ThemeContext'
import { clients as initialClients } from '../../mockData/adminData'

function PreviewPortalHeader({ clientName, primaryColor, isDark }) {
    return (
        <div className={`rounded-xl border overflow-hidden ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
            <p className={`text-[10px] font-semibold uppercase tracking-wide px-3 py-1.5 ${isDark ? 'bg-gray-800 text-gray-500 border-b border-gray-700' : 'bg-gray-50 text-gray-400 border-b border-gray-100'}`}>
                Live Preview — Member Portal Header
            </p>
            {/* Mock top bar */}
            <div className="h-14 flex items-center justify-between px-4" style={{ backgroundColor: primaryColor }}>
                <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-white/20 flex items-center justify-center text-white font-bold text-sm">
                        {clientName ? clientName.charAt(0) : 'A'}
                    </div>
                    <div>
                        <p className="text-white text-sm font-semibold leading-tight">{clientName || 'Client Name'}</p>
                        <p className="text-white/70 text-[10px] leading-tight">Member Portal</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-white/20" />
                    <div className="w-6 h-6 rounded-full bg-white/20" />
                    <div className="w-7 h-7 rounded-full bg-white/30 flex items-center justify-center text-white text-xs font-bold">S</div>
                </div>
            </div>
            {/* Mock nav row */}
            <div className={`flex items-center gap-4 px-4 py-2 border-b text-xs font-medium ${isDark ? 'bg-gray-900 border-gray-700 text-gray-400' : 'bg-white border-gray-100 text-gray-600'}`}>
                <span style={{ color: primaryColor }} className="border-b-2 pb-1" style={{ color: primaryColor, borderColor: primaryColor }}>Dashboard</span>
                <span>Results</span>
                <span>Orders</span>
                <span>Settings</span>
            </div>
            {/* Mock card */}
            <div className={`p-4 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
                <div className={`rounded-xl p-4 border shadow-sm ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white" style={{ backgroundColor: primaryColor }}>
                            <span className="text-sm">🧪</span>
                        </div>
                        <div>
                            <p className={`text-sm font-semibold ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>Activate Your Kit</p>
                            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Get started with your first test</p>
                        </div>
                    </div>
                    <button className="w-full py-2 text-xs font-semibold rounded-lg text-white" style={{ backgroundColor: primaryColor }}>
                        Activate Now →
                    </button>
                </div>
            </div>
        </div>
    )
}

export default function ClientBranding() {
    const { isDark } = useTheme()
    const [clients, setClients] = useState(initialClients)
    const [selectedClientId, setSelectedClientId] = useState(initialClients[0].id)
    const [saved, setSaved] = useState(false)

    const client = clients.find(c => c.id === selectedClientId)

    const updateClient = (updates) => {
        setClients(prev => prev.map(c => c.id === selectedClientId ? { ...c, ...updates } : c))
    }

    const handleSave = () => {
        setSaved(true)
        setTimeout(() => setSaved(false), 2000)
    }

    const card   = isDark ? 'bg-gray-900 border-gray-700/50' : 'bg-white border-gray-200'
    const muted  = isDark ? 'text-gray-400' : 'text-gray-500'
    const border = isDark ? 'border-gray-700/50' : 'border-gray-100'
    const input  = isDark
        ? 'bg-gray-800 border-gray-700 text-gray-100 placeholder-gray-500 focus:border-purple-500'
        : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400 focus:border-purple-500'

    const SSL_STYLE = {
        'Active':        { color: 'text-emerald-600', bg: 'bg-emerald-100', icon: MdCheckCircle },
        'Expiring Soon': { color: 'text-amber-600',   bg: 'bg-amber-100',   icon: MdWarning     },
        'Expired':       { color: 'text-red-600',      bg: 'bg-red-100',     icon: MdWarning     },
        'Pending':       { color: 'text-gray-500',     bg: 'bg-gray-100',    icon: MdWarning     },
    }
    const ssl = SSL_STYLE[client?.sslStatus] || SSL_STYLE['Pending']
    const SslIcon = ssl.icon

    if (!client) return null

    return (
        <div className="space-y-5 max-w-6xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
                <h1 className="text-2xl font-bold">Branding & Domain Settings</h1>
                <p className={`text-sm mt-1 ${muted}`}>Configure white-label branding per client</p>
            </motion.div>

            {/* Client selector */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.05 }}>
                <label className={`block text-xs font-medium mb-1.5 ${muted}`}>Select Client</label>
                <select value={selectedClientId} onChange={e => setSelectedClientId(e.target.value)}
                    className={`text-sm px-3 py-2.5 rounded-xl border outline-none w-full max-w-xs ${input}`}>
                    {clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                {/* Settings panel */}
                <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className={`rounded-2xl border shadow-sm ${card}`}>
                    <div className={`flex items-center gap-2 px-5 py-4 border-b ${border}`}>
                        <MdColorLens className="text-purple-500" />
                        <h2 className="font-semibold text-sm">Branding Configuration</h2>
                    </div>

                    <div className="p-5 space-y-6">
                        {/* Logo upload */}
                        <div>
                            <label className={`block text-xs font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Client Logo</label>
                            <div className={`border-2 border-dashed rounded-xl p-6 text-center transition-colors cursor-pointer ${isDark ? 'border-gray-700 hover:border-purple-500 bg-gray-800/50' : 'border-gray-200 hover:border-purple-400 bg-gray-50'}`}>
                                <MdUpload className={`text-3xl mx-auto mb-2 ${muted}`} />
                                <p className={`text-sm font-medium ${muted}`}>Drop your logo here</p>
                                <p className={`text-xs mt-1 ${muted}`}>PNG or SVG · Max 2MB</p>
                                <button className={`mt-3 px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors ${isDark ? 'border-gray-600 hover:bg-gray-700 text-gray-300' : 'border-gray-300 hover:bg-gray-100 text-gray-600'}`}>
                                    Browse File
                                </button>
                            </div>
                            {client.logo && <p className={`text-xs mt-2 ${muted}`}>Current: {client.logo}</p>}
                        </div>

                        {/* Primary color */}
                        <div>
                            <label className={`block text-xs font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Primary Color</label>
                            <div className="flex items-center gap-3">
                                <input type="color" value={client.primaryColor}
                                    onChange={e => updateClient({ primaryColor: e.target.value })}
                                    className="w-10 h-10 rounded-lg border cursor-pointer overflow-hidden p-0.5 bg-transparent"
                                    style={{ borderColor: isDark ? '#374151' : '#E5E7EB' }} />
                                <input
                                    value={client.primaryColor}
                                    onChange={e => {
                                        if (/^#[0-9A-Fa-f]{0,6}$/.test(e.target.value)) updateClient({ primaryColor: e.target.value })
                                    }}
                                    className={`flex-1 px-3 py-2 text-sm rounded-lg border outline-none font-mono transition-colors ${input}`}
                                    maxLength={7}
                                />
                                <div className="w-10 h-10 rounded-lg shadow-inner" style={{ backgroundColor: client.primaryColor }} />
                            </div>
                            <p className={`text-xs mt-1.5 ${muted}`}>Applied to buttons, badges, and accents in Member and PAD portals.</p>
                        </div>

                        {/* Subdomain */}
                        <div>
                            <label className={`block text-xs font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Subdomain Prefix</label>
                            <div className="flex items-center gap-2">
                                <input
                                    value={client.subdomainPrefix}
                                    onChange={e => updateClient({ subdomainPrefix: e.target.value.replace(/\s/g, '').toLowerCase() })}
                                    className={`flex-1 px-3 py-2 text-sm rounded-lg border outline-none font-mono transition-colors ${input}`}
                                />
                                <span className={`text-sm ${muted} shrink-0`}>.altusflow.com</span>
                            </div>
                            <div className="flex items-center gap-1.5 mt-1.5">
                                <MdLink className={`text-sm ${muted}`} />
                                <p className={`text-xs font-mono ${muted}`}>{client.subdomainPrefix}.altusflow.com</p>
                            </div>
                        </div>

                        {/* SSL status */}
                        <div className={`flex items-center justify-between p-3 rounded-xl ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
                            <div className="flex items-center gap-2">
                                <MdBusiness className={`text-base ${muted}`} />
                                <div>
                                    <p className="text-sm font-medium">SSL Certificate</p>
                                    <p className={`text-xs ${muted}`}>{client.subdomainPrefix}.altusflow.com</p>
                                </div>
                            </div>
                            <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg ${ssl.bg}`}>
                                <SslIcon className={`text-sm ${ssl.color}`} />
                                <span className={`text-xs font-medium ${ssl.color}`}>{client.sslStatus}</span>
                            </div>
                        </div>

                        <button onClick={handleSave}
                            className={`w-full py-2.5 text-sm font-semibold rounded-xl transition-colors text-white ${saved ? 'bg-emerald-500' : 'bg-purple-600 hover:bg-purple-700'}`}>
                            {saved ? '✓ Settings Saved' : 'Save Branding Settings'}
                        </button>
                    </div>
                </motion.div>

                {/* Live Preview */}
                <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="space-y-4">
                    <div className={`rounded-2xl border shadow-sm ${card}`}>
                        <div className={`px-5 py-4 border-b ${border}`}>
                            <h2 className="font-semibold text-sm">Live Preview</h2>
                            <p className={`text-xs mt-0.5 ${muted}`}>Changes update in real-time</p>
                        </div>
                        <div className="p-5">
                            <PreviewPortalHeader clientName={client.name} primaryColor={client.primaryColor} isDark={isDark} />
                        </div>
                    </div>

                    {/* Config summary */}
                    <div className={`rounded-2xl border p-5 shadow-sm ${card}`}>
                        <p className={`text-xs font-semibold uppercase tracking-wide ${muted} mb-3`}>Current Configuration</p>
                        <div className="space-y-2">
                            {[
                                ['Client Name',   client.name],
                                ['Program',       client.programName],
                                ['Primary Color', client.primaryColor],
                                ['Subdomain',     `${client.subdomainPrefix}.altusflow.com`],
                                ['GHL Account',   client.ghlSubAccount],
                            ].map(([k, v]) => (
                                <div key={k} className="flex justify-between items-center">
                                    <span className={`text-xs ${muted}`}>{k}</span>
                                    <span className="text-xs font-medium font-mono">{v}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}
