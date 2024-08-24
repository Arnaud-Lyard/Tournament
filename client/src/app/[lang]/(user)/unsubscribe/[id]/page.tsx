'use client';
import { useDictionary } from '@/providers/dictionary-provider';
import { HttpService } from '@/services';
import { IUnsubscribeResponse } from '@/types/api';
import { CheckCircleIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function unsubscribe({ params }: { params: { id: string } }) {
  const http = new HttpService();
  const router = useRouter();
  const dictionary = useDictionary();

  const [isUnsubscribed, setIsUnsubscribed] = useState(false);

  async function handleUnsubscribe() {
    const response = await http.get<IUnsubscribeResponse>(
      `/users/unsubscribe/${params.id}`
    );
    if (response.status === 'success') {
      setIsUnsubscribed(true);
    }
  }

  return (
    <div className="bg-white shadow sm:rounded-lg p-4">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-base font-semibold leading-6 text-gray-900">
          {dictionary.unsubscribe.title}
        </h3>
        <div className="mt-2 max-w-xl text-sm text-gray-500">
          <p>{dictionary.unsubscribe.description}</p>
        </div>
        <div className="mt-5">
          <button
            type="button"
            className="inline-flex items-center rounded-md bg-cyan-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-500"
            onClick={handleUnsubscribe}
          >
            {dictionary.unsubscribe.button}
          </button>
        </div>
      </div>
      {isUnsubscribed && (
        <div className="rounded-md bg-green-50 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <CheckCircleIcon
                aria-hidden="true"
                className="h-5 w-5 text-green-400"
              />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-green-800">
                {dictionary.unsubscribe.success}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
