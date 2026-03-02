import React from 'react'

export default function Home() {
    const cards = [
        { id: 1, title: 'Card One', description: 'This is the first card' },
        { id: 2, title: 'Card Two', description: 'This is the second card' },
        { id: 3, title: 'Card Three', description: 'This is the third card' }
    ]

    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4">
            <h1 className=" text-primary text-4xl font-bold text-center mb-12">
                Home Page
            </h1>
            
            <div className="flex flex-col gap-6 max-w-2xl mx-auto">
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
    )
}
