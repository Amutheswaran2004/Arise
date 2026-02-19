import { useState } from 'react';
import { Plus, Check, Trash2, BrainCircuit } from 'lucide-react';
import { useFlashcards, type Flashcard } from '../hooks/useFlashcards';
import { cn } from '../lib/utils';

export function Flashcards() {
    const { cards, toggleMastered, addCard, deleteCard } = useFlashcards();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const filteredCards = cards.filter(c =>
        selectedCategory === 'All' || c.category === selectedCategory
    );

    const currentCard = filteredCards[currentIndex];

    const categories = ['All', 'Core Java', 'Spring Boot', 'Aptitude Formulas', 'SQL'];

    const handleNext = () => {
        setIsFlipped(false);
        setCurrentIndex((prev) => (prev + 1) % filteredCards.length);
    };

    const handlePrev = () => {
        setIsFlipped(false);
        setCurrentIndex((prev) => (prev - 1 + filteredCards.length) % filteredCards.length);
    };

    return (
        <div className="space-y-8 max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Quick Review</h1>
                    <p className="text-slate-400">Master concepts with active recall.</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
                >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Card
                </button>
            </div>

            <div className="flex gap-2 overflow-x-auto pb-2 justify-center">
                {categories.map((category) => (
                    <button
                        key={category}
                        onClick={() => {
                            setSelectedCategory(category);
                            setCurrentIndex(0);
                            setIsFlipped(false);
                        }}
                        className={cn(
                            "px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors",
                            selectedCategory === category
                                ? 'bg-indigo-500 text-white'
                                : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-200'
                        )}
                    >
                        {category}
                    </button>
                ))}
            </div>

            {filteredCards.length > 0 ? (
                <div className="relative perspective-1000 h-96 w-full">
                    <div
                        className="w-full h-full relative preserve-3d transition-transform duration-700 cursor-pointer"
                        style={{ transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
                        onClick={() => setIsFlipped(!isFlipped)}
                    >
                        {/* Front */}
                        <div className="absolute w-full h-full backface-hidden bg-slate-800 rounded-2xl border border-slate-700 shadow-xl p-8 flex flex-col items-center justify-center text-center">
                            <span className="absolute top-4 left-4 text-xs font-medium text-indigo-400 bg-indigo-500/10 px-2 py-1 rounded">
                                {currentCard.category}
                            </span>
                            {currentCard.mastered && (
                                <span className="absolute top-4 right-4 text-green-400">
                                    <Check className="w-5 h-5" />
                                </span>
                            )}

                            <BrainCircuit className="w-12 h-12 text-slate-600 mb-6" />
                            <h3 className="text-2xl font-bold text-slate-200">
                                {currentCard.question}
                            </h3>
                            <p className="text-sm text-slate-500 mt-8 animate-pulse">
                                Click to reveal answer
                            </p>
                        </div>

                        {/* Back */}
                        <div
                            className="absolute w-full h-full backface-hidden bg-gradient-to-br from-indigo-900 to-slate-900 rounded-2xl border border-indigo-500/30 shadow-xl p-8 flex flex-col items-center justify-center text-center"
                            style={{ transform: 'rotateY(180deg)' }}
                        >
                            <h3 className="text-xl text-slate-200 leading-relaxed">
                                {currentCard.answer}
                            </h3>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="text-center py-20 text-slate-500 bg-slate-800/50 rounded-xl border border-dashed border-slate-700">
                    <p>No cards found in this category.</p>
                </div>
            )}

            {filteredCards.length > 0 && (
                <div className="flex items-center justify-between">
                    <button
                        onClick={handlePrev}
                        className="px-6 py-2 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
                    >
                        Previous
                    </button>

                    <div className="flex gap-4">
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                toggleMastered(currentCard.id);
                            }}
                            title={currentCard.mastered ? "Mark as Review Needed" : "Mark as Mastered"}
                            className={cn(
                                "p-3 rounded-full transition-colors",
                                currentCard.mastered
                                    ? "bg-green-500/20 text-green-400 hover:bg-green-500/30"
                                    : "bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white"
                            )}
                        >
                            <Check className="w-5 h-5" />
                        </button>
                        <button
                            onClick={() => {
                                if (confirm('Delete this card?')) {
                                    deleteCard(currentCard.id);
                                    if (filteredCards.length === 1) setCurrentIndex(0); // If deleting last one
                                    else if (currentIndex >= filteredCards.length - 1) setCurrentIndex(prev => prev - 1);
                                }
                            }}
                            className="p-3 rounded-full bg-slate-800 text-slate-400 hover:bg-red-500/20 hover:text-red-400 transition-colors"
                        >
                            <Trash2 className="w-5 h-5" />
                        </button>
                    </div>

                    <button
                        onClick={handleNext}
                        className="px-6 py-2 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
                    >
                        Next
                    </button>
                </div>
            )}

            {isModalOpen && (
                <AddCardModal
                    onClose={() => setIsModalOpen(false)}
                    onAdd={addCard}
                />
            )}
        </div>
    );
}

function AddCardModal({ onClose, onAdd }: { onClose: () => void; onAdd: (c: any) => void }) {
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [category, setCategory] = useState<Flashcard['category']>('Core Java');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onAdd({ question, answer, category });
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 w-full max-w-md">
                <h2 className="text-xl font-bold text-white mb-4">Create Flashcard</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-1">Question</label>
                        <textarea
                            required
                            rows={3}
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                            className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:border-indigo-500 focus:outline-none resize-none"
                            placeholder="Enter the concept or question..."
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-1">Category</label>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value as any)}
                            className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:border-indigo-500 focus:outline-none"
                        >
                            <option value="Core Java">Core Java</option>
                            <option value="Spring Boot">Spring Boot</option>
                            <option value="Aptitude Formulas">Aptitude Formulas</option>
                            <option value="SQL">SQL</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-1">Answer</label>
                        <textarea
                            required
                            rows={3}
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                            className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:border-indigo-500 focus:outline-none resize-none"
                            placeholder="Enter the explanation..."
                        />
                    </div>
                    <div className="flex justify-end gap-3 mt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-slate-400 hover:text-white transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
                        >
                            Save Card
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
