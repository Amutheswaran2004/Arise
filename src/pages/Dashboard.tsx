
import { CountdownTimer } from '../components/dashboard/CountdownTimer';
import { WelcomeBanner } from '../components/dashboard/WelcomeBanner';
import { tcsNQTData } from '../data/tcsNQTData';

export function Dashboard() {
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <WelcomeBanner />

                    {/* Test Overview Section */}
                    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
                        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                            <span className="p-1 rounded-md bg-indigo-500/20 text-indigo-400">📝</span>
                            Test Overview
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-3">
                                <h3 className="text-sm font-medium text-slate-400 uppercase tracking-wider">Key Features</h3>
                                <ul className="space-y-2">
                                    {tcsNQTData.testFeatures.map((feature, idx) => (
                                        <li key={idx} className="flex items-start gap-2 text-slate-300 text-sm">
                                            <span className="text-indigo-400 mt-1">•</span>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="space-y-3">
                                <h3 className="text-sm font-medium text-slate-400 uppercase tracking-wider">Test Pattern</h3>
                                <div className="space-y-3">
                                    <div className="bg-slate-900/50 p-3 rounded-lg border border-slate-700/30">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="font-medium text-indigo-300">Foundation</span>
                                            <span className="text-xs text-slate-500">{tcsNQTData.testPattern.foundation.duration} mins</span>
                                        </div>
                                        <div className="space-y-1">
                                            {tcsNQTData.testPattern.foundation.sections.map((sec, idx) => (
                                                <div key={idx} className="flex justify-between text-xs text-slate-400">
                                                    <span>{sec.name}</span>
                                                    <span>{sec.duration}m</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="bg-slate-900/50 p-3 rounded-lg border border-slate-700/30">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="font-medium text-pink-300">Advanced</span>
                                            <span className="text-xs text-slate-500">{tcsNQTData.testPattern.advanced.duration} mins</span>
                                        </div>
                                        <div className="space-y-1">
                                            {tcsNQTData.testPattern.advanced.sections.map((sec, idx) => (
                                                <div key={idx} className="flex justify-between text-xs text-slate-400">
                                                    <span>{sec.name}</span>
                                                    <span>{sec.duration}m</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <CountdownTimer />

                    {/* Quick Stats / Daily Goal */}
                    <div className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-xl p-6 text-white shadow-lg shadow-indigo-900/20">
                        <h3 className="font-bold text-lg mb-2">Daily Goal 🎯</h3>
                        <p className="text-indigo-100 text-sm mb-4">Complete 2 topics from Foundation Numerical Ability today.</p>
                        <div className="w-full bg-black/20 rounded-full h-2 mb-2">
                            <div className="bg-white h-2 rounded-full w-[40%]"></div>
                        </div>
                        <div className="flex justify-between text-xs text-indigo-200">
                            <span>Progress</span>
                            <span>40%</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
