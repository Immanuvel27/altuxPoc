import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { MdWarning, MdClose, MdFilterList, MdCheckCircle, MdSearch, MdOutlineInbox } from 'react-icons/md'
import { FaCircle } from 'react-icons/fa'
import { useTheme } from '../../Components/ThemeContext'
import { orders, clients, ingestionMonitor } from '../../mockData/adminData'

const STATUS_STYLE = {
    'Order Received':  { bg: 'bg-blue-100',    text: 'text-blue-800',    dot: 'text-blue-400'    },
    'Kit Shipped':     { bg: 'bg-indigo-100',  text: 'text-indigo-800',  dot: 'text-indigo-400'  },
    'Sample Received': { bg: 'bg-amber-100',   text: 'text-amber-800',   dot: 'text-amber-400'   },
    'Processing':      { bg: 'bg-orange-100',  text: 'text-orange-800',  dot: 'text-orange-400'  },
    'Results Ready':   { bg: 'bg-emerald-100', text: 'text-emerald-800', dot: 'text-emerald-500' },
}

const STATUS_STEPS = ['Order Received', 'Kit Shipped', 'Sample Received', 'Processing', 'Results Ready']

function StatusBadge({ status }) {
    const s = STATUS_STYLE[status] || { bg: 'bg-gray-100', text: 'text-gray-700' }
    return (
        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${s.bg} ${s.text}`}>{status}</span>
    )
}

function OrderDrawer({ order, onClose, isDark }) {
    if (!order) return null
    const border = isDark ? 'border-gray-700/50' : 'border-gray-100'
    const muted  = isDark ? 'text-gray-400' : 'text-gray-500'
    const card   = isDark ? 'bg-gray-800' : 'bg-gray-50'

    const currentStepIdx = STATUS_STEPS.indexOf(order.status)

    return (
        <AnimatePresence>
            <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 30, stiffness: 280 }}
                className={`fixed right-0 top-0 h-full w-full max-w-md z-50 flex flex-col shadow-2xl ${isDark ? 'bg-gray-900' : 'bg-white'}`}
            >
                {/* Header */}
                <div className={`flex items-center justify-between px-5 py-4 border-b ${border}`}>
                    <div>
                        <p className="font-semibold">{order.id}</p>
                        <p className={`text-xs ${muted}`}>{order.serviceName} · {order.clientName}</p>
                    </div>
                    <button onClick={onClose} className={`p-2 rounded-lg ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
                        <MdClose className="text-xl" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-5 space-y-5">

                    {/* Exception banner */}
                    {order.exceptionFlag && order.exceptions.some(e => !e.resolved) && (
                        <div className="flex items-start gap-3 p-3 rounded-xl bg-red-50 border border-red-200">
                            <MdWarning className="text-red-500 text-lg shrink-0 mt-0.5" />
                            <div>
                                <p className="text-sm font-semibold text-red-700">Exception Flagged</p>
                                {order.exceptions.filter(e => !e.resolved).map((ex, i) => (
                                    <p key={i} className="text-xs text-red-600 mt-0.5">{ex.type}: {ex.detail}</p>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Member & Order info */}
                    <div className={`rounded-xl p-4 ${card}`}>
                        <p className={`text-xs font-semibold uppercase tracking-wide ${muted} mb-3`}>Order Details</p>
                        <div className="space-y-2">
                            {[
                                ['Member',           order.memberName],
                                ['Email',            order.memberEmail],
                                ['Client',           order.clientName],
                                ['Service Code',     order.serviceCode],
                                ['Service Name',     order.serviceName],
                                ['Collection',       order.collectionMethod],
                                ['Order Date',       order.orderDate],
                                ['Shopify Order ID', order.shopifyOrderId || '—'],
                                ['CrelioHealth ID',  order.crelioOrderId  || '—'],
                            ].map(([label, value]) => (
                                <div key={label} className="flex items-start justify-between gap-4">
                                    <span className={`text-xs ${muted} shrink-0`}>{label}</span>
                                    <span className="text-xs font-medium text-right">{value}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Status timeline */}
                    <div>
                        <p className={`text-xs font-semibold uppercase tracking-wide ${muted} mb-3`}>Status Timeline</p>
                        <div className="relative pl-5">
                            {STATUS_STEPS.map((step, i) => {
                                const histEntry = order.statusHistory.find(h => h.status === step)
                                const done      = i <= currentStepIdx
                                return (
                                    <div key={step} className="relative flex items-start gap-3 pb-4">
                                        {/* Vertical line */}
                                        {i < STATUS_STEPS.length - 1 && (
                                            <div className={`absolute left-[-10px] top-4 w-0.5 h-full ${done ? 'bg-purple-400' : isDark ? 'bg-gray-700' : 'bg-gray-200'}`} />
                                        )}
                                        {/* Dot */}
                                        <div className={`absolute left-[-14px] top-1 w-4 h-4 rounded-full border-2 flex items-center justify-center ${done ? 'border-purple-500 bg-purple-500' : isDark ? 'border-gray-600 bg-gray-800' : 'border-gray-300 bg-white'}`}>
                                            {done && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                                        </div>
                                        <div className="ml-2">
                                            <p className={`text-sm font-medium ${done ? '' : muted}`}>{step}</p>
                                            {histEntry && (
                                                <p className={`text-xs ${muted}`}>
                                                    {new Date(histEntry.timestamp).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    {/* Exception log */}
                    {order.exceptions.length > 0 && (
                        <div>
                            <p className={`text-xs font-semibold uppercase tracking-wide ${muted} mb-3`}>Exception Log</p>
                            <div className="space-y-2">
                                {order.exceptions.map((ex, i) => (
                                    <div key={i} className={`rounded-xl p-3 border ${ex.resolved ? 'border-emerald-200 bg-emerald-50' : 'border-red-200 bg-red-50'}`}>
                                        <div className="flex items-center justify-between mb-1">
                                            <p className={`text-xs font-semibold ${ex.resolved ? 'text-emerald-700' : 'text-red-700'}`}>{ex.type}</p>
                                            <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${ex.resolved ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                                                {ex.resolved ? 'Resolved' : 'Open'}
                                            </span>
                                        </div>
                                        <p className={`text-xs ${ex.resolved ? 'text-emerald-600' : 'text-red-600'}`}>{ex.detail}</p>
                                        <p className={`text-[10px] mt-1 ${muted}`}>{new Date(ex.timestamp).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </motion.div>
        </AnimatePresence>
    )
}

export default function OrderManagement() {
    const { isDark } = useTheme()
    const location   = useLocation()
    const [activeTab, setActiveTab]       = useState('orders')
    const [selectedOrder, setSelectedOrder] = useState(null)
    const [filterClient,  setFilterClient]  = useState('all')
    const [filterStatus,  setFilterStatus]  = useState('all')
    const [filterExc,     setFilterExc]     = useState(false)
    const [search,        setSearch]        = useState('')
    const [ingestion, setIngestion]         = useState(ingestionMonitor)

    // Auto-apply exception filter if navigated from dashboard
    useEffect(() => {
        if (location.state?.filterExceptions) {
            setFilterExc(true)
        }
    }, [location.state])

    const card   = isDark ? 'bg-gray-900 border-gray-700/50' : 'bg-white border-gray-200'
    const muted  = isDark ? 'text-gray-400' : 'text-gray-500'
    const border = isDark ? 'border-gray-700/50' : 'border-gray-100'
    const input  = isDark ? 'bg-gray-800 border-gray-700 text-gray-100 placeholder-gray-500' : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400'
    const selectCls = `text-sm px-3 py-2 rounded-lg border outline-none ${input}`

    const filtered = orders.filter(o => {
        if (filterClient !== 'all' && o.clientId !== filterClient) return false
        if (filterStatus  !== 'all' && o.status   !== filterStatus)  return false
        if (filterExc && !o.exceptionFlag) return false
        if (search && ![o.id, o.memberName, o.clientName, o.serviceName].some(f => f?.toLowerCase().includes(search.toLowerCase()))) return false
        return true
    })

    const markReviewed = (id) => {
        setIngestion(prev => prev.map(e => e.id === id ? { ...e, reviewed: true } : e))
    }

    const tabCls = (tab) => `px-4 py-2 text-sm font-medium rounded-lg transition-colors ${activeTab === tab ? 'bg-purple-600 text-white' : isDark ? 'text-gray-400 hover:text-white hover:bg-gray-800' : 'text-gray-500 hover:text-gray-800 hover:bg-gray-100'}`

    return (
        <div className="space-y-5 max-w-7xl mx-auto">

            {/* Header */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
                <h1 className="text-2xl font-bold">Order Management</h1>
                <p className={`text-sm mt-1 ${muted}`}>Monitor all platform orders and ingestion events</p>
            </motion.div>

            {/* Tabs */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.05 }} className="flex gap-2">
                <button className={tabCls('orders')} onClick={() => setActiveTab('orders')}>All Orders ({orders.length})</button>
                <button className={tabCls('ingestion')} onClick={() => setActiveTab('ingestion')}>
                    Ingestion Monitor
                    {ingestion.filter(e => !e.reviewed).length > 0 && (
                        <span className="ml-2 px-1.5 py-0.5 text-[10px] bg-red-500 text-white rounded-full font-bold">
                            {ingestion.filter(e => !e.reviewed).length}
                        </span>
                    )}
                </button>
            </motion.div>

            {activeTab === 'orders' && (
                <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className={`rounded-2xl border shadow-sm ${card}`}>

                    {/* Filters */}
                    <div className={`flex flex-wrap items-center gap-3 px-5 py-4 border-b ${border}`}>
                        <div className="relative flex-1 min-w-[180px]">
                            <MdSearch className={`absolute left-3 top-1/2 -translate-y-1/2 text-lg ${muted}`} />
                            <input
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                placeholder="Search orders..."
                                className={`w-full pl-9 pr-3 py-2 text-sm rounded-lg border outline-none ${input}`}
                            />
                        </div>
                        <select value={filterClient} onChange={e => setFilterClient(e.target.value)} className={selectCls}>
                            <option value="all">All Clients</option>
                            {clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                        </select>
                        <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className={selectCls}>
                            <option value="all">All Statuses</option>
                            {Object.keys(STATUS_STYLE).map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                        <label className={`flex items-center gap-2 text-sm cursor-pointer ${muted}`}>
                            <input type="checkbox" checked={filterExc} onChange={e => setFilterExc(e.target.checked)} className="accent-purple-600" />
                            <MdWarning className="text-red-500" /> Exceptions only
                        </label>
                        <span className={`text-xs ml-auto ${muted}`}>{filtered.length} result{filtered.length !== 1 ? 's' : ''}</span>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className={`text-xs uppercase tracking-wide ${muted} ${isDark ? 'bg-gray-800/50' : 'bg-gray-50'}`}>
                                    <th className="text-left px-5 py-3 font-medium">Order ID</th>
                                    <th className="text-left px-5 py-3 font-medium">Member</th>
                                    <th className="text-left px-5 py-3 font-medium">Client</th>
                                    <th className="text-left px-5 py-3 font-medium">Service</th>
                                    <th className="text-left px-5 py-3 font-medium">Status</th>
                                    <th className="text-left px-5 py-3 font-medium">Date</th>
                                    <th className="text-center px-5 py-3 font-medium">Flag</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filtered.length === 0 ? (
                                    <tr>
                                        <td colSpan={7} className="px-5 py-12 text-center">
                                            <MdOutlineInbox className={`text-4xl mx-auto mb-2 ${muted}`} />
                                            <p className={`text-sm ${muted}`}>No orders match the current filters.</p>
                                        </td>
                                    </tr>
                                ) : (
                                    filtered.map((order, i) => (
                                        <motion.tr
                                            key={order.id}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: i * 0.04 }}
                                            onClick={() => setSelectedOrder(order)}
                                            className={`border-t cursor-pointer transition-colors ${border} ${isDark ? 'hover:bg-gray-800/50' : 'hover:bg-gray-50'}`}
                                        >
                                            <td className="px-5 py-3.5 font-mono text-xs font-medium">{order.id}</td>
                                            <td className="px-5 py-3.5">
                                                <p className="font-medium">{order.memberName}</p>
                                                <p className={`text-xs ${muted}`}>{order.memberEmail}</p>
                                            </td>
                                            <td className="px-5 py-3.5">{order.clientName}</td>
                                            <td className={`px-5 py-3.5 ${muted}`}>{order.serviceName}</td>
                                            <td className="px-5 py-3.5"><StatusBadge status={order.status} /></td>
                                            <td className={`px-5 py-3.5 text-xs ${muted}`}>{order.orderDate}</td>
                                            <td className="px-5 py-3.5 text-center">
                                                {order.exceptionFlag
                                                    ? <MdWarning className="text-red-500 text-base mx-auto" />
                                                    : <MdCheckCircle className="text-emerald-400 text-base mx-auto" />
                                                }
                                            </td>
                                        </motion.tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </motion.div>
            )}

            {activeTab === 'ingestion' && (
                <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className={`rounded-2xl border shadow-sm ${card}`}>
                    <div className={`px-5 py-4 border-b ${border}`}>
                        <h2 className="font-semibold text-sm">Failed Ingestion Events</h2>
                        <p className={`text-xs mt-0.5 ${muted}`}>Orders that failed to ingest from external sources</p>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className={`text-xs uppercase tracking-wide ${muted} ${isDark ? 'bg-gray-800/50' : 'bg-gray-50'}`}>
                                    <th className="text-left px-5 py-3 font-medium">Source</th>
                                    <th className="text-left px-5 py-3 font-medium">Timestamp</th>
                                    <th className="text-left px-5 py-3 font-medium">Error Type</th>
                                    <th className="text-left px-5 py-3 font-medium">Raw Payload</th>
                                    <th className="text-center px-5 py-3 font-medium">Status</th>
                                    <th className="text-center px-5 py-3 font-medium">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {ingestion.map((event, i) => (
                                    <motion.tr
                                        key={event.id}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: i * 0.06 }}
                                        className={`border-t ${border}`}
                                    >
                                        <td className="px-5 py-3.5 font-medium">{event.clientSource}</td>
                                        <td className={`px-5 py-3.5 text-xs ${muted}`}>{new Date(event.timestamp).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })}</td>
                                        <td className="px-5 py-3.5">
                                            <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-red-100 text-red-700">{event.errorType}</span>
                                        </td>
                                        <td className="px-5 py-3.5 max-w-xs">
                                            <code className={`text-xs break-all ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{event.rawPayload}</code>
                                        </td>
                                        <td className="px-5 py-3.5 text-center">
                                            {event.reviewed
                                                ? <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">Reviewed</span>
                                                : <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-amber-100 text-amber-700">Pending</span>
                                            }
                                        </td>
                                        <td className="px-5 py-3.5 text-center">
                                            {!event.reviewed && (
                                                <button
                                                    onClick={() => markReviewed(event.id)}
                                                    className="text-xs font-medium text-purple-500 hover:text-purple-400 transition-colors"
                                                >
                                                    Mark Reviewed
                                                </button>
                                            )}
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </motion.div>
            )}

            {/* Order detail drawer */}
            {selectedOrder && (
                <>
                    <div className="fixed inset-0 bg-black/40 z-40" onClick={() => setSelectedOrder(null)} />
                    <OrderDrawer order={selectedOrder} onClose={() => setSelectedOrder(null)} isDark={isDark} />
                </>
            )}
        </div>
    )
}
