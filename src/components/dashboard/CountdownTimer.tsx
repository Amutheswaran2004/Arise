import { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';
import { differenceInDays, differenceInHours, differenceInMinutes, differenceInSeconds } from 'date-fns';

interface TimeLeft {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

export function CountdownTimer() {
    const targetDate = new Date('2026-03-10T00:00:00');
    const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date();
            if (now >= targetDate) {
                clearInterval(timer);
                return;
            }

            setTimeLeft({
                days: differenceInDays(targetDate, now),
                hours: differenceInHours(targetDate, now) % 24,
                minutes: differenceInMinutes(targetDate, now) % 60,
                seconds: differenceInSeconds(targetDate, now) % 60,
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 shadow-lg relative overflow-hidden group">
            <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-indigo-500/10 rounded-full blur-xl group-hover:bg-indigo-500/20 transition-all duration-500"></div>

            <div className="flex items-center space-x-2 mb-4">
                <Clock className="w-5 h-5 text-indigo-400" />
                <h2 className="text-lg font-semibold text-slate-200">Time to NQT</h2>
            </div>

            <div className="grid grid-cols-4 gap-2 text-center">
                <div className="bg-slate-900/50 rounded-lg p-2">
                    <div className="text-2xl font-bold text-white">{timeLeft.days}</div>
                    <div className="text-xs text-slate-400 uppercase tracking-wider">Days</div>
                </div>
                <div className="bg-slate-900/50 rounded-lg p-2">
                    <div className="text-2xl font-bold text-white">{timeLeft.hours}</div>
                    <div className="text-xs text-slate-400 uppercase tracking-wider">Hrs</div>
                </div>
                <div className="bg-slate-900/50 rounded-lg p-2">
                    <div className="text-2xl font-bold text-white">{timeLeft.minutes}</div>
                    <div className="text-xs text-slate-400 uppercase tracking-wider">Mins</div>
                </div>
                <div className="bg-slate-900/50 rounded-lg p-2">
                    <div className="text-2xl font-bold text-white">{timeLeft.seconds}</div>
                    <div className="text-xs text-slate-400 uppercase tracking-wider">Secs</div>
                </div>
            </div>

            <div className="mt-4">
                <div className="w-full bg-slate-700 rounded-full h-1.5">
                    <div
                        className="bg-indigo-500 h-1.5 rounded-full"
                        style={{ width: `${Math.max(0, Math.min(100, (60 - timeLeft.days) / 60 * 100))}%` }}
                    ></div>
                </div>
                <p className="text-xs text-slate-500 mt-2 text-right">Target: March 10, 2026</p>
            </div>
        </div>
    );
}
