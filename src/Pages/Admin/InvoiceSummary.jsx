import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { MdReceipt, MdInfoOutline } from 'react-icons/md'
import { useTheme } from '../../Components/ThemeContext'
import { clients, invoiceData } from '../../mockData/adminData'

const MONTHS = [
    { value: '2025-01', label: 'January 2025' },
    { value: '2025-02', label: 'February 2025' },
    { value: '2025-03', label: 'March 2025' },
]

export default function InvoiceSummary() {
    const { isDark } = useTheme()
    const [selectedClient, setSelectedClient] = useState(clients[0].id)
    const [fromMonth,      setFromMonth]      = useState('2025-01')
    const [toMonth,        setToMonth]        = useState('2025-03')

    const card   = isDark ? 'bg-gray-900 border-gray-700/50' : 'bg-white border-gray-200'
    const muted  = isDark ? 'text-gray-400' : 'text-gray-500'
    const border = isDark ? 'border-gray-700/50' : 'border-gray-100'
    const input  = isDark
        ? 'bg-gray-800 border-gray-700 text-gray-100 focus:border-purple-500'
        : 'bg-white border-gray-200 text-gray-900 focus:border-purple-500'

    // Collect line items for selected client + date range
    const clientInvoice = invoiceData[selectedClient] || {}
    const fromIdx = MONTHS.findIndex(m => m.value === fromMonth)
    const toIdx   = MONTHS.findIndex(m => m.value === toMonth)

    const selectedMonths = MONTHS.slice(
        Math.min(fromIdx, toIdx),
        Math.max(fromIdx, toIdx) + 1
    ).map(m => m.value)

    // Aggregate by service code across months
    const aggregated = {}
    selectedMonths.forEach(month => {
        const rows = clientInvoice[month] || []
        rows.forEach(row => {
            if (!aggregated[row.serviceCode]) {
                aggregated[row.serviceCode] = { ...row, unitCount: 0, lineTotal: 0 }
            }
            aggregated[row.serviceCode].unitCount += row.unitCount
            aggregated[row.serviceCode].lineTotal  += row.lineTotal
        })
    })

    const lineItems  = Object.values(aggregated)
    const grandTotal = lineItems.reduce((sum, r) => sum + r.lineTotal, 0)

    const clientObj = clients.find(c => c.id === selectedClient)

    return (
        <div className="space-y-5 max-w-4xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
                <h1 className="text-2xl font-bold">Invoice Summary</h1>
                <p className={`text-sm mt-1 ${muted}`}>Read-only billing summary by client and date range</p>
            </motion.div>

            {/* Read-only notice */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.05 }}
                className={`flex items-center gap-3 p-3.5 rounded-xl border ${isDark ? 'bg-amber-900/20 border-amber-700/40' : 'bg-amber-50 border-amber-200'}`}>
                <MdInfoOutline className="text-amber-500 text-lg shrink-0" />
                <p className={`text-xs ${isDark ? 'text-amber-300' : 'text-amber-700'}`}>
                    This screen is <strong>read-only</strong>. No payments are processed here. Invoice data is drawn from order records.
                </p>
            </motion.div>

            {/* Filters */}
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }} className={`rounded-2xl border p-5 shadow-sm ${card}`}>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                        <label className={`block text-xs font-medium mb-1.5 ${muted}`}>Client</label>
                        <select value={selectedClient} onChange={e => setSelectedClient(e.target.value)}
                            className={`w-full px-3 py-2.5 text-sm rounded-xl border outline-none ${input}`}>
                            {clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className={`block text-xs font-medium mb-1.5 ${muted}`}>From</label>
                        <select value={fromMonth} onChange={e => setFromMonth(e.target.value)}
                            className={`w-full px-3 py-2.5 text-sm rounded-xl border outline-none ${input}`}>
                            {MONTHS.map(m => <option key={m.value} value={m.value}>{m.label}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className={`block text-xs font-medium mb-1.5 ${muted}`}>To</label>
                        <select value={toMonth} onChange={e => setToMonth(e.target.value)}
                            className={`w-full px-3 py-2.5 text-sm rounded-xl border outline-none ${input}`}>
                            {MONTHS.map(m => <option key={m.value} value={m.value}>{m.label}</option>)}
                        </select>
                    </div>
                </div>
            </motion.div>

            {/* Invoice table */}
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className={`rounded-2xl border shadow-sm overflow-hidden ${card}`}>

                {/* Invoice header */}
                <div className={`px-6 py-5 border-b ${border}`}>
                    <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                            {clientObj && (
                                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold" style={{ backgroundColor: clientObj.primaryColor }}>
                                    {clientObj.name.charAt(0)}
                                </div>
                            )}
                            <div>
                                <p className="font-semibold">{clientObj?.name}</p>
                                <p className={`text-xs ${muted}`}>{clientObj?.programName}</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className={`text-xs ${muted}`}>Period</p>
                            <p className="text-sm font-medium">
                                {MONTHS.find(m => m.value === fromMonth)?.label}
                                {fromMonth !== toMonth && ` — ${MONTHS.find(m => m.value === toMonth)?.label}`}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Line items */}
                {lineItems.length === 0 ? (
                    <div className="px-6 py-12 text-center">
                        <MdReceipt className={`text-4xl mx-auto mb-2 ${muted}`} />
                        <p className={`text-sm ${muted}`}>No orders found for the selected client and date range.</p>
                    </div>
                ) : (
                    <>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className={`text-xs uppercase tracking-wide ${muted} ${isDark ? 'bg-gray-800/50' : 'bg-gray-50'}`}>
                                        <th className="text-left px-6 py-3 font-medium">Service Code</th>
                                        <th className="text-left px-6 py-3 font-medium">Service Name</th>
                                        <th className="text-right px-6 py-3 font-medium">Unit Count</th>
                                        <th className="text-right px-6 py-3 font-medium">Unit Price</th>
                                        <th className="text-right px-6 py-3 font-medium">Line Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {lineItems.map((row, i) => (
                                        <motion.tr key={row.serviceCode} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 + i * 0.06 }}
                                            className={`border-t ${border}`}>
                                            <td className="px-6 py-4 font-mono text-xs font-medium">{row.serviceCode}</td>
                                            <td className="px-6 py-4 font-medium">{row.serviceName}</td>
                                            <td className="px-6 py-4 text-right">{row.unitCount}</td>
                                            <td className={`px-6 py-4 text-right ${muted}`}>${row.unitPrice.toFixed(2)}</td>
                                            <td className="px-6 py-4 text-right font-semibold">${row.lineTotal.toFixed(2)}</td>
                                        </motion.tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Grand total */}
                        <div className={`border-t px-6 py-4 flex items-center justify-between ${isDark ? 'border-gray-700 bg-gray-800/30' : 'border-gray-100 bg-gray-50'}`}>
                            <div>
                                <p className="font-semibold">Grand Total</p>
                                <p className={`text-xs ${muted}`}>{lineItems.reduce((s, r) => s + r.unitCount, 0)} total orders across {selectedMonths.length} month{selectedMonths.length !== 1 ? 's' : ''}</p>
                            </div>
                            <p className="text-2xl font-bold text-purple-600">${grandTotal.toFixed(2)}</p>
                        </div>
                    </>
                )}
            </motion.div>

            {/* Footer note */}
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className={`text-xs text-center ${muted}`}>
                Summary counts match order records in Order Management for the same client and date range.
                No payment processing or PDF export available in Phase 1.
            </motion.p>
        </div>
    )
}
