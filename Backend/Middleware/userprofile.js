"use strict";
import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

//File Filter

const fileFilter = (req, file, cb) => {
  const allowTypes = ["image/jpg", "image/png", "image/webp", "image/jpeg"];
  if (allowTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only jpg,png,webp,jpeg Allow Formats"), false);
  }
};

const upload = multer({ storage, fileFilter });

export default upload;
