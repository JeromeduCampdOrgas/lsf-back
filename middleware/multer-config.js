const multer = require("multer");

const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "images");
  },

  filename: (req, file, callback) => {
    const name = req.body.name.split(" ").join("_") + Date.now() + ".jpg";
    callback(null, name);
  },
});

module.exports = multer({ storage: storage }).single("imageUrl");
