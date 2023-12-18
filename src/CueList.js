import React from 'react';
import CueItem from './CueItem';

function CueList({ cues }) {
    return (
        <div className="cue-list-container">
            <h2>Cue List</h2>
            {cues.length > 0 ? (
                <table className="cue-list">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Start Time</th>
                            <th>End Time</th>
                            <th>Duration</th>
                            <th>Event</th>
                            <th>Description</th>
                            <th>Presenter</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cues.map((cue, index) => (
                            <CueItem key={index} cue={cue} number={index + 1} />
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No cues to display.</p>
            )}
        </div>
    );
}

export default CueList;
