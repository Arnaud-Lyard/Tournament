import { Metadata } from 'next';
import '../../globals.css';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import CookieBanner from '@/components/cookie-banner';
import banner from '~/public/assets/images/banner.svg';
import Image from 'next/image';

export default function UserLayout({
  auth,
  children,
  params,
}: {
  auth: React.ReactNode;
  children: React.ReactNode;
  params: { lang: string };
}) {
  return (
    <>
      <div className="min-h-full">
        <div className="bg-gray-800 pb-32">
          <Navbar />
          <header className="relative py-10">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 md:block hidden">
              <div className="relative">
                <Image
                  src={banner}
                  priority={true}
                  alt="Prochainweb banner"
                  className="w-full h-auto"
                />
                <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center lg:text-4xl text-2xl">
                  <p className="text-white  font-bold text-center">
                    {params.lang === 'fr' ? 'Découvrez ' : 'Discover'}
                    <span className="text-gray-800 font-bold text-center">
                      {params.lang === 'fr'
                        ? 'les dernières technologies,'
                        : 'the latest technologies,'}
                    </span>
                  </p>
                  <p className="text-white font-bold text-center">
                    {params.lang === 'fr' ? 'les outils ' : 'tools '}
                    <span className="text-gray-800 font-bold text-center">
                      {params.lang === 'fr'
                        ? 'et les bonnes pratiques de '
                        : 'and best practices of '}
                    </span>
                    <span className="text-cyan-500 font-bold text-center">
                      {params.lang === 'fr' ? 'programmation.' : 'programming.'}
                    </span>
                  </p>
                </div>
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
        <Footer />
        <CookieBanner />
      </div>
    </>
  );
}
