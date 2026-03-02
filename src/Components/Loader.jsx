import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from './ThemeContext'

const LETTERS = ['A', 'L', 'T', 'U', 'X', 'D', 'X']

/**
 * AltuxDX Medical Loader.
 *
 * Props:
 *   fullScreen  {boolean}  — fixed full-screen overlay
 *   message     {string}   — status text shown below
 *   show        {boolean}  — controls overlay visibility
 */
export default function Loader({ fullScreen = false, message = 'Analyzing vitals...', show = true }) {
    const { isDark } = useTheme()

    // Start at a random letter, then cycle continuously
    const [idx, setIdx] = useState(() => Math.floor(Math.random() * LETTERS.length))
    useEffect(() => {
        const t = setInterval(() => setIdx(i => (i + 1) % LETTERS.length), 850)
        return () => clearInterval(t)
    }, [])

    const bg     = isDark ? 'bg-gray-950' : 'bg-gray-50'
    const track  = isDark ? '#111827'     : '#e5e7eb'
    const fadePx = isDark ? '#030712'     : '#f9fafb'

    // Realistic ECG waveform — 320px wide, baseline y=26
    const ecgD =
        'M0,26 L35,26 L37,23 L40,23 L43,26 ' +
        'L60,26 L63,30 L66,4 L69,42 L72,26 ' +
        'L80,26 Q89,13 98,26 ' +
        'L155,26 L157,23 L160,23 L163,26 ' +
        'L180,26 L183,30 L186,4 L189,42 L192,26 ' +
        'L200,26 Q209,13 218,26 ' +
        'L320,26'

    const core = (
        <div className="flex flex-col items-center justify-center gap-5 select-none">

            {/* ── Morphing letter + sonar rings ─────────── */}
            <div className="relative flex items-center justify-center w-52 h-52">

                {/* Sonar rings emanating outward */}
                {[0, 1, 2].map((i) => (
                    <motion.div
                        key={i}
                        className="absolute rounded-full border border-emerald-400/40"
                        style={{ width: 72, height: 72 }}
                        initial={{ scale: 1, opacity: 0.6 }}
                        animate={{ scale: 3.0, opacity: 0 }}
                        transition={{
                            duration: 2.4,
                            repeat: Infinity,
                            delay: i * 0.8,
                            ease: 'easeOut',
                        }}
                    />
                ))}

                {/* Ambient glow that reacts to the letter change */}
                <motion.div
                    key={`glow-${idx}`}
                    className="absolute w-36 h-36 rounded-full blur-3xl"
                    style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.25) 0%, transparent 70%)' }}
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={{ scale: [1, 1.3, 1], opacity: [0.7, 0.2, 0.7] }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                />

                {/* Red cross badge (medical) */}
                <div className="absolute top-8 right-8 z-20 w-6 h-6 rounded-full bg-red-500 shadow-lg shadow-red-500/40 flex items-center justify-center">
                    <span className="text-white font-black leading-none text-xs">✚</span>
                </div>

                {/* Shapeshifting letter */}
                <AnimatePresence mode="wait">
                    <motion.span
                        key={idx}
                        className="relative z-10 text-9xl font-black leading-none bg-linear-to-br from-cyan-300 via-blue-400 to-blue-600 bg-clip-text text-transparent"
                        initial={{ opacity: 0, rotate: -10, filter: 'blur(22px)', y: 6  }}
                        animate={{ opacity: 1, rotate: 0,   filter: 'blur(0px)',  y: 0  }}
                        exit  ={{ opacity: 0, rotate: 10,  filter: 'blur(22px)', y: -6 }}
                        transition={{ duration: 0.38, ease: [0.25, 0.46, 0.45, 0.94] }}
                    >
                        {LETTERS[idx]}
                    </motion.span>
                </AnimatePresence>

                {/* Letter-position dots */}
                <div className="absolute bottom-3 flex items-center gap-1.5">
                    {LETTERS.map((_, i) => (
                        <motion.span
                            key={i}
                            className="rounded-full"
                            animate={{
                                width:   i === idx ? 16 : 5,
                                height:  5,
                                backgroundColor: i === idx ? '#22d3ee' : (isDark ? '#374151' : '#d1d5db'),
                            }}
                            transition={{ duration: 0.25, ease: 'easeInOut' }}
                            style={{ display: 'block' }}
                        />
                    ))}
                </div>
            </div>

            {/* ── Traveling ECG waveform ─────────────────── */}
            <div className="relative overflow-hidden rounded-lg w-60 h-13">
                <div className="absolute inset-0 rounded-lg" style={{ background: track }} />

                {/* Subtle grid */}
                <svg className="absolute inset-0 opacity-[0.12]" viewBox="0 0 240 52"
                    width="240" height="52" preserveAspectRatio="none">
                    {[13, 26, 39].map(y => (
                        <line key={y} x1="0" y1={y} x2="240" y2={y} stroke="#22c55e" strokeWidth="0.5" />
                    ))}
                    {[60, 120, 180].map(x => (
                        <line key={x} x1={x} y1="0" x2={x} y2="52" stroke="#22c55e" strokeWidth="0.5" />
                    ))}
                </svg>

                {/* Two-copy scrolling trace */}
                <motion.div
                    className="absolute top-0 left-0 flex"
                    style={{ width: '640px' }}
                    animate={{ x: [0, -320] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: 'linear' }}
                >
                    {[0, 1].map((c) => (
                        <svg key={c} viewBox="0 0 320 52" width="320" height="52">
                            <path d={ecgD} stroke="#22c55e" strokeWidth="5" fill="none"
                                strokeLinecap="round" strokeLinejoin="round" opacity="0.12" />
                            <path d={ecgD} stroke="#22c55e" strokeWidth="1.8" fill="none"
                                strokeLinecap="round" strokeLinejoin="round" />
                            <path d={ecgD} stroke="#86efac" strokeWidth="0.7" fill="none"
                                strokeLinecap="round" strokeLinejoin="round" opacity="0.55" />
                        </svg>
                    ))}
                </motion.div>

                {/* Edge fade */}
                <div className="absolute inset-0 pointer-events-none rounded-lg"
                    style={{ background: `linear-gradient(to right, ${fadePx} 0%, transparent 18%, transparent 82%, ${fadePx} 100%)` }}
                />
            </div>

            {/* ── Brand ─────────────────────────────────── */}
            <motion.div className="text-center"
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
            >
                <h2 className="text-xl font-bold tracking-widest uppercase bg-linear-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                    AltuxDX
                </h2>
                <p className={`text-xs tracking-widest uppercase font-semibold mt-0.5 ${isDark ? 'text-emerald-400/50' : 'text-emerald-600/55'}`}>
                    Healthcare
                </p>
            </motion.div>

            {/* ── Audio-visualiser vitals bar ───────────── */}
            <div className="flex items-end gap-1">
                {[0.4, 0.65, 1, 0.75, 1.4, 0.9, 0.55, 1.2, 0.5, 0.8].map((h, i) => (
                    <motion.span key={i}
                        className="rounded-full bg-emerald-500"
                        style={{ width: 3, height: 18 * h }}
                        animate={{ scaleY: [0.25, 1, 0.25], opacity: [0.35, 1, 0.35] }}
                        transition={{ duration: 0.7 + h * 0.3, repeat: Infinity, delay: i * 0.07, ease: 'easeInOut' }}
                    />
                ))}
            </div>

            {/* ── Status message ─────────────────────────── */}
            <motion.p
                className={`text-xs tracking-widest uppercase font-medium ${isDark ? 'text-emerald-400/60' : 'text-emerald-700/60'}`}
                animate={{ opacity: [0.45, 1, 0.45] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
            >
                {message}
            </motion.p>
        </div>
    )

    if (fullScreen) {
        return (
            <AnimatePresence>
                {show && (
                    <motion.div key="loader-overlay"
                        className={`fixed inset-0 z-9999 flex items-center justify-center ${bg}`}
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        {core}
                    </motion.div>
                )}
            </AnimatePresence>
        )
    }

    return (
        <div className="flex items-center justify-center w-full h-full min-h-64">
            {core}
        </div>
    )
}
