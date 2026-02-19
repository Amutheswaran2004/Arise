
import { Bell, User } from 'lucide-react';

export function Header() {
    return (
        <header className="flex h-16 items-center justify-between border-b border-slate-800 bg-slate-900 px-6">
            <div className="flex items-center">
                {/* Placeholder for breadcrumbs or title */}
            </div>
            <div className="flex items-center space-x-4">
                <button className="rounded-full p-2 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors">
                    <Bell className="h-5 w-5" />
                </button>
                <div className="flex items-center space-x-3 border-l border-slate-800 pl-4">
                    <div className="h-8 w-8 rounded-full bg-indigo-500 flex items-center justify-center text-white text-sm font-bold">
                        <User className="h-5 w-5" />
                    </div>
                    <span className="text-sm font-medium text-slate-200">Aspirant</span>
                </div>
            </div>
        </header>
    );
}
