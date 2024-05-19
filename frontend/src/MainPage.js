import React, { useState, useEffect } from 'react';
import './styles/MainPage.css';
import AddButton from './AddButton';
import ContentTypeForm from './ContentTypeForm';
import DynamicEntryForm from './DynamicEntryForm';
import EntryList from './entryList';
import UpdateContentTypeForm from './UpdateContentTypeForm';


function MainPage() {
    const [showForm, setShowForm] = useState(false);
    const [contentTypes, setContentTypes] = useState([]);
    const [showEntryForm, setShowEntryForm] = useState(false);
    const [selectedContentType, setSelectedContentType] = useState(null);
    const [showEntries, setShowEntries] = useState(false);
    const [selectedContentTypeId, setSelectedContentTypeId] = useState(null);
    const [currentContentType, setCurrentContentType] = useState(null);
    const [showUpdateForm, setShowUpdateForm] = useState(false);

    const fetchContentTypes = async () => {
        try {
            const response = await fetch('http://localhost:3001/content-types');
            const data = await response.json();
            setContentTypes(data);
        } catch (error) {
            console.error('Failed to fetch content types:', error);
        }
    };

    useEffect(() => {
        fetchContentTypes();
    }, []);

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:3001/content-types/deactivate/${id}`, {
                method: 'PUT'
            });

            if (!response.ok) {
                throw new Error('Failed to delete content type');
            }

            fetchContentTypes(); // Refresh content types list
        } catch (error) {
            console.error('Failed to delete content type:', error);
        }
    };

    const handleCreateEntryClick = (contentType) => {
        setSelectedContentType(contentType);
        setShowEntryForm(true);  // State to control the visibility of the entry form
    };
    const closeForm = () => {
        setShowEntryForm(false);  // Close modal
    };

    const handleShowEntries = (contentTypeId) => {
        setSelectedContentTypeId(contentTypeId);
        setShowEntries(true);
    };

    const handleUpdateClick = (contentType) => {
        setCurrentContentType(contentType);
        setShowUpdateForm(true);
    };

    const handleUpdateSubmit = (updatedData) => {
        const url = `http://localhost:3001/content-types/${currentContentType.id}`;
        fetch(url, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(updatedData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.text();  // Use .text() instead of .json() if the response might be plain text
        })
        .then(data => {
            console.log('Success:', data);
            setShowUpdateForm(false);  // Close the form upon successful update
            fetchContentTypes();       // Refresh the list of content types
        })
        .catch(error => {
            console.error('Failed to update content type:', error);
        });
    };
    const onCloseUpdateForm = () => {
        setShowUpdateForm(false);  // Hide the form
    };

    return (
        <div className="main-container">
            <h1>Headless CMS Dashboard</h1>
            <div className="add-button-container">
                <AddButton tooltip="Create an Entity" onClick={() => setShowForm(true)} />
                {console.log(showForm)}
            </div>
            {showForm && <ContentTypeForm onClose={() => setShowForm(false)} fetchContentTypes={fetchContentTypes} />}
            {showEntryForm && selectedContentType && 
                <DynamicEntryForm contentType={selectedContentType} onClose={closeForm} />
            }
             {showEntries && selectedContentTypeId && 
                <EntryList 
                    contentTypeId={selectedContentTypeId} 
                    onClose={() => setShowEntries(false)}
                />
            }
            {showUpdateForm && currentContentType && 
    <UpdateContentTypeForm 
        contentType={currentContentType} 
        onClose={onCloseUpdateForm}
        onSave={handleUpdateSubmit}
    />
}
           


            <table className="content-types-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Schema</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {contentTypes.map(contentType => (
                        <tr key={contentType.id}>
                            <td>{contentType.id}</td>
                            <td>{contentType.name}</td>
                            <td><pre>{JSON.stringify(contentType.schema, null, 2)}</pre></td>
                            <td>
                                <button onClick={() => handleDelete(contentType.id)}>Delete</button>
                                <button onClick={() => handleUpdateClick(contentType)}>Update</button>
                                <button onClick={() => handleCreateEntryClick(contentType)}>Create an Entry</button>
                                <button onClick={() => handleShowEntries(contentType.id)}>Show Entries</button>
                                {/* You can add an Update button and its logic here */}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    );
}

export default MainPage;
