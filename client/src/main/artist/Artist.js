import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import apiRequest from "../../utils/apiRequest";

const Artist = () => {
    const navigate = useNavigate();
    const [artists, setArtists] = useState([]);

    useEffect(() => {
        const fetchArtists = async () => {
            try {
                const response = await axios.get('/artist/');
                setArtists(response.data);
            } catch (error) {
                console.error('Error fetching artists:', error);
            }
        };

        fetchArtists();
    }, []);

    const handleDelete = async (id) => {
        if (confirm("Are you sure you want to delete this artist?")) {
            try {
                const deleteOptions = {
                method: 'DELETE',
            }


                                                                                                                                                                                                                                                                    await apiRequest(`/painting/artist/${id}`, deleteOptions);
                await axios.delete(`/artist/${id}`);
                // Оновлення списку митців після видалення
                const updatedArtists = artists.filter(artist => artist._id !== id);
                setArtists(updatedArtists);
            } catch (error) {
                console.error('Error deleting artist:', error);
            }
        }
    };

    const handleAdd = async () => {
        navigate('/artist-form');
    }

    const handleEdit = (id) => {
        navigate(`/artist-edit/${id}`);
    }

    return (
        <main>
            <div className="container">
                <h1>Artists</h1>
                <button className="add" onClick={() => handleAdd()}>+ Add artist</button>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Full Name</th>
                        <th>Birth City</th>
                        <th>Birth Date</th>
                        <th>Movement</th>
                        <th>Amount of Paintings</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {artists.map(artist => (
                        <tr key={artist._id}>
                            <td>{artist._id}</td>
                            <td>{artist.fullName}</td>
                            <td>{artist.birthCity}</td>
                            <td>{artist.birthDate}</td>
                            <td>{artist.movement}</td>
                            <td>{artist.amountPainting}</td>
                            <td>
                                <button className="edit" onClick={() => handleEdit(artist._id)}>🖊️ Edit</button>
                            </td>
                            <td>
                                <button className="delete" onClick={() => handleDelete(artist._id)}>🗑️ Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </main>
    );
};

export default Artist;
