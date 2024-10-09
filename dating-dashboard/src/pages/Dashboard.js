// src/pages/Dashboard.js
import React, { useEffect, useState } from 'react';
import RelationshipOverview from '../components/RelationshipOverview.js';
import DateCard from '../components/DateCard';
import '../styles/Dashboard.css';

const Dashboard = () => {
    const [dates, setDates] = useState([]);
    const [relationship, setRelationship] = useState(null);
    const [startDate, setStartDate] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const relationshipResponse = await fetch('http://localhost:8000/api/relationships/1');  // example endpoint
                if (relationshipResponse.ok) {
                    const relationshipData = await relationshipResponse.json();
                    setRelationship(relationshipData);
                }

                const datesResponse = await fetch('http://localhost:8000/api/dates/');
                const datesData = await datesResponse.json();
                setDates(datesData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const handleCreateRelationship = async (e) => {
        e.preventDefault();
        if (!startDate) {
            setError('Start date is required');
            return;
        }

        try {
            const response = await fetch('http://localhost:8000/api/relationships/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ start_date: startDate }),
            });

            if (response.ok) {
                const newRelationship = await response.json();
                setRelationship(newRelationship);
                setStartDate('');  // Clear input after successful submission
                setError('');
            } else {
                const data = await response.json();
                setError(data.detail || 'Something went wrong while creating the relationship.');
            }
        } catch (error) {
            setError('An error occurred. Please try again later.');
        }
    };

    return (
        <div className="dashboard">
            {relationship ? (
                <RelationshipOverview relationship={relationship} />
            ) : (
                <form onSubmit={handleCreateRelationship}>
                <h2>Create a Relationship</h2>
                <input
                    type="datetime-local"
                    value={startDate} 
                    onChange={(e) => setStartDate(e.target.value)}
                    required
                />
                <button type="submit">Create Relationship</button>
                {error && <p className="error">{error}</p>}
            </form>
            )}
            <h2>Our Dates</h2>
            <div className="dates-list">
                {dates.map((date) => (
                    <DateCard key={date.id} date={date} />
                ))}
            </div>
        </div>
    );
};

export default Dashboard;
