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
export default function Login() {
  const http = new HttpService();
  const { errors, message, checkErrors, resetMessages, setMessage } =
    useErrorHandling();
  const router = useRouter();
  const dictionary = useDictionary();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const formJSON: any = Object.fromEntries(formData.entries());

    try {
      const response = await http
        .service()
        .push<IResponse, any>(`/auth/login`, formJSON);
      if (response.status === 'success') {
        router.push('/home');
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
          {dictionary.login.title}
        </DialogTitle>
        <div className="mt-2"></div>
        <form className="space-y-6" onSubmit={handleSubmit} method="POST">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              {dictionary.login.formLabelOne}
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
              {dictionary.login.formLabelTwo}
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

          <div className="flex items-center justify-between">
            <div className="flex items-center"></div>

            <div className="text-sm leading-6">
              <Link
                href="/forgot-password"
                className="font-semibold text-cyan-600 hover:text-cyan-500"
              >
                {dictionary.login.forgotPassword}
              </Link>
            </div>
          </div>

          {errors.length > 0 &&
            errors.map((error: string, index) => (
              <p key={index} className="text-red-700">
                {error}
              </p>
            ))}
          {message !== '' && <p className="text-green-700">{message}</p>}

          <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
            <button
              type="submit"
              className="inline-flex w-full justify-center rounded-md bg-cyan-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600 sm:col-start-2"
            >
              {dictionary.login.button}
            </button>
            <button
              type="button"
              className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
              onClick={onDismiss}
              data-autofocus
            >
              {dictionary.login.buttonCancel}
            </button>
          </div>
        </form>
        <p className="mt-10 text-center text-sm text-gray-500">
          {dictionary.login.text}{' '}
          <Link
            href="/register"
            className="font-semibold leading-6 text-cyan-600 hover:text-cyan-500"
          >
            {dictionary.login.link}
          </Link>
        </p>
      </div>
    </Modal>
  );
}
