import React from 'react';
import '../styles/Dashboard.css';

const DateCard = ({ date }) => {
    return (
        <div className="date-card">
            <h3>{date.title}</h3>
            <p>{date.description}</p>
            <div className="date-images">
                {date.images.map((image, index) => (
                    <img key={index} src={image.url} alt={`Date image ${index + 1}`} />
                ))}
            </div>
            <p>Date: {new Date(date.date).toLocaleDateString()}</p>
        </div>
    );
};

export default DateCard;
