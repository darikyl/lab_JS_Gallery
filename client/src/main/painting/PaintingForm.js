import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const PaintingForm = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [finishDate, setFinishDate] = useState('');
    const [artistId, setArtistId] = useState('');
    const [genreId, setGenreId] = useState('');
    const [artists, setArtists] = useState([]);
    const [genres, setGenres] = useState([]);

    useEffect(() => {
        const fetchArtistsAndGenres = async () => {
            try {
                const [artistsResponse, genresResponse] = await Promise.all([
                    axios.get('/artist/'),
                    axios.get('/genre/')
                ]);
                setArtists(artistsResponse.data);
                setGenres(genresResponse.data);
            } catch (error) {
                console.error('Error fetching artists and genres:', error);
            }
        };
        fetchArtistsAndGenres();
    }, []);

    const handleBack = () => {
        navigate('/painting');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/painting/', {
                name,
                description,
                finishDate,
                artistId,
                genreId
            });
            console.log('Painting added:', response.data);
            navigate('/painting'); // Повернення до списку малюнків після додавання
        } catch (error) {
            console.error('Error adding painting:', error);
        }
    };

    return (
        <div>
            <h2>Add Painting</h2>
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
                        <tr>
                            <td><label htmlFor="finishDate">Finish Date:</label></td>
                            <td><input type="date" id="finishDate" value={finishDate} onChange={(e) => setFinishDate(e.target.value)} required /></td>
                        </tr>
                        <tr>
                            <td><label htmlFor="artistId">Artist:</label></td>
                            <td>
                                <select id="artistId" value={artistId} onChange={(e) => setArtistId(e.target.value)}>
                                    <option value="">Select Artist</option>
                                    {artists.map(artist => (
                                        <option key={artist._id} value={artist._id}>{artist.fullName}</option>
                                    ))}
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td><label htmlFor="genreId">Genre:</label></td>
                            <td>
                                <select id="genreId" value={genreId} onChange={(e) => setGenreId(e.target.value)}>
                                    <option value="">Select Genre</option>
                                    {genres.map(genre => (
                                        <option key={genre._id} value={genre._id}>{genre.name}</option>
                                    ))}
                                </select>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className="container">
                    <button type="submit" className="add">Add Painting</button>
                    <button type="button" className="back" onClick={handleBack}>Back</button>
                </div>
            </form>
        </div>
    );
};

export default PaintingForm;
