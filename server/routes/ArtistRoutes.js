const express = require("express");
const router = express.Router();
const Artist = require("../models/Artist");

router.get('/', async (req, res) => {
    try {
        const artists = await Artist.find();
        res.status(200).json(artists);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/one/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const artist = await Artist.findById(id);
        res.status(200).json(artist);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/fullName/:fullName', async (req, res) => {
    const fullName = req.params.fullName;
    try {
        const artists = await Artist.find({ fullName: fullName });
        res.status(200).json(artists);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const artist = new Artist(req.body);
        const savedArtist = await artist.save();
        res.status(201).json(savedArtist);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        await Artist.findByIdAndDelete(id);
        res.status(200).json(null);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.put('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        let updates = {};
        if (req.body.fullName !== undefined)
            updates.fullName = req.body.fullName;
        if (req.body.birthCity !== undefined)
            updates.birthCity = req.body.birthCity;
        if (req.body.birthDate !== undefined)
            updates.birthDate = req.body.birthDate;
        if (req.body.movement !== undefined)
            updates.movement = req.body.movement;
        if (req.body.amountPainting !== undefined)
            updates.amountPainting = req.body.amountPainting;
        const artist = await Artist.findByIdAndUpdate(id, updates, { new: true });
        res.status(201).json(artist);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
