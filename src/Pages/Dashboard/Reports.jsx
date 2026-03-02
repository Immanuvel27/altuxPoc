import React from 'react'
import { motion } from 'framer-motion'
import { MdFileDownload, MdCalendarToday } from 'react-icons/md'
import { useTheme } from '../../Components/ThemeContext'

export default function Reports() {
    const { isDark } = useTheme()

    const reports = [
        { name: 'Monthly Sales Report', date: '2026-02-28', status: 'Ready', size: '2.4 MB' },
        { name: 'User Activity Report', date: '2026-02-25', status: 'Ready', size: '1.8 MB' },
        { name: 'Financial Summary', date: '2026-02-20', status: 'Processing', size: '3.2 MB' },
        { name: 'Inventory Report', date: '2026-02-15', status: 'Ready', size: '1.5 MB' }
    ]

    const heading = isDark ? 'text-gray-100' : 'text-gray-800'
    const sub = isDark ? 'text-gray-400' : 'text-gray-600'
    const wrapper = isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white'
    const thead = isDark ? 'bg-gray-700/60' : 'bg-gray-50'
    const theadText = isDark ? 'text-gray-400' : 'text-gray-500'
    const divider = isDark ? 'divide-gray-700' : 'divide-gray-200'
    const rowText = isDark ? 'text-gray-100' : 'text-gray-900'
    const rowSub = isDark ? 'text-gray-400' : 'text-gray-500'
    const rowHover = isDark ? '#1f2937' : '#f9fafb'

    return (
        <div className="p-6">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h1 className={`text-3xl font-bold mb-2 ${heading}`}>Reports</h1>
                <p className={`mb-6 ${sub}`}>Download and manage your reports</p>
            </motion.div>

            <div className={`rounded-xl shadow-lg overflow-hidden transition-colors duration-300 ${wrapper}`}>
                <div className="overflow-x-auto">
                    <table className={`min-w-full divide-y ${divider}`}>
                        <thead className={thead}>
                            <tr>
                                {['Report Name', 'Date', 'Status', 'Size', 'Action'].map(col => (
                                    <th key={col} className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${theadText}`}>
                                        {col}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className={`divide-y ${divider}`}>
                            {reports.map((report, index) => (
                                <motion.tr
                                    key={report.name}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    whileHover={{ backgroundColor: rowHover }}
                                >
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className={`text-sm font-medium ${rowText}`}>{report.name}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className={`flex items-center text-sm ${rowSub}`}>
                                            <MdCalendarToday className="mr-2 shrink-0" />
                                            {report.date}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                            report.status === 'Ready'
                                                ? isDark ? 'bg-green-900/40 text-green-400' : 'bg-green-100 text-green-800'
                                                : isDark ? 'bg-yellow-900/40 text-yellow-400' : 'bg-yellow-100 text-yellow-800'
                                        }`}>
                                            {report.status}
                                        </span>
                                    </td>
                                    <td className={`px-6 py-4 whitespace-nowrap text-sm ${rowSub}`}>
                                        {report.size}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className={`flex items-center transition-colors ${
                                                report.status === 'Ready'
                                                    ? 'text-blue-500 hover:text-blue-400'
                                                    : isDark ? 'text-gray-600 cursor-not-allowed' : 'text-gray-300 cursor-not-allowed'
                                            }`}
                                            disabled={report.status !== 'Ready'}
                                        >
                                            <MdFileDownload className="mr-1" />
                                            Download
                                        </motion.button>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
