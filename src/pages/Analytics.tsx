import { useState } from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    BarChart, Bar
} from 'recharts';
import { Plus, Trash2 } from 'lucide-react';
import { useTestScores, type TestScore } from '../hooks/useTestScores';

export function Analytics() {
    const { scores, addScore, deleteScore } = useTestScores();
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Filter for Full Mocks Trend
    const mockTrendData = scores
        .filter(s => s.category === 'Full Mock')
        .map(s => ({
            name: s.testName,
            score: (s.score / s.totalMarks) * 100,
            date: s.date
        }));

    // Calculate Average by Category
    const categories = ['Aptitude', 'Reasoning', 'Verbal', 'Coding'];
    const categoryPerformance = categories.map(cat => {
        const catScores = scores.filter(s => s.category === cat);
        if (catScores.length === 0) return { name: cat, average: 0 };

        const totalPercentage = catScores.reduce((acc, curr) => acc + (curr.score / curr.totalMarks) * 100, 0);
        return {
            name: cat,
            average: Math.round(totalPercentage / catScores.length)
        };
    });

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Performance Analytics</h1>
                    <p className="text-slate-400">Visualize your progress and identify weak spots.</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
                >
                    <Plus className="w-4 h-4 mr-2" />
                    Log Test Score
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Progress Chart */}
                <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-lg">
                    <h2 className="text-xl font-bold text-white mb-6">Full Mock Trend</h2>
                    <div className="h-80 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={mockTrendData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                                <XAxis dataKey="date" stroke="#94a3b8" />
                                <YAxis stroke="#94a3b8" domain={[0, 100]} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f1f5f9' }}
                                    itemStyle={{ color: '#818cf8' }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="score"
                                    stroke="#818cf8"
                                    strokeWidth={3}
                                    activeDot={{ r: 8 }}
                                    name="Percentage"
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Category Performance */}
                <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-lg">
                    <h2 className="text-xl font-bold text-white mb-6">Subject Weakness Analysis</h2>
                    <div className="h-80 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={categoryPerformance} layout="vertical">
                                <CartesianGrid strokeDasharray="3 3" stroke="#334155" horizontal={false} />
                                <XAxis type="number" stroke="#94a3b8" domain={[0, 100]} />
                                <YAxis dataKey="name" type="category" stroke="#94a3b8" width={80} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f1f5f9' }}
                                    cursor={{ fill: '#334155', opacity: 0.4 }}
                                />
                                <Bar dataKey="average" fill="#22d3ee" radius={[0, 4, 4, 0]} name="Avg Score %" barSize={32} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Recent Scores List */}
            <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-700">
                    <h3 className="text-lg font-semibold text-white">Recent Test Logs</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-slate-400">
                        <thead className="bg-slate-900/50 text-slate-200">
                            <tr>
                                <th className="px-6 py-3 font-medium">Date</th>
                                <th className="px-6 py-3 font-medium">Test Name</th>
                                <th className="px-6 py-3 font-medium">Category</th>
                                <th className="px-6 py-3 font-medium">Score</th>
                                <th className="px-6 py-3 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-700">
                            {[...scores].reverse().map((score) => (
                                <tr key={score.id} className="hover:bg-slate-700/30 transition-colors">
                                    <td className="px-6 py-3">{score.date}</td>
                                    <td className="px-6 py-3 font-medium text-white">{score.testName}</td>
                                    <td className="px-6 py-3">
                                        <span className={`px-2 py-1 rounded-full text-xs border ${score.category === 'Full Mock' ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20' :
                                            score.category === 'Aptitude' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                                                'bg-slate-700 text-slate-300 border-slate-600'
                                            }`}>
                                            {score.category}
                                        </span>
                                    </td>
                                    <td className="px-6 py-3">
                                        <span className={
                                            (score.score / score.totalMarks) >= 0.7 ? 'text-green-400' :
                                                (score.score / score.totalMarks) >= 0.4 ? 'text-yellow-400' : 'text-red-400'
                                        }>
                                            {score.score}/{score.totalMarks} ({Math.round((score.score / score.totalMarks) * 100)}%)
                                        </span>
                                    </td>
                                    <td className="px-6 py-3 text-right">
                                        <button
                                            onClick={() => deleteScore(score.id)}
                                            className="text-slate-500 hover:text-red-400 transition-colors"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {isModalOpen && (
                <AddScoreModal
                    onClose={() => setIsModalOpen(false)}
                    onAdd={addScore}
                />
            )}
        </div>
    );
}

function AddScoreModal({ onClose, onAdd }: { onClose: () => void; onAdd: (s: any) => void }) {
    const [testName, setTestName] = useState('');
    const [category, setCategory] = useState<TestScore['category']>('Full Mock');
    const [score, setScore] = useState('');
    const [totalMarks, setTotalMarks] = useState('100');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onAdd({
            testName,
            category,
            score: Number(score),
            totalMarks: Number(totalMarks),
            date
        });
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 w-full max-w-md">
                <h2 className="text-xl font-bold text-white mb-4">Log Test Score</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-1">Test Name</label>
                        <input
                            required
                            value={testName}
                            onChange={(e) => setTestName(e.target.value)}
                            className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:border-indigo-500 focus:outline-none"
                            placeholder="e.g., LeetCode Weekly Contest"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-1">Category</label>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value as any)}
                            className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:border-indigo-500 focus:outline-none"
                        >
                            <option value="Full Mock">Full Mock</option>
                            <option value="Aptitude">Aptitude</option>
                            <option value="Reasoning">Reasoning</option>
                            <option value="Verbal">Verbal</option>
                            <option value="Coding">Coding</option>
                        </select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-1">Score Upload</label>
                            <input
                                required
                                type="number"
                                value={score}
                                onChange={(e) => setScore(e.target.value)}
                                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:border-indigo-500 focus:outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-1">Total Marks</label>
                            <input
                                required
                                type="number"
                                value={totalMarks}
                                onChange={(e) => setTotalMarks(e.target.value)}
                                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:border-indigo-500 focus:outline-none"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-1">Date</label>
                        <input
                            required
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:border-indigo-500 focus:outline-none"
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
                            Save Log
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
