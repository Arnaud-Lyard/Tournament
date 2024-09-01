import { Hero } from '@/components/hero';
import type { Metadata } from 'next';

export default function Home({ params }: { params: { lang: string } }) {
  return (
    <div className="py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Hero params={{ lang: params.lang }} />
      </div>
    </div>
  );
}
