import React, { useState } from 'react';
import Segment from './Segment';
import CueSheetHeader from './CueSheetHeader';
import './CueSheet.css';

const CueSheet = () => {
  const [headerData, setHeaderData] = useState({});
  const [segments, setSegments] = useState([]);
  const [initialStartTime, setInitialStartTime] = useState('16:00');

  const handleHeaderChange = (data) => {
    setHeaderData(data);
  };

  const addSegment = () => {
    const previousSegment = segments[segments.length - 1];
    console.log(previousSegment);
    const startTime = previousSegment ? previousSegment.cues[previousSegment.cues.length - 1]?.endTime || initialStartTime : initialStartTime;
    setSegments([...segments, { id: segments.length, cues: [], startTime }]);
  };

  const updateSegmentCues = (segmentId, updatedCues) => {
    setSegments(segments.map(segment => {
      if (segment.id === segmentId) {
        return { ...segment, cues: updatedCues };
      }
      return segment;
    }));
  };

  const exportData = () => {
    const data = {
      ...headerData,
      initialStartTime,
      segments,
    };
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'cue_sheet_data.json';
    link.click();
  };

  return (
    <div className="cue-sheet">
      <CueSheetHeader onHeaderChange={handleHeaderChange} />
      <div className="program-start-time">
        <label htmlFor="initial-start-time">Program Start Time:</label>
        <input
          type="time"
          id="initial-start-time"
          value={initialStartTime}
          onChange={e => {
            setInitialStartTime(e.target.value);
            if (segments.length > 0) {
              setSegments([{ ...segments[0], startTime: e.target.value }, ...segments.slice(1)]);
            }
          }}
          className="initial-start-time-input"
        />
      </div>
      {segments.map((segment, index) => (
        <Segment
          key={segment.id}
          initialStartTime={segment.startTime}
          onCuesChange={updatedCues => updateSegmentCues(segment.id, updatedCues)}
        />
      ))}
      <button onClick={addSegment}>Add Segment</button>
      <button onClick={exportData}>Export</button>
    </div>
  );
};

export default CueSheet;