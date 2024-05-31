'use client';
import Modal from '@/components/Modal';
import { FormEvent, Fragment, useState } from 'react';
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from '@headlessui/react';
import { CheckIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import { useDictionary } from '@/providers/dictionary-provider';
import { HttpService } from '@/services';
import { useErrorHandling } from '@/hooks/useErrorHandling';
import { IResponse } from '@/types/api';
import Link from 'next/link';
export default function Register({
  params: { lang },
}: {
  params: { lang: string };
}) {
  const http = new HttpService();
  const { errors, message, checkErrors, resetMessages, setMessage } =
    useErrorHandling();
  const dictionary = useDictionary();
  const router = useRouter();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const formJSON: any = Object.fromEntries(formData.entries());

    try {
      const response = await http
        .service()
        .push<IResponse, any>(`/auth/register`, { ...formJSON, lang });
      if (response.status === 'success') {
        setMessage(response.message);
      }
    } catch (e: any) {
      checkErrors(e.response.data);
    }
    resetMessages();
  };

  function onDismiss() {
    router.back();
  }
  return (
    <Modal>
      <div className="text-center">
        <DialogTitle
          as="h3"
          className="text-base font-semibold leading-6 text-gray-900 mb-5"
        >
          {dictionary.register.title}
        </DialogTitle>
        <form className="space-y-6" onSubmit={handleSubmit} method="POST">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              {dictionary.register.formLabelOne}
            </label>
            <div className="mt-2">
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              {dictionary.register.formLabelTwo}
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              {dictionary.register.formLabelThree}
            </label>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="passwordConfirm"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              {dictionary.register.formLabelFour}
            </label>
            <div className="mt-2">
              <input
                id="passwordConfirm"
                name="passwordConfirm"
                type="password"
                autoComplete="current-password"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          {errors.length > 0 &&
            errors.map((error: string, index) => (
              <p key={index} className="text-red-700">
                {error}
              </p>
            ))}
          {message !== '' && <p className="text-green-700">{message}</p>}
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-cyan-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
            >
              {dictionary.register.button}
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          {dictionary.register.text}{' '}
          <Link
            href="/login"
            className="font-semibold leading-6 text-cyan-600 hover:text-cyan-500"
          >
            {dictionary.register.link}
          </Link>
        </p>
      </div>
    </Modal>
  );
}
