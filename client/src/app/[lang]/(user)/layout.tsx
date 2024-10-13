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
          <Navbar params={{ lang: params.lang }} />
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
