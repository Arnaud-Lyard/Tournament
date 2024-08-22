import { HttpService } from '@/services';
import { IGetPostsResponse } from '@/types/api';

const http = new HttpService();

const pagesBase = [
  {
    url: process.env.NEXT_PUBLIC_APP_URL!,
    lastModified: new Date().toISOString(),
    alternateRefs: [
      { href: `${process.env.NEXT_PUBLIC_APP_URL!}/fr`, hreflang: 'fr' },
      { href: `${process.env.NEXT_PUBLIC_APP_URL!}/en`, hreflang: 'en' },
    ],
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  },
  {
    url: `${process.env.NEXT_PUBLIC_APP_URL}/post`,
    lastModified: new Date().toISOString(),
    alternateRefs: [
      { href: `${process.env.NEXT_PUBLIC_APP_URL}/fr/post`, hreflang: 'fr' },
      { href: `${process.env.NEXT_PUBLIC_APP_URL}/en/post`, hreflang: 'en' },
    ],
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  },
];

export async function GET() {
  const sitemap: Sitemap = [];
  const dynamicPages: Sitemap = await pagesForSitemap();
  sitemap.push(...pagesBase);
  sitemap.push(...dynamicPages);
  const sitemapXml = sitemapToXml(sitemap);

  return new Response(sitemapXml, {
    status: 200,
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
}

async function pagesForSitemap() {
  const {
    datas: { posts },
  } = await http.service().get<IGetPostsResponse>(`/posts/publish`);
  return posts.map((post) => ({
    url: `${process.env.NEXT_PUBLIC_APP_URL}/post/${post.slug}`,
    lastModified: new Date(post.updatedAt).toISOString(),
    alternateRefs: [
      {
        href: `${process.env.NEXT_PUBLIC_APP_URL}/fr/post/${post.slug}`,
        hreflang: 'fr',
      },
      {
        href: `${process.env.NEXT_PUBLIC_APP_URL}/en/post/${post.slug}`,
        hreflang: 'en',
      },
    ],
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));
}

const mapAlternate = ({ href, hreflang }: { href: string; hreflang: string }) =>
  `<xhtml:link rel="alternate" hreflang="${hreflang}" href="${href}"/>`;

const mapRowToUrl = (row: SitemapRow) =>
  `<url>
        <loc>${row.url}</loc>
        <lastmod>${row.lastModified || ''}</lastmod>
        ${row.alternateRefs.map(mapAlternate).join('\n        ')}
        <changefreq>${row.changeFrequency || ''}</changefreq>
        <priority>${row.priority?.toFixed(1)}</priority>
    </url>`;

const sitemapToXml = (
  sitemap: SitemapRow[]
) => `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<urlset 
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
  xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
    ${sitemap.map(mapRowToUrl).join('\n     ')}
</urlset>
`;

interface SitemapRow {
  url: string;
  lastModified?: string | Date;
  changeFrequency?:
    | 'always'
    | 'hourly'
    | 'daily'
    | 'weekly'
    | 'monthly'
    | 'yearly'
    | 'never';
  priority?: number;
  alternateRefs: Array<{ href: string; hreflang: string }>;
}

type Sitemap = SitemapRow[];
