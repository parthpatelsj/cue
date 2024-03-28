import React, { useState } from 'react';
import './CueSheetHeader.css';

const CueSheetHeader = ({ onHeaderChange }) => {
  const [title, setTitle] = useState('');
  const [theme, setTheme] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');

  const handleChange = (name) => (e) => {
    const value = e.target.value;
    switch (name) {
      case 'title':
        setTitle(value);
        break;
      case 'theme':
        setTheme(value);
        break;
      case 'location':
        setLocation(value);
        break;
      case 'date':
        setDate(value);
        break;
      default:
        break;
    }
    onHeaderChange({ [name]: value });
  };

  return (
    <div className="cue-sheet-header">
      <input
        type="text"
        value={title}
        onChange={handleChange('title')}
        className="header-title"
        placeholder="Enter event title"
      />
      <input
        type="text"
        value={theme}
        onChange={handleChange('theme')}
        className="header-theme"
        placeholder="Enter theme"
      />
      <div className="location-date-container">
        <input
          type="text"
          value={location}
          onChange={handleChange('location')}
          className="header-location"
          placeholder="Enter location"
        />
        <input
          type="date"
          value={date}
          onChange={handleChange('date')}
          className="header-date"
        />
      </div>
    </div>
  );
};

export default CueSheetHeader;