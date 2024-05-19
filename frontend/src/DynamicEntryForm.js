import React, { useState } from 'react';
import './styles/ContentTypeForm.css'

function DynamicEntryForm({ contentType, onClose }) {
    const [entryData, setEntryData] = useState({});
   
    const schemaArray = Object.keys(contentType.schema).map(key => ({
        name: key,
        type: contentType.schema[key]
    }));

    const handleChange = (field, value) => {
        setEntryData({ ...entryData, [field]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // API call to create entry
        const url = `http://localhost:3001/content-entries`; // Your API endpoint URL for creating entries
        const postData = {
        contentTypeId: contentType.id, // Make sure `contentType` has `id`
        data: entryData
        };

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }
            return response.json();
        })
        .then(data => {
            console.log('Success:', data);
            onClose(); // Close the form only if the request is successful
        })
        .catch((error) => {
            console.error('Error:', error);
        });

        console.log(entryData);
        onClose();
        // Include API interaction as needed
    };

    

    return (
        <div className="overlay">
            <div className="modal">
                <button onClick={onClose} className="close-button">X</button>
        <form onSubmit={handleSubmit}>
            {schemaArray.map(attribute => (
                <div key={attribute.name}>
                    <label>{attribute.name}</label>
                    <input
                        type={attribute.type || 'text'}  // Simplified; adjust type handling as needed
                        value={entryData[attribute.name] || ''}
                        onChange={(e) => handleChange(attribute.name, e.target.value)}
                    />
                </div>
            ))}
            <button type="submit">Submit Entry</button>
        </form>
        </div>
        </div>
    );
}

export default DynamicEntryForm
