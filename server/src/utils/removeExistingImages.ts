import fs from 'fs-extra';
import AppError from '../utils/appError';

export const removeExistingImages = async ({
  filename,
  environment,
}: {
  filename: string;
  environment: string;
}) => {
  try {
    const fileResized400x400 = `resized_400x400_${filename}`;
    const fileResized1200x630 = `resized_1200x630_${filename}`;

    if (environment === 'production') {
      const pathFileResized400x400 = `dist/public/uploads/${fileResized400x400}`;
      const pathFileResized1200x630 = `dist/public/uploads/${fileResized1200x630}`;

      await fs.unlink(pathFileResized400x400);
      await fs.unlink(pathFileResized1200x630);
    }
    if (environment === 'development') {
      const pathFileResized400x400 = `public/uploads/${fileResized400x400}`;
      const pathFileResized1200x630 = `public/uploads/${fileResized1200x630}`;

      await fs.unlink(pathFileResized400x400);
      await fs.unlink(pathFileResized1200x630);
    }
  } catch (err) {
    throw new AppError(500, 'Error while deleting images.');
  }
};
