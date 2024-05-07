const express = require("express");
const router = express.Router();
const Genre = require("../models/Genre");

router.get('/', async (req, res) => {
    try {
        const genres = await Genre.find();
        res.status(200).json(genres);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/one/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const genre = await Genre.findById(id);
        res.status(200).json(genre);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/name/:name', async (req, res) => {
    const name = req.params.name;
    try {
        const genre = await Genre.find({ name: name });
        res.status(200).json(genre);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const genre = new Genre(req.body);
        const savedGenre = await genre.save();
        res.status(201).json(savedGenre);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        await Genre.findByIdAndDelete(id);
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
        const genre = await Genre.findByIdAndUpdate(id, updates, { new: true });
        res.status(201).json(genre);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
