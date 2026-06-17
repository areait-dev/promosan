// app/news/[slug]/page.tsx
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { draftMode } from 'next/headers';
import Link from 'next/link';
import Navbar from '../../../components/Navbar/Navbar';
import Footer from '../../../components/Footer/Footer';
import News1Hero from '../../../components/news1/News1Hero';
import News1Content from '../../../components/news1/News1Content';
import News1Related from '../../../components/news1/News1Related';
import BackToTop from '../../../components/news1/BackToTop';
import {
  getNews,
  getNewsBySlug,
  getRelatedNews,
  getGlobalOptions,
  type GlobalOptions,
  type NewsItem,
} from '@/lib/wordpress';
import { yoastToMetadata } from '@/lib/seo';

export const revalidate = 60;

interface PageProps {
  params: Promise<{ slug: string }>;
}

/** Iniziali di fallback ricavate dal nome dell'autore. */
function initialsFrom(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w.charAt(0).toUpperCase())
    .join('');
}

/**
 * Mappa un NewsItem (lib/wordpress) sulle props attese dai componenti news1,
 * che vogliono `image` come stringa URL e `author` sempre presente.
 */
function toView(news: NewsItem) {
  const author = news.author ?? { name: 'Redazione PromoSan', role: 'Redazione', initials: '' };
  return {
    id: news.id,
    slug: news.slug,
    title: news.title,
    excerpt: news.excerpt,
    content: news.content,
    image: news.image?.url ?? '/assets/img/news-strategia-nazionale.jpg',
    date: news.date,
    categories: news.categories,
    tags: news.tags ?? [],
    readTime: news.readTime,
    views: news.views ?? 0,
    author: {
      name: author.name,
      role: author.role,
      initials: author.initials || initialsFrom(author.name),
    },
  };
}

/** Genera staticamente tutte le pagine news a partire dagli slug pubblicati. */
export async function generateStaticParams() {
  try {
    const news = await getNews(100);
    return news.map((n) => ({ slug: n.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  let news: NewsItem | null = null;
  try {
    news = await getNewsBySlug(slug);
  } catch {
    // fallback ai metadati generici
  }

  if (!news) {
    return { title: 'Articolo non trovato | PromoSan' };
  }

  // Usa i dati SEO di Yoast (news.seo) con fallback su titolo/excerpt della news.
  return yoastToMetadata(news.seo, {
    title: news.title,
    description: news.excerpt,
    image: news.image?.url,
  });
}

export default async function NewsSinglePage({ params }: PageProps) {
  const { slug } = await params;
  const { isEnabled: draft } = await draftMode();

  let news: NewsItem | null = null;
  let related: NewsItem[] = [];
  let options: GlobalOptions | undefined;

  try {
    [news, options] = await Promise.all([
      getNewsBySlug(slug, draft),
      getGlobalOptions(draft),
    ]);
    if (news) {
      related = await getRelatedNews(news.id, news.categories[0], 4, draft);
    }
  } catch (error) {
    console.error('[NewsSingle] Fetch WordPress fallito:', error);
  }

  // Articolo inesistente → 404 nativo di Next.
  if (!news) {
    notFound();
  }

  const view = toView(news);
  const relatedView = related.map(toView);

  return (
    <>
      <Navbar areaRiservataUrl={options?.areaRiservataUrl} />

      <main className="overflow-x-hidden w-full min-h-screen bg-gray-50">
        <nav className="px-4 py-3 mx-auto max-w-5xl text-sm text-gray-600">
          <Link href="/" className="hover:text-primary">Home</Link>
          {' › '}
          <Link href="/news" className="hover:text-primary">News</Link>
          {' › '}
          <span className="text-gray-400">{news.title}</span>
        </nav>

        <News1Hero news={view} />

        <div className="px-4 py-12 mx-auto max-w-5xl sm:px-6 lg:px-8">
          <News1Content news={view} />

          {relatedView.length > 0 && <News1Related relatedNews={relatedView} />}

          <div>
            <Link
              href="/news"
              className="inline-flex gap-2 items-center font-semibold text-primary hover:text-secondary"
            >
              <i className="fas fa-arrow-left"></i>
              Torna a tutte le news
            </Link>
          </div>
        </div>
      </main>

      <BackToTop />
      <Footer options={options} />
    </>
  );
}
