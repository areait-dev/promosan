// app/news/[slug]/page.tsx
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { draftMode } from 'next/headers';
import Link from 'next/link';
import Navbar from '../../../components/Navbar/Navbar';
import Footer from '../../../components/Footer/Footer';
import NewsPageCard from '../../../components/news-page/NewsPageCard';
import {
  getNewsBySlug,
  getRelatedNews,
  getGlobalOptions,
  type GlobalOptions,
  type NewsItem,
} from '@/lib/wordpress';

export const revalidate = 60;

const CATEGORY_LABELS: Record<string, string> = {
  normativa: 'Normativa',
  servizi: 'Servizi',
  eventi: 'Eventi',
  innovazione: 'Innovazione',
  welfare: 'Welfare',
};

interface PageProps {
  params: Promise<{ slug: string }>;
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
    return { title: 'News | PromoSan' };
  }

  return {
    title: `${news.title} | PromoSan`,
    description: news.excerpt,
    openGraph: {
      title: news.title,
      description: news.excerpt,
      type: 'article',
      images: news.image ? [{ url: news.image.url }] : undefined,
    },
  };
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
      related = await getRelatedNews(news.id, news.categories[0], 3, draft);
    }
  } catch (error) {
    console.error('[NewsSingle] Fetch WordPress fallito:', error);
  }

  // Articolo inesistente → 404 nativo di Next.
  if (!news) {
    notFound();
  }

  const primaryCategory = news.categories[0] ?? 'normativa';
  const categoryLabel = CATEGORY_LABELS[primaryCategory] ?? primaryCategory;
  const formattedDate = new Date(news.date).toLocaleDateString('it-IT', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <>
      <Navbar areaRiservataUrl={options?.areaRiservataUrl} />

      <main style={{ overflowX: 'hidden', width: '100%' }}>
        {/* Hero articolo */}
        <section
          style={{
            position: 'relative',
            minHeight: '420px',
            display: 'flex',
            alignItems: 'flex-end',
            background: '#1a3650',
            overflow: 'hidden',
          }}
        >
          {news.image && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={news.image.url}
              alt={news.image.alt || news.title}
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          )}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(0,0,0,0.75), rgba(0,0,0,0.2))',
            }}
          ></div>

          <div
            style={{
              position: 'relative',
              zIndex: 1,
              maxWidth: '900px',
              margin: '0 auto',
              padding: '3rem 1rem',
              width: '100%',
              color: '#ffffff',
            }}
          >
            <span
              style={{
                display: 'inline-block',
                padding: '0.25rem 0.75rem',
                marginBottom: '1rem',
                fontSize: '0.875rem',
                fontWeight: 600,
                borderRadius: '9999px',
                background: '#4299e1',
                color: '#ffffff',
              }}
            >
              {categoryLabel}
            </span>
            <h1
              style={{
                marginBottom: '1rem',
                fontSize: 'clamp(1.75rem, 5vw, 2.75rem)',
                fontWeight: 700,
                lineHeight: 1.2,
              }}
            >
              {news.title}
            </h1>
            <div
              style={{
                display: 'flex',
                gap: '1.5rem',
                flexWrap: 'wrap',
                fontSize: '0.95rem',
                opacity: 0.9,
              }}
            >
              <span>
                <i className="far fa-calendar" style={{ marginRight: '0.4rem' }}></i>
                {formattedDate}
              </span>
              <span>
                <i className="far fa-clock" style={{ marginRight: '0.4rem' }}></i>
                {news.readTime} min di lettura
              </span>
              {news.author?.name && (
                <span>
                  <i className="far fa-user" style={{ marginRight: '0.4rem' }}></i>
                  {news.author.name}
                </span>
              )}
            </div>
          </div>
        </section>

        {/* Corpo articolo */}
        <article
          style={{
            maxWidth: '800px',
            margin: '0 auto',
            padding: '3rem 1rem',
          }}
        >
          {news.excerpt && (
            <p
              style={{
                fontSize: '1.25rem',
                color: '#374151',
                lineHeight: 1.7,
                marginBottom: '2rem',
                fontWeight: 500,
              }}
            >
              {news.excerpt}
            </p>
          )}
          <div
            className="news-article-content"
            style={{ color: '#374151', lineHeight: 1.8, fontSize: '1.05rem' }}
            dangerouslySetInnerHTML={{ __html: news.content }}
          />

          <div style={{ marginTop: '3rem' }}>
            <Link
              href="/news"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontWeight: 600,
                color: '#2c5282',
                textDecoration: 'none',
              }}
            >
              <i className="fas fa-arrow-left"></i>
              Torna a tutte le news
            </Link>
          </div>
        </article>

        {/* News correlate */}
        {related.length > 0 && (
          <section style={{ background: '#f9fafb', padding: '4rem 1rem' }}>
            <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
              <h2
                style={{
                  marginBottom: '2rem',
                  fontSize: '1.75rem',
                  fontWeight: 700,
                  color: '#2c5282',
                }}
              >
                Altre news
              </h2>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                  gap: '2rem',
                }}
              >
                {related.map((item) => (
                  <NewsPageCard
                    key={item.id}
                    news={{
                      id: item.id,
                      slug: item.slug,
                      title: item.title,
                      excerpt: item.excerpt,
                      image: item.image?.url ?? '',
                      date: item.date,
                      readTime: item.readTime,
                      categories: item.categories,
                    }}
                  />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer options={options} />
    </>
  );
}
