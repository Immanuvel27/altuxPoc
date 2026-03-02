import React from 'react'

export default function Home() {
    const cards = [
        { id: 1, title: 'Card One', description: 'This is the first card' },
        { id: 2, title: 'Card Two', description: 'This is the second card' },
        { id: 3, title: 'Card Three', description: 'This is the third card' },
        
    ]

    return (
        <div className="bg-gray-100 py-12 px-4">

            <div className="max-w-5xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {cards.map((card) => (
                        <div
                            key={card.id}
                            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
                        >
                            <h2 className="text-xl text-secondary font-semibold mb-2">
                                {card.title}
                            </h2>
                            <p className="text-gray-600">
                                {card.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
