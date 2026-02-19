
import { FileText, ExternalLink, Trash2 } from 'lucide-react';

interface MaterialProps {
    id: string;
    title: string;
    category: 'Aptitude' | 'Reasoning' | 'Verbal' | 'Coding';
    type: 'PDF' | 'Link';
    url: string;
    onDelete: (id: string) => void;
}

export function MaterialCard({ id, title, category, type, url, onDelete }: MaterialProps) {
    const categoryColors = {
        Aptitude: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
        Reasoning: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
        Verbal: 'bg-green-500/10 text-green-400 border-green-500/20',
        Coding: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
    };

    return (
        <div className="bg-slate-800 rounded-lg p-4 border border-slate-700 hover:border-indigo-500/50 transition-colors group">
            <div className="flex justify-between items-start mb-3">
                <div className={`text-xs px-2 py-1 rounded-full border ${categoryColors[category]}`}>
                    {category}
                </div>
                <button
                    onClick={() => onDelete(id)}
                    className="text-slate-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                    <Trash2 className="w-4 h-4" />
                </button>
            </div>

            <h3 className="text-slate-200 font-medium mb-4 line-clamp-2 h-12">
                {title}
            </h3>

            <div className="flex items-center justify-between mt-auto">
                <span className="text-xs text-slate-500 flex items-center">
                    {type === 'PDF' ? <FileText className="w-3 h-3 mr-1" /> : <ExternalLink className="w-3 h-3 mr-1" />}
                    {type}
                </span>

                <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
                >
                    {type === 'PDF' ? 'View' : 'Open'}
                    <ExternalLink className="w-3 h-3 ml-1" />
                </a>
            </div>
        </div>
    );
}
