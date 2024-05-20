'use client';
import '../../globals.css';
import { Fragment, useEffect, useState } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import {
  Bars3Icon,
  BellIcon,
  XMarkIcon,
  UserIcon,
  UserPlusIcon,
  ArrowPathIcon,
} from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';
import { HttpService } from '@/services';
import { IResponse } from '@/types/api';
import relaxingHippoquest from '~/public/assets/images/relaxing-hippoquests.jpeg';
import { usePathname, useSearchParams } from 'next/navigation';
import { useDictionary } from '@/providers/dictionary-provider';

const user = {
  name: 'Tom Cook',
  email: 'tom@example.com',
};

const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '#' },
  { name: 'Sign out', href: '#' },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const dictionary = useDictionary();

  const [navigation, setNavigation] = useState([
    { name: 'home', title: 'Home', href: '/home', current: true },
    { name: 'Team', title: 'Team title', href: '#', current: false },
    { name: 'Projects', title: 'Project title', href: '#', current: false },
    { name: 'Calendar', title: 'Calendar title', href: '#', current: false },
    { name: 'Reports', title: 'Reports title', href: '#', current: false },
  ]);

  function handleNavChange(path: string) {
    const lastPartPath = path.substring(path.lastIndexOf('/') + 1);
    setNavigation(
      navigation.map((nav) =>
        nav.name === lastPartPath
          ? { ...nav, current: true }
          : { ...nav, current: false }
      )
    );
  }

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setIsloading] = useState(true);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  useEffect(() => {
    handleNavChange(pathname);
  }, [pathname, searchParams]);

  async function handleUserLoggedIn() {
    const http = new HttpService();
    try {
      const response = await http.service().get<IResponse>(`/users/me`);

      if (response.data.isConnect === true) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setIsloading(false);
    } catch (e: any) {
      setIsLoggedIn(false);
    }
  }
  useEffect(() => {
    handleUserLoggedIn();
  }, [isLoggedIn]);

  return (
    <>
      <div className="min-h-full">
        <div className="bg-gray-800 pb-32">
          <Disclosure as="nav" className="bg-gray-800">
            {({ open }) => (
              <>
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                  <div className="border-b border-gray-700">
                    <div className="flex h-16 items-center justify-between px-4 sm:px-0">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <Image
                            width={32}
                            height={32}
                            src={relaxingHippoquest}
                            alt="Your Company"
                          />
                        </div>
                        <div className="hidden md:block">
                          <div className="ml-10 flex items-baseline space-x-4">
                            {navigation.map((item) => (
                              <Link
                                key={item.name}
                                href={item.href}
                                onClick={() => handleNavChange(item.name)}
                                className={classNames(
                                  item.current
                                    ? 'bg-gray-900 text-white'
                                    : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                  'rounded-md px-3 py-2 text-sm font-medium'
                                )}
                                aria-current={item.current ? 'page' : undefined}
                              >
                                {item.title}
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="hidden md:block">
                        <div className="ml-4 flex items-center md:ml-6">
                          {loading ? (
                            <ArrowPathIcon
                              className="h-6 w-6 text-gray-400"
                              aria-hidden="true"
                            />
                          ) : (
                            <>
                              {!isLoggedIn ? (
                                <>
                                  {/* Login and logout buttons */}
                                  <Link href="/register">
                                    <button
                                      type="button"
                                      className="relative inline-flex items-center gap-x-1.5 rounded-md bg-cyan-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-cyan-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-500"
                                    >
                                      <UserPlusIcon
                                        className="-ml-0.5 h-5 w-5"
                                        aria-hidden="true"
                                      />
                                      {dictionary.navigation.register}
                                    </button>
                                  </Link>
                                  <Link href="/login">
                                    <button
                                      type="button"
                                      className="relative inline-flex items-center gap-x-1.5 rounded-md bg-cyan-500 ml-3 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-cyan-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-500"
                                    >
                                      <UserIcon
                                        className="-ml-0.5 h-5 w-5"
                                        aria-hidden="true"
                                      />
                                      {dictionary.navigation.login}
                                    </button>
                                  </Link>
                                </>
                              ) : (
                                <>
                                  <button
                                    type="button"
                                    className="relative rounded-full bg-gray-800 ml-3 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                  >
                                    <span className="absolute -inset-1.5" />
                                    <span className="sr-only">
                                      View notifications
                                    </span>
                                    <BellIcon
                                      className="h-6 w-6"
                                      aria-hidden="true"
                                    />
                                  </button>

                                  {/* Profile dropdown */}
                                  <Menu as="div" className="relative ml-3">
                                    <div>
                                      <Menu.Button className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                        <span className="absolute -inset-1.5" />
                                        <span className="sr-only">
                                          Open user menu
                                        </span>
                                        <Image
                                          width={32}
                                          height={32}
                                          src={relaxingHippoquest}
                                          alt=""
                                        />
                                      </Menu.Button>
                                    </div>
                                    <Transition
                                      as={Fragment}
                                      enter="transition ease-out duration-100"
                                      enterFrom="transform opacity-0 scale-95"
                                      enterTo="transform opacity-100 scale-100"
                                      leave="transition ease-in duration-75"
                                      leaveFrom="transform opacity-100 scale-100"
                                      leaveTo="transform opacity-0 scale-95"
                                    >
                                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                        {userNavigation.map((item) => (
                                          <Menu.Item key={item.name}>
                                            {({ active }) => (
                                              <a
                                                href={item.href}
                                                className={classNames(
                                                  active ? 'bg-gray-100' : '',
                                                  'block px-4 py-2 text-sm text-gray-700'
                                                )}
                                              >
                                                {item.name}
                                              </a>
                                            )}
                                          </Menu.Item>
                                        ))}
                                      </Menu.Items>
                                    </Transition>
                                  </Menu>
                                </>
                              )}
                            </>
                          )}
                        </div>
                      </div>
                      <div className="-mr-2 flex md:hidden">
                        {/* Mobile menu button */}
                        <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                          <span className="absolute -inset-0.5" />
                          <span className="sr-only">Open main menu</span>
                          {open ? (
                            <XMarkIcon
                              className="block h-6 w-6"
                              aria-hidden="true"
                            />
                          ) : (
                            <Bars3Icon
                              className="block h-6 w-6"
                              aria-hidden="true"
                            />
                          )}
                        </Disclosure.Button>
                      </div>
                    </div>
                  </div>
                </div>

                <Disclosure.Panel className="border-b border-gray-700 md:hidden">
                  <div className="space-y-1 px-2 py-3 sm:px-3">
                    {navigation.map((item) => (
                      <Disclosure.Button
                        key={item.name}
                        as="a"
                        href={item.href}
                        onClick={() => handleNavChange(item.name)}
                        className={classNames(
                          item.current
                            ? 'bg-gray-900 text-white'
                            : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                          'block rounded-md px-3 py-2 text-base font-medium'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </Disclosure.Button>
                    ))}
                  </div>
                  <div className="border-t border-gray-700 pb-3 pt-4">
                    {loading ? (
                      <ArrowPathIcon
                        className="h-6 w-6 text-gray-400"
                        aria-hidden="true"
                      />
                    ) : (
                      <>
                        {!isLoggedIn ? (
                          <>
                            <div className="mt-3 space-y-1 px-2">
                              <Disclosure.Button
                                as="a"
                                href="/register"
                                className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                              >
                                {dictionary.navigation.register}
                              </Disclosure.Button>
                              <Disclosure.Button
                                as="a"
                                href="/login"
                                className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                              >
                                {dictionary.navigation.login}
                              </Disclosure.Button>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="flex items-center px-5">
                              <div className="flex-shrink-0">
                                <Image
                                  width={32}
                                  height={32}
                                  className="h-10 w-10 rounded-full"
                                  src={relaxingHippoquest}
                                  alt=""
                                />
                              </div>
                              <div className="ml-3">
                                <div className="text-base font-medium leading-none text-white">
                                  {user.name}
                                </div>
                                <div className="text-sm font-medium leading-none text-gray-400">
                                  {user.email}
                                </div>
                              </div>
                              <button
                                type="button"
                                className="relative ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                              >
                                <span className="absolute -inset-1.5" />
                                <span className="sr-only">
                                  View notifications
                                </span>
                                <BellIcon
                                  className="h-6 w-6"
                                  aria-hidden="true"
                                />
                              </button>
                            </div>

                            <div className="mt-3 space-y-1 px-2">
                              {userNavigation.map((item) => (
                                <Disclosure.Button
                                  key={item.name}
                                  as="a"
                                  href={item.href}
                                  className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                                >
                                  {item.name}
                                </Disclosure.Button>
                              ))}
                            </div>
                          </>
                        )}
                      </>
                    )}
                  </div>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
          <header className="py-10">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="text-3xl font-bold tracking-tight text-white">
                Seek Players
              </div>
            </div>
          </header>
        </div>

        <main className="-mt-32">
          <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
            <div className="rounded-lg bg-gray-50 px-5 py-6 shadow sm:px-6">
              {children}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
