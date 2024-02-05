import React, { useState, useEffect, useCallback } from 'react';
import Cue from './Cue';

const Segment = () => {
    const [cues, setCues] = useState([]);
    const [initialStartTime, setInitialStartTime] = useState('');

    // The addCue function now just adds a new cue without a start time
    const addCue = () => {
        const newCue = {
            id: cues.length,
            startTime: cues.length === 0 ? initialStartTime : cues[cues.length - 1].endTime,
        };
        setCues([...cues, newCue]);
    };


    useEffect(() => {
        if (cues.length === 0 && initialStartTime) {
            addCue(initialStartTime);
        }
    }, [initialStartTime, addCue, cues.length]);

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
            {cues.map((cue, index) => (
                <Cue 
                    key={cue.id} 
                    cueNumber={index + 1} 
                    startTime={cue.startTime} // This now depends on the initial start time or the previous cue's end time
                    updateNextStartTime={(endTime) => updateNextStartTime(endTime, index)} 
                />
            ))}
            <button onClick={addCue}>Add Cue</button>
        </div>
    );
};

export default Segment;
