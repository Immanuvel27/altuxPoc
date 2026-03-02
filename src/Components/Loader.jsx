import { motion } from 'framer-motion'
import { useTheme } from './ThemeContext'

/**
 * AltuxDX Loader — professional brand-centered spinner.
 *
 * Props:
 *   fullScreen  {boolean}  — fixed full-screen overlay
 *   message     {string}   — status text shown below
 *   show        {boolean}  — controls overlay visibility
 */
export default function Loader({ fullScreen = false, message = 'Loading...', show = true }) {
    const { isDark } = useTheme()

    const bg      = isDark ? 'bg-gray-950' : 'bg-white'
    const muted   = isDark ? 'text-gray-600' : 'text-gray-400'
    const trackBg = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.07)'
    const ringBg  = isDark ? 'rgba(99,102,241,0.13)'  : 'rgba(99,102,241,0.11)'

    const core = (
        <div className="flex flex-col items-center gap-10 select-none">

            {/* ── Logo mark + spinning arc ──────────────────── */}
            <div className="relative w-24 h-24 flex items-center justify-center">

                {/* Faint static track */}
                <div
                    className="absolute inset-0 rounded-full"
                    style={{ border: `1.5px solid ${ringBg}` }}
                />

                {/* Spinning arc — ~80° gradient arc, thin */}
                <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{
                        background: 'conic-gradient(from 0deg, #6366f1 0%, #3b82f6 22%, transparent 33%, transparent 100%)',
                        WebkitMask: 'radial-gradient(farthest-side, transparent calc(100% - 3px), white calc(100% - 2px))',
                        mask:       'radial-gradient(farthest-side, transparent calc(100% - 3px), white calc(100% - 2px))',
                    }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1.1, repeat: Infinity, ease: 'linear' }}
                />

                {/* Logo box */}
                <div
                    className="relative z-10 w-14 h-14 rounded-2xl flex items-center justify-center"
                    style={{
                        background:  'linear-gradient(145deg, #3b82f6 0%, #6366f1 100%)',
                        boxShadow:   '0 8px 28px rgba(99,102,241,0.38)',
                    }}
                >
                    <span className="text-3xl font-black text-white leading-none">A</span>
                </div>
            </div>

            {/* ── Brand name ────────────────────────────────── */}
            <div className="flex flex-col items-center gap-1.5">
                <h2 className="text-lg font-bold tracking-[0.28em] uppercase bg-linear-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent">
                    AltuxDX
                </h2>
                <p className={`text-[10px] tracking-[0.22em] uppercase font-medium ${muted}`}>
                    Healthcare Inventory
                </p>
            </div>

            {/* ── Indeterminate progress bar ─────────────────── */}
            <div className="w-48 flex flex-col items-center gap-3">
                <div
                    className="relative w-full h-[2px] rounded-full overflow-hidden"
                    style={{ background: trackBg }}
                >
                    <motion.div
                        className="absolute top-0 h-full w-16 rounded-full"
                        style={{ background: 'linear-gradient(90deg, transparent, #3b82f6 40%, #6366f1 60%, transparent)' }}
                        animate={{ left: ['-4rem', 'calc(100% + 4rem)'] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut', repeatDelay: 0.25 }}
                    />
                </div>

                <p className={`text-[10px] tracking-[0.2em] uppercase font-medium ${muted}`}>
                    {message}
                </p>
            </div>
        </div>
    )

    if (fullScreen) {
        if (!show) return null
        return (
            <div className={`fixed inset-0 z-9999 flex items-center justify-center ${bg}`}>
                {core}
            </div>
        )
    }

    return (
        <div className="flex items-center justify-center w-full h-full min-h-64">
            {core}
        </div>
    )
}
