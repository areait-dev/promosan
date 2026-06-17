'use client';

import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const News1Related = ({ relatedNews }) => {
  const swiperRef = useRef(null);

  return (
    <section className="mb-16">
      <h2 className="mb-8 text-3xl font-bold text-gray-900 lg:text-4xl">Altre news</h2>

      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        pagination={{ 
          clickable: true,
          el: '.custom-pagination',
          type: 'bullets',
          bulletClass: 'swiper-pagination-bullet',
          bulletActiveClass: 'swiper-pagination-bullet-active',
        }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={true}
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper;
        }}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 4 }
        }}
        className="news-swiper"
      >
        {relatedNews.map((news) => {
          const date = new Date(news.date);
          const day = date.getDate();
          const month = date.toLocaleString('it-IT', { month: 'short' }).toUpperCase();
          const category = news.categories[0];
          const categoryColors = {
            normativa: 'bg-blue-100 text-blue-800',
            servizi: 'bg-cyan-100 text-cyan-800',
            eventi: 'bg-purple-100 text-purple-800',
            innovazione: 'bg-yellow-100 text-yellow-800',
            welfare: 'bg-pink-100 text-pink-800'
          };
          const catClass = categoryColors[category] || 'bg-gray-100 text-gray-800';

          return (
            <SwiperSlide key={news.id}>
              <div className="overflow-hidden h-full bg-white rounded-xl border border-gray-100 shadow-md transition-shadow hover:shadow-lg">
                <div className="overflow-hidden relative h-48">
                  <img
                    src={news.image}
                    alt={news.title}
                    className="object-cover w-full h-full transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 px-3 py-2 text-center bg-white rounded-lg shadow-sm">
                    <div className="text-lg font-bold text-primary">{day}</div>
                    <div className="text-xs text-gray-600">{month}</div>
                  </div>
                  <div className={`absolute top-4 right-4 px-3 py-1 text-xs font-semibold rounded-full ${catClass}`}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="mb-3 text-lg font-bold text-gray-800 transition-colors line-clamp-2 hover:text-primary">
                    {news.title}
                  </h3>
                  <p className="mb-4 text-sm text-gray-600 line-clamp-3">
                    {news.excerpt}
                  </p>
                  <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                    <span className="flex gap-1 items-center text-sm text-gray-500">
                      <i className="far fa-clock"></i> {news.readTime} min
                    </span>
                    <a
                      href={`/news/${news.id}`}
                      className="flex gap-1 items-center text-sm font-semibold text-primary hover:text-secondary"
                    >
                      Leggi <i className="text-xs fas fa-arrow-right"></i>
                    </a>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>

      {/* Controlli centrati con frecce e paginazione */}
{/* Controlli centrati con frecce e paginazione */}
<div className="flex justify-between items-center mx-auto mt-8 w-full max-w-md">
  <button
    onClick={() => swiperRef.current?.slidePrev()}
    className="flex justify-center items-center w-12 h-12 text-white rounded-full shadow-lg transition bg-primary hover:bg-secondary hover:scale-110"
  >
    <i className="fas fa-chevron-left"></i>
  </button>
  
  {/* Contenitore per i pallini - centrato */}
  <div className="flex gap-2 custom-pagination"></div>
  
  <button
    onClick={() => swiperRef.current?.slideNext()}
    className="flex justify-center items-center w-12 h-12 text-white rounded-full shadow-lg transition bg-primary hover:bg-secondary hover:scale-110"
  >
    <i className="fas fa-chevron-right"></i>
  </button>
</div>
    </section>
  );
};

export default News1Related;