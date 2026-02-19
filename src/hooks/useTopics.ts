import { useState, useEffect } from 'react';

export type Status = 'To Do' | 'In Progress' | 'Completed';

export interface Topic {
    id: string;
    name: string;
    category: 'Foundation Quant' | 'Verbal Ability' | 'Reasoning Ability' | 'Advanced Quant & Logic' | 'Coding Practice';
    status: Status;
}

const INITIAL_TOPICS: Topic[] = [
    // Foundation Quant (Day 1-4)
    { id: 'n1', name: 'Percentages', category: 'Foundation Quant', status: 'To Do' },
    { id: 'n2', name: 'Ratio & Proportion', category: 'Foundation Quant', status: 'To Do' },
    { id: 'n3', name: 'Profit & Loss', category: 'Foundation Quant', status: 'To Do' },
    { id: 'n4', name: 'Time & Work', category: 'Foundation Quant', status: 'To Do' },
    { id: 'n5', name: 'Time, Speed & Distance', category: 'Foundation Quant', status: 'To Do' },
    { id: 'n6', name: 'Averages & Mixtures', category: 'Foundation Quant', status: 'To Do' },
    { id: 'n7', name: 'Number System Basics', category: 'Foundation Quant', status: 'To Do' },

    // Verbal Ability (Day 5-7)
    { id: 'v1', name: 'Reading Comprehension', category: 'Verbal Ability', status: 'To Do' },
    { id: 'v2', name: 'Error Detection', category: 'Verbal Ability', status: 'To Do' },
    { id: 'v3', name: 'Sentence Correction', category: 'Verbal Ability', status: 'To Do' },
    { id: 'v4', name: 'Para Jumbles', category: 'Verbal Ability', status: 'To Do' },
    { id: 'v5', name: 'Fill in the blanks', category: 'Verbal Ability', status: 'To Do' },
    { id: 'v6', name: 'Vocabulary Basics', category: 'Verbal Ability', status: 'To Do' },

    // Reasoning Ability (Day 8-10)
    { id: 'r1', name: 'Coding-Decoding', category: 'Reasoning Ability', status: 'To Do' },
    { id: 'r2', name: 'Blood Relations', category: 'Reasoning Ability', status: 'To Do' },
    { id: 'r3', name: 'Direction Sense', category: 'Reasoning Ability', status: 'To Do' },
    { id: 'r4', name: 'Number & Letter Series', category: 'Reasoning Ability', status: 'To Do' },
    { id: 'r5', name: 'Syllogisms', category: 'Reasoning Ability', status: 'To Do' },
    { id: 'r6', name: 'Seating Arrangement (Basic)', category: 'Reasoning Ability', status: 'To Do' },
    { id: 'r7', name: 'Statement & Conclusion', category: 'Reasoning Ability', status: 'To Do' },

    // Advanced Quant & Logic (Day 11-14)
    { id: 'a1', name: 'Adv. Percentages & Algebra', category: 'Advanced Quant & Logic', status: 'To Do' },
    { id: 'a2', name: 'Data Interpretation', category: 'Advanced Quant & Logic', status: 'To Do' },
    { id: 'a3', name: 'Logical Caselets', category: 'Advanced Quant & Logic', status: 'To Do' },
    { id: 'a4', name: 'Adv. Series & Patterns', category: 'Advanced Quant & Logic', status: 'To Do' },
    { id: 'a5', name: 'Quant + Logic Mixed', category: 'Advanced Quant & Logic', status: 'To Do' },

    // Coding Practice (Day 15-18)
    { id: 'c1', name: 'Arrays & Strings', category: 'Coding Practice', status: 'To Do' },
    { id: 'c2', name: 'HashMap/Frequency', category: 'Coding Practice', status: 'To Do' },
    { id: 'c3', name: 'Sliding Window/Two Pointer', category: 'Coding Practice', status: 'To Do' },
    { id: 'c4', name: 'Sorting & Searching', category: 'Coding Practice', status: 'To Do' },
    { id: 'c5', name: 'Recursion', category: 'Coding Practice', status: 'To Do' },
    { id: 'c6', name: 'Matrix Traversal', category: 'Coding Practice', status: 'To Do' },
];

export function useTopics() {
    const [topics, setTopics] = useState<Topic[]>(() => {
        const saved = localStorage.getItem('syllabusRequest');
        return saved ? JSON.parse(saved) : INITIAL_TOPICS;
    });

    useEffect(() => {
        localStorage.setItem('syllabusRequest', JSON.stringify(topics));
    }, [topics]);

    const updateStatus = (id: string, newStatus: Status) => {
        setTopics(topics.map(t =>
            t.id === id ? { ...t, status: newStatus } : t
        ));
    };

    const getProgress = () => {
        const total = topics.length;
        const completed = topics.filter(t => t.status === 'Completed').length;
        return Math.round((completed / total) * 100);
    };

    return { topics, updateStatus, getProgress };
}
