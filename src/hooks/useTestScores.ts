import { useState, useEffect } from 'react';

export interface TestScore {
    id: string;
    testName: string;
    score: number;
    totalMarks: number;
    date: string;
    category: 'Aptitude' | 'Reasoning' | 'Verbal' | 'Coding' | 'Full Mock';
}

const INITIAL_SCORES: TestScore[] = [
    { id: '1', testName: 'Mock Test 1', score: 65, totalMarks: 100, date: '2026-02-01', category: 'Full Mock' },
    { id: '2', testName: 'Aptitude Speed Test', score: 18, totalMarks: 20, date: '2026-02-03', category: 'Aptitude' },
    { id: '3', testName: 'Mock Test 2', score: 72, totalMarks: 100, date: '2026-02-08', category: 'Full Mock' },
    { id: '4', testName: 'Verbal Ability Set A', score: 22, totalMarks: 30, date: '2026-02-12', category: 'Verbal' },
    { id: '5', testName: 'Mock Test 3', score: 78, totalMarks: 100, date: '2026-02-15', category: 'Full Mock' },
];

export function useTestScores() {
    const [scores, setScores] = useState<TestScore[]>(() => {
        const saved = localStorage.getItem('testScores');
        return saved ? JSON.parse(saved) : INITIAL_SCORES;
    });

    useEffect(() => {
        localStorage.setItem('testScores', JSON.stringify(scores));
    }, [scores]);

    const addScore = (score: Omit<TestScore, 'id'>) => {
        const newScore: TestScore = {
            ...score,
            id: Date.now().toString(),
        };
        // Sort by date ascending after adding
        const newScores = [...scores, newScore].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        setScores(newScores);
    };

    const deleteScore = (id: string) => {
        setScores(scores.filter((s) => s.id !== id));
    };

    return { scores, addScore, deleteScore };
}
