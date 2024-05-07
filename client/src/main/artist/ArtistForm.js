import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ArtistForm = () => {
    const navigate = useNavigate();
    const [fullName, setFullName] = useState('');
    const [birthCity, setBirthCity] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [movement, setMovement] = useState('');
    const [amountPainting, setAmountPainting] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/artist/', {
                fullName,
                birthCity,
                birthDate,
                movement,
                amountPainting
            });
            navigate('/artist');
        } catch (error) {
            console.error('Error adding artist:', error);
        }
    };

    const handleBack = () => {
        navigate('/artist');
    };

    return (
        <div>
            <h2>Add Artist</h2>
            <form className="form" onSubmit={handleSubmit}>
                <table>
                    <tbody>
                        <tr>
                            <td><label htmlFor="fullName">Full Name:</label></td>
                            <td><input type="text" id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} required /></td>
                        </tr>
                        <tr>
                            <td><label htmlFor="birthCity">Birth City:</label></td>
                            <td><input type="text" id="birthCity" value={birthCity} onChange={(e) => setBirthCity(e.target.value)} required /></td>
                        </tr>
                        <tr>
                            <td><label htmlFor="birthDate">Birth Date:</label></td>
                            <td><input type="date" id="birthDate" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} required /></td>
                        </tr>
                        <tr>
                            <td><label htmlFor="movement">Movement:</label></td>
                            <td><input type="text" id="movement" value={movement} onChange={(e) => setMovement(e.target.value)} required /></td>
                        </tr>
                        <tr>
                            <td><label htmlFor="amountPainting">Amount of Paintings:</label></td>
                            <td><input type="number" id="amountPainting" value={amountPainting} onChange={(e) => setAmountPainting(e.target.value)} required /></td>
                        </tr>
                    </tbody>
                </table>
                <div className="container">
                    <button type="submit" className="add">Add Artist</button>
                    <button type="button" className="back" onClick={handleBack}>Back</button>
                </div>
            </form>
        </div>
    );
};

export default ArtistForm;
