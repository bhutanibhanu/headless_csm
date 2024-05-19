import React, { useState } from 'react';
import './styles/ContentTypeForm.css';

function ContentTypeForm({ onClose, fetchContentTypes }) {
    const [name, setName] = useState('');
    const [attributes, setAttributes] = useState([{ name: '', type: '' }]);
    const [error, setError] = useState('');

    const handleAddAttribute = () => {
        setAttributes([...attributes, { name: '', type: '' }]);
    };

    const handleRemoveAttribute = (index) => {
        const newAttributes = attributes.filter((_, idx) => idx !== index);
        setAttributes(newAttributes);
    };

    const handleAttributeChange = (index, field, value) => {
        const newAttributes = attributes.map((attr, idx) => {
            if (idx === index) {
                return { ...attr, [field]: value };
            }
            return attr;
        });
        setAttributes(newAttributes);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');

        if (!name.trim()) {
            setError('Entity name cannot be empty.');
            return;
        }

        if (attributes.length === 0) {
            setError('At least one attribute is required.');
            return;
        }


        const incompleteAttribute = attributes.some(attr => !attr.name.trim() || !attr.type.trim());
        if (incompleteAttribute) {
            setError('All attributes must have a name and type.');
            return;
        }

        const schema = attributes.reduce((acc, attr) => ({
            ...acc,
            [attr.name]: attr.type
        }), {});
        console.log('Submitting:', { name, schema });

        try {
            const response = await fetch('http://localhost:3001/content-types', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, schema })
            });

            if (!response.ok) {
                const errorMessage = await response.text();
                console.error('Error:', errorMessage);
                throw new Error(errorMessage);
            }

            const responseData = await response.json();
            console.log('Response:', responseData);

            fetchContentTypes(); // Refresh content types list
            onClose(); // Close form after submission
        } catch (error) {
            console.error('Error:', error);
            setError('Failed to create content type catch');
        }
    };

    return (
        <div className="overlay">
            <div className="form-container">
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Content Type Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <button type="button" onClick={handleAddAttribute}>Add an Attribute</button>
                {attributes.map((attribute, index) => (
                    <div key={index} className="attribute-row" >
                        <input
                            type="text"
                            placeholder="Attribute Name"
                            value={attribute.name}
                            onChange={(e) => handleAttributeChange(index, 'name', e.target.value)}
                        />
                         <select
                            value={attribute.type}
                            onChange={(e) => handleAttributeChange(index, 'type', e.target.value)}
                            required
                        >
                            <option value="" disabled selected>Select type</option>
                            <option value="string">String</option>
                            <option value="number">Number</option>
                            <option value="boolean">Boolean</option>
                            <option value="date">Date</option>
                            <option value="json">JSON</option>
                            <option value="text">Text</option>
                        </select>
                        {index > 0 && 
                         <button
                            type="button"
                            onClick={() => handleRemoveAttribute(index)}
                            className="remove-button"
                        >-</button>
                        }
                    </div>
                ))}
                <button type="submit">Create Content Type</button>
            </form>
            <button onClick={onClose}>Close</button>
        </div>
        </div>
    );
}

export default ContentTypeForm;
