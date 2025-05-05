import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const chevronLeft = (
    <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
);
const chevronRight = (
    <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
);

export default function CalendarComponent() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(null);

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();

    // Previous month's days
    const prevMonth = month === 0 ? 11 : month - 1;
    const prevYear = month === 0 ? year - 1 : year;
    const daysInPrevMonth = new Date(prevYear, prevMonth + 1, 0).getDate();

    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    // Start with Monday as first day of week for reference style
    const dayNames = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

    const handleDateClick = (date) => {
        setSelectedDate(date);
        const formattedDate = date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        sendUserMessage(`Selected date: ${formattedDate}`);
    };

    const handlePrevMonth = () => {
        setCurrentDate(new Date(year, month - 1));
    };

    const handleNextMonth = () => {
        setCurrentDate(new Date(year, month + 1));
    };

    // Calculate the index of the first cell (Monday as first day)
    const jsFirstDay = (firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1); // 0=Monday, 6=Sunday

    // Generate all 42 cells for a 6x7 grid
    const getCalendarGrid = () => {
        const grid = [];
        // Days from previous month
        for (let i = jsFirstDay - 1; i >= 0; i--) {
            const day = daysInPrevMonth - i;
            const date = new Date(prevYear, prevMonth, day);
            grid.push({
                day,
                date,
                isCurrentMonth: false
            });
        }
        // Days in current month
        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(year, month, day);
            grid.push({
                day,
                date,
                isCurrentMonth: true
            });
        }
        // Days from next month
        const nextMonth = month === 11 ? 0 : month + 1;
        const nextYear = month === 11 ? year + 1 : year;
        let nextDay = 1;
        while (grid.length < 42) {
            const date = new Date(nextYear, nextMonth, nextDay);
            grid.push({
                day: nextDay,
                date,
                isCurrentMonth: false
            });
            nextDay++;
        }
        return grid;
    };

    const calendarGrid = getCalendarGrid();

    return (
        <Card className="p-6 w-[340px] rounded-2xl shadow-lg bg-white">
            <div className="flex items-center justify-between mb-4">
                <button onClick={handlePrevMonth} className="p-2 rounded-full hover:bg-gray-100">
                    {chevronLeft}
                </button>
                <div className="text-lg font-semibold text-gray-800">
                    {monthNames[month]} {year}
                </div>
                <button onClick={handleNextMonth} className="p-2 rounded-full hover:bg-gray-100">
                    {chevronRight}
                </button>
            </div>
            <div className="grid grid-cols-7 gap-y-1">
                {dayNames.map((d, i) => (
                    <div key={d} className="text-xs font-bold text-gray-500 text-center py-2 uppercase tracking-wider">
                        {d}
                    </div>
                ))}
                {calendarGrid.map(({ day, date, isCurrentMonth }, idx) => {
                    const isSelected = selectedDate &&
                        date.getDate() === selectedDate.getDate() &&
                        date.getMonth() === selectedDate.getMonth() &&
                        date.getFullYear() === selectedDate.getFullYear();
                    // Saturday (5) and Sunday (6) for Monday-first grid
                    const weekDay = date.getDay() === 0 ? 6 : date.getDay() - 1;
                    const isWeekend = weekDay === 5 || weekDay === 6;
                    return (
                        <button
                            key={idx}
                            className={`w-9 h-9 rounded-full mx-auto flex items-center justify-center transition-colors
                                ${isSelected ? 'bg-red-400 text-white font-bold shadow' : ''}
                                ${isCurrentMonth ? (isWeekend ? 'text-red-400' : 'text-gray-800') : 'text-gray-300'}
                                hover:bg-red-100 focus:outline-none`}
                            onClick={() => handleDateClick(date)}
                            disabled={!isCurrentMonth}
                        >
                            {day}
                        </button>
                    );
                })}
            </div>
        </Card>
    );
}
