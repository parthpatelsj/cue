import React, { useState, useEffect } from 'react';
import Cue from './Cue';

const Segment = () => {
    const [cues, setCues] = useState([]);
    const [initialStartTime, setInitialStartTime] = useState(''); // For user to set initial start time

    useEffect(() => {
        if (cues.length === 0 && initialStartTime) {
            addCue(initialStartTime); // Add the first cue with the initial start time
        }
    }, [initialStartTime]);

    const addCue = (startTime) => {
        const newCue = {
            id: cues.length,
            startTime: startTime || (cues.length > 0 ? cues[cues.length - 1].endTime : ''),
        };
        setCues([...cues, newCue]);
    };

    const updateNextStartTime = (endTime, cueId) => {
        setCues(cues.map((cue, index) => {
            if (index === cueId + 1) {
                return { ...cue, startTime: endTime };
            }
            return cue;
        }));
    };

    return (
        <div>
            <input type="time" value={initialStartTime} onChange={e => setInitialStartTime(e.target.value)} placeholder="Initial Start Time" />
            {cues.map((cue, index) => (
                <Cue key={cue.id} cueNumber={index + 1} startTime={cue.startTime} updateNextStartTime={(endTime) => updateNextStartTime(endTime, index)} />
            ))}
            <button onClick={() => addCue()}>Add Cue</button>
        </div>
    );
};

export default Segment;
