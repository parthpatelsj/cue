import React, { useState, useEffect, useCallback } from 'react';
import Cue from './Cue';

const Segment = ({ initialStartTime, onCuesChange }) => {
  const [cues, setCues] = useState([]);
  const [title, setTitle] = useState('');

  const addCue = useCallback((startTime) => {
    const newCue = {
      id: cues.length,
      duration: 0,
      startTime: startTime,
      endTime: startTime,
    };
    const updatedCues = [...cues, newCue];
    setCues(updatedCues);
    onCuesChange(updatedCues);
  }, [cues, onCuesChange]);

  const handleDurationChange = (cueId, duration) => {
    const updatedCues = cues.map((cue, index) => {
      if (index === cueId) {
        const endTime = calculateEndTime(cue.startTime, duration);
        return { ...cue, duration, endTime };
      }
      return cue;
    });

    for (let i = cueId + 1; i < updatedCues.length; i++) {
      const startTime = updatedCues[i - 1].endTime;
      const endTime = calculateEndTime(startTime, updatedCues[i].duration);
      updatedCues[i] = { ...updatedCues[i], startTime, endTime };
    }

    setCues(updatedCues);
    onCuesChange(updatedCues);
  };

  useEffect(() => {
    if (cues.length === 0) {
      addCue(initialStartTime);
    }
  }, [addCue, cues.length, initialStartTime]);

  const calculateEndTime = (startTime, duration) => {
    if (!startTime || !duration) {
      return '';
    }

    const [hours, minutes] = startTime.split(':').map(Number);
    const totalMinutes = hours * 60 + minutes + parseInt(duration, 10);
    const newHours = Math.floor(totalMinutes / 60);
    const newMinutes = totalMinutes % 60;
    return `${newHours.toString().padStart(2, '0')}:${newMinutes.toString().padStart(2, '0')}`;
  };

  return (
    <div>
      <input
        type="text"
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Segment Title"
        className="segment-title-input"
      />
      {cues.map((cue, index) => (
        <Cue
          key={cue.id}
          cueNumber={index + 1}
          startTime={cue.startTime}
          duration={cue.duration}
          onDurationChange={(duration) => handleDurationChange(index, duration)}
        />
      ))}
      <button onClick={() => addCue(cues.length > 0 ? cues[cues.length - 1].endTime : initialStartTime)}>
        Add Cue
      </button>
    </div>
  );
};

export default Segment;