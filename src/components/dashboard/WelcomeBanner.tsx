
import { Target, Trophy, Flame } from 'lucide-react';

export function WelcomeBanner() {
    return (
        <div className="bg-gradient-to-r from-indigo-900 to-slate-900 rounded-xl p-8 border border-indigo-500/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl -mr-16 -mt-16"></div>

            <div className="relative z-10">
                <h1 className="text-3xl font-bold text-white mb-2">
                    Welcome back, <span className="text-indigo-400">Future TCS Ninja!</span>
                </h1>
                <p className="text-slate-300 max-w-xl mb-6">
                    You're on track with your preparation. Keep pushing through the syllabus. Consistency is key to cracking the NQT.
                </p>

                <div className="flex space-x-6">
                    <div className="flex items-center space-x-2 text-slate-300">
                        <Target className="w-5 h-5 text-cyan-400" />
                        <span><span className="font-bold text-white">65%</span> Syllabus</span>
                    </div>
                    <div className="flex items-center space-x-2 text-slate-300">
                        <Trophy className="w-5 h-5 text-yellow-500" />
                        <span><span className="font-bold text-white">12</span> Mock Tests</span>
                    </div>
                    <div className="flex items-center space-x-2 text-slate-300">
                        <Flame className="w-5 h-5 text-orange-500" />
                        <span><span className="font-bold text-white">5</span> Day Streak</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
