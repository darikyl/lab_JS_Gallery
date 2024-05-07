const mongoose = require("mongoose");
const cardSchema = mongoose.Schema({
    fullName: { type: String, required: true },
    birthCity: {type: String,  require: true},
    birthDate: { type: Date, required: true },
    movement: { type: String, required: true },
    amountPainting: {type: Number, default: 0, required: true},
});


module.exports = mongoose.model('artist', cardSchema);