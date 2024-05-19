import React, { useState, useEffect } from 'react';
import './styles/ContentTypeForm.css';

function EntryList({ contentTypeId, onClose }) {
    const [entries, setEntries] = useState([]);

    useEffect(() => {
        const fetchEntries = async () => {
            try {
                const response = await fetch(`http://localhost:3001/content-entries/${contentTypeId}`);
                const data = await response.json();
                setEntries(data);
            } catch (error) {
                console.error('Error fetching entries:', error);
            }
        };

        fetchEntries();
    }, [contentTypeId]);

    const handleDelete = async (entryId) => {
        try {
            const response = await fetch(`http://localhost:3001/content-entries/${entryId}`, {
                method: 'DELETE'
            });
            if (!response.ok) {
                throw new Error('Failed to delete entry');
            }
            setEntries(entries.filter(entry => entry.id !== entryId));  
        } catch (error) {
            console.error('Failed to delete entry:', error);
        }
    }

    return (
        <div className="overlay">
            <div className="modal">
                <button onClick={onClose} className="close-button">X</button>
                <h2>Entries for Content Type {contentTypeId}</h2>
                <ul>
                    {entries.map(entry => (
                        <li key={entry.id}>
                            {JSON.stringify(entry.data)}
                            <button onClick={() => handleDelete(entry.id)} className="delete-button">Delete</button> 
                            </li>
                        
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default EntryList;
