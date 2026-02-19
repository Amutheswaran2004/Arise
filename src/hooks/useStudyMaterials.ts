import { useState, useEffect } from 'react';

export interface StudyMaterial {
    id: string;
    title: string;
    category: 'Aptitude' | 'Reasoning' | 'Verbal' | 'Coding';
    type: 'PDF' | 'Link';
    url: string;
    dateAdded: string;
}

const INITIAL_MATERIALS: StudyMaterial[] = [
    {
        id: '1',
        title: 'Quantitative Aptitude Formulas.pdf',
        category: 'Aptitude',
        type: 'PDF',
        url: '#',
        dateAdded: '2026-02-01',
    },
    {
        id: '2',
        title: 'Top 100 Codes for TCS NQT',
        category: 'Coding',
        type: 'Link',
        url: 'https://leetcode.com',
        dateAdded: '2026-02-05',
    },
    {
        id: '3',
        title: 'Logical Reasoning Practice Set 1',
        category: 'Reasoning',
        type: 'PDF',
        url: '#',
        dateAdded: '2026-02-10',
    },
];

export function useStudyMaterials() {
    const [materials, setMaterials] = useState<StudyMaterial[]>(() => {
        const saved = localStorage.getItem('studyMaterials');
        return saved ? JSON.parse(saved) : INITIAL_MATERIALS;
    });

    useEffect(() => {
        localStorage.setItem('studyMaterials', JSON.stringify(materials));
    }, [materials]);

    const addMaterial = (material: Omit<StudyMaterial, 'id' | 'dateAdded'>) => {
        const newMaterial: StudyMaterial = {
            ...material,
            id: Date.now().toString(),
            dateAdded: new Date().toISOString().split('T')[0],
        };
        setMaterials([newMaterial, ...materials]);
    };

    const deleteMaterial = (id: string) => {
        setMaterials(materials.filter((m) => m.id !== id));
    };

    return { materials, addMaterial, deleteMaterial };
}
