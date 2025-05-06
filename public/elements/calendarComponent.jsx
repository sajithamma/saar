import { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";

// Import custom CSS
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
        <div className="calendar-container">
            <div className="calendar-header">
                <button onClick={handlePrevMonth} className="nav-button">
                    {chevronLeft}
                </button>
                <div className="month-title">
                    {monthNames[month]} {year}
                </div>
                <button onClick={handleNextMonth} className="nav-button">
                    {chevronRight}
                </button>
            </div>
            <div className="calendar-grid">
                {dayNames.map((d, i) => (
                    <div key={d} className="day-name">
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

                    let dayClass = "calendar-day";
                    if (isCurrentMonth) {
                        dayClass += " current-month";
                        if (isWeekend) dayClass += " weekend";
                    } else {
                        dayClass += " other-month";
                    }
                    if (isSelected) dayClass += " selected";

                    return (
                        <button
                            key={idx}
                            className={dayClass}
                            onClick={() => handleDateClick(date)}
                            disabled={!isCurrentMonth}
                        >
                            {day}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
