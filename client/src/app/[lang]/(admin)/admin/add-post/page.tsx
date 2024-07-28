'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { useDictionary } from '@/providers/dictionary-provider';
import {
  ICreatePostPayload,
  ICreatePostResponse,
  IGetCategoryResponse,
} from '@/types/api';
import { HttpService } from '@/services';
import { useErrorHandling } from '@/hooks/useErrorHandling';
import { ICategory } from '@/types/models';
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Label,
} from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';

const CustomEditor = dynamic(() => import('@/components/custom-editor'), {
  ssr: false,
});

export default function AddPost() {
  const [postDatas, setPostDatas] = useState<string | undefined>();
  const dictionary = useDictionary();
  const http = new HttpService();
  const { errors, message, checkErrors, resetMessages, setMessage } =
    useErrorHandling();
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [query, setQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<ICategory[]>([]);
  const [title, setTitle] = useState<string>('');

  const filteredCategories =
    query === ''
      ? categories
      : categories.filter((category) => {
          return category.name.toLowerCase().includes(query.toLowerCase());
        });
  async function handleCategories() {
    try {
      const response = await http
        .service()
        .get<IGetCategoryResponse>(`posts/categories`);
      if (response.status === 'success') {
        setCategories(response.data.categories);
      }
    } catch (e: any) {
      checkErrors(e.response.data);
    }
  }

  useEffect(() => {
    handleCategories();
  }, []);

  const handleSubmit = async () => {
    const selectedCategoriesIds = selectedCategories.map((category) => {
      return category.id;
    });
    try {
      const response = await http
        .service()
        .push<ICreatePostResponse, ICreatePostPayload>(`posts`, {
          post: postDatas,
          categoryIds: selectedCategoriesIds,
          title,
        });
      if (response.status === 'success') {
        setMessage(response.message);
      }
    } catch (e: any) {
      checkErrors(e.response.data);
    }
    setTitle('');
    setSelectedCategories([]);
    resetMessages();
  };
  return (
    <div className="py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-dark mb-5">
          {dictionary.addPost.title}
        </h1>
        <div className="mb-5">
          <label
            htmlFor="title"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            {dictionary.addPost.formLabelOne}
          </label>
          <div className="mt-2">
            <input
              id="title"
              name="title"
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <Combobox
          multiple
          as="div"
          value={selectedCategories}
          onChange={setSelectedCategories}
          onClose={() => setQuery('')}
        >
          <Label className="block text-sm font-medium leading-6 text-gray-900">
            {dictionary.addPost.formLabelTwo}
          </Label>
          {selectedCategories.length > 0 && (
            <div className="text-sm">
              {selectedCategories.map((category, index) => (
                <span key={category.id}>
                  {category.name}
                  {index < selectedCategories.length - 1 && ', '}
                </span>
              ))}
            </div>
          )}
          <div className="relative mt-2">
            <ComboboxInput
              className="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              onChange={(event) => setQuery(event.target.value)}
              onBlur={() => setQuery('')}
            />
            <ComboboxButton className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </ComboboxButton>

            {filteredCategories.length > 0 && (
              <ComboboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {filteredCategories.map((category) => (
                  <ComboboxOption
                    key={category.id}
                    value={category}
                    className="group relative cursor-default select-none py-2 pl-8 pr-4 text-gray-900 data-[focus]:bg-indigo-600 data-[focus]:text-white"
                  >
                    <span className="block truncate group-data-[selected]:font-semibold">
                      {category.name}
                    </span>

                    <span className="absolute inset-y-0 left-0 hidden items-center pl-1.5 text-indigo-600 group-data-[selected]:flex group-data-[focus]:text-white">
                      <CheckIcon className="h-5 w-5" aria-hidden="true" />
                    </span>
                  </ComboboxOption>
                ))}
              </ComboboxOptions>
            )}
          </div>
        </Combobox>

        <div className="my-5">
          <CustomEditor setPostDatas={setPostDatas} postDatas="" />
        </div>
        <div>
          {errors.length > 0 &&
            errors.map((error: string, index) => (
              <p key={index} className="text-red-700">
                {error}
              </p>
            ))}
          {message !== '' && <p className="text-green-700">{message}</p>}

          <button
            onClick={() => handleSubmit()}
            className="inline-flex justify-center rounded-md bg-cyan-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
          >
            {dictionary.buttons.submit}
          </button>
        </div>
      </div>
    </div>
  );
}
