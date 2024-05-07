import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const GenreEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        const fetchGenreData = async () => {
            try {
                const response = await axios.get(`/genre/one/${id}`);
                const genre = response.data;
                setName(genre.name);
                setDescription(genre.description);
            } catch (error) {
                console.error('Error fetching genre data:', error);
            }
        };

        if (id) {
            fetchGenreData();
        }
    }, [id]);

    const handleBack = () => {
        navigate('/genre');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`/genre/${id}`, {
                name,
                description
            });
            navigate('/genre');
        } catch (error) {
            console.error('Error updating genre:', error);
        }
    };

    return (
        <div>
            <h2>Edit Genre</h2>
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
                    <button type="submit" className="add">Update Genre</button>
                    <button type="button" className="back" onClick={handleBack}>Back</button>
                </div>
            </form>
        </div>
    );
};

export default GenreEdit;
