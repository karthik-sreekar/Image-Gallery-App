const express = require('express');
const router = express.Router();
const Album = require('../models/album');


router.post('/albums', async (req, res) => {
  try {
    const { title, description } = req.body;
    const newAlbum = new Album({ title, description });
    await newAlbum.save();
    res.status(201).json(newAlbum);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/albums/:id/images', async (req, res) => {
  try {
    const album = await Album.findById(req.params.id);
    if (!album) {
      return res.status(404).json({ error: 'Album not found' });
    }
    const { imageId } = req.body;
    album.images.push(imageId);
    await album.save();
    res.status(201).json(album);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
