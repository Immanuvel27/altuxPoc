import React from 'react'
import { useTheme } from '../Components/ThemeContext'

export default function Home() {
    const { isDark } = useTheme()

    const cards = [
        { id: 1, title: 'Card One', description: 'This is the first card' },
        { id: 2, title: 'Card Two', description: 'This is the second card' },
        { id: 3, title: 'Card Three', description: 'This is the third card' },
    ]

    return (
        <div className="py-12 px-4 min-h-full">
            <div className="max-w-5xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {cards.map((card) => (
                        <div
                            key={card.id}
                            className={`rounded-lg shadow-md p-6 hover:shadow-lg transition-all duration-300 ${
                                isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white'
                            }`}
                        >
                            <h2 className={`text-xl font-semibold mb-2 ${isDark ? 'text-blue-400' : 'text-secondary'}`}>
                                {card.title}
                            </h2>
                            <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                                {card.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
