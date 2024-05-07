const mongoose = require("mongoose");
const cardSchema = mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true }
});

module.exports = mongoose.model('genre', cardSchema);