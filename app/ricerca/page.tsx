// app/ricerca/page.tsx
import type { Metadata } from 'next';
import { draftMode } from 'next/headers';
import RicercaClient from './RicercaClient';
import {
  getNews,
  getGlobalOptions,
  type GlobalOptions,
  type NewsItem,
} from '@/lib/wordpress';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Ricerca | PromoSan',
  description: 'Cerca tra news, normative e aggiornamenti di PromoSan.',
};

export default async function RicercaPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = (q ?? '').trim();

  const { isEnabled: draft } = await draftMode();

  let news: NewsItem[] | undefined;
  let options: GlobalOptions | undefined;

  try {
    [news, options] = await Promise.all([getNews(100, draft), getGlobalOptions(draft)]);
  } catch (error) {
    console.error('[Ricerca] Fetch WordPress fallito:', error);
  }

  return <RicercaClient initialQuery={query} news={news} options={options} />;
}
