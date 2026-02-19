
import { useTopics, type Status } from '../hooks/useTopics';
import { cn } from '../lib/utils';
import { tcsNQTData } from '../data/tcsNQTData';
import { Calendar, CheckCircle2, Circle } from 'lucide-react';

export function TopicTracker() {
    const { topics, updateStatus, getProgress } = useTopics();
    const progress = getProgress();

    const categories = Array.from(new Set(topics.map(t => t.category)));

    const statusColors = {
        'To Do': 'text-slate-500',
        'In Progress': 'text-orange-400',
        'Completed': 'text-green-500',
    };

    return (
        <div className="space-y-8 pb-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Topic Tracker & Plan</h1>
                    <p className="text-slate-400">Follow the 20-Day Crash Plan to ace the NQT.</p>
                </div>
                <div className="text-right bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
                    <div className="text-3xl font-bold text-indigo-400">{progress}%</div>
                    <div className="text-sm text-slate-500">Overall Completion</div>
                </div>
            </div>

            {/* Crash Plan Timeline */}
            <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 p-6 overflow-hidden">
                <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-indigo-400" />
                    20-Day Crash Plan Schedule
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
                    {tcsNQTData.crashPlan.map((plan, idx) => (
                        <div key={idx} className="bg-slate-900/50 p-3 rounded-lg border border-slate-700/30 flex flex-col justify-between h-full hover:border-indigo-500/30 transition-colors">
                            <div>
                                <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider block mb-1">
                                    Day {plan.day}
                                </span>
                                <span className="text-sm text-slate-200 font-medium">
                                    {plan.focus}
                                </span>
                            </div>
                            <div className="mt-3 w-full bg-slate-800 rounded-full h-1">
                                <div className="bg-indigo-500/50 h-1 rounded-full w-0"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="w-full bg-slate-800 rounded-full h-2">
                <div
                    className="bg-indigo-500 h-2 rounded-full transition-all duration-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]"
                    style={{ width: `${progress}%` }}
                ></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories.map(category => (
                    <div key={category} className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden shadow-lg hover:shadow-indigo-500/10 transition-shadow">
                        <div className="bg-slate-900/50 p-4 border-b border-slate-700 flex justify-between items-center">
                            <h2 className="font-semibold text-lg text-white">{category}</h2>
                            <div className="text-xs text-slate-500 bg-slate-800 px-2 py-1 rounded-full border border-slate-700">
                                {topics.filter(t => t.category === category && t.status === 'Completed').length} / {topics.filter(t => t.category === category).length}
                            </div>
                        </div>
                        <div className="p-4 space-y-3">
                            {topics
                                .filter(t => t.category === category)
                                .map(topic => (
                                    <div key={topic.id} className="flex items-center justify-between group">
                                        <div className="flex items-center gap-3 overflow-hidden">
                                            <button
                                                onClick={() => updateStatus(topic.id, topic.status === 'Completed' ? 'To Do' : 'Completed')}
                                                className={cn(
                                                    "transition-colors",
                                                    topic.status === 'Completed' ? "text-green-500" : "text-slate-600 hover:text-slate-400"
                                                )}
                                            >
                                                {topic.status === 'Completed' ? <CheckCircle2 className="w-5 h-5" /> : <Circle className="w-5 h-5" />}
                                            </button>
                                            <span className={cn(
                                                "text-sm font-medium transition-all truncate",
                                                topic.status === 'Completed' ? 'text-slate-500 line-through decoration-slate-600' : 'text-slate-200'
                                            )}>
                                                {topic.name}
                                            </span>
                                        </div>
                                        <select
                                            value={topic.status}
                                            onChange={(e) => updateStatus(topic.id, e.target.value as Status)}
                                            className={cn(
                                                "text-[10px] uppercase font-bold tracking-wider bg-transparent border border-slate-700 rounded px-2 py-1 outline-none focus:border-indigo-500 cursor-pointer ml-2",
                                                statusColors[topic.status]
                                            )}
                                        >
                                            <option value="To Do">To Do</option>
                                            <option value="In Progress">Doing</option>
                                            <option value="Completed">Done</option>
                                        </select>
                                    </div>
                                ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
