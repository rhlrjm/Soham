/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { PageType, Article } from './types';
import { ARTICLES_DATA } from './data/articles';
import { cacheArticle, removeCachedArticle } from './utils/offlineCache';
import { CosmicCanvas } from './components/CosmicCanvas';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ArticleCard } from './components/ArticleCard';
import { ArticleDetail } from './components/ArticleDetail';
import { MeditationTimer } from './components/MeditationTimer';
import { JapaMalaCounter } from './components/JapaMalaCounter';
import { PanchangWidget } from './components/PanchangWidget';
import { StaticPageViewer } from './components/StaticPageViewer';
import { AdSenseBanner } from './components/AdSenseBanner';
import { DailyYogaPose } from './components/DailyYogaPose';
import { SpiritualGallery } from './components/SpiritualGallery';
import { CrisisSupportBanner, FloatingEmergencyButton } from './components/CrisisSupportBanner';
import { Footer } from './components/Footer';
import { LanguageProvider } from './context/LanguageContext';
import {
  Sparkles,
  BookOpen,
  Bookmark,
  Calendar,
  Volume2,
  Quote,
  ChevronRight,
  LifeBuoy
} from 'lucide-react';

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

function AppContent() {
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [meditationDuration, setMeditationDuration] = useState<number>(5);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('soaham_bookmarks');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Toggle bookmark
  const toggleBookmark = (articleId: string) => {
    setBookmarkedIds((prev) => {
      const exists = prev.includes(articleId);
      const updated = exists ? prev.filter((id) => id !== articleId) : [...prev, articleId];
      
      // Update Cache & Storage
      try {
        localStorage.setItem('soaham_bookmarks', JSON.stringify(updated));
        
        const article = ARTICLES_DATA.find((a) => a.id === articleId);
        if (article) {
          if (exists) {
            removeCachedArticle(articleId);
          } else {
            cacheArticle(article);
          }
        }
      } catch {}
      
      return updated;
    });
  };

  // Filtered articles
  const filteredArticles = useMemo(() => {
    return ARTICLES_DATA.filter((article) => {
      const matchesSearch =
        searchQuery.trim() === '' ||
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.englishTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategory =
        selectedCategory === 'all' ||
        selectedCategory === 'bookmarked'
          ? selectedCategory === 'bookmarked'
            ? bookmarkedIds.includes(article.id)
            : true
          : article.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory, bookmarkedIds]);

  const handleSelectArticle = (article: Article) => {
    setSelectedArticle(article);
    setCurrentPage('article-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToArticles = () => {
    setSelectedArticle(null);
    setCurrentPage('articles');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigate = (page: PageType) => {
    setCurrentPage(page);
    if (page !== 'article-detail') {
      setSelectedArticle(null);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const categories = [
    { id: 'all', label: 'सर्व लेख (All)' },
    { id: 'soul', label: 'जीवन संजीवनी व आत्मज्ञान' },
    { id: 'meditation', label: 'ध्यान (Meditation)' },
    { id: 'karma', label: 'कर्म व भाग्य' },
    { id: 'mantra', label: 'मंत्र साधना' },
    { id: 'lifestyle', label: 'सात्त्विक जीवन व ऊर्जा' },
    { id: 'gurus', label: 'संत व गुरू शिकवण' },
    { id: 'panchang', label: 'पंचांग' },
    { id: 'bookmarked', label: `⭐ जतन केलेले (${bookmarkedIds.length})` }
  ];

  const featuredArticle = ARTICLES_DATA.find((a) => a.featured) || ARTICLES_DATA[0];

  return (
    <div className="relative min-h-screen text-slate-100 flex flex-col justify-between selection:bg-purple-900 selection:text-amber-200">
      {/* Background Animated Cosmic Canvas */}
      <CosmicCanvas />

      {/* Header & Navbar */}
      <div className="relative z-10">
        <Navbar
          currentPage={currentPage}
          onNavigate={handleNavigate}
          onSearch={(q) => {
            setSearchQuery(q);
            if (q.trim() !== '' && currentPage !== 'articles') {
              setCurrentPage('articles');
            }
          }}
          searchQuery={searchQuery}
        />

        {/* Main Content Areas with Smooth Page Transitions */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          {/* ================= 1. HOME VIEW ================= */}
          {currentPage === 'home' && (
            <div key="home" className="portal-page-enter space-y-12">
              <HeroSection onNavigate={handleNavigate} />

              {/* Emergency Crisis Lifeline Box */}
              <CrisisSupportBanner variant="banner" />

              {/* AdSense In-Hero Placement */}
              <AdSenseBanner format="horizontal" />

              {/* Daily Wisdom / Quote of the Day banner */}
              <section className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-purple-950/50 via-slate-900/80 to-indigo-950/50 border border-purple-500/20 backdrop-blur-xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center shrink-0 text-amber-400">
                    <Quote className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-wider text-amber-300 font-bold font-sans">
                      आजचा सुविचार — Thought by RAHUL KAMALAKAR RAJAM
                    </span>
                    <p className="font-marathi text-lg sm:text-xl text-white font-medium mt-1 leading-relaxed">
                      "ज्याला स्वतःच्या श्वासाची जाणीव झाली, त्याला जगातील कोणत्याही संकटाचे भय उरत नाही."
                    </p>
                    <span className="text-xs text-slate-400 font-marathi">
                      — सोऽहं साधना सूत्र
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => handleNavigate('meditation')}
                  className="px-5 py-2.5 rounded-full bg-purple-600 hover:bg-purple-500 text-white font-marathi text-xs sm:text-sm font-semibold shrink-0 flex items-center gap-1.5 shadow-md"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>५ मिनिटे ध्यान करा</span>
                </button>
              </section>

              {/* Daily Yoga Pose Section */}
              <DailyYogaPose onNavigateToMeditation={(d) => {
                  setMeditationDuration(d);
                  handleNavigate('meditation');
                }} />

              {/* Featured Main Article Box with Cover Image */}
              <section className="rounded-3xl bg-slate-950/80 border border-amber-500/30 backdrop-blur-xl shadow-2xl relative overflow-hidden group">
                <div className="grid grid-cols-1 lg:grid-cols-12">
                  {featuredArticle.coverImage && (
                    <div 
                      onClick={() => handleSelectArticle(featuredArticle)}
                      className="lg:col-span-5 relative aspect-[16/10] lg:aspect-auto overflow-hidden bg-slate-900 cursor-pointer min-h-[260px]"
                    >
                      <img
                        src={featuredArticle.coverImage}
                        alt={featuredArticle.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-slate-950/90 via-slate-950/30 to-transparent" />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 rounded-full text-xs font-marathi font-bold bg-amber-400 text-slate-950 shadow">
                          विशेष लेख (Featured)
                        </span>
                      </div>
                    </div>
                  )}

                  <div className={`${featuredArticle.coverImage ? 'lg:col-span-7' : 'lg:col-span-12'} p-6 sm:p-10 flex flex-col justify-between`}>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <span className="px-3 py-1 rounded-full text-xs font-marathi font-medium bg-purple-950 text-purple-300 border border-purple-500/30">
                          {featuredArticle.categoryLabel}
                        </span>
                        <span className="text-xs text-slate-400 font-marathi">
                          • {featuredArticle.publishedDate}
                        </span>
                      </div>

                      <h2
                        onClick={() => handleSelectArticle(featuredArticle)}
                        className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-white hover:text-amber-300 font-marathi cursor-pointer leading-tight transition-colors"
                      >
                        {featuredArticle.title}
                      </h2>

                      <p className="text-xs sm:text-sm text-purple-300 italic font-sans">
                        {featuredArticle.englishTitle}
                      </p>

                      <p className="text-slate-300 font-marathi text-sm sm:text-base leading-relaxed">
                        {featuredArticle.excerpt}
                      </p>

                      <div className="flex items-center gap-4 text-xs text-slate-400 font-marathi pt-2">
                        <span>वाचनाचा वेळ: {featuredArticle.readTime}</span>
                        <span>•</span>
                        <span>लेखक: {featuredArticle.author}</span>
                      </div>
                    </div>

                    <div className="pt-6 mt-4 border-t border-white/5 flex items-center justify-between">
                      <button
                        onClick={() => handleSelectArticle(featuredArticle)}
                        className="px-6 py-3 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold font-marathi text-sm flex items-center gap-2 shadow-lg transition-transform hover:scale-105"
                      >
                        <span>संपूर्ण लेख वाचा</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </section>

              {/* Latest Articles Section */}
              <section className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-display font-bold text-white font-marathi">
                      नवीन अध्यात्मिक व जीवन संजीवनी लेख
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-400 font-marathi mt-0.5">
                      मानव-कल्याण, मनःशांती, कर्माचा सिद्धांत आणि संकटातून मुक्ती देणारे लेख
                    </p>
                  </div>

                  <button
                    onClick={() => handleNavigate('articles')}
                    className="text-sm font-marathi font-semibold text-amber-300 hover:text-amber-200 flex items-center gap-1"
                  >
                    <span>सर्व लेख पहा</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {ARTICLES_DATA.slice(0, 6).map((article) => (
                    <ArticleCard
                      key={article.id}
                      article={article}
                      onSelect={handleSelectArticle}
                      isBookmarked={bookmarkedIds.includes(article.id)}
                      onToggleBookmark={toggleBookmark}
                    />
                  ))}
                </div>
              </section>

              {/* Spiritual Tools Interactive Banners */}
              <section className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
                {/* Tool 1: Meditation */}
                <div
                  onClick={() => handleNavigate('meditation')}
                  className="p-6 rounded-3xl bg-slate-950/70 border border-purple-500/30 hover:border-purple-400/60 backdrop-blur-xl cursor-pointer group transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="w-12 h-12 rounded-2xl bg-purple-500/20 flex items-center justify-center text-purple-400 mb-4 group-hover:scale-110 transition-transform">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold font-marathi text-white group-hover:text-amber-300 transition-colors">
                    सोऽहं श्वास ध्यान
                  </h3>
                  <p className="text-xs sm:text-sm font-marathi text-slate-400 mt-2 leading-relaxed">
                    श्वासाच्या नैसर्गिक लयीसोबत मन शांत करा. ३, ५ आणि १० मिनिटांचे विनामूल्य ध्यान कक्ष.
                  </p>
                </div>

                {/* Tool 2: Japa Mala */}
                <div
                  onClick={() => handleNavigate('mantras')}
                  className="p-6 rounded-3xl bg-slate-950/70 border border-amber-500/30 hover:border-amber-400/60 backdrop-blur-xl cursor-pointer group transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/20 flex items-center justify-center text-amber-400 mb-4 group-hover:scale-110 transition-transform">
                    <Volume2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold font-marathi text-white group-hover:text-amber-300 transition-colors">
                    १०८ जपमाळ व मंत्र
                  </h3>
                  <p className="text-xs sm:text-sm font-marathi text-slate-400 mt-2 leading-relaxed">
                    महामृत्युंजय, गायत्री आणि शिव मंत्रांचा पवित्र नाद व डिजिटल मणी मोजणी.
                  </p>
                </div>

                {/* Tool 3: Panchang */}
                <div
                  onClick={() => handleNavigate('panchang')}
                  className="p-6 rounded-3xl bg-slate-950/70 border border-sky-500/30 hover:border-sky-400/60 backdrop-blur-xl cursor-pointer group transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="w-12 h-12 rounded-2xl bg-sky-500/20 flex items-center justify-center text-sky-400 mb-4 group-hover:scale-110 transition-transform">
                    <Calendar className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold font-marathi text-white group-hover:text-amber-300 transition-colors">
                    दैनिक पंचांग व मुहूर्त
                  </h3>
                  <p className="text-xs sm:text-sm font-marathi text-slate-400 mt-2 leading-relaxed">
                    आजची तिथी, नक्षत्र, योग, अभिजीत शुभ मुहूर्त आणि राहुकाळ वेळ तपासा.
                  </p>
                </div>
              </section>
            </div>
          )}

          {/* ================= 2. ALL ARTICLES VIEW ================= */}
          {currentPage === 'articles' && (
            <div key="articles" className="portal-page-enter space-y-8">
              <div className="text-center max-w-2xl mx-auto">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-900/40 text-purple-300 border border-purple-500/30 text-xs font-marathi mb-3">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>अध्यात्मिक ज्ञान व जीवन संजीवनी</span>
                </div>
                <h1 className="text-3xl sm:text-4xl font-display font-bold text-white font-marathi">
                  सर्व लेख आणि विचार संग्रह
                </h1>
                <p className="text-xs sm:text-sm font-marathi text-slate-400 mt-2">
                  ध्यान, नैराश्यमुक्ती, आत्मा, कर्म, संत विचार आणि मनःशांतीवरील मूळ मानवी लेख
                </p>
              </div>

              {/* Category Filter Chips */}
              <div className="flex items-center justify-center flex-wrap gap-2 pt-2">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-marathi transition-all ${
                      selectedCategory === cat.id
                        ? 'bg-purple-600 text-white font-bold shadow-md shadow-purple-600/30'
                        : 'bg-white/5 text-slate-300 hover:bg-white/10 border border-white/10'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Results count / active search state */}
              {searchQuery && (
                <div className="text-center text-xs font-marathi text-amber-300">
                  "{searchQuery}" या शोधासाठी {filteredArticles.length} लेख सापडले
                </div>
              )}

              {/* Articles Grid */}
              {filteredArticles.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredArticles.map((article) => (
                    <ArticleCard
                      key={article.id}
                      article={article}
                      onSelect={handleSelectArticle}
                      isBookmarked={bookmarkedIds.includes(article.id)}
                      onToggleBookmark={toggleBookmark}
                    />
                  ))}
                </div>
              ) : (
                <div className="py-16 text-center rounded-3xl bg-slate-950/40 border border-white/5">
                  <Bookmark className="w-10 h-10 text-slate-600 mx-auto mb-3" />
                  <p className="text-base font-marathi text-slate-300">
                    कोणतेही लेख सापडले नाहीत.
                  </p>
                  <button
                    onClick={() => {
                      setSelectedCategory('all');
                      setSearchQuery('');
                    }}
                    className="mt-3 px-4 py-1.5 rounded-xl bg-white/10 text-xs font-marathi text-amber-300"
                  >
                    सर्व लेख दाखवा
                  </button>
                </div>
              )}

              <AdSenseBanner format="horizontal" />
            </div>
          )}

          {/* ================= 3. ARTICLE DETAIL VIEW ================= */}
          {currentPage === 'article-detail' && selectedArticle && (
            <div key={`article-${selectedArticle.id}`} className="portal-page-enter">
              <ArticleDetail
                article={selectedArticle}
                onBack={handleBackToArticles}
                onSelectRelated={handleSelectArticle}
                allArticles={ARTICLES_DATA}
                isBookmarked={bookmarkedIds.includes(selectedArticle.id)}
                onToggleBookmark={toggleBookmark}
              />
            </div>
          )}

          {/* ================= 4. MEDITATION TIMER VIEW ================= */}
          {currentPage === 'meditation' && (
            <div key="meditation" className="portal-page-enter">
              <MeditationTimer initialDuration={meditationDuration} />
            </div>
          )}

          {/* ================= 5. MANTRAS & JAPA MALA VIEW ================= */}
          {currentPage === 'mantras' && (
            <div key="mantras" className="portal-page-enter">
              <JapaMalaCounter />
            </div>
          )}

          {/* ================= 6. PANCHANG VIEW ================= */}
          {currentPage === 'panchang' && (
            <div key="panchang" className="portal-page-enter">
              <PanchangWidget onNavigate={handleNavigate} />
            </div>
          )}

          {/* ================= 7. STATIC PAGES (About, Contact, Disclaimer, Privacy) ================= */}
          {['about', 'contact', 'disclaimer', 'privacy'].includes(currentPage) && (
            <div key={`static-${currentPage}`} className="portal-page-enter">
              <StaticPageViewer pageType={currentPage as 'about' | 'contact' | 'disclaimer' | 'privacy'} />
            </div>
          )}

          {/* ================= 8. GALLERY VIEW ================= */}
          {currentPage === 'gallery' && (
            <div key="gallery" className="portal-page-enter">
              <SpiritualGallery />
            </div>
          )}
        </main>
      </div>

      {/* Floating 24x7 Emergency Suicide Prevention / Life Support Button */}
      <FloatingEmergencyButton />

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
        onFilterCategory={(cat) => {
          setSelectedCategory(cat);
          handleNavigate('articles');
        }}
      />
    </div>
  );
}
