import React, { useState } from 'react';
import { Article } from '../types';
import { Clock, User, ArrowRight, Bookmark, Sparkles } from 'lucide-react';

interface ArticleCardProps {
  article: Article;
  onSelect: (article: Article) => void;
  isBookmarked?: boolean;
  onToggleBookmark?: (articleId: string) => void;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
  article,
  onSelect,
  isBookmarked = false,
  onToggleBookmark
}) => {
  const [imageError, setImageError] = useState(false);

  return (
    <article className="group relative rounded-2xl bg-slate-950/70 border border-white/10 hover:border-purple-500/50 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(139,92,246,0.18)] flex flex-col justify-between overflow-hidden">
      <div>
        {/* Cover Image Section */}
        {article.coverImage && !imageError ? (
          <div 
            onClick={() => onSelect(article)}
            className="relative w-full aspect-[16/9] overflow-hidden bg-slate-900 cursor-pointer"
          >
            <img
              src={article.coverImage}
              alt={article.title}
              referrerPolicy="no-referrer"
              loading="lazy"
              onError={() => setImageError(true)}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
            
            {/* Category Tag on Image */}
            <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between pointer-events-none">
              <span className="px-3 py-1 rounded-full text-xs font-marathi font-medium bg-purple-950/90 text-amber-300 border border-purple-500/40 backdrop-blur-md shadow-sm">
                {article.categoryLabel}
              </span>
              {article.featured && (
                <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-marathi bg-amber-500/90 text-slate-950 font-bold shadow">
                  <Sparkles className="w-3 h-3" />
                  विशेष
                </span>
              )}
            </div>
          </div>
        ) : (
          <div className="h-4 bg-transparent" />
        )}

        <div className="p-6 pt-4">
          {/* If no image was rendered, show category and bookmark in normal layout */}
          {(!article.coverImage || imageError) && (
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="px-3 py-1 rounded-full text-xs font-marathi font-medium bg-purple-950/80 text-purple-300 border border-purple-500/30">
                {article.categoryLabel}
              </span>
              {onToggleBookmark && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleBookmark(article.id);
                  }}
                  className={`p-1.5 rounded-lg transition-colors ${
                    isBookmarked
                      ? 'text-amber-400 bg-amber-400/10'
                      : 'text-slate-500 hover:text-slate-300'
                  }`}
                  title={isBookmarked ? 'जतन केले आहे' : 'जतन करा'}
                >
                  <Bookmark className="w-4 h-4 fill-current" />
                </button>
              )}
            </div>
          )}

          {/* Bookmark on card with image */}
          {article.coverImage && !imageError && onToggleBookmark && (
            <div className="flex justify-end -mt-2 mb-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleBookmark(article.id);
                }}
                className={`p-1.5 rounded-lg transition-colors ${
                  isBookmarked
                    ? 'text-amber-400 bg-amber-400/10'
                    : 'text-slate-500 hover:text-slate-300'
                }`}
                title={isBookmarked ? 'जतन केले आहे' : 'जतन करा'}
              >
                <Bookmark className="w-4 h-4 fill-current" />
              </button>
            </div>
          )}

          {/* Title */}
          <h3
            onClick={() => onSelect(article)}
            className="text-xl sm:text-2xl font-display font-bold text-slate-100 group-hover:text-amber-300 transition-colors cursor-pointer leading-snug mb-2 font-marathi"
          >
            {article.title}
          </h3>

          {/* English Subtitle */}
          <p className="text-xs text-slate-400 font-sans italic line-clamp-1 mb-3">
            {article.englishTitle}
          </p>

          {/* Excerpt */}
          <p className="text-sm text-slate-300 font-marathi leading-relaxed line-clamp-3 mb-4">
            {article.excerpt}
          </p>
        </div>
      </div>

      {/* Footer Info */}
      <div className="px-6 pb-5 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-slate-400">
        <div className="flex items-center gap-3 font-marathi">
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            {article.readTime}
          </span>
          <span className="flex items-center gap-1">
            <User className="w-3.5 h-3.5 text-purple-400" />
            {article.author}
          </span>
        </div>

        <button
          onClick={() => onSelect(article)}
          className="text-amber-300 font-marathi font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform"
        >
          <span>वाचा</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </article>
  );
};
