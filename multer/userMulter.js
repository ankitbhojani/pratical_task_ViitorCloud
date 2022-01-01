// import fs from 'fs';
const path = require("path");
const multer = require("multer");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const profileImageDir = "public/user/";
    if (!fs.existsSync(profileImageDir)) {
      fs.mkdir(profileImageDir, { recursive: true }, (error) =>
        cb(error, profileImageDir)
      );
    } else {
      cb(null, profileImageDir);
    }
  },
  filename: (req, file, cb) => {
    let ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + Date.now() + ext);
  },
});

const fileFilter = (req, file, upload) => {
  // Reject a file with not allowed extension
  const mimtypesForUserProfile = ["image/jpeg", "image/jpg", "image/png"];
  if (file.fieldname === "proPic") {
    if (inArray(file.mimetype, mimtypesForUserProfile)) {
      upload(null, true);
    } else {
      upload(
        new Error("Please enter valid profile image i.e jpg , png or jpeg"),
        false
      );
    }
  }
};

function inArray(needle, haystack) {
  var length = haystack.length;
  for (var i = 0; i < length; i++) {
    if (haystack[i] == needle) return true;
  }
  return false;
}

const userMulter = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 },
  fileFilter: fileFilter,
});

module.exports = { userMulter };
