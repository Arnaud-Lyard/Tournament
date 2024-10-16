import '../../globals.css';
import Navbar from '@/components/navbar';

export default function UserLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  return (
    <>
      <div className="min-h-full">
        <div className="bg-gray-800">
          <Navbar params={{ lang: params.lang }} />
        </div>

        <main>
          <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
            <div className="rounded-lg bg-gray-50 px-5 py-6 shadow sm:px-6">
              <div>{children}</div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
