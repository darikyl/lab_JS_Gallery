import React from 'react';
import {Link} from "react-router-dom";

const Navigation = () => {
  return (
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/artist">Artists</Link></li>
          <li><Link to="/painting">Paintings</Link></li>
          <li><Link to="/genre">Genres</Link></li>
        </ul>
      </nav>
  );
}

export default Navigation;
