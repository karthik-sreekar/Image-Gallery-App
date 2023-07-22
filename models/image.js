const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  imageUrl: { type: String, required: true },
  dateUploaded: { type: Date, default: Date.now },
  likes: { type: Number, default: 0 },
  comments: [
    {
      username: { type: String, required: true },
      commentText: { type: String, required: true },
      date: { type: Date, default: Date.now },
    },
  ],
  albums: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Album' }],
});

const Image = mongoose.model('Image', imageSchema);
module.exports = Image;
