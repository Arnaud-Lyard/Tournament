import fs from 'fs-extra';

export const removeExistingImages = async ({
  filename,
  environment,
}: {
  filename: string;
  environment: string;
}) => {
  if (environment === 'production') {
    const path = `dist/public/uploads/${filename}`;
    await fs.unlink(path);
  }
  if (environment === 'development') {
    const path = `public/uploads/${filename}`;
    await fs.unlink(path);
  }
};
