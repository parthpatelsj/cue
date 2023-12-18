import React, { useState } from 'react';
import CueForm from './CueForm';
import CueList from './CueList';
import './App.css';

function CueSheet() {
    const [cues, setCues] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const addCue = (cueData) => {
        setCues([...cues, { ...cueData, number: cues.length + 1 }]);
        setIsModalOpen(false); // Close modal after adding cue
    };

    return (
        <div>
            <button className="open-modal-btn" onClick={() => setIsModalOpen(true)}>Add Cue</button>
            <CueList cues={cues} />
            
            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close-btn" onClick={() => setIsModalOpen(false)}>&times;</span>
                        <CueForm onAddCue={addCue} />
                    </div>
                </div>
            )}
        </div>
    );
}

export default CueSheet;
