'use client';

import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid'
import { useDictionary } from '@/providers/dictionary-provider';
import { useRouter } from 'next/navigation';
import Link from "next/link";

const statuses = {
  Published: 'text-green-700 bg-green-50 ring-green-600/20',
  'In progress': 'text-gray-600 bg-gray-50 ring-gray-500/10',
  Disabled: 'text-yellow-800 bg-yellow-50 ring-yellow-600/20',
}
const blogs = [
  {
    id: 1,
    name: 'GraphQL API',
    href: '#',
    status: 'Published',
    author: 'Leslie Alexander',
    creationDate: 'March 17, 2023',
    updatedDate: '2023-03-17T00:00Z',
  },
  {
    id: 2,
    name: 'New benefits plan',
    href: '#',
    status: 'In progress',
    author: 'Leslie Alexander',
    creationDate: 'May 5, 2023',
    updatedDate: 'May 22 2024',
  },
  {
    id: 3,
    name: 'Onboarding emails',
    href: '#',
    status: 'In progress',
    author: 'Courtney Henry',
    creationDate: 'May 5, 2023',
    updatedDate: 'May 22 2024',
  },
  {
    id: 4,
    name: 'iOS app',
    href: '#',
    status: 'In progress',
    author: 'Leonard Krasner',
    creationDate: 'May 5, 2023',
    updatedDate: 'May 22 2024',
  },
  {
    id: 5,
    name: 'Marketing site redesign',
    href: '#',
    status: 'Disabled',
    author: 'Courtney Henry',
    creationDate: 'May 5, 2023',
    updatedDate: 'May 22 2024',
  },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Blog() {
  const dictionary = useDictionary();
  const router = useRouter();

  return (
      <div>
        <div className="flex justify-end">
          <button
              onClick={() => router.push('/admin/add-blog')}
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
            {blogs.map((blog) => (
                <li key={blog.id} className="flex items-center justify-between gap-x-6 py-5">
                  <div className="min-w-0">
                    <div className="flex items-start gap-x-3">
                      <p className="text-sm font-semibold leading-6 text-gray-900">{blog.name}</p>
                      <p
                          className={classNames(
                              statuses[blog.status],
                              'mt-0.5 whitespace-nowrap rounded-md px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset',
                          )}
                      >
                        {blog.status}
                      </p>
                    </div>
                    <div className="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">
                      <p className="whitespace-nowrap">
                        {dictionary.adminblog.creationDate}
                        <time dateTime={blog.creationDate}>{blog.creationDate}</time>
                      </p>
                      <svg viewBox="0 0 2 2" className="h-0.5 w-0.5 fill-current">
                        <circle r={1} cx={1} cy={1}/>
                      </svg>
                      <p className="truncate">{dictionary.adminblog.author} {blog.author}</p>
                    </div>
                  </div>
                  <div className="flex flex-none items-center gap-x-4">
                    <Link
                        href={`/blog/' ${blog.id}`}
                        className="hidden rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:block"
                    >
                      {dictionary.adminblog.view}<span className="sr-only">, {blog.name}</span>
                    </Link>
                    <Menu as="div" className="relative flex-none">
                      <MenuButton className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
                        <span className="sr-only">{dictionary.adminblog.option}</span>
                        <EllipsisVerticalIcon aria-hidden="true" className="h-5 w-5"/>
                      </MenuButton>
                      <MenuItems
                          className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                      >
                        <MenuItem>
                          <Link href={`/admin/publish-blog/' ${blog.id}`}
                             className="block px-3 py-1 text-sm leading-6 text-gray-900 data-[focus]:bg-gray-50">
                            {dictionary.adminblog.action.one}<span className="sr-only">, {blog.name}</span>
                          </Link>
                        </MenuItem>
                        <MenuItem>
                          <Link href={`/admin/edit-blog/' ${blog.id}`}
                             className="block px-3 py-1 text-sm leading-6 text-gray-900 data-[focus]:bg-gray-50">
                            {dictionary.adminblog.action.two}<span className="sr-only">, {blog.name}</span>
                          </Link>
                        </MenuItem>
                        <MenuItem>
                          <Link href={`/admin/disabled-blog/' ${blog.id}`}
                             className="block px-3 py-1 text-sm leading-6 text-gray-900 data-[focus]:bg-gray-50">
                            {dictionary.adminblog.action.three}<span className="sr-only">, {blog.name}</span>
                          </Link>
                        </MenuItem>
                      </MenuItems>
                    </Menu>
                  </div>
                </li>
            ))}
          </ul>
        </div>
      </div>
  )
}
