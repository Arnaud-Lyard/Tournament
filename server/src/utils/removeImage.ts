import fs from 'fs-extra';
import AppError from '../utils/appError';

export async function removeImage({
  filename,
  environment,
}: {
  filename: string;
  environment: string;
}): Promise<void> {
  try {
    const basePath =
      environment === 'production' ? 'dist/public/uploads' : 'public/uploads';
    const file = `${basePath}/${filename}`;
    await fs.unlink(file);
  } catch (err) {
    throw new AppError(500, 'Error while deleting image.');
  }
}

export async function removeResizedImages({
  filename,
  environment,
}: {
  filename: string;
  environment: string;
}): Promise<void> {
  try {
    const basePath =
      environment === 'production' ? 'dist/public/uploads' : 'public/uploads';
    const fileResized400x400 = `${basePath}/resized_400x400_${filename}`;
    const fileResized1200x630 = `${basePath}/resized_1200x630_${filename}`;
    await fs.unlink(fileResized400x400);
    await fs.unlink(fileResized1200x630);
  } catch (err) {
    throw new AppError(500, 'Error while deleting image.');
  }
}
