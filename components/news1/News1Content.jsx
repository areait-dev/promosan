'use client';

import React, { useState } from 'react';

const News1Content = ({ news }) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(124);

  const handleLike = () => {
    if (liked) {
      setLikeCount(prev => prev - 1);
    } else {
      setLikeCount(prev => prev + 1);
    }
    setLiked(!liked);
  };

  return (
    <article className="overflow-hidden mb-12 bg-white rounded-2xl shadow-lg transition-shadow duration-300 hover:shadow-xl">
      <div className="p-8 md:p-12 lg:p-16">
        <div className="max-w-none prose prose-lg lg:prose-xl">
          {/* Barra interazioni social */}
          <div className="flex flex-col justify-between items-center pb-6 mb-8 border-b border-gray-200 md:flex-row">
            <div className="flex items-center mb-4 space-x-4 md:mb-0">
              <button
                onClick={handleLike}
                className={`flex items-center px-4 py-2 space-x-2 rounded-lg transition-colors hover:text-primary hover:bg-blue-50 ${
                  liked ? 'text-primary' : 'text-gray-700'
                }`}
              >
                <i className={`text-xl ${liked ? 'fas' : 'far'} fa-thumbs-up`}></i>
                <span className="font-medium">{likeCount}</span>
              </button>
              <button className="flex items-center px-4 py-2 space-x-2 text-gray-700 rounded-lg transition-colors hover:text-primary hover:bg-blue-50">
                <i className="text-xl far fa-comment"></i>
                <span className="font-medium">18</span>
              </button>
              <button className="flex items-center px-4 py-2 space-x-2 text-gray-700 rounded-lg transition-colors hover:text-primary hover:bg-blue-50">
                <i className="text-xl far fa-share-square"></i>
                <span className="font-medium">Condividi</span>
              </button>
            </div>

            <div className="flex items-center space-x-3">
              <span className="text-sm text-gray-600">Condividi:</span>
              {['linkedin-in', 'twitter', 'facebook-f'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="flex justify-center items-center w-10 h-10 bg-blue-100 rounded-full transition-colors text-primary hover:bg-primary hover:text-white"
                >
                  <i className={`fab fa-${social}`}></i>
                </a>
              ))}
            </div>
          </div>

          {/* Contenuto HTML */}
          <div
            className="news-content"
            dangerouslySetInnerHTML={{ __html: news.content }}
          />

          {/* Tags */}
          {news.tags && (
            <div className="pt-8 mt-16 border-t border-gray-200">
              <div className="flex flex-wrap gap-3">
                {news.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-5 py-2 text-base font-medium bg-blue-100 rounded-full text-primary"
                  >
                    <i className="mr-2 fas fa-tag"></i> {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </article>
  );
};

export default News1Content;