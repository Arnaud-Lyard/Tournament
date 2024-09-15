'use client';
import { Fragment, useEffect, useState } from 'react';
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from '@headlessui/react';
import {
  Bars3Icon,
  BellIcon,
  XMarkIcon,
  UserIcon,
  ArrowPathIcon,
} from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';
import { HttpService } from '@/services';
import {
  IGetNewNotificationResponse,
  IPostPostsOnUsers,
  IResponse,
} from '@/types/api';
import logo from '~/public/assets/images/prochainweb.svg';
import { usePathname, useSearchParams } from 'next/navigation';
import { useDictionary } from '@/providers/dictionary-provider';
import { IComment, ICommentPost, IPost } from '@/types/models';
import { useUser } from '@/contexts/userContext';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}
export default function Navbar({ params }: { params: { lang: string } }) {
  const dictionary = useDictionary();
  const http = new HttpService();
  const [navigation, setNavigation] = useState([
    { name: 'home', title: 'Home', href: '/', current: false },
    { name: 'post', title: 'Articles', href: '/post', current: false },
  ]);

  function handleNavChange(path: string) {
    const lastPartPath = path.substring(path.lastIndexOf('/') + 1);
    if (path === '/fr' || path === '/en') {
      setNavigation(
        navigation.map((nav) =>
          nav.name === 'home'
            ? { ...nav, current: true }
            : { ...nav, current: false }
        )
      );
    } else {
      setNavigation(
        navigation.map((nav) =>
          nav.name === lastPartPath
            ? { ...nav, current: true }
            : { ...nav, current: false }
        )
      );
    }
  }

  const pathname = usePathname();
  const searchParams = useSearchParams();
  useEffect(() => {
    handleNavChange(pathname);
  }, [pathname, searchParams]);
  const [newPosts, setNewPosts] = useState<IPost[]>([]);
  const [isNewPostVisible, setIsNewPostVisible] = useState<boolean>(false);
  const [newComment, setNewComment] = useState<ICommentPost[]>([]);
  const [isNewCommentVisible, setIsNewCommentVisible] =
    useState<boolean>(false);
  const { isLoggedIn, name, notification, email, role, loading, avatar } =
    useUser();

  async function handleUserLogout() {
    try {
      const response = await http.service().get<IResponse>(`/auth/logout`);
      if (response.status === 'success') {
        location.reload();
      }
    } catch (e: any) {}
  }

  async function handleNewNotification() {
    try {
      const response = await http
        .service()
        .get<IGetNewNotificationResponse>(`/posts/new`);
      if (response.status === 'success') {
        setNewPosts(response.data.posts);
        setNewComment(response.data.comments);
      }
    } catch (e: any) {}
  }
  useEffect(() => {
    if (isLoggedIn) {
      handleNewNotification();
    }
  }, [isLoggedIn]);

  async function handleResetNotification(version: 'desktop' | 'mobile') {
    if (version === 'mobile') {
      setIsNewPostVisible(true);
      setIsNewCommentVisible(true);
    }
    try {
      const response = await http.service().get<IResponse>(`/posts/reset`);
    } catch (e: any) {}
  }

  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="border-b border-gray-700">
              <div className="flex h-16 items-center justify-between px-4 sm:px-0">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Link href="/">
                      <Image
                        width={32}
                        height={32}
                        src={logo}
                        alt="Prochainweb"
                      />
                    </Link>
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
                            {/* Authentication buttons */}
                            <Link
                              href="/authentication"
                              className="relative inline-flex items-center gap-x-1.5 rounded-md bg-cyan-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-cyan-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-500"
                              scroll={false}
                            >
                              <UserIcon
                                className="-ml-0.5 h-5 w-5"
                                aria-hidden="true"
                              />
                              {dictionary.navigation.authentication}
                            </Link>
                          </>
                        ) : (
                          <>
                            {notification ? (
                              <Menu
                                as="div"
                                className="relative inline-block text-left"
                              >
                                <div>
                                  <MenuButton
                                    className="relative rounded-full bg-gray-800 ml-3 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                    onClick={() =>
                                      handleResetNotification('desktop')
                                    }
                                  >
                                    <span className="sr-only">
                                      {dictionary.navigation.notifications}
                                    </span>
                                    <BellIcon
                                      className="h-6 w-6"
                                      aria-hidden="true"
                                    />
                                    {newPosts.length || newComment.length ? (
                                      <span className="absolute top-0 right-0 inline-flex items-center justify-center h-2 w-2 rounded-full bg-red-500" />
                                    ) : (
                                      ''
                                    )}
                                  </MenuButton>
                                </div>
                                {newPosts.length || newComment.length ? (
                                  <MenuItems className="absolute right-0 z-10 mt-2 w-64 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                    {newPosts.map((post) => (
                                      <MenuItem key={post.id}>
                                        {({ active }) => (
                                          <Link
                                            href={`/post/${post.slug}`}
                                            className={classNames(
                                              active ? 'bg-gray-100' : '',
                                              'block px-4 py-2 text-sm text-gray-700'
                                            )}
                                          >
                                            {params.lang === 'fr'
                                              ? post.frenchTitle
                                              : post.englishTitle}
                                          </Link>
                                        )}
                                      </MenuItem>
                                    ))}
                                    {newComment.map((comment) => (
                                      <MenuItem key={comment.id}>
                                        {({ active }) => (
                                          <Link
                                            href={`/post/${comment.post.slug}`}
                                            className={classNames(
                                              active ? 'bg-gray-100' : '',
                                              'block px-4 py-2 text-sm text-gray-700'
                                            )}
                                          >
                                            {comment.user.username}
                                            {params.lang === 'fr'
                                              ? ' a réagi à votre commentaire'
                                              : ' reacted to your comment'}
                                          </Link>
                                        )}
                                      </MenuItem>
                                    ))}
                                  </MenuItems>
                                ) : (
                                  ''
                                )}
                              </Menu>
                            ) : (
                              ''
                            )}

                            {/* Profile dropdown */}
                            <Menu as="div" className="relative ml-3">
                              <div>
                                <MenuButton className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                  <span className="absolute -inset-1.5" />
                                  <span className="sr-only">
                                    {dictionary.navigation.button}
                                  </span>
                                  <Image
                                    width={32}
                                    height={32}
                                    src={`${process.env.NEXT_PUBLIC_UPLOADS_URL}/${avatar}`}
                                    className="h-8 w-8 rounded-full"
                                    alt="User avatar"
                                  />
                                </MenuButton>
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
                                <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                  <MenuItem key="profile">
                                    {({ active }) => (
                                      <Link
                                        href="/user/profile"
                                        className={classNames(
                                          active ? 'bg-gray-100' : '',
                                          'block px-4 py-2 text-sm text-gray-700'
                                        )}
                                      >
                                        {dictionary.navigation.profile}
                                      </Link>
                                    )}
                                  </MenuItem>
                                  {role === 'admin' ? (
                                    <MenuItem key="blog">
                                      {({ active }) => (
                                        <Link
                                          href="/admin/post"
                                          className={classNames(
                                            active ? 'bg-gray-100' : '',
                                            'block px-4 py-2 text-sm text-gray-700'
                                          )}
                                        >
                                          {dictionary.navigation.blog}
                                        </Link>
                                      )}
                                    </MenuItem>
                                  ) : null}
                                  <MenuItem key="logout">
                                    {({ active }) => (
                                      <Link
                                        href=""
                                        onClick={() => {
                                          handleUserLogout();
                                        }}
                                        className={classNames(
                                          active ? 'bg-gray-100' : '',
                                          'block px-4 py-2 text-sm text-gray-700'
                                        )}
                                      >
                                        {dictionary.navigation.logout}
                                      </Link>
                                    )}
                                  </MenuItem>
                                </MenuItems>
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
                    <span className="sr-only">
                      {dictionary.navigation.button}
                    </span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>
          </div>

          <DisclosurePanel className="border-b border-gray-700 md:hidden">
            <div className="space-y-1 px-2 py-3 sm:px-3">
              {navigation.map((item) => (
                <DisclosureButton
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
                  {item.title}
                </DisclosureButton>
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
                    <div className="mt-3 space-y-1 px-2">
                      <Link
                        href="/authentication"
                        scroll={false}
                        className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                      >
                        {dictionary.navigation.authentication}
                      </Link>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center px-5">
                        <div className="flex-shrink-0">
                          <Image
                            width={32}
                            height={32}
                            className="h-8 w-8 rounded-full"
                            src={`${process.env.NEXT_PUBLIC_UPLOADS_URL}/${avatar}`}
                            alt="User avatar"
                          />
                        </div>
                        <div className="ml-3">
                          <div className="text-base font-medium leading-none text-white">
                            {name}
                          </div>
                        </div>
                        {notification ? (
                          <button
                            type="button"
                            className="relative ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                            onClick={() => handleResetNotification('mobile')}
                          >
                            <span className="absolute -inset-1.5" />
                            <span className="sr-only">
                              {dictionary.navigation.notifications}
                            </span>
                            <BellIcon className="h-6 w-6" aria-hidden="true" />
                            {newPosts.length || newComment.length ? (
                              <span className="absolute top-0 right-0 inline-flex items-center justify-center h-2 w-2 rounded-full bg-red-500" />
                            ) : (
                              ''
                            )}
                          </button>
                        ) : (
                          ''
                        )}
                      </div>

                      <div className="mt-3 space-y-1 px-2">
                        {newPosts.length && isNewPostVisible
                          ? newPosts.map((post) => (
                              <DisclosureButton
                                key={post.id}
                                as="a"
                                href={`/post/${post.slug}`}
                                className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                              >
                                {params.lang === 'fr'
                                  ? post.frenchTitle
                                  : post.englishTitle}
                              </DisclosureButton>
                            ))
                          : ''}
                        {newComment.length && isNewCommentVisible
                          ? newComment.map((comment) => (
                              <DisclosureButton
                                key={comment.id}
                                as="a"
                                href={`/post/${comment.post.slug}`}
                                className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                              >
                                {comment.user.username}
                                {params.lang === 'fr'
                                  ? ' a réagi à votre commentaire'
                                  : ' reacted to your comment'}
                              </DisclosureButton>
                            ))
                          : ''}
                        <DisclosureButton
                          key="profile"
                          as="a"
                          href="/user/profile"
                          className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                        >
                          {dictionary.navigation.profile}
                        </DisclosureButton>
                        <DisclosureButton
                          key="article"
                          as="a"
                          href="/admin/post"
                          className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                        >
                          {dictionary.navigation.article}
                        </DisclosureButton>
                        <DisclosureButton
                          key="logout"
                          as="a"
                          onClick={() => {
                            handleUserLogout();
                          }}
                          className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                        >
                          {dictionary.navigation.logout}
                        </DisclosureButton>
                      </div>
                    </>
                  )}
                </>
              )}
            </div>
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  );
}
