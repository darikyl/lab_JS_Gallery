const mongoose = require("mongoose");
const cardSchema = mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    finishDate: { type: Date, required: true },
    artistId: {type: mongoose.Schema.Types.ObjectId, ref: 'artist'},
    genreId: {type: mongoose.Schema.Types.ObjectId, ref: 'genre'},
});

module.exports = mongoose.model('painting', cardSchema);