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
  let related0: NewsItem[] = [];
  let options: GlobalOptions | undefined;

  try {
    [news, options] = await Promise.all([
      getNewsBySlug(slug, draft),
      getGlobalOptions(draft),
    ]);
    if (news) {
      related0 = await getRelatedNews(news.id, news.categories[0], 8, draft);
      // Fallback: con poche news per categoria getRelatedNews può tornare vuoto.
      if (related0.length === 0) {
        related0 = await getNews(8, draft);
      }
    }
  } catch (error) {
    console.error('[NewsSingle] Fetch WordPress fallito:', error);
  }

  // Articolo inesistente → 404 nativo di Next.
  if (!news) {
    notFound();
  }

  const view = toView(news);

  // toView normalizza già `image` a stringa URL.
  const newsForHero = view;

  const newsForContent = {
    content: news.content,
    tags: news.tags ?? [],
  };

  const related = related0
    .filter((n) => n.slug !== slug)
    .slice(0, 6)
    .map(toView);

  return (
    <>
      <Navbar areaRiservataUrl={options?.areaRiservataUrl} />

      <main className="container px-4 py-8 mx-auto mt-4">
        <div className="mx-auto max-w-6xl">
          {/* Breadcrumb */}
          <nav className="mb-8 text-sm text-gray-600">
            <ol className="flex flex-wrap items-center space-x-2">
              <li>
                <Link href="/" className="transition hover:text-primary">Home</Link>
              </li>
              <li><i className="text-xs fas fa-chevron-right"></i></li>
              <li>
                <Link href="/news" className="transition hover:text-primary">News</Link>
              </li>
              <li><i className="text-xs fas fa-chevron-right"></i></li>
              <li className="font-medium text-gray-900 line-clamp-1">{news.title}</li>
            </ol>
          </nav>

          <News1Hero news={newsForHero} />
          <News1Content news={newsForContent} />
          {related.length > 0 && <News1Related relatedNews={related} />}
        </div>
      </main>

      <BackToTop />
      <Footer options={options} />
    </>
  );
}
