// src/components/Calendar.js
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../styles/Calendar.css'; // Import the custom styles

const DateSelector = ({ dates, onDateClick }) => {
    const tileClassName = ({ date }) => {
        const currentDateString = date.toISOString().split('T')[0];
        const highlightDates = new Set(
            dates.map(dateObj => dateObj.date)
        );
        return highlightDates.has(currentDateString) ? 'highlighted-date' : null;
    };

    return (
        <div>
            <Calendar
                onChange={onDateClick}
                tileClassName={tileClassName}
            />
        </div>
    );
};

export default DateSelector;
