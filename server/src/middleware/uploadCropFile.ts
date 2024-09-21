import { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import AppError from '../utils/appError';
import sharp from 'sharp';

const uploadDirectory = path.join(__dirname, '../../public/uploads');

if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory, { recursive: true });
}

const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
});

export const uploadCropFile = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  upload.single('file')(req, res, async (err: any) => {
    if (err instanceof multer.MulterError) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return next(
          new AppError(
            400,
            'La taille du fichier est trop grande. Maximum 5MB.'
          )
        );
      }
      return next(
        new AppError(
          500,
          'Une erreur inconnue est survenue lors du téléchargement du fichier.'
        )
      );
    } else if (err) {
      return next(
        new AppError(
          500,
          'Une erreur inconnue est survenue lors du téléchargement.'
        )
      );
    }

    if (!req.file) {
      return next();
    }

    const filename = `${Date.now()}-${req.file.originalname}`;

    try {
      await sharp(req.file.buffer)
        .resize({ width: 400, height: 400 })
        .jpeg({ quality: 50 })
        .toFile(path.join(uploadDirectory, `resized_400x400_${filename}`));

      await sharp(req.file.buffer)
        .resize({ width: 1200, height: 630 })
        .jpeg({ quality: 50 })
        .toFile(path.join(uploadDirectory, `resized_1200x630_${filename}`));

      req.file.filename = filename;
    } catch (error) {
      return next(
        new AppError(
          500,
          'Une erreur est survenue lors du redimensionnement de l’image.'
        )
      );
    }

    next();
  });
};
