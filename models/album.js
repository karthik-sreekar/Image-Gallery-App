const mongoose = require('mongoose');

const albumSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  images: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Image' }],
});

const Album = mongoose.model('Album', albumSchema);
module.exports = Album;
