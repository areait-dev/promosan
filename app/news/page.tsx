// app/news/page.tsx
import type { Metadata } from 'next';
import { draftMode } from 'next/headers';
import NewsClient from './NewsClient';
import {
  getNews,
  getGlobalOptions,
  type GlobalOptions,
  type NewsItem,
} from '@/lib/wordpress';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'News & Aggiornamenti | PromoSan',
  description:
    'Rimani informato sulle ultime normative e innovazioni nel settore della medicina del lavoro.',
};

export default async function NewsPage() {
  const { isEnabled: draft } = await draftMode();

  let news: NewsItem[] | undefined;
  let options: GlobalOptions | undefined;

  try {
    [news, options] = await Promise.all([getNews(12, draft), getGlobalOptions(draft)]);
  } catch (error) {
    console.error('[News] Fetch WordPress fallito, uso i default:', error);
  }

  return <NewsClient initialNews={news} options={options} />;
}
