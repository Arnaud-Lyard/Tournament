import fs from 'fs-extra';
import AppError from '../utils/appError';

class ImageManager {
  private environment: string;

  constructor(environment: string) {
    this.environment = environment;
  }

  private getPath(filename: string): string {
    if (this.environment === 'production') {
      return `dist/public/uploads/${filename}`;
    }
    return `public/uploads/${filename}`;
  }

  public async removeImage(filename: string): Promise<void> {
    try {
      const path = this.getPath(filename);
      await fs.unlink(path);
    } catch (err) {
      throw new AppError(500, 'Error while deleting image.');
    }
  }

  public async removeResizedImages(filename: string): Promise<void> {
    try {
      const fileResized400x400 = `resized_400x400_${filename}`;
      const fileResized1200x630 = `resized_1200x630_${filename}`;

      await this.removeImage(fileResized400x400);
      await this.removeImage(fileResized1200x630);
    } catch (err) {
      throw new AppError(500, 'Error while deleting resized images.');
    }
  }
}

export default ImageManager;
