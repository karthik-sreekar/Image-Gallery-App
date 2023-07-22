const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const imageRoutes = require('./routes/imageRoutes');
const albumRoutes = require('./routes/albumRoutes');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost/image-gallery-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const upload = multer({ storage: storage });


const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


app.use('/api', imageRoutes);
app.use('/api', albumRoutes);