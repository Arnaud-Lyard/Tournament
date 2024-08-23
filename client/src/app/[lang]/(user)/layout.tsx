import { Metadata } from 'next';
import '../../globals.css';
import Navbar from '@/components/navbar';

export function generateMetadata({
  params,
}: {
  params: { lang: string };
}): Metadata {
  const title =
    params.lang === 'fr'
      ? 'Veille technologique | Prochainweb'
      : 'Technology Watch | Prochainweb';

  const description =
    params.lang === 'fr'
      ? 'Découvrir les évolutions des langages de programmation, les nouveaux frameworks, les outils, les bonnes pratiques et les tendances du web.'
      : 'Discover the evolutions of programming languages, new frameworks, tools, best practices and web trends.';

  return {
    title,
    description,
  };
}

export default function UserLayout({
  auth,
  children,
}: {
  auth: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="min-h-full">
        <div className="bg-gray-800 pb-32">
          <Navbar />
          <header className="py-10">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="text-3xl font-bold tracking-tight text-white">
                Prochainweb
              </div>
            </div>
          </header>
        </div>

        <main className="-mt-32">
          <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
            <div className="rounded-lg bg-gray-50 px-5 py-6 shadow sm:px-6">
              <div>{auth}</div>
              <div>{children}</div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
