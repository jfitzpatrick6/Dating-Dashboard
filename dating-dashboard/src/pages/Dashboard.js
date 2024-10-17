// src/pages/Dashboard.js
import React, { useEffect, useState } from 'react';
import RelationshipOverview from '../components/RelationshipOverview.js';
import DateSelector from '../components/Calendar';
import DateDetail from '../components/DateDetail';
import '../styles/Dashboard.css';

const Dashboard = () => {
    const [dates, setDates] = useState([]);
    const [relationship, setRelationship] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const relationshipResponse = await fetch('http://localhost:8000/api/relationships/1/');
                const relationshipData = await relationshipResponse.json();
                setRelationship(relationshipData);
                const datesResponse = await fetch('http://localhost:8000/api/relationships/1/dates/');
                const datesData = await datesResponse.json();
                setDates(datesData.dates);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const handleDateClick = (date) => {
        setSelectedDate(date);
    };

    const closeDateDetail = () => {
        setSelectedDate(null);
    };

    const getSelectedDateObject = () => {
        if (!selectedDate) return null;
        return dates.find((dateObj) => {
            const dateObjDate = new Date(dateObj.date);
            const isMatch = dateObjDate.toDateString() === new Date(selectedDate).toDateString();
            return isMatch;
        });
    };

    const handleCreateDate = async (newDate, images) => {
        try {
            const formData = new FormData();
            formData.append('title', newDate.title);
            formData.append('description', newDate.description);
            formData.append('date', newDate.date);
    
            images.forEach((image, index) => {
                formData.append(`images`, image);
            });
    
            const response = await fetch('http://localhost:8000/api/relationships/1/dates/create/', {
                method: 'POST',
                body: formData,
            });
    
            if (response.ok) {
                const createdDate = await response.json();
                setDates((prevDates) => [...prevDates, createdDate]);
                closeDateDetail();
            } else {
                console.error('Failed to create date');
            }
        } catch (error) {
            console.error('Error creating date:', error);
        }
    };

    return (
        <div className="dashboard">
            {relationship && <RelationshipOverview relationship={relationship} />}
            <h2>Our Dates</h2>
            <div style={{ display: 'flex', alignItems: 'flex-start' }}>
            <DateSelector dates={dates} onDateClick={handleDateClick} />
            {selectedDate && (
                <DateDetail 
                    date={selectedDate} 
                    onClose={closeDateDetail} 
                    onCreate={handleCreateDate}
                    dateObject={getSelectedDateObject()}
                />
            )}
            </div>
        </div>
    );
};

export default Dashboard;
