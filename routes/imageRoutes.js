const express = require('express');
const router = express.Router();
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const upload = multer({ storage: storage });

const Image = require('../models/image');

router.post('/upload', upload.single('image'), async (req, res) => {
  try {
    const { title, description } = req.body;
    const imageUrl = req.file.path;
    const newImage = new Image({ title, description, imageUrl });
    await newImage.save();
    res.status(201).json(newImage);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/images', async (req, res) => {
  try {
    const images = await Image.find();
    res.json(images);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.get('/images/:id', async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);
    res.json(image);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/images/:id/comments', async (req, res) => {
  try {
    const { username, commentText } = req.body;
    const image = await Image.findById(req.params.id);
    if (!image) {
      return res.status(404).json({ error: 'Image not found' });
    }
    image.comments.push({ username, commentText });
    await image.save();
    res.status(201).json(image);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/images/:id/like', async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);
    if (!image) {
      return res.status(404).json({ error: 'Image not found' });
    }
    image.likes += 1;
    await image.save();
    res.status(201).json(image);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
