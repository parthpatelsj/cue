import React, { useState, useEffect } from 'react';
import './Cue.css'; // Assuming the CSS is in a file named Cue.css

const Cue = ({ cueNumber, initialStartTime, duration }) => {
    const [item, setItem] = useState('');
    const [description, setDescription] = useState('');
    const [presenter, setPresenter] = useState('');
    const [audio, setAudio] = useState(false);
    const [video, setVideo] = useState(false);
    const [image, setImage] = useState(false);
    const [text, setText] = useState(false);
    const [remarks, setRemarks] = useState('');
    const [startTime, setStartTime] = useState(''); // Moved start time to component state
    const [endTime, setEndTime] = useState('');
    const [inputDuration, setInputDuration] = useState(duration); // Initialize with the default duration

    // Define setDuration function
    const setDuration = (value) => {
        // Update the inputDuration state
        setInputDuration(value);
    };

    // Calculate end time based on initial start time and duration
    useEffect(() => {
        if (initialStartTime && inputDuration) {
            // Check if inputDuration is a valid number, otherwise set it to 0
            const durationInMinutes = isNaN(inputDuration) ? 0 : parseInt(inputDuration, 10);
            const calculatedStartTime = calculateStartTime(initialStartTime, cueNumber, durationInMinutes);
            const calculatedEndTime = calculateEndTime(calculatedStartTime, durationInMinutes);
            setStartTime(calculatedStartTime);
            setEndTime(calculatedEndTime);
        }
    }, [initialStartTime, inputDuration, cueNumber]);

    // Calculate start time based on initial start time, cue number, and duration
    const calculateStartTime = (initialStartTime, cueNumber, duration) => {
        const [hours, minutes] = initialStartTime.split(':').map(Number);
        const totalMinutes = (hours * 60 + minutes) + (cueNumber - 1) * duration;
        const newHours = Math.floor(totalMinutes / 60);
        const newMinutes = totalMinutes % 60;
        return `${newHours.toString().padStart(2, '0')}:${newMinutes.toString().padStart(2, '0')}`;
    };

    // Calculate end time based on start time and duration
    const calculateEndTime = (startTime, duration) => {
        const [hours, minutes] = startTime.split(':').map(Number);
        const totalMinutes = (hours * 60 + minutes) + duration;
        const newHours = Math.floor(totalMinutes / 60);
        const newMinutes = totalMinutes % 60;
        return `${newHours.toString().padStart(2, '0')}:${newMinutes.toString().padStart(2, '0')}`;
    };

    return (
        <div className="cue-container">
            <div>Cue Number: {cueNumber}</div>
            <div>Start Time: {startTime}</div>
            <label>
                Duration (min):
                <input type="number" value={inputDuration} className="duration-input" onChange={e => setDuration(e.target.value)} />
            </label>
            <label>
                Item:
                <input type="text" value={item} onChange={e => setItem(e.target.value)} />
            </label>
            <label>
                Description:
                <input type="text" className="description-input" value={description} onChange={e => setDescription(e.target.value)} />
            </label>
            <label>
                Presenter:
                <input type="text" value={presenter} onChange={e => setPresenter(e.target.value)} />
            </label>
            <label>
                Audio:
                <input type="checkbox" className="av-checkbox" checked={audio} onChange={e => setAudio(e.target.checked)} />
            </label>
            <label>
                Video:
                <input type="checkbox" className="av-checkbox" checked={video} onChange={e => setVideo(e.target.checked)} />
            </label>
            <label>
                Image:
                <input type="checkbox" className="av-checkbox" checked={image} onChange={e => setImage(e.target.checked)} />
            </label>
            <label>
                Text:
                <input type="checkbox" className="av-checkbox" checked={text} onChange={e => setText(e.target.checked)} />
            </label>
            <label>
                Remarks:
                <input type="text" value={remarks} onChange={e => setRemarks(e.target.value)} />
            </label>
            <div>End Time: {endTime}</div>
        </div>
    );
};

export default Cue;
