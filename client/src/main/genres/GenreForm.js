import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const GenreForm = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/genre/', {
                name,
                description
            });
            console.log('Genre added:', response.data);
            navigate('/genre'); // Redirect to the genre list after adding
        } catch (error) {
            console.error('Error adding genre:', error);
        }
    };

    const handleBack = () => {
        navigate('/genre');
    };

    return (
        <div>
            <h2>Add Genre</h2>
            <form className="form" onSubmit={handleSubmit}>
                <table>
                    <tbody>
                        <tr>
                            <td><label htmlFor="name">Name:</label></td>
                            <td><input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required /></td>
                        </tr>
                        <tr>
                            <td><label htmlFor="description">Description:</label></td>
                            <td><textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} required /></td>
                        </tr>
                    </tbody>
                </table>
                <div className="container">
                    <button type="submit" className="add">Add Genre</button>
                    <button type="button" className="back" onClick={handleBack}>Back</button>
                </div>
            </form>
        </div>
    );
};

export default GenreForm;
