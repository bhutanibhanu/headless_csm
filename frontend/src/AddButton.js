import React from 'react';
import './styles/AddButton.css';

function AddButton({ onClick , tooltip }) {
    return (
        <div className="add-button" onClick={onClick}>
            <span className="plus-icon">+</span>
            <span className="tooltip">{tooltip}</span>
        </div>
    );
}

export default AddButton;