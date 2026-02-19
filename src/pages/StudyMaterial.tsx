import { useState } from 'react';
import { Plus, Search, BookOpen, Target, Lightbulb, ExternalLink, ChevronDown, ChevronUp, History } from 'lucide-react';
import { MaterialCard } from '../components/study/MaterialCard';
import { useStudyMaterials, type StudyMaterial } from '../hooks/useStudyMaterials';
import { tcsNQTData } from '../data/tcsNQTData';
import { cn } from '../lib/utils';
import { AnimatePresence, motion } from 'framer-motion';

export function StudyMaterial() {
    const { materials, addMaterial, deleteMaterial } = useStudyMaterials();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [expandedStrategy, setExpandedStrategy] = useState<string | null>('numerical');

    const filteredMaterials = materials.filter((material) => {
        const matchesSearch = material.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || material.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const categories = ['All', 'Aptitude', 'Reasoning', 'Verbal', 'Coding'];

    return (
        <div className="space-y-8 pb-10">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h1 className="text-3xl font-bold text-white">Study Material Hub</h1>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors shadow-lg shadow-indigo-500/20"
                >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Custom Material
                </button>
            </div>

            {/* Strategy Section */}
            <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                    <BookOpen className="w-5 h-5 text-indigo-400" />
                    <h2 className="text-xl font-semibold text-white">Preparation Strategy & Resources</h2>
                </div>

                <div className="grid grid-cols-1 gap-4">
                    {tcsNQTData.sectionStrategies.map((section) => (
                        <div key={section.id} className="bg-slate-800/50 border border-slate-700/50 rounded-xl overflow-hidden transition-all duration-300">
                            <button
                                onClick={() => setExpandedStrategy(expandedStrategy === section.id ? null : section.id)}
                                className="w-full flex items-center justify-between p-4 hover:bg-slate-800/80 transition-colors"
                            >
                                <div className="flex items-center gap-3">
                                    <div className={cn(
                                        "w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold",
                                        expandedStrategy === section.id ? "bg-indigo-500 text-white" : "bg-slate-700 text-slate-400"
                                    )}>
                                        {section.title.charAt(0)}
                                    </div>
                                    <div className="text-left">
                                        <h3 className={cn("font-medium", expandedStrategy === section.id ? "text-indigo-300" : "text-slate-300")}>
                                            {section.title}
                                        </h3>
                                        <p className="text-xs text-slate-500">Duration: {section.duration}</p>
                                    </div>
                                </div>
                                {expandedStrategy === section.id ? (
                                    <ChevronUp className="w-5 h-5 text-indigo-400" />
                                ) : (
                                    <ChevronDown className="w-5 h-5 text-slate-500" />
                                )}
                            </button>

                            <AnimatePresence>
                                {expandedStrategy === section.id && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                        className="border-t border-slate-700/50"
                                    >
                                        <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-900/20">
                                            {/* Topics */}
                                            <div className="space-y-3">
                                                <h4 className="flex items-center gap-2 text-sm font-semibold text-slate-400 uppercase tracking-wider">
                                                    <Target className="w-4 h-4" /> Topics to Focus
                                                </h4>
                                                <div className="flex flex-wrap gap-2">
                                                    {section.topics?.map((topic, i) => (
                                                        <span key={i} className="px-2 py-1 bg-slate-800 border border-slate-700 rounded text-xs text-slate-300">
                                                            {topic}
                                                        </span>
                                                    ))}
                                                </div>

                                                {section.level && (
                                                    <div className="mt-3 text-xs text-slate-400">
                                                        <span className="font-semibold text-slate-300">Level:</span> {section.level}
                                                    </div>
                                                )}
                                            </div>

                                            {/* Strategy */}
                                            <div className="space-y-3">
                                                <h4 className="flex items-center gap-2 text-sm font-semibold text-slate-400 uppercase tracking-wider">
                                                    <Lightbulb className="w-4 h-4" /> Strategy & Tips
                                                </h4>
                                                <ul className="space-y-2">
                                                    {section.strategy?.map((tip, i) => (
                                                        <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                                                            <span className="text-indigo-500 mt-1">•</span>
                                                            {tip}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>

                                            {/* Resources */}
                                            {section.resources && section.resources.length > 0 && (
                                                <div className="md:col-span-2 mt-2 pt-4 border-t border-slate-700/30">
                                                    <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">Recommended Resources</h4>
                                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                                                        {section.resources.map((res, i) => (
                                                            <a
                                                                key={i}
                                                                href={res.url}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="flex items-center gap-2 p-2 rounded-lg bg-slate-800 hover:bg-slate-750 border border-slate-700 hover:border-indigo-500/30 transition-all group"
                                                            >
                                                                <div className="p-1.5 rounded-md bg-indigo-500/10 text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-colors">
                                                                    <ExternalLink className="w-3 h-3" />
                                                                </div>
                                                                <span className="text-xs text-slate-300 group-hover:text-indigo-300 truncate">{res.title}</span>
                                                            </a>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}

                    {/* Interview Prep Section */}
                    <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl overflow-hidden transition-all duration-300">
                        <button
                            onClick={() => setExpandedStrategy(expandedStrategy === 'interview' ? null : 'interview')}
                            className="w-full flex items-center justify-between p-4 hover:bg-slate-800/80 transition-colors"
                        >
                            <div className="flex items-center gap-3">
                                <div className={cn(
                                    "w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold",
                                    expandedStrategy === 'interview' ? "bg-indigo-500 text-white" : "bg-slate-700 text-slate-400"
                                )}>
                                    I
                                </div>
                                <div className="text-left">
                                    <h3 className={cn("font-medium", expandedStrategy === 'interview' ? "text-indigo-300" : "text-slate-300")}>
                                        Interview Prep (Post NQT)
                                    </h3>
                                    <p className="text-xs text-slate-500">Ninja, Digital & Prime</p>
                                </div>
                            </div>
                            {expandedStrategy === 'interview' ? <ChevronUp className="w-5 h-5 text-indigo-400" /> : <ChevronDown className="w-5 h-5 text-slate-500" />}
                        </button>
                        <AnimatePresence>
                            {expandedStrategy === 'interview' && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="border-t border-slate-700/50"
                                >
                                    <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-900/20">
                                        <div className="space-y-3">
                                            <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Key Tips</h4>
                                            <ul className="space-y-2">
                                                {tcsNQTData.interviewPrep.tips.map((tip, i) => (
                                                    <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                                                        <span className="text-indigo-500 mt-1">•</span>{tip}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className="space-y-3">
                                            <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Common Questions</h4>
                                            <ul className="space-y-2">
                                                {tcsNQTData.interviewPrep.examples.map((ex, i) => (
                                                    <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                                                        <span className="text-indigo-500 mt-1">?</span>{ex}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className="md:col-span-2 mt-2 pt-4 border-t border-slate-700/30">
                                            <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">Interview Resources</h4>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                                                {tcsNQTData.interviewPrep.resources.map((res, i) => (
                                                    <a key={i} href={res.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 p-2 rounded-lg bg-slate-800 hover:bg-slate-750 border border-slate-700 hover:border-indigo-500/30 transition-all group">
                                                        <div className="p-1.5 rounded-md bg-indigo-500/10 text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-colors"><ExternalLink className="w-3 h-3" /></div>
                                                        <span className="text-xs text-slate-300 group-hover:text-indigo-300 truncate">{res.title}</span>
                                                    </a>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Previously Asked Questions Section */}
                    <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl overflow-hidden transition-all duration-300">
                        <button
                            onClick={() => setExpandedStrategy(expandedStrategy === 'prevQuestions' ? null : 'prevQuestions')}
                            className="w-full flex items-center justify-between p-4 hover:bg-slate-800/80 transition-colors"
                        >
                            <div className="flex items-center gap-3">
                                <div className={cn(
                                    "w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold",
                                    expandedStrategy === 'prevQuestions' ? "bg-indigo-500 text-white" : "bg-slate-700 text-slate-400"
                                )}>
                                    <History className="w-4 h-4" />
                                </div>
                                <div className="text-left">
                                    <h3 className={cn("font-medium", expandedStrategy === 'prevQuestions' ? "text-indigo-300" : "text-slate-300")}>
                                        Previously Asked Questions
                                    </h3>
                                    <p className="text-xs text-slate-500">Real Exam Questions & Trends</p>
                                </div>
                            </div>
                            {expandedStrategy === 'prevQuestions' ? <ChevronUp className="w-5 h-5 text-indigo-400" /> : <ChevronDown className="w-5 h-5 text-slate-500" />}
                        </button>
                        <AnimatePresence>
                            {expandedStrategy === 'prevQuestions' && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="border-t border-slate-700/50"
                                >
                                    <div className="p-4 bg-slate-900/20">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                                            {tcsNQTData.previousYearQuestions?.map((res, i) => (
                                                <a key={i} href={res.url} target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 p-3 rounded-lg bg-slate-800 hover:bg-slate-750 border border-slate-700 hover:border-indigo-500/30 transition-all group">
                                                    <div className="mt-1 p-1.5 rounded-md bg-indigo-500/10 text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-colors">
                                                        <ExternalLink className="w-3.5 h-3.5" />
                                                    </div>
                                                    <div>
                                                        <h4 className="text-sm font-medium text-slate-200 group-hover:text-indigo-300 transition-colors line-clamp-2">
                                                            {res.title}
                                                        </h4>
                                                        <span className="text-xs text-slate-500 mt-1 block">{res.type}</span>
                                                    </div>
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Common Mistakes */}
                    <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
                        <h3 className="text-red-400 font-semibold mb-3 flex items-center gap-2">
                            <span className="text-xl">⚠️</span> Common Mistakes to Avoid
                        </h3>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {tcsNQTData.commonMistakes.map((mistake, i) => (
                                <li key={i} className="flex items-center gap-2 text-sm text-slate-300">
                                    <span className="w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0"></span>
                                    {mistake}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* Custom Materials Section */}
            <div className="space-y-4 pt-6 border-t border-slate-700">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-white">Your Materials</h2>

                    {/* Categories Filter */}
                    <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0 hide-scrollbar">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${selectedCategory === category
                                    ? 'bg-indigo-500 text-white'
                                    : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-200'
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <input
                        type="text"
                        placeholder="Search your custom materials..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-slate-200 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                    />
                </div>

                {filteredMaterials.length === 0 ? (
                    <div className="text-center py-12 border-2 border-dashed border-slate-700 rounded-xl">
                        <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-3">
                            <BookOpen className="w-6 h-6 text-slate-500" />
                        </div>
                        <p className="text-slate-400">No custom materials found.</p>
                        <p className="text-sm text-slate-500 mt-1">Add your own PDFs or links to track them here.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {filteredMaterials.map((material) => (
                            <MaterialCard
                                key={material.id}
                                {...material}
                                onDelete={deleteMaterial}
                            />
                        ))}
                    </div>
                )}
            </div>

            {isModalOpen && (
                <UploadModal
                    onClose={() => setIsModalOpen(false)}
                    onUpload={addMaterial}
                />
            )}
        </div>
    );
}

function UploadModal({ onClose, onUpload }: { onClose: () => void; onUpload: (m: any) => void }) {
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState<StudyMaterial['category']>('Aptitude');
    const [type, setType] = useState<StudyMaterial['type']>('PDF');
    const [url, setUrl] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onUpload({ title, category, type, url: url || '#' });
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 w-full max-w-md shadow-2xl">
                <h2 className="text-xl font-bold text-white mb-4">Add New Material</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-1">Title</label>
                        <input
                            required
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:border-indigo-500 focus:outline-none"
                            placeholder="e.g., Time & Work Formulas"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-1">Category</label>
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value as any)}
                                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:border-indigo-500 focus:outline-none"
                            >
                                <option value="Aptitude">Aptitude</option>
                                <option value="Reasoning">Reasoning</option>
                                <option value="Verbal">Verbal</option>
                                <option value="Coding">Coding</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-1">Type</label>
                            <select
                                value={type}
                                onChange={(e) => setType(e.target.value as StudyMaterial['type'])}
                                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:border-indigo-500 focus:outline-none"
                            >
                                <option value="PDF">PDF</option>
                                <option value="Link">Link</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-1">URL (Optional)</label>
                        <input
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:border-indigo-500 focus:outline-none"
                            placeholder="https://..."
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
                            Add Material
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
