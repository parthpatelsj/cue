import React, { useState } from 'react';

function CueForm({ onAddCue }) {
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [event, setEvent] = useState('');
    const [description, setDescription] = useState('');
    const [presenter, setPresenter] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
    
        // Parse the time strings into Date objects
        const now = new Date(); // Get the current date
        const startTimeDate = new Date(now.toDateString() + ' ' + startTime);
        const endTimeDate = new Date(now.toDateString() + ' ' + endTime);
    
        // Calculate the duration
        const duration = calculateDuration(startTimeDate, endTimeDate);
    
        // Pass the duration and other values to onAddCue
        onAddCue({
            startTime: startTimeDate.toLocaleTimeString(),
            endTime: endTimeDate.toLocaleTimeString(),
            duration,
            event,
            description,
            presenter,
        });
    
        // Reset form
        setStartTime('');
        setEndTime('');
        setEvent('');
        setDescription('');
        setPresenter('');
    };
    

    const calculateDuration = (start, end) => {
        // Step 1: Parse the start and end times into Date objects
        const startTime = new Date(start);
        const endTime = new Date(end);
    
        // Step 2: Calculate the time difference in milliseconds
        const timeDifferenceInMilliseconds = endTime - startTime;
    
        // Step 3: Convert the time difference from milliseconds to minutes
        const durationInMinutes = timeDifferenceInMilliseconds / (1000 * 60);
    
        // Step 4: Return the duration in minutes
        return durationInMinutes;
    };

    return (
        <div className="cue-form">
        <form onSubmit={handleSubmit}>
            <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} required />
            <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} required />
            <input type="text" value={event} onChange={(e) => setEvent(e.target.value)} placeholder="Event" required />
            <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Event Description" required />
            <input type="text" value={presenter} onChange={(e) => setPresenter(e.target.value)} placeholder="Presenter" required />
            <button type="submit">Add Cue</button>
        </form>
    </div>
    );
}

export default CueForm;
