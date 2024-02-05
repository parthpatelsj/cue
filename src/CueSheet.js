import React, { useState } from 'react';
import Segment from './Segment';
import './CueSheet.css'; // Adjust the path according to your file structure


const CueSheet = () => {
    const [segments, setSegments] = useState([]);

    const addSegment = () => {
        setSegments([...segments, { id: segments.length, cues: [] }]);
    };

    return (
        <div>
            {segments.map(segment => (
                <Segment key={segment.id} />
            ))}
            <button onClick={addSegment}>Add Segment</button>
        </div>
    );
};

export default CueSheet;
