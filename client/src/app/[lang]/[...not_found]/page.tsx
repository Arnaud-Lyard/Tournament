import Link from 'next/link';
import { Metadata, ResolvingMetadata } from 'next';

type Props = {
  params: { slug: string; lang: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Metadata {
  return {
    robots: 'noindex nofollow',
  };
}

export default function NotFound({ params }: { params: { lang: string } }) {
  return (
    <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-base font-semibold text-cyan-600">404</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          {params.lang === 'fr' ? 'Page introuvable' : 'Page not found'}
        </h1>
        <p className="mt-6 text-base leading-7 text-gray-600">
          {params.lang === 'fr'
            ? 'Désolé, nous ne trouvons pas la page que vous demandez.'
            : 'Sorry, we couldn’t find the page you’re looking for.'}
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            href="/"
            className="rounded-md bg-cyan-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
          >
            {params.lang === 'fr' ? "Retour à l'accueil" : 'Go back home'}
          </Link>
        </div>
      </div>
    </main>
  );
}
