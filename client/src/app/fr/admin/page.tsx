import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hello, Next.js!',
  description: 'First page of the Next.js app',
};

export default function Page() {
  return (
    <div className="py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-dark">Admin</h1>
      </div>
    </div>
  );
}
