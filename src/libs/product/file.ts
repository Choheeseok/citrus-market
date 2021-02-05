import multer from "multer";
import path from "path";
import fs from "fs";

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `uploads/`);
    },
    filename: function (req, file, cb) {
      cb(null, new Date().valueOf() + path.extname(file.originalname));
    },
  }),
});

const deleteFiles = (files: string[]) => {
  files.forEach((file) => {
    fs.unlink(`uploads/${file}`, (err) => {
      if (err) console.error(err);
    });
  });
};

export { upload, deleteFiles };
