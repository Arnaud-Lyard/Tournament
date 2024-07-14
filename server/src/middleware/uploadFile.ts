import { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import AppError from '../utils/appError';

const uploadDirectory = path.join(__dirname, '../../public/uploads');

if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDirectory);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

export const uploadFile = (req: Request, res: Response, next: NextFunction) => {
  const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 },
  }).single('file');
  upload(req, res, (err: any) => {
    if (err instanceof multer.MulterError) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return next(
          new AppError(400, 'File size is too large. Maximum size is 5MB.')
        );
      } else {
        return next(
          new AppError(500, 'An unknown error occurred during file upload.')
        );
      }
    } else if (err) {
      return next(
        new AppError(500, 'An unknown error occurred during file upload.')
      );
    }

    /* if (!req.file) {
      return next(new AppError(400, 'No file uploaded.'));
    } */

    // req.body.file = req.file.filename; // Store the filename in req.body for later use
    next();
  });
};
