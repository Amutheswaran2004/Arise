import { useState, useEffect } from 'react';

export interface Flashcard {
    id: string;
    question: string;
    answer: string;
    category: 'Core Java' | 'Spring Boot' | 'Aptitude Formulas' | 'SQL';
    mastered: boolean;
}

const INITIAL_CARDS: Flashcard[] = [
    {
        id: '1',
        question: 'What is the difference between JDK, JRE, and JVM?',
        answer: 'JDK is the development kit including JRE and tools. JRE is the runtime environment. JVM is the engine that executes bytecode.',
        category: 'Core Java',
        mastered: false,
    },
    {
        id: '2',
        question: 'Explain Dependency Injection in Spring.',
        answer: 'DI is a design pattern where objects receive their dependencies from an external source rather than creating them, promoting loose coupling.',
        category: 'Spring Boot',
        mastered: false,
    },
    {
        id: '3',
        question: 'What is the formula for Compound Interest?',
        answer: 'A = P(1 + r/n)^(nt), where A is Amount, P is Principal, r is rate, n is compounding frequency, t is time.',
        category: 'Aptitude Formulas',
        mastered: true,
    },
    {
        id: '4',
        question: 'What is the purpose of @SpringBootApplication?',
        answer: 'It is a convenience annotation that combines @Configuration, @EnableAutoConfiguration, and @ComponentScan.',
        category: 'Spring Boot',
        mastered: false,
    },
    {
        id: '5',
        question: 'Difference between ArrayList and LinkedList?',
        answer: 'ArrayList uses a dynamic array (better for access), LinkedList uses a doubly linked list (better for manipulation).',
        category: 'Core Java',
        mastered: false,
    }
];

export function useFlashcards() {
    const [cards, setCards] = useState<Flashcard[]>(() => {
        const saved = localStorage.getItem('flashcards');
        return saved ? JSON.parse(saved) : INITIAL_CARDS;
    });

    useEffect(() => {
        localStorage.setItem('flashcards', JSON.stringify(cards));
    }, [cards]);

    const toggleMastered = (id: string) => {
        setCards(cards.map(c =>
            c.id === id ? { ...c, mastered: !c.mastered } : c
        ));
    };

    const addCard = (card: Omit<Flashcard, 'id' | 'mastered'>) => {
        const newCard: Flashcard = {
            ...card,
            id: Date.now().toString(),
            mastered: false,
        };
        setCards([newCard, ...cards]);
    };

    const deleteCard = (id: string) => {
        setCards(cards.filter(c => c.id !== id));
    };

    return { cards, toggleMastered, addCard, deleteCard };
}
