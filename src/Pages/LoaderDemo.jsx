import { useState } from 'react'
import { motion } from 'framer-motion'
import { MdFullscreen, MdClose, MdRefresh } from 'react-icons/md'
import Loader from '../Components/Loader'
import { useTheme } from '../Components/ThemeContext'

const MESSAGES = ['Syncing inventory...', 'Scanning stock levels...', 'Loading catalog...', 'Verifying supplies...', 'Reconciling records...']

export default function LoaderDemo() {
    const { isDark } = useTheme()
    const [showOverlay, setShowOverlay] = useState(false)
    const [message, setMessage] = useState(MESSAGES[0])

    const card = isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
    const heading = isDark ? 'text-gray-100' : 'text-gray-800'
    const sub = isDark ? 'text-gray-400' : 'text-gray-500'
    const badge = isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'

    const cycleMessage = () => {
        const next = (MESSAGES.indexOf(message) + 1) % MESSAGES.length
        setMessage(MESSAGES[next])
    }

    return (
        <div className="p-6 space-y-6">

            {/* Header */}
            <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                <div className="flex items-center gap-3 mb-1">
                    <h1 className={`text-3xl font-bold ${heading}`}>Loader</h1>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${badge}`}>Component</span>
                </div>
                <p className={sub}>Brand loader used across the application during data fetch & transitions.</p>
            </motion.div>

            {/* Preview Card */}
            <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className={`rounded-2xl shadow-lg overflow-hidden ${card}`}
            >
                {/* Card header */}
                <div className={`flex items-center justify-between px-6 py-4 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                    <span className={`text-sm font-semibold ${heading}`}>Inline Preview</span>
                    <div className="flex items-center gap-2">
                        {/* Cycle message */}
                        <motion.button
                            onClick={cycleMessage}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg transition-colors ${isDark ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                        >
                            <MdRefresh className="text-sm" />
                            Cycle message
                        </motion.button>

                        {/* Fullscreen trigger */}
                        <motion.button
                            onClick={() => setShowOverlay(true)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-linear-to-r from-blue-600 to-purple-600 text-white shadow-md"
                        >
                            <MdFullscreen className="text-sm" />
                            Full screen
                        </motion.button>
                    </div>
                </div>

                {/* Loader preview */}
                <div className={`py-16 ${isDark ? 'bg-gray-900/40' : 'bg-gray-50'}`}>
                    <Loader message={message} />
                </div>
            </motion.div>

            {/* Usage notes */}
            <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className={`rounded-2xl shadow-lg p-6 ${card}`}
            >
                <h3 className={`text-base font-bold mb-4 ${heading}`}>Usage</h3>
                <div className={`rounded-xl p-4 text-sm font-mono leading-relaxed ${isDark ? 'bg-gray-900 text-gray-300' : 'bg-gray-50 text-gray-700'}`}>
                    <p className="text-purple-400">{'// Inline (fills parent container)'}</p>
                    <p>{'<Loader message="Loading..." />'}</p>
                    <br />
                    <p className="text-purple-400">{'// Full-screen overlay'}</p>
                    <p>{'<Loader fullScreen show={isLoading} message="Fetching data..." />'}</p>
                </div>
            </motion.div>

            {/* Full-screen overlay */}
            {showOverlay && (
                <>
                    <Loader fullScreen show={showOverlay} message={message} />
                    {/* Dismiss button on top of overlay */}
                    <motion.button
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4 }}
                        onClick={() => setShowOverlay(false)}
                        className="fixed top-6 right-6 z-10000 flex items-center gap-2 px-4 py-2 rounded-xl bg-linear-to-r from-blue-600 to-purple-600 text-white text-sm font-semibold shadow-xl"
                    >
                        <MdClose className="text-base" />
                        Dismiss
                    </motion.button>
                </>
            )}
        </div>
    )
}
