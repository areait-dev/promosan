import React from 'react';

// Classi statiche complete (rilevabili dallo scan Tailwind) per categoria.
const getCategoryClass = (cat) =>
  ({
    normativa: 'bg-green-100 text-green-800',
    servizi: 'bg-blue-100 text-blue-800',
    eventi: 'bg-purple-100 text-purple-800',
    innovazione: 'bg-yellow-100 text-yellow-800',
    welfare: 'bg-pink-100 text-pink-800',
  }[cat] ?? 'bg-gray-100 text-gray-800');

const getCategoryIcon = (cat) =>
  ({
    normativa: 'fa-gavel',
    servizi: 'fa-briefcase-medical',
    eventi: 'fa-calendar-alt',
    innovazione: 'fa-lightbulb',
    welfare: 'fa-handshake',
  }[cat] ?? 'fa-tag');

const News1Hero = ({ news }) => {
  const date = new Date(news.date);
  const day = date.getDate();
  const month = date.toLocaleString('it-IT', { month: 'short' }).toUpperCase();
  const year = date.getFullYear();

  const primaryCategory = news.categories?.[0] ?? '';
  const categoryLabel = primaryCategory
    ? primaryCategory.charAt(0).toUpperCase() + primaryCategory.slice(1)
    : '';

  return (
    <div className="overflow-hidden relative mb-8 w-full h-[480px] rounded-2xl">
      <img
        src={news.image}
        alt={news.title}
        className="object-cover absolute inset-0 w-full h-full"
      />
      {/* Overlay scuro per contrasto del testo */}
      <div className="absolute inset-0 bg-gradient-to-t to-transparent from-black/80 via-black/40" />

      {/* Badge "News" in alto a sinistra */}
      <div className="flex absolute top-6 left-6 gap-3 items-center">
        <span className="px-4 py-1 text-sm font-bold text-white bg-red-600 rounded">
          News
        </span>
      </div>

      {/* Data in alto a destra */}
      <div className="absolute top-6 right-6 text-sm text-white">
        {day} {month} {year}
      </div>

      {/* Testo in basso sull'immagine */}
      <div className="absolute right-0 bottom-0 left-0 p-8 text-white">
        <div className="mx-auto max-w-5xl">
          <h1 className="mb-4 text-3xl font-bold leading-tight md:text-4xl drop-shadow-lg">
            {news.title}
          </h1>
          <p className="mb-6 max-w-3xl text-lg opacity-90">{news.excerpt}</p>

          {/* Metadati autore / lettura / visualizzazioni */}
          <div className="flex flex-wrap gap-4 items-center text-sm">
            <div className="flex gap-2 items-center">
              <div className="flex justify-center items-center w-8 h-8 text-xs font-bold text-white rounded-full bg-primary">
                {news.author?.initials ?? 'RP'}
              </div>
              <div>
                <div className="font-semibold">{news.author?.name}</div>
                <div className="text-xs opacity-75">{news.author?.role}</div>
              </div>
            </div>
            <span className="flex gap-1 items-center">
              <i className="far fa-clock"></i> Lettura: {news.readTime} min
            </span>
            <span className="flex gap-1 items-center">
              <i className="far fa-eye"></i> {news.views?.toLocaleString() ?? 0} visualizzazioni
            </span>
          </div>

          {/* Badge categoria */}
          {primaryCategory && (
            <div className="mt-4">
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold ${getCategoryClass(primaryCategory)}`}
              >
                <i className={`fas ${getCategoryIcon(primaryCategory)} mr-1`}></i>
                {categoryLabel}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default News1Hero;
