import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Gallery() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    axios.get('/api/images')
      .then((response) => {
        setImages(response.data);
      })
      .catch((error) => {
        console.error('Error fetching images:', error);
      });
  }, []);

  return (
    <div>
      <h2>Gallery</h2>
      <div>
        {images.map((image) => (
          <div key={image._id}>
            <img src={image.imageUrl} alt={image.title} />
            <p>{image.title}</p>
            <p>Likes: {image.likes}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Gallery;
