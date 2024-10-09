// src/components/RelationshipOverview.js
import React from 'react';
import '../styles/RelationshipOverview.css';

const RelationshipOverview = ({ relationship }) => {
    const relationshipStartDate = new Date(relationship.start_date);

    const calculateTimeDifference = () => {
        const currentDate = new Date();
        const timeDiff = currentDate - relationshipStartDate; // Difference in milliseconds

        // Calculate total seconds from milliseconds
        const totalSeconds = Math.floor(timeDiff / 1000);

        // Calculate days, hours, minutes, and seconds
        const days = Math.floor(totalSeconds / (60 * 60 * 24));
        const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60));
        const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
        const seconds = totalSeconds % 60;

        return { days, hours, minutes, seconds };
    };

    const { days, hours, minutes, seconds } = calculateTimeDifference();

    return (
        <div className="relationship-overview">
            <h1>{relationship.name}</h1>
            <p>
                We have been dating for <strong>{days}</strong> days, <strong>{hours}</strong> hours, 
                <strong>{minutes}</strong> minutes, and <strong>{seconds}</strong> seconds!
            </p>
        </div>
    );
};

export default RelationshipOverview;
