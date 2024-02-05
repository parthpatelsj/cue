import React from 'react';
import './CueSheetHeader.css';

const CueSheetHeader = ({ onHeaderChange }) => {

    const handleBlur = (name) => (e) => {
        onHeaderChange({ [name]: e.target.textContent });
    };

    return (
        <div className="cue-sheet-header">
            <div
                name="title"
                contentEditable
                onBlur={handleBlur('title')}
                className="header-title"
                suppressContentEditableWarning={true}
            >
                <span className="placeholder">Click to add an event title</span>
            </div>
            <div
                name="theme"
                contentEditable
                onBlur={handleBlur('theme')}
                className="header-theme"
                suppressContentEditableWarning={true}
            >
                <span className="placeholder">Click to add a theme</span>
            </div>
            <div className="location-date-container">
                <div
                    name="location"
                    contentEditable
                    onBlur={handleBlur('location')}
                    className="header-location"
                    suppressContentEditableWarning={true}
                >
                    <span className="placeholder">Click to add a location</span>
                </div>
                <div
                    name="date"
                    contentEditable
                    onBlur={handleBlur('date')}
                    className="header-date"
                    suppressContentEditableWarning={true}
                >
                    <span className="placeholder">Click to add a date</span>
                </div>
            </div>
        </div>
    );
};

export default CueSheetHeader;