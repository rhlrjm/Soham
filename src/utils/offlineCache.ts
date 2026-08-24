import { Article } from '../types';

const CACHE_KEY = 'offline_bookmarked_articles';

export const cacheArticle = (article: Article) => {
  const cached = getCachedArticles();
  if (!cached.find((a) => a.id === article.id)) {
    localStorage.setItem(CACHE_KEY, JSON.stringify([...cached, article]));
  }
};

export const removeCachedArticle = (articleId: string) => {
  const cached = getCachedArticles();
  localStorage.setItem(CACHE_KEY, JSON.stringify(cached.filter((a) => a.id !== articleId)));
};

export const getCachedArticles = (): Article[] => {
  const data = localStorage.getItem(CACHE_KEY);
  return data ? JSON.parse(data) : [];
};
