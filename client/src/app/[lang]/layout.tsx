import '../globals.css';
import { Metadata } from 'next';
import Favicon from '~/public/assets/images/favicon.ico';
import { getDictionary } from './dictionaries';
import DictionaryProvider from '../../providers/dictionary-provider';
import { UserProvider } from '@/contexts/userContext';

export function generateMetadata({
  params,
}: {
  params: { lang: string };
}): Metadata {
  const icons = [{ rel: 'icon', url: Favicon.src }];
  const title =
    params.lang === 'fr'
      ? 'Prochainweb | Développeur web'
      : 'Prochainweb | Web developer';

  const description =
    params.lang === 'fr'
      ? 'Prochainweb, développeur web full stack indépendant qui transforme vos idées en applications web modernes.'
      : 'Prochainweb, independent full stack web developer who transforms your ideas into modern web applications.';

  const openGraph = {
    title,
    description,
    url: process.env.NEXT_PUBLIC_APP_URL,
    siteName: 'Prochainweb',
    type: 'website',
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_API_URL}/uploads/prochainweb.jpg`,
        width: 1200,
        height: 630,
        alt: 'Prochainweb',
      },
      {
        url: `${process.env.NEXT_PUBLIC_API_URL}/uploads/prochainweb.svg`,
        width: 400,
        height: 400,
        alt: 'Prochainweb logo',
      },
    ],
  };

  return {
    icons,
    title,
    description,
    openGraph,
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  const dictionary = await getDictionary(params.lang);

  return (
    <html lang={params.lang}>
      <body>
        <UserProvider>
          <DictionaryProvider dictionary={dictionary}>
            {children}
          </DictionaryProvider>
        </UserProvider>
      </body>
    </html>
  );
}
