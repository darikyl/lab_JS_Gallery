import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import apiRequest from "../../utils/apiRequest";

const Painting = () => {
    const navigate = useNavigate();
    const [paintings, setPaintings] = useState([]);

    useEffect(() => {
        const fetchPaintings = async () => {
            try {
                const response = await axios.get('/painting/');
                setPaintings(response.data);
            } catch (error) {
                console.error('Error fetching paintings:', error);
            }
        };

        fetchPaintings();
    }, []);

    const handleDelete = async (id) => {
        if (confirm("Are you sure you want to delete painting?")) {
            const deleteOptions = {
                method: 'DELETE',
            }
            await apiRequest(`/painting/${id}`, deleteOptions);
            const updatedPaintings = paintings.filter(painting => painting._id !== id);
            setPaintings(updatedPaintings);
        }
    }
    const handleAdd = async () => {
        navigate('/painting-form');
    }

    const handleEdit = (id) => {
        navigate(`/painting-edit/${id}`);
    }

    return (
        <main>
            <div className="container">
                <h1>Paintings</h1>
                <button className="add" onClick={() => handleAdd()}>+ Add painting</button>
            </div>

            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Finish Date</th>
                    <th>Artist</th>
                    <th>Genre</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
                </thead>
                <tbody>
                {paintings.map(painting => (
                    <tr key={painting._id}>
                        <td>{painting._id}</td>
                        <td>{painting.name}</td>
                        <td>{painting.description}</td>
                        <td>{painting.finishDate}</td>
                        <td>{painting.artistId ? painting.artistId.fullName : 'Unknown Artist'}</td>
                        <td>{painting.genreId ? painting.genreId.name : 'Unknown Genre'}</td>
                        <td>
                            <button className="edit" onClick={() => handleEdit(painting._id)}>🖊️ Edit</button>
                        </td>
                        <td>
                            <button className="delete" onClick={() => handleDelete(painting._id)}>🗑️ Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </main>
    );
};

export default Painting;
