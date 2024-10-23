// src/components/RelationshipOverview.js
import React, { useEffect, useState } from 'react';
import '../styles/RelationshipOverview.css';

const RelationshipOverview = ({ relationship }) => {
    const [timeSince, setTimeSince] = useState({
        years: 0,
        months: 0,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    useEffect(() => {
        const relationshipStartDate = new Date(relationship.start_date); // Moved inside useEffect

        const calculateTimeSince = () => {
            const currentDate = new Date();
            const timeDiff = currentDate - relationshipStartDate;

            const seconds = Math.floor(timeDiff / 1000);
            const minutes = Math.floor(seconds / 60);
            const hours = Math.floor(minutes / 60);
            const days = Math.floor(hours / 24);
            const months = Math.floor(days / 30);
            const years = Math.floor(days / 365);

            // Set the state for each unit
            setTimeSince({
                years: years,
                months: months % 12,
                days: days % 30,
                hours: hours % 24,
                minutes: minutes % 60,
                seconds: seconds % 60,
            });
        };

        calculateTimeSince(); // Calculate initially
        const interval = setInterval(calculateTimeSince, 1000); // Update every second

        return () => clearInterval(interval); // Cleanup on unmount
    }, [relationship.start_date]); 

    return (
        <div className="relationship-overview">
            <h1>Time Together</h1>
            <div className="time-container">
                <div className="time-box years">
                    <p>{timeSince.years}</p>
                    <span>Years</span>
                </div>
                <div className="time-box months">
                    <p>{timeSince.months}</p>
                    <span>Months</span>
                </div>
                <div className="time-box days">
                    <p>{timeSince.days}</p>
                    <span>Days</span>
                </div>
                <div className="time-box hours">
                    <p>{timeSince.hours}</p>
                    <span>Hours</span>
                </div>
                <div className="time-box minutes">
                    <p>{timeSince.minutes}</p>
                    <span>Minutes</span>
                </div>
                <div className="time-box seconds">
                    <p>{timeSince.seconds}</p>
                    <span>Seconds</span>
                </div>
                
            </div>
        </div>
    );
};

export default RelationshipOverview;
