'use client';

import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid';
import { useDictionary } from '@/providers/dictionary-provider';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { IPost, IPostCategoryUser, IStatusEnumType } from '@/types/models';
import { HttpService } from '@/services';
import {
  IDisabledPostPayload,
  IDisabledPostResponse,
  IGetPostsResponse,
  IPublishedPostPayload,
  IPublishedPostResponse,
} from '@/types/api';
import { useEffect, useState } from 'react';
import moment from 'moment';

const statuses: Record<IStatusEnumType, string> = {
  published: 'text-green-700 bg-green-50 ring-green-600/20',
  draft: 'text-gray-600 bg-gray-50 ring-gray-500/10',
  disabled: 'text-yellow-800 bg-yellow-50 ring-yellow-600/20',
};

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

export default function Post({ params }: { params: { lang: string } }) {
  const dictionary = useDictionary();
  const router = useRouter();
  const http = new HttpService();
  const [posts, setPosts] = useState<IPostCategoryUser[]>([]);

  async function handlePosts() {
    try {
      const response = await http.service().get<IGetPostsResponse>(`/posts`);
      setPosts(
        response.datas.posts.map((post) => ({
          ...post,
          createdAt: moment(post.createdAt).format('L'),
        }))
      );
    } catch (e: any) {}
  }
  useEffect(() => {
    handlePosts();
  }, []);

  async function publishPost(id: string) {
    try {
      await http
        .service()
        .push<IPublishedPostResponse, IPublishedPostPayload>(
          `/posts/publish/${id}`,
          { postId: id }
        );
      await handlePosts();
    } catch (e: any) {}
  }

  async function disablePost(id: string) {
    try {
      await http
        .service()
        .push<IDisabledPostResponse, IDisabledPostPayload>(
          `/posts/disable/${id}`,
          { postId: id }
        );
      await handlePosts();
    } catch (e: any) {}
  }

  return (
    <div>
      <div className="flex justify-end">
        <button
          onClick={() => router.push('/admin/add-post')}
          className="inline-flex justify-center rounded-md bg-cyan-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
        >
          {dictionary.buttons.addPost}
        </button>
        <button
          onClick={() => router.push('/admin/add-category')}
          className="inline-flex justify-center rounded-md bg-cyan-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600 ml-5"
        >
          {dictionary.buttons.addCategory}
        </button>
      </div>
      <div>
        <ul role="list" className="divide-y divide-gray-100 mt-5">
          {posts.map((post) => (
            <li
              key={post.id}
              className="flex items-center justify-between gap-x-6 py-5"
            >
              <div className="min-w-0">
                <div className="flex items-start gap-x-3">
                  <p className="text-sm font-semibold leading-6 text-gray-900">
                    {params.lang === 'fr'
                      ? post.frenchTitle
                      : post.englishTitle}
                  </p>
                  <p
                    className={classNames(
                      statuses[post.status],
                      'mt-0.5 whitespace-nowrap rounded-md px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset'
                    )}
                  >
                    {post.status}
                  </p>
                </div>
                <div className="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">
                  <p className="whitespace-nowrap">
                    {dictionary.adminpost.creationDate}
                    <time dateTime={post.createdAt}>{post.createdAt}</time>
                  </p>
                  <svg viewBox="0 0 2 2" className="h-0.5 w-0.5 fill-current">
                    <circle r={1} cx={1} cy={1} />
                  </svg>
                  <p className="truncate">
                    {dictionary.adminpost.author} {post.user.username}
                  </p>
                </div>
              </div>
              <div className="flex flex-none items-center gap-x-4">
                <Link
                  href={`/post/${post.slug}`}
                  className="hidden rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:block"
                >
                  {dictionary.adminpost.view}
                </Link>
                <Menu as="div" className="relative flex-none">
                  <MenuButton className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
                    <span className="sr-only">
                      {dictionary.adminpost.option}
                    </span>
                    <EllipsisVerticalIcon
                      aria-hidden="true"
                      className="h-5 w-5"
                    />
                  </MenuButton>
                  <MenuItems className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in">
                    <MenuItem>
                      <button
                        onClick={() => publishPost(post.id)}
                        className="block px-3 py-1 text-sm leading-6 text-gray-900 data-[focus]:bg-gray-50"
                      >
                        {dictionary.adminpost.action.one}
                        <span className="sr-only">
                          ,{' '}
                          {params.lang === 'fr'
                            ? post.frenchTitle
                            : post.englishTitle}
                        </span>
                      </button>
                    </MenuItem>
                    <MenuItem>
                      <Link
                        href={`/admin/edit-post/${post.id}`}
                        className="block px-3 py-1 text-sm leading-6 text-gray-900 data-[focus]:bg-gray-50"
                      >
                        {dictionary.adminpost.action.two}
                        <span className="sr-only">
                          ,{' '}
                          {params.lang === 'fr'
                            ? post.frenchTitle
                            : post.englishTitle}
                        </span>
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <button
                        onClick={() => disablePost(post.id)}
                        className="block px-3 py-1 text-sm leading-6 text-gray-900 data-[focus]:bg-gray-50"
                      >
                        {dictionary.adminpost.action.three}
                        <span className="sr-only">
                          ,{' '}
                          {params.lang === 'fr'
                            ? post.frenchTitle
                            : post.englishTitle}
                        </span>
                      </button>
                    </MenuItem>
                  </MenuItems>
                </Menu>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
