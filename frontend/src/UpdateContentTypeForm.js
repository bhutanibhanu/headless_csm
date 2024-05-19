import React, { useState, useEffect } from 'react';
import './styles/ContentTypeForm.css'

function UpdateContentTypeForm({ contentType, onClose, onSave }) {
    const [name, setName] = useState(contentType.name);
    const [attributes, setAttributes] = useState(Object.entries(contentType.schema || {}).map(([key, value]) => ({
        name: key,
        type: value
    })));

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleAttributeChange = (index, field, value) => {
        const newAttributes = [...attributes];
        newAttributes[index] = { ...newAttributes[index], [field]: value };
        setAttributes(newAttributes);
    };

    const handleAddAttribute = () => {
        setAttributes([...attributes, { name: '', type: '' }]);
    };

    const handleRemoveAttribute = (index) => {
        setAttributes(attributes.filter((_, idx) => idx !== index));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const updatedSchema = attributes.reduce((acc, attr) => {
            if (attr.name && attr.type) {  // Ensure the attribute has both name and type
                acc[attr.name] = attr.type;
            }
            return acc;
        }, {});
        onSave({ name, schema: updatedSchema });
    };

    return (
        <div className="overlay">
            <div className="modal">
                <button onClick={onClose} className="close-button">X</button>
                <form onSubmit={handleSubmit}>
                    <label>Name:</label>
                    <input type="text" value={name} onChange={handleNameChange} />
                    <h3>Attributes:</h3>
                    {attributes.map((attribute, index) => (
                        <div key={index}>
                            <input
                                type="text"
                                placeholder="Attribute Name"
                                value={attribute.name}
                                onChange={(e) => handleAttributeChange(index, 'name', e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="Attribute Type"
                                value={attribute.type}
                                onChange={(e) => handleAttributeChange(index, 'type', e.target.value)}
                            />
                            <button type="button" onClick={() => handleRemoveAttribute(index)}>Remove</button>
                        </div>
                    ))}
                    <button type="button" onClick={handleAddAttribute}>Add Attribute</button>
                    <button type="submit">Save Changes</button>
                </form>
            </div>
        </div>
    );
}

export default UpdateContentTypeForm;
