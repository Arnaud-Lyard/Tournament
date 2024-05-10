import { Metadata } from 'next';
import Favicon from '~/public/assets/images/favicon.ico';

export const metadata: Metadata = {
  icons: [{ rel: 'icon', url: Favicon.src }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
