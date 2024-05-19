'use client';
import { HttpService } from '@/services';
import { IResponse } from '@/types/api';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function VerifyEmail({ params }: { params: { token: string } }) {
  const http = new HttpService();
  const router = useRouter();
  async function handleVerifyEmail() {
    try {
      const response = await http
        .service()
        .get<IResponse>(`/auth/verifyemail/${params.token}`);
      setTimeout(() => {
        router.push('/home');
      }, 5000);
    } catch (e: any) {}
  }

  useEffect(() => {
    handleVerifyEmail();
  }, []);

  return (
    <div className="py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-dark">
          Votre adresse e-mail a été vérifiée
        </h1>
        <p>Vous allez être redirigé</p>
      </div>
    </div>
  );
}
