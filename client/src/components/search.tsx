'use client';
import { Command } from 'cmdk';
import { useState, useEffect, useRef } from 'react';
import { HttpService } from '@/services';
import { IGetPostsResponse } from '@/types/api';
import Link from 'next/link';

export interface ISearchPost {
  id: string;
  title: string;
  slug: string;
}
export default function CommandMenu({ params }: { params: { lang: string } }) {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState<ISearchPost[]>([]);
  const http = new HttpService();

  useEffect(() => {
    async function getItems() {
      setLoading(true);
      const response = await http
        .service()
        .get<IGetPostsResponse>(`/posts/publish`);

      const posts = response.datas.posts.map((post) => ({
        id: post.id,
        title: params.lang === 'fr' ? post.frenchTitle : post.englishTitle,
        slug: post.slug,
      }));
      setPosts(posts);
      setLoading(false);
    }

    getItems();
  }, []);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const handleClickOutside = (e: MouseEvent) => {
    if (dialogRef.current && !dialogRef.current.contains(e.target as Node)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    if (open) {
      document.addEventListener('click', handleClickOutside);
    } else {
      document.removeEventListener('click', handleClickOutside);
    }
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [open]);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="px-4 py-2 border border-gray-500 bg-white rounded-md  w-auto mx-auto transition text-sm text-gray-500 flex items-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6 mr-2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
        {params.lang === 'fr' ? 'Rechercher un article' : 'Search an article'}
      </button>

      <Command.Dialog
        open={open}
        onOpenChange={setOpen}
        label="Global Command Menu"
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      >
        <div
          ref={dialogRef}
          className="bg-white p-4 rounded-lg shadow-lg w-full max-w-lg"
        >
          <Command.Input
            className="w-full p-3 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
            placeholder={
              params.lang === 'fr'
                ? 'Tapez pour rechercher...'
                : 'Type to search...'
            }
          />

          <Command.List className="mt-2 max-h-60 overflow-y-auto border-t border-gray-200">
            {loading && (
              <Command.Loading>
                {params.lang === 'fr'
                  ? 'Récupération des articles'
                  : 'Fetching articles'}
              </Command.Loading>
            )}
            {posts.map((post) => (
              <Command.Item
                key={`word-${post.id}`}
                value={post.title}
                className="hover:bg-gray-100 cursor-pointer"
              >
                <Link
                  className="block px-4 py-2 text-gray-600"
                  href={`/articles/${post.slug}`}
                >
                  {post.title}
                </Link>
              </Command.Item>
            ))}
          </Command.List>
        </div>
      </Command.Dialog>
    </>
  );
}
