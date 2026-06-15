import React from 'react';

const News1Hero = ({ news }) => {
  const date = new Date(news.date);
  const day = date.getDate();
  const month = date.toLocaleString('it-IT', { month: 'short' }).toUpperCase();
  const year = date.getFullYear();

  const categoryMap = {
    normativa: { bg: 'bg-green-100', text: 'text-green-800', icon: 'fa-gavel' },
    servizi: { bg: 'bg-blue-100', text: 'text-blue-800', icon: 'fa-briefcase-medical' },
    eventi: { bg: 'bg-purple-100', text: 'text-purple-800', icon: 'fa-calendar-alt' },
    innovazione: { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: 'fa-lightbulb' },
    welfare: { bg: 'bg-pink-100', text: 'text-pink-800', icon: 'fa-handshake' }
  };
  const primaryCategory = news.categories[0];
  const catStyle = categoryMap[primaryCategory] || categoryMap.innovazione;

  return (
    <div className="overflow-hidden relative h-96 md:h-[500px]">
      <img
        src={news.image}
        alt={news.title}
        className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t to-transparent from-black/60"></div>

      <div className="absolute top-6 left-6 px-4 py-3 text-center bg-white rounded-xl shadow-md">
        <div className="text-2xl font-bold text-primary">{day}</div>
        <div className="text-sm font-semibold text-gray-700">{month}</div>
        <div className="mt-1 text-xs text-gray-500">{year}</div>
      </div>

      <div className={`absolute top-6 right-6 px-4 py-2 text-sm font-bold rounded-full ${catStyle.bg} ${catStyle.text}`}>
        <i className={`mr-2 fas ${catStyle.icon}`}></i> {primaryCategory.charAt(0).toUpperCase() + primaryCategory.slice(1)}
      </div>

      <div className="absolute right-0 bottom-0 left-0 p-8 text-white">
        <div className="mx-auto max-w-5xl">
          <h1 className="mb-4 text-4xl font-bold leading-tight md:text-5xl lg:text-4xl">
            {news.title}
          </h1>
          <p className="mb-6 text-xl opacity-90 lg:text-xl">
            {news.excerpt}
          </p>

          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center">
              <div className="flex justify-center items-center mr-3 w-10 h-10 font-bold text-white rounded-full bg-primary">
                {news.author.initials}
              </div>
              <div>
                <div className="font-semibold">{news.author.name}</div>
                <div className="text-sm opacity-80">{news.author.role}</div>
              </div>
            </div>

            <div className="flex items-center text-sm">
              <i className="mr-2 far fa-clock"></i>
              <span>Lettura: {news.readTime} min</span>
            </div>

            <div className="flex items-center text-sm">
              <i className="mr-2 far fa-eye"></i>
              <span>{news.views?.toLocaleString() || 0} visualizzazioni</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default News1Hero;