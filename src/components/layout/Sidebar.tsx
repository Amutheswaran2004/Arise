import { NavLink } from 'react-router-dom';
import { LayoutDashboard, BookOpen, CheckSquare, BarChart2, Zap, LogOut } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useAuth } from '../../contexts/AuthContext';

const navigation = [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    { name: 'Study Material', href: '/study-material', icon: BookOpen },
    { name: 'Topic Tracker', href: '/topic-tracker', icon: CheckSquare },
    { name: 'Analytics', href: '/analytics', icon: BarChart2 },
    { name: 'Flashcards', href: '/flashcards', icon: Zap },
];

export function Sidebar() {
    const { logout, currentUser } = useAuth();

    return (
        <div className="flex h-full w-64 flex-col bg-slate-900 border-r border-slate-800">
            <div className="flex h-16 items-center justify-center border-b border-slate-800">
                <h1 className="text-xl font-bold text-indigo-400">TCS NQT Prep</h1>
            </div>
            <nav className="flex-1 space-y-1 px-2 py-4">
                {navigation.map((item) => (
                    <NavLink
                        key={item.name}
                        to={item.href}
                        className={({ isActive }) =>
                            cn(
                                'group flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors',
                                isActive
                                    ? 'bg-indigo-900/50 text-indigo-300'
                                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                            )
                        }
                    >
                        <item.icon
                            className="mr-3 h-5 w-5 flex-shrink-0"
                            aria-hidden="true"
                        />
                        {item.name}
                    </NavLink>
                ))}
            </nav>
            <div className="p-4 border-t border-slate-800 space-y-4">
                {currentUser && (
                    <div className="flex items-center gap-3 px-2">
                        <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold text-xs">
                            {currentUser.email?.charAt(0).toUpperCase()}
                        </div>
                        <div className="overflow-hidden">
                            <p className="text-sm text-white truncate">{currentUser.displayName || 'User'}</p>
                            <p className="text-xs text-slate-500 truncate">{currentUser.email}</p>
                        </div>
                    </div>
                )}

                <button
                    onClick={() => logout()}
                    className="w-full flex items-center px-4 py-2 text-sm font-medium text-slate-400 hover:bg-slate-800 hover:text-white rounded-md transition-colors"
                >
                    <LogOut className="mr-3 h-5 w-5" />
                    Sign Out
                </button>

                <p className="text-xs text-slate-500 text-center pt-2">
                    Prepare hard. Dream big.
                </p>
            </div>
        </div>
    );
}
