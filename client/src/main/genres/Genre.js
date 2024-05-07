import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { useNavigate } from "react-router-dom";
import apiRequest from "../../utils/apiRequest";

const Genre = () => {
    const navigate = useNavigate();
    const [genres, setGenres] = useState([]);

    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const response = await axios.get('/genre/');
                setGenres(response.data);
            } catch (error) {
                console.error('Error fetching genres:', error);
            }
        };

        fetchGenres();
    }, []);

    const handleDelete = async (id) => {
        if (confirm("Are you sure you want to delete genre?")) {
            const deleteOptions = {
                method: 'DELETE',
            }
            await apiRequest(`/genre/${id}`, deleteOptions);
            const updatedGenres = genres.filter(genre => genre._id !== id);
            setGenres(updatedGenres);
        }
    }

    const handleAdd = async () => {
        navigate('/genre-form');
    }

    const handleEdit = (id) => {
        navigate(`/genre-edit/${id}`);
    }

    return (
        <main>
            <div className="container">
                <h1>Genres</h1>
                <button className="add" onClick={() => handleAdd()}>+ Add genre</button>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {genres.map(genre => (
                        <tr key={genre._id}>
                            <td>{genre._id}</td>
                            <td>{genre.name}</td>
                            <td>{genre.description}</td>
                            <td>
                                <button className="edit" onClick={() => handleEdit(genre._id)}> 🖊️ Edit</button>
                            </td>
                            <td>
                                <button className="delete" onClick={() => handleDelete(genre._id)}>🗑️ Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </main>
    );
};

export default Genre;
