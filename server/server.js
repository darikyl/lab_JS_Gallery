require("dotenv").config({path:"./.env"});
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require('path');

const genreRoutes = require("./routes/GenreRoutes");
const artistRoutes = require("./routes/ArtistRoutes");
const paintingRoutes = require("./routes/PaintingRoutes");

const app = express();
const port = process.env.PORT;
const db_url = process.env.DB_URL;

mongoose.connect(db_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(value => console.log(`Connection to ${db_url} has been established successfully.`))
    .catch(err => console.log(`Error: ${err}`));

app.use(cors());
app.use(express.json());
app.use('/genre', genreRoutes);
app.use('/artist', artistRoutes);
app.use('/painting', paintingRoutes);

app.use("/", express.static(path.join(__dirname, '..', 'client')));

app.use((req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`Listening on localhost: ${port}`);
});
