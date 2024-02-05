import React, { useState } from 'react';
import Segment from './Segment';
import CueSheetHeader from './CueSheetHeader';
import './CueSheet.css'; // Adjust the path according to your file structure


const CueSheet = () => {
    const [headerData, setHeaderData] = useState({});
    const [segments, setSegments] = useState([]);
    const [initialStartTime, setInitialStartTime] = useState(''); // Added for the initial start time of the cue sheet


    const handleHeaderChange = (data) => {
        setHeaderData(data);
        console.log(headerData);
    };

    const addSegment = () => {
        setSegments([...segments, { id: segments.length, cues: [] }]);
    };

    return (
        <div className="cue-sheet">
        <CueSheetHeader onHeaderChange={handleHeaderChange} />
        <input 
            type="time" 
            value={initialStartTime} 
            onChange={e => setInitialStartTime(e.target.value)} 
            placeholder="Initial Start Time"
            className="initial-start-time-input"
        />
        {segments.map(segment => (
            <Segment 
                key={segment.id} 
                initialStartTime={initialStartTime} // Pass initial start time to each segment
            />
        ))}
        <button onClick={addSegment}>Add Segment</button>
    </div>
    );
};

export default CueSheet;
