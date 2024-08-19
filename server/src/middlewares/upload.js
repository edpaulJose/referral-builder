const multer = require("multer");
const path = require("path");

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Directory to store uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Create unique filename with timestamp
  },
});

// File filter (optional) to allow only certain types of files
const fileFilter = (req, file, cb) => {
  // Accept images only
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only images are allowed"), false);
  }
};

// Set up multer with the storage configuration
const upload = multer({
  storage: storage,
  fileFilter: fileFilter, // (optional) To restrict file types
  limits: {
    fileSize: 1024 * 1024 * 5, // (optional) 5MB file size limit
  },
});

module.exports = upload;
