// routes/fileRoutes.js
const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const catchAsync = require('../helpers/catchAsync');
const { isLoggedIn, isEducator } = require('../middleware/middleware');


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads"); // Save uploaded files to the uploads directory
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Rename uploaded files with original name
  },
});

const upload = multer({ storage: storage });

// POST route for file upload
router.post(
  '/upload',isLoggedIn,  isEducator,
  upload.single('file'),
  catchAsync(async (req, res) => {
    console.log(req.body);
    console.log(req.file);
    res.redirect('back');
  })
);

// GET route for file download
router.get('/download/:filename', isLoggedIn, async (req, res) => {
  const filename = req.params.filename;
  const file = path.join(__dirname, '../uploads', filename);
  res.download(file, (err) => {
    if (err) {
      console.error(err);
      return res.redirect('back');
    }
  });
});

module.exports = router;
