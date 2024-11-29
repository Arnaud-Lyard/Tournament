'use client';

import dynamic from 'next/dynamic';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useDictionary } from '@/providers/dictionary-provider';
import {
  ICreatePostResponse,
  IGetCategoryResponse,
  IGetPostResponse,
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
import {
  CheckIcon,
  ChevronUpDownIcon,
  PhotoIcon,
} from '@heroicons/react/20/solid';
import { cp } from 'fs';

const CustomEditor = dynamic(() => import('@/components/custom-editor'), {
  ssr: false,
});

const tabs = [
  { name: 'Français', href: '#', current: true },
  { name: 'Anglais', href: '#', current: false },
];

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}

export default function EditPost({ params }: { params: { id: string } }) {
  const [frenchPostDatas, setFrenchPostDatas] = useState<string | undefined>();
  const [englishPostDatas, setEnglishPostDatas] = useState<
    string | undefined
  >();
  const dictionary = useDictionary();
  const http = new HttpService();
  const { errors, message, checkErrors, resetMessages, setMessage } =
    useErrorHandling();
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [query, setQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<ICategory[]>([]);
  const [frenchTitle, setFrenchTitle] = useState<string>('');
  const [englishTitle, setEnglishTitle] = useState<string>('');
  const [image, setImage] = useState<File | null>(null);
  const [frenchDescription, setFrenchDescription] = useState<string>('');
  const [englishDescription, setEnglishDescription] = useState<string>('');
  const [slug, setSlug] = useState<string>('');
  const [activeTab, setActiveTab] = useState(
    tabs.find((tab) => tab.current)!.name
  );

  const handlePost = async () => {
    try {
      const response = await http
        .service()
        .get<IGetPostResponse>(`posts/${params.id}`);
      if (response.status === 'success') {
        setFrenchTitle(response.data.post.frenchTitle);
        setEnglishTitle(response.data.post.englishTitle);
        setFrenchDescription(response.data.post.frenchDescription);
        setEnglishDescription(response.data.post.englishDescription);
        setFrenchPostDatas(response.data.post.frenchContent);
        setEnglishPostDatas(response.data.post.englishContent);
        setSlug(response.data.post.slug);
        setSelectedCategories(
          response.data.post.categories.map((category) => {
            return category.category;
          })
        );
      }
    } catch (e: any) {}
  };

  async function handleCategories() {
    try {
      const response = await http
        .service()
        .get<IGetCategoryResponse>(`posts/categories`);
      if (response.status === 'success') {
        setCategories(response.data.categories);
      }
    } catch (e: any) {}
  }

  const handleTabChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setActiveTab(event.target.value);
  };

  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
  };

  const filteredCategories =
    query === ''
      ? categories
      : categories.filter((category) => {
          return category.name.toLowerCase().includes(query.toLowerCase());
        });

  useEffect(() => {
    handlePost();
    handleCategories();
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setImage(event.target.files[0]);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const selectedCategoriesIds = selectedCategories.map((category) => {
      return category.id;
    });

    const formData = new FormData();
    formData.append('frenchTitle', frenchTitle);
    formData.append('englishTitle', englishTitle);
    formData.append('frenchDescription', frenchDescription);
    formData.append('englishDescription', englishDescription);
    formData.append('slug', slug);
    selectedCategoriesIds.forEach((categoryId) => {
      formData.append('categoryIds[]', categoryId);
    });
    if (image) {
      formData.append('file', image);
    }

    if (frenchPostDatas) {
      formData.append('frenchContent', frenchPostDatas);
    }

    if (englishPostDatas) {
      formData.append('englishContent', englishPostDatas);
    }

    try {
      const response = await http
        .service()
        .update<ICreatePostResponse, any>(
          `posts/${params.id}`,
          formData,
          undefined,
          true
        );
      if (response.status === 'success') {
        setMessage(response.message);
      }
    } catch (e: any) {
      checkErrors(e.response.data);
    }
    setFrenchTitle('');
    setEnglishTitle('');
    setSelectedCategories([]);
    resetMessages();
  };
  return (
    <div className="py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-dark mb-5">
          {dictionary.addPost.title}
        </h1>
        <form
          method="post"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <div className="mb-5">
            <label
              htmlFor="frenchtitle"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              {dictionary.addPost.formLabelOne}
            </label>
            <div className="mt-2">
              <input
                id="frenchtitle"
                name="frenchtitle"
                type="text"
                value={frenchTitle}
                onChange={(e) => {
                  setFrenchTitle(e.target.value);
                }}
                required
                className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="mb-5">
            <label
              htmlFor="englishtitle"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              {dictionary.addPost.formLabelOneB}
            </label>
            <div className="mt-2">
              <input
                id="englishtitle"
                name="englishtitle"
                type="text"
                value={englishTitle}
                onChange={(e) => {
                  setEnglishTitle(e.target.value);
                }}
                required
                className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="mb-5">
            <label
              htmlFor="frenchdescription"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              {dictionary.addPost.formLabelThree}
            </label>
            <div className="mt-2">
              <input
                id="frenchdescription"
                name="frenchdescription"
                type="text"
                value={frenchDescription}
                onChange={(e) => {
                  setFrenchDescription(e.target.value);
                }}
                required
                className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="mb-5">
            <label
              htmlFor="englishDescription"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              {dictionary.addPost.formLabelThreeB}
            </label>
            <div className="mt-2">
              <input
                id="englishDescription"
                name="englishDescription"
                type="text"
                value={englishDescription}
                onChange={(e) => {
                  setEnglishDescription(e.target.value);
                }}
                required
                className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="mb-5">
            <label
              htmlFor="slug"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              {dictionary.addPost.formLabelFour}
            </label>
            <div className="mt-2">
              <input
                id="slug"
                name="slug"
                type="text"
                value={slug}
                onChange={(e) => {
                  setSlug(e.target.value);
                }}
                required
                className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="mt-2 sm:col-span-2 sm:mt-0">
            <div className="flex items-center gap-x-3">
              <PhotoIcon
                className="h-12 w-12 text-gray-300"
                aria-hidden="true"
              />
              <button
                type="button"
                className="rounded-md bg-white px-2.5 py-1.5 text-sm  text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                <input
                  id="image"
                  type="file"
                  name="file"
                  onChange={handleFileChange}
                ></input>
              </button>
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
                className="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-600 sm:text-sm sm:leading-6"
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
                      className="group relative cursor-default select-none py-2 pl-8 pr-4 text-gray-900 data-[focus]:bg-cyan-600 data-[focus]:text-white"
                    >
                      <span className="block truncate group-data-[selected]:font-semibold">
                        {category.name}
                      </span>

                      <span className="absolute inset-y-0 left-0 hidden items-center pl-1.5 text-cyan-600 group-data-[selected]:flex group-data-[focus]:text-white">
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    </ComboboxOption>
                  ))}
                </ComboboxOptions>
              )}
            </div>
          </Combobox>

          <div className="mt-5">
            <div className="sm:hidden">
              <label htmlFor="tabs" className="sr-only">
                Select a tab
              </label>
              <select
                id="tabs"
                name="tabs"
                onChange={handleTabChange}
                value={activeTab}
                className="block w-full rounded-md border-gray-300 focus:border-cyan-500 focus:ring-cyan-500"
              >
                {tabs.map((tab) => (
                  <option key={tab.name}>{tab.name}</option>
                ))}
              </select>
            </div>
            <div className="hidden sm:block">
              <nav aria-label="Tabs" className="flex space-x-4">
                {tabs.map((tab) => (
                  <a
                    key={tab.name}
                    onClick={() => handleTabClick(tab.name)}
                    aria-current={activeTab === tab.name ? 'page' : undefined}
                    className={classNames(
                      activeTab === tab.name
                        ? 'bg-cyan-100 text-cyan-700'
                        : 'text-gray-500 hover:text-gray-700',
                      'cursor-pointer rounded-md px-3 py-2 text-sm font-medium'
                    )}
                  >
                    {tab.name}
                  </a>
                ))}
              </nav>
            </div>
          </div>
          {activeTab === 'Français' ? (
            <div className="my-5">
              <CustomEditor
                setPostDatas={setFrenchPostDatas}
                postDatas={frenchPostDatas || 'Version française'}
              />
            </div>
          ) : (
            <div className="my-5">
              <CustomEditor
                setPostDatas={setEnglishPostDatas}
                postDatas={englishPostDatas || 'English version'}
              />
            </div>
          )}

          <div>
            {errors.length > 0 &&
              errors.map((error: string, index) => (
                <p key={index} className="text-red-700">
                  {error}
                </p>
              ))}
            {message !== '' && <p className="text-green-700">{message}</p>}

            <button
              type="submit"
              className="inline-flex justify-center rounded-md bg-cyan-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
            >
              {dictionary.buttons.submit}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
