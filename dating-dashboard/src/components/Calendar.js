// src/components/Calendar.js
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../styles/Calendar.css'; // Import the custom styles

const DateSelector = ({ dates, onDateClick }) => {
    const tileClassName = ({ date }) => {
        // Convert dates array to a Set of formatted date strings for easy comparison
        const highlightDates = new Set(dates.map(dateObj => new Date(dateObj.date).toDateString()));
        return highlightDates.has(date.toDateString()) ? 'highlighted-date' : null; // Return class name if date is in highlight set
    };

    return (
        <div>
            <Calendar
                onChange={onDateClick} // Call the onDateClick when a date is selected
                tileClassName={tileClassName} // Use the tileClassName function to highlight dates
            />
        </div>
    );
};

export default DateSelector;
