import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MdClose, MdEmail, MdLocalShipping, MdNotifications, MdPersonAdd, MdEdit } from 'react-icons/md'
import { useTheme } from '../../Components/ThemeContext'
import { emailTemplates, clients } from '../../mockData/adminData'

const TRIGGER_META = {
    'Result Ready':        { icon: MdNotifications, color: 'text-emerald-500', bg: 'bg-emerald-100' },
    'Kit Shipped':         { icon: MdLocalShipping, color: 'text-indigo-500',  bg: 'bg-indigo-100'  },
    'Order Status Change': { icon: MdEmail,          color: 'text-amber-500',   bg: 'bg-amber-100'   },
    'Registration Success':{ icon: MdPersonAdd,      color: 'text-cyan-500',    bg: 'bg-cyan-100'    },
}

const VARIABLES = [
    '{{member_first_name}}',
    '{{client_name}}',
    '{{program_name}}',
    '{{panel_name}}',
    '{{service_name}}',
    '{{order_status}}',
    '{{ship_date}}',
    '{{portal_link}}',
    '{{client_logo}}',
]

function TemplateModal({ trigger, template, onClose, isDark }) {
    const [selectedClient, setSelectedClient] = useState('default')
    const [subject, setSubject] = useState(template.defaultSubject)
    const [body,    setBody]    = useState(template.defaultBody)
    const [saved,   setSaved]   = useState(false)

    const input = isDark
        ? 'bg-gray-800 border-gray-700 text-gray-100 placeholder-gray-500 focus:border-purple-500'
        : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400 focus:border-purple-500'
    const muted = isDark ? 'text-gray-400' : 'text-gray-500'

    const insertVar = (v) => {
        setBody(prev => prev + ' ' + v)
    }

    const handleSave = () => {
        setSaved(true)
        setTimeout(() => { setSaved(false); onClose() }, 800)
    }

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
            <motion.div initial={{ scale: 0.93, y: 20, opacity: 0 }} animate={{ scale: 1, y: 0, opacity: 1 }} exit={{ scale: 0.93, opacity: 0 }}
                className={`w-full max-w-2xl rounded-2xl shadow-2xl flex flex-col max-h-[90vh] ${isDark ? 'bg-gray-900' : 'bg-white'}`} onClick={e => e.stopPropagation()}>

                {/* Header */}
                <div className={`flex items-center justify-between px-6 py-4 border-b shrink-0 ${isDark ? 'border-gray-700' : 'border-gray-100'}`}>
                    <div>
                        <h2 className="font-semibold">Edit Template — {trigger}</h2>
                        <p className={`text-xs mt-0.5 ${muted}`}>{template.description}</p>
                    </div>
                    <button onClick={onClose} className={`p-2 rounded-lg ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}><MdClose /></button>
                </div>

                <div className="flex-1 overflow-y-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-200 dark:divide-gray-700">

                        {/* Editor */}
                        <div className="p-5 space-y-4">
                            <div>
                                <label className={`block text-xs font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Client Override</label>
                                <select value={selectedClient} onChange={e => setSelectedClient(e.target.value)}
                                    className={`w-full px-3 py-2 text-sm rounded-lg border outline-none ${input}`}>
                                    <option value="default">AltusDX Default (all clients)</option>
                                    {clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className={`block text-xs font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Subject Line</label>
                                <input value={subject} onChange={e => setSubject(e.target.value)}
                                    className={`w-full px-3 py-2 text-sm rounded-lg border outline-none transition-colors ${input}`} />
                            </div>
                            <div>
                                <label className={`block text-xs font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Email Body</label>
                                <textarea value={body} onChange={e => setBody(e.target.value)} rows={8}
                                    className={`w-full px-3 py-2 text-sm rounded-lg border outline-none transition-colors resize-none font-mono ${input}`} />
                            </div>
                            {/* Variable chips */}
                            <div>
                                <p className={`text-xs font-medium mb-2 ${muted}`}>Insert Variable</p>
                                <div className="flex flex-wrap gap-1.5">
                                    {VARIABLES.map(v => (
                                        <button key={v} onClick={() => insertVar(v)}
                                            className={`text-[11px] font-mono px-2 py-1 rounded-md border transition-colors ${isDark ? 'border-gray-700 bg-gray-800 hover:bg-gray-700 text-gray-300' : 'border-gray-200 bg-gray-50 hover:bg-gray-100 text-gray-600'}`}>
                                            {v}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Preview */}
                        <div className="p-5">
                            <p className={`text-xs font-semibold uppercase tracking-wide ${muted} mb-3`}>Preview</p>
                            <div className={`rounded-xl border p-4 text-sm space-y-3 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
                                <div className={`pb-3 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                                    <p className={`text-[10px] font-medium uppercase ${muted}`}>Subject</p>
                                    <p className="font-medium text-sm mt-0.5">{subject}</p>
                                </div>
                                <pre className={`text-xs whitespace-pre-wrap font-sans leading-relaxed ${muted}`}>{body}</pre>
                            </div>
                            <p className={`text-xs mt-3 ${muted}`}>
                                Delivered via {selectedClient === 'default' ? 'AltusDX default GoHighLevel sub-account' : `${clients.find(c => c.id === selectedClient)?.name} GoHighLevel sub-account`}.
                            </p>
                        </div>
                    </div>
                </div>

                <div className={`flex justify-end gap-3 px-6 py-4 border-t shrink-0 ${isDark ? 'border-gray-700' : 'border-gray-100'}`}>
                    <button onClick={onClose} className={`px-4 py-2 text-sm rounded-lg ${isDark ? 'text-gray-300 hover:bg-gray-800' : 'text-gray-600 hover:bg-gray-100'}`}>Cancel</button>
                    <button onClick={handleSave}
                        className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors text-white ${saved ? 'bg-emerald-500' : 'bg-purple-600 hover:bg-purple-700'}`}>
                        {saved ? '✓ Saved' : 'Save Template'}
                    </button>
                </div>
            </motion.div>
        </motion.div>
    )
}

export default function CommunicationTriggers() {
    const { isDark } = useTheme()
    const [editingTrigger, setEditingTrigger] = useState(null)

    const card  = isDark ? 'bg-gray-900 border-gray-700/50' : 'bg-white border-gray-200'
    const muted = isDark ? 'text-gray-400' : 'text-gray-500'

    const triggers = Object.values(emailTemplates)

    return (
        <div className="space-y-5 max-w-5xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
                <h1 className="text-2xl font-bold">Email Triggers</h1>
                <p className={`text-sm mt-1 ${muted}`}>Configure per-client email templates for automated notifications</p>
            </motion.div>

            {/* Info banner */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.05 }}
                className={`flex items-start gap-3 p-4 rounded-xl border ${isDark ? 'bg-indigo-900/20 border-indigo-700/40' : 'bg-indigo-50 border-indigo-200'}`}>
                <MdEmail className="text-indigo-500 text-lg shrink-0 mt-0.5" />
                <div>
                    <p className={`text-sm font-medium ${isDark ? 'text-indigo-300' : 'text-indigo-800'}`}>Template Delivery</p>
                    <p className={`text-xs mt-0.5 ${isDark ? 'text-indigo-400' : 'text-indigo-600'}`}>
                        Client-specific templates override the AltusDX default. All emails are delivered via each client's configured GoHighLevel sub-account.
                    </p>
                </div>
            </motion.div>

            {/* Trigger cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {triggers.map((t, i) => {
                    const meta = TRIGGER_META[t.trigger] || { icon: MdEmail, color: 'text-gray-500', bg: 'bg-gray-100' }
                    const Icon = meta.icon
                    return (
                        <motion.div key={t.trigger} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.07 }}
                            className={`rounded-2xl border p-5 shadow-sm ${card}`}>
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className={`w-10 h-10 rounded-xl ${meta.bg} flex items-center justify-center`}>
                                        <Icon className={`text-xl ${meta.color}`} />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-sm">{t.trigger}</p>
                                        <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-md bg-emerald-100 text-emerald-700">Active</span>
                                    </div>
                                </div>
                            </div>
                            <p className={`text-xs leading-relaxed ${muted} mb-4`}>{t.description}</p>
                            <div className={`rounded-lg p-3 mb-4 ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
                                <p className={`text-[10px] font-medium uppercase tracking-wide ${muted} mb-1`}>Default Subject</p>
                                <p className="text-xs font-mono">{t.defaultSubject}</p>
                            </div>
                            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                                onClick={() => setEditingTrigger(t.trigger)}
                                className={`w-full flex items-center justify-center gap-2 py-2 text-sm font-medium rounded-xl border transition-colors ${isDark ? 'border-gray-700 hover:bg-gray-800 text-gray-300' : 'border-gray-200 hover:bg-gray-50 text-gray-700'}`}>
                                <MdEdit className="text-base" /> Edit Template
                            </motion.button>
                        </motion.div>
                    )
                })}
            </div>

            <AnimatePresence>
                {editingTrigger && (
                    <TemplateModal
                        trigger={editingTrigger}
                        template={emailTemplates[editingTrigger]}
                        onClose={() => setEditingTrigger(null)}
                        isDark={isDark}
                    />
                )}
            </AnimatePresence>
        </div>
    )
}
