'use client';

import { useDictionary } from '@/providers/dictionary-provider';
import { HttpService } from '@/services';
import { useErrorHandling } from '@/hooks/useErrorHandling';
import { ICreateDatasPayload, ICreateCategoryResponse } from '@/types/api';
import { FormEvent, useEffect, useRef, useState } from 'react';
import { IGetCategoryResponse } from '@/types/api';
import { ICategory } from '@/types/models';

export default function AddCategory() {
  const addCategoryRef = useRef<HTMLFormElement>(null);
  const dictionary = useDictionary();
  const http = new HttpService();
  const { errors, message, checkErrors, resetMessages, setMessage } =
    useErrorHandling();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const formJSON = Object.fromEntries(formData.entries());
    addCategoryRef.current?.reset();
    try {
      const response = await http
        .service()
        .push<ICreateCategoryResponse, ICreateDatasPayload>(
          `posts/categories`,
          formJSON
        );
      if (response.status === 'success') {
        setMessage(response.message);
      }
    } catch (e: any) {
      checkErrors(e.response.data);
    }
    resetMessages();
  }

  return (
    <form ref={addCategoryRef} onSubmit={handleSubmit} method="POST">
      <label
        htmlFor="categoryName"
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {dictionary.adminCategory.firstLabel}
      </label>
      <div className="mt-2">
        <input
          id="categoryName"
          name="categoryName"
          type="text"
          placeholder="Nom de la catégorie"
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          required
        />
      </div>

      {errors.length > 0 &&
        errors.map((error: string, index) => (
          <p key={index} className="text-red-700">
            {error}
          </p>
        ))}
      {message !== '' && <p className="text-green-700">{message}</p>}

      <button
        type="submit"
        className="inline-flex justify-center rounded-md bg-cyan-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600 mt-5"
      >
        {dictionary.buttons.submit}
      </button>
    </form>
  );
}
