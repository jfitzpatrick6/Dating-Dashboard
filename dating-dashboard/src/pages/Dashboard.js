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

    const API_BASE_URL = process.env.REACT_APP_API_URL;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const relationshipResponse = await fetch(`${API_BASE_URL}/api/relationships/3/`);
                const relationshipData = await relationshipResponse.json();
                setRelationship(relationshipData);
                const datesResponse = await fetch(`${API_BASE_URL}/api/relationships/3/dates/`);
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
            dateObjDate.setUTCHours(0, 0, 0, 0);
            const selectedDateObj = new Date(selectedDate);
            selectedDateObj.setUTCHours(0, 0, 0, 0);
            console.log('Selected Date:', selectedDateObj);
            console.log('Date Object:', dateObjDate);
            const isMatch = 
                dateObjDate.getFullYear() === selectedDateObj.getFullYear() &&
                dateObjDate.getMonth() === selectedDateObj.getMonth() &&
                dateObjDate.getDate() === selectedDateObj.getDate();
            
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
    
            const response = await fetch(`${API_BASE_URL}/api/relationships/3/dates/create/`, {
                method: 'POST',
                body: formData,
            });
    
            if (response.ok) {
                const datesResponse = await fetch(`${API_BASE_URL}/api/relationships/3/dates/`);
                const datesData = await datesResponse.json();
                setDates(datesData.dates);
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
            <div 
                style={{ 
                    display: 'flex', 
                    flexDirection: 'row', // Keep items in a row by default
                    alignItems: 'flex-start', 
                    backgroundColor: '#f9f9f9', 
                    borderRadius: "3%", 
                    flexWrap: 'wrap', // Allow wrapping to the next line
                }}
            >
                <div style={{ flex: '1 1 auto', minWidth: '300px' }}>
                    <DateSelector dates={dates} onDateClick={handleDateClick} />
                </div>
                {selectedDate && (
                    <div style={{ flex: '1 1 auto', minWidth: '300px' }}>
                        <DateDetail 
                            date={selectedDate} 
                            onClose={closeDateDetail} 
                            onCreate={handleCreateDate}
                            dateObject={getSelectedDateObject()}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
