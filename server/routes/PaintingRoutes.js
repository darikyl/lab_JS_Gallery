const express = require("express");
const router = express.Router();
const Painting = require("../models/Painting");

router.get('/', async (req, res) => {
    try {
        const paintings = await Painting.find()
            .populate('artistId')
            .populate('genreId');
        res.status(200).json(paintings);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.delete('/artist/:artistId', async (req, res) => {
    const id = req.params.artistId;
     try {
        const items = await Painting.deleteMany({artistId: id});
        res.status(200).json(null);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

router.get('/one/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const painting = await Painting.findById(id);
        res.status(200).json(painting);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/artist/:artistId', async (req, res) => {
    const artistId = req.params.artistId;
    try {
        const paintings = await Painting.find({ artistId: artistId });
        res.status(200).json(paintings);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/genre/:genreId', async (req, res) => {
    const genreId = req.params.genreId;
    try {
        const paintings = await Painting.find({ genreId: genreId });
        res.status(200).json(paintings);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const painting = new Painting(req.body);
        const savedPainting = await painting.save();
        res.status(201).json(savedPainting);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        await Painting.findByIdAndDelete(id);
        res.status(200).json(null);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.put('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        let updates = {};
        if (req.body.name !== undefined)
            updates.name = req.body.name;
        if (req.body.description !== undefined)
            updates.description = req.body.description;
        if (req.body.finishDate !== undefined)
            updates.finishDate = req.body.finishDate;
        if (req.body.artistId !== undefined)
            updates.artistId = req.body.artistId;
        if (req.body.genreId !== undefined)
            updates.genreId = req.body.genreId;
        const painting = await Painting.findByIdAndUpdate(id, updates, { new: true });
        res.status(201).json(painting);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
