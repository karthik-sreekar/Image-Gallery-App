import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import Gallery from './components/Gallery';
import UploadImage from './components/UploadImage';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/gallery">Gallery</Link>
            </li>
            <li>
              <Link to="/upload">Upload Image</Link>
            </li>
          </ul>
        </nav>

        <Route exact path="/" component={Home} />
        <Route path="/gallery" component={Gallery} />
        <Route path="/upload" component={UploadImage} />
      </div>
    </Router>
  );
}

export default App;
