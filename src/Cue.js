import React, { useState, useEffect } from 'react';
import './Cue.css'; // Assuming the CSS is in a file named Cue.css

const Cue = ({ cueNumber, startTime, updateNextStartTime }) => {
    const [duration, setDuration] = useState('');
    const [item, setItem] = useState('');
    const [description, setDescription] = useState('');
    const [presenter, setPresenter] = useState('');
    const [audio, setAudio] = useState(false);
    const [video, setVideo] = useState(false);
    const [image, setImage] = useState(false);
    const [text, setText] = useState(false);
    const [remarks, setRemarks] = useState('');
    const [endTime, setEndTime] = useState('');

    useEffect(() => {
        if (startTime && duration) {
            const calculatedEndTime = calculateEndTime(startTime, duration);
            setEndTime(calculatedEndTime);
            updateNextStartTime(calculatedEndTime);
        }
    }, [startTime, duration, updateNextStartTime]);

    const calculateEndTime = (startTime, duration) => {
        // Parse the start time and duration to calculate the end time
        const [hours, minutes] = startTime.split(':').map(Number);
        const durationInMinutes = parseInt(duration, 10); // Assuming duration is provided in minutes
        const endTime = new Date(0, 0, 0, hours, minutes + durationInMinutes);
        return endTime.toTimeString().split(' ')[0].substr(0, 5);
    };

    return (
        <div className="cue-container">
            <div>Cue Number: {cueNumber}</div>
            <label>
                Start Time:
                <input type="time" value={startTime} onChange={e => updateNextStartTime(e.target.value)} />
            </label>
            <label>
                Duration (min):
                <input type="number" value={duration} className="duration-input" onChange={e => setDuration(e.target.value)} />
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