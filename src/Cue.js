import React, { useState, useEffect } from 'react';
import './Cue.css';

const Cue = ({ cueNumber, startTime, duration, onDurationChange }) => {
  const [item, setItem] = useState('');
  const [description, setDescription] = useState('');
  const [presenter, setPresenter] = useState('');
  const [audio, setAudio] = useState(false);
  const [video, setVideo] = useState(false);
  const [image, setImage] = useState(false);
  const [text, setText] = useState(false);
  const [remarks, setRemarks] = useState('');
  const [endTime, setEndTime] = useState('');
  const [inputDuration, setInputDuration] = useState(duration);

  useEffect(() => {
    const calculateEndTime = () => {
      if (startTime && inputDuration) {
        const [hours, minutes] = startTime.split(':').map(Number);
        const totalMinutes = hours * 60 + minutes + parseInt(inputDuration, 10);
        const newHours = Math.floor(totalMinutes / 60);
        const newMinutes = totalMinutes % 60;
        return `${newHours.toString().padStart(2, '0')}:${newMinutes.toString().padStart(2, '0')}`;
      }
      return '';
    };

    setEndTime(calculateEndTime());
  }, [startTime, inputDuration]);

  const handleDurationChange = (value) => {
    setInputDuration(value);
    onDurationChange(value);
  };

  return (
    <div className="cue-container">
      <div>#: {cueNumber}</div>
      <div>Start Time: {startTime}</div>
      <label>
        Duration (min):
        <input type="number" value={inputDuration} className="duration-input" onChange={e => handleDurationChange(e.target.value)} />
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
            PDF:
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
