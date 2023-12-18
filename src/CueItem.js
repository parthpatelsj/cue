import React from 'react';

function CueItem({ cue, number }) {
    return (
        <tr className="cue-item">
            <td>{number}</td>
            <td>{cue.startTime}</td>
            <td>{cue.endTime}</td>
            <td>{cue.duration}</td>
            <td>{cue.event}</td>
            <td>{cue.description}</td>
            <td>{cue.presenter}</td>
        </tr>
    );
}

export default CueItem;
