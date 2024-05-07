import React from 'react';
import {Route, Routes} from "react-router-dom"
import Navigation from './main/Navigation';
import Genre from './main/genres/Genre';
import Home from './main/Home';
import Artist from "./main/artist/Artist"
import Painting from "./main/painting/Painting"
import PaintingForm from "./main/painting/PaintingForm";
import PaintingEdit from "./main/painting/PaintingEdit";
import ArtistForm from "./main/artist/ArtistForm";
import ArtistEdit from "./main/artist/ArtistEdit";
import GenreForm from "./main/genres/GenreForm";
import GenreEdit from "./main/genres/GenreEdit";

const App = () => {
    return (
    <div>
        <Navigation/>
            <Routes>
                <Route path="/" exact element={<Home />} />
                <Route path="/artist" element={<Artist />} />
                <Route path="/painting" element={<Painting />} />
                <Route path="/genre" element={<Genre />} />
                <Route path="/painting-form" element={<PaintingForm />} />
                <Route path="/painting-edit/:id" element={<PaintingEdit />} />
                <Route path="/artist-form" element={<ArtistForm />} />
                <Route path="/artist-edit/:id" element={<ArtistEdit />} />
                <Route path="/genre-form" element={<GenreForm />} />
                <Route path="/genre-edit/:id" element={<GenreEdit />} />
            </Routes>
    </div>

    );
}

export default App;
