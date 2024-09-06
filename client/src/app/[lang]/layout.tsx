import '../globals.css';
import { Metadata } from 'next';
import Favicon from '~/public/assets/images/favicon.ico';
import { getDictionary } from './dictionaries';
import DictionaryProvider from '../../providers/dictionary-provider';

export function generateMetadata({
  params,
}: {
  params: { lang: string };
}): Metadata {
  const icons = [{ rel: 'icon', url: Favicon.src }];
  const title =
    params.lang === 'fr'
      ? 'Veille technologique | Prochainweb'
      : 'Technology Watch | Prochainweb';

  const description =
    params.lang === 'fr'
      ? 'Découvrir les évolutions des langages de programmation, les nouveaux frameworks, les outils, les bonnes pratiques et les tendances du web.'
      : 'Discover the evolutions of programming languages, new frameworks, tools, best practices and web trends.';

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
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.ckeditor.com/ckeditor5/43.0.0/ckeditor5.css"
        />
      </head>

      <body>
        <DictionaryProvider dictionary={dictionary}>
          {children}
        </DictionaryProvider>
      </body>
    </html>
  );
}
