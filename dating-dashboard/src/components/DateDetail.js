import React, { useState } from 'react';
import Slider from 'react-slick';
import '../styles/DateDetail.css'; // Custom styles

const DateDetail = ({ date, onClose, onCreate, dateObject }) => {
    const [newTitle, setNewTitle] = useState('');
    const [newDescription, setNewDescription] = useState('');
    const [newImages, setNewImages] = useState([]);
    const [selectedDate, setSelectedDate] = useState('');
    
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    const handleCreate = () => {
        const newDate = {
            title: newTitle,
            description: newDescription,
            images: newImages,
            date: selectedDate,
        };
        console.log(newDate)
        onCreate(newDate);
        resetForm();
    };

    const resetForm = () => {
        setNewTitle('');
        setNewDescription('');
        setNewImages([]);
        setSelectedDate('');
    };

    const formatDateForInput = (date) => {
        if (!date) return '';
        if (typeof date === 'string') return date;
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const handleFileChange = (e) => {
        setNewImages([...e.target.files]);
    };

    console.log(dateObject);
    
    return (
        <div className="date-detail">
            {dateObject ? (
                <>
                    <button className="close-button" onClick={onClose}>✖</button>
                    {date.images && date.images.length > 0 && (
                        <Slider {...settings}>
                            {date.images.map((image, index) => (
                                <div key={index} className="carousel-image">
                                    <img src={image} alt={`Date image ${index + 1}`} />
                                </div>
                            ))}
                        </Slider>
                    )}
                    <h3>{dateObject.title}</h3>
                    <p>{dateObject.description}</p>
                </>
            ) : (
                <div className="create-date">
                    <h4>Create a new date:</h4>
                    <input
                        type="text"
                        placeholder="Title"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                    />
                    <textarea
                        placeholder="Description"
                        value={newDescription}
                        onChange={(e) => setNewDescription(e.target.value)}
                    ></textarea>
                    <input
                        type="file"
                        multiple
                        onChange={handleFileChange}
                    />
                    <input
                        type="date"
                        value={formatDateForInput(selectedDate)}
                        onChange={(e) => setSelectedDate(e.target.value)}
                    />
                    <button onClick={handleCreate}>Create Date</button>
                </div>
            )}
        </div>
    );
};

export default DateDetail;
