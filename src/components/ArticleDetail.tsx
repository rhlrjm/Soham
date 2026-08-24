import React, { useState, useEffect } from 'react';
import { Article, UserReflection } from '../types';
import {
  ArrowLeft,
  Clock,
  User,
  Calendar,
  Share2,
  Bookmark,
  Volume2,
  VolumeX,
  Type,
  Sparkles,
  Send,
  Heart,
  MessageCircle,
  Square,
  ShieldCheck
} from 'lucide-react';
import { AdSenseBanner } from './AdSenseBanner';
import { CrisisSupportBanner } from './CrisisSupportBanner';

interface ArticleDetailProps {
  article: Article;
  onBack: () => void;
  onSelectRelated: (article: Article) => void;
  allArticles: Article[];
  isBookmarked: boolean;
  onToggleBookmark: (articleId: string) => void;
}

export const ArticleDetail: React.FC<ArticleDetailProps> = ({
  article,
  onBack,
  onSelectRelated,
  allArticles,
  isBookmarked,
  onToggleBookmark
}) => {
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  const handleSpeak = (lang: 'mr-IN' | 'en-US') => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const textToRead = `${article.title}. ${article.excerpt}. ${article.sections.map(s => `${s.heading}. ${s.content.join('. ')}`).join('. ')}`;
    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.lang = lang;
    utterance.onend = () => setIsSpeaking(false);
    
    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('large');
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [reflections, setReflections] = useState<UserReflection[]>([]);
  const [authorName, setAuthorName] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [content, setContent] = useState<string>('');

  // Load saved reflections
  useEffect(() => {
    const key = `soaham_reflections_${article.id}`;
    const saved = localStorage.getItem(key);
    if (saved) {
      try {
        setReflections(JSON.parse(saved));
      } catch {}
    } else {
      // Default initial soulful reflections
      setReflections([
        {
          id: '1',
          articleId: article.id,
          authorName: 'राजेश कुलकर्णी',
          city: 'पुणे',
          content: 'हा लेख वाचून मनातील सर्व भीती व ताण दूर झाला. राहुलजींच्या विचारांनी मला खूप मोठा आधार दिला.',
          createdAt: '२ दिवसांपूर्वी',
          likes: 7
        },
        {
          id: '2',
          articleId: article.id,
          authorName: 'अनिता सावंत',
          city: 'पनवेल',
          content: 'खूप सुंदर आणि थेट मनाला भिडणारी मांडणी. संकट काळात अशा आध्यात्मिक मार्गदर्शनाची खरी गरज आहे.',
          createdAt: '४ दिवसांपूर्वी',
          likes: 9
        }
      ]);
    }
  }, [article.id]);

  // Handle reflection post
  const handlePostReflection = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() || !authorName.trim()) return;

    const newReflection: UserReflection = {
      id: Date.now().toString(),
      articleId: article.id,
      authorName: authorName.trim(),
      city: city.trim() || 'महाराष्ट्र',
      content: content.trim(),
      createdAt: 'आत्ताच',
      likes: 1
    };

    const updated = [newReflection, ...reflections];
    setReflections(updated);
    localStorage.setItem(`soaham_reflections_${article.id}`, JSON.stringify(updated));
    setContent('');
  };

  // Like reflection
  const handleLike = (id: string) => {
    const updated = reflections.map((r) => (r.id === id ? { ...r, likes: r.likes + 1 } : r));
    setReflections(updated);
    localStorage.setItem(`soaham_reflections_${article.id}`, JSON.stringify(updated));
  };

  // Text to Speech
  const toggleTTS = () => {
    if ('speechSynthesis' in window) {
      if (isPlayingAudio) {
        window.speechSynthesis.cancel();
        setIsPlayingAudio(false);
      } else {
        const textToRead = `${article.title}. ${article.sections.map((s) => `${s.heading || ''}. ${s.content.join('. ')}`).join('. ')}`;
        const utterance = new SpeechSynthesisUtterance(textToRead);
        utterance.lang = 'mr-IN';
        utterance.rate = 0.9;
        utterance.onend = () => setIsPlayingAudio(false);
        utterance.onerror = () => setIsPlayingAudio(false);
        window.speechSynthesis.speak(utterance);
        setIsPlayingAudio(true);
      }
    } else {
      alert('तुमच्या ब्राउझरमध्ये ऑडिओ वाचन सुविधा उपलब्ध नाही.');
    }
  };

  // Font size class
  const fontClass =
    fontSize === 'normal'
      ? 'text-base leading-relaxed'
      : fontSize === 'large'
      ? 'text-lg sm:text-xl leading-loose'
      : 'text-xl sm:text-2xl leading-loose';

  const relatedArticles = allArticles.filter((a) => a.id !== article.id).slice(0, 2);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Top Action Bar */}
      <div className="flex items-center justify-between gap-4 mb-6 pb-4 border-b border-white/10">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-sm font-marathi transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>मागे जा (Back to Articles)</span>
        </button>

        <div className="flex items-center gap-2">
          {/* Font Size Adjuster */}
          <div className="flex items-center bg-slate-900 border border-white/10 rounded-lg p-1 text-xs">
            <Type className="w-3.5 h-3.5 text-slate-400 ml-1.5 mr-1" />
            <button
              onClick={() => setFontSize('normal')}
              className={`px-2 py-0.5 rounded ${fontSize === 'normal' ? 'bg-purple-600 text-white' : 'text-slate-400'}`}
            >
              A
            </button>
            <button
              onClick={() => setFontSize('large')}
              className={`px-2 py-0.5 rounded font-bold ${fontSize === 'large' ? 'bg-purple-600 text-white' : 'text-slate-400'}`}
            >
              A+
            </button>
            <button
              onClick={() => setFontSize('xlarge')}
              className={`px-2 py-0.5 rounded font-black ${fontSize === 'xlarge' ? 'bg-purple-600 text-white' : 'text-slate-400'}`}
            >
              A++
            </button>
          </div>

          {/* Voice Reader Toggle */}
          <button
            onClick={toggleTTS}
            className={`p-2.5 rounded-xl border transition-all ${
              isPlayingAudio
                ? 'bg-amber-400 text-slate-950 border-amber-300 animate-pulse'
                : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10'
            }`}
            title="मराठी ऑडिओ वाचन (Listen Article)"
          >
            {isPlayingAudio ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          {/* Bookmark */}
          <button
            onClick={() => onToggleBookmark(article.id)}
            className={`p-2.5 rounded-xl border transition-all ${
              isBookmarked
                ? 'bg-amber-400/20 text-amber-300 border-amber-500/40'
                : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10'
            }`}
            title={isBookmarked ? 'जतन केले आहे' : 'जतन करा'}
          >
            <Bookmark className="w-4 h-4 fill-current" />
          </button>

          {/* Audio Version */}
          <button
            onClick={() => handleSpeak('mr-IN')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border transition-all font-marathi text-sm shadow-md ${
              isSpeaking ? 'bg-rose-600 border-rose-500 text-white' : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
            }`}
            title="मराठीत ऐका"
          >
            {isSpeaking ? <Square className="w-4 h-4 fill-current" /> : <Volume2 className="w-4 h-4" />}
            <span>मराठी ऑडिओ</span>
          </button>

          {/* Share */}
          <button
            onClick={async () => {
              const shareData = {
                title: article.title,
                text: `${article.title} - ${article.excerpt}`,
                url: window.location.href,
              };
              try {
                if (navigator.share) {
                  await navigator.share(shareData);
                } else {
                  await navigator.clipboard.writeText(window.location.href);
                  alert('लेखाची लिंक कॉपी झाली आहे!');
                }
              } catch (err) {
                console.error('Error sharing:', err);
              }
            }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white border border-purple-500 transition-all font-marathi text-sm shadow-md"
            title="शेअर करा"
          >
            <Share2 className="w-4 h-4" />
            <span>शेअर करा</span>
          </button>
        </div>
      </div>

      {/* Main Article Container */}
      <article className="rounded-3xl bg-slate-950/70 border border-purple-500/20 backdrop-blur-xl p-6 sm:p-10 shadow-2xl">
        {/* Category & Tags */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="px-3.5 py-1 rounded-full text-xs font-marathi font-semibold bg-purple-900/60 text-amber-300 border border-purple-500/30">
            {article.categoryLabel}
          </span>
          <span className="text-xs text-slate-400 font-marathi flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            {article.publishedDate}
          </span>
          <span className="text-xs text-slate-400 font-marathi flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {article.readTime}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white font-marathi leading-tight mb-3">
          {article.title}
        </h1>

        {/* English Subtitle */}
        <h2 className="text-sm sm:text-base text-purple-300 font-sans italic mb-6">
          {article.englishTitle}
        </h2>

        {/* Author Byline */}
        <div className="flex items-center gap-3 py-3 border-y border-white/10 mb-8">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-400 to-purple-600 flex items-center justify-center font-bold text-slate-950 font-display">
            RR
          </div>
          <div>
            <div className="text-sm font-bold font-marathi text-slate-200">
              विचार: {article.author}
            </div>
            <div className="text-xs text-amber-300/80 font-marathi">
              व्यासपीठ: समृद्धीराजम (पनवेल, महाराष्ट्र)
            </div>
          </div>
        </div>

        {/* Featured Cover Image */}
        {article.coverImage && (
          <div className="mb-8 rounded-2xl overflow-hidden border border-white/10 shadow-2xl relative">
            <div className="aspect-[16/9] w-full bg-slate-900 overflow-hidden">
              <img
                src={article.coverImage}
                alt={article.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="px-4 py-2 bg-slate-900/90 border-t border-white/5 flex items-center justify-between text-xs text-slate-400 font-marathi">
              <span>{article.title} — समृद्धीराजम</span>
              <span>विचार: RAHUL KAMALAKAR RAJAM</span>
            </div>
          </div>
        )}

        {/* Lead Excerpt */}
        <div className="p-4 sm:p-5 rounded-2xl bg-amber-500/10 border-l-4 border-amber-400 text-amber-200 font-marathi text-base sm:text-lg mb-8 leading-relaxed">
          {article.excerpt}
        </div>

        {/* Article Sections */}
        <div className={`space-y-8 font-marathi text-slate-200 ${fontClass}`}>
          {article.sections.map((sec, idx) => (
            <div key={idx} className="space-y-4">
              {sec.heading && (
                <h3 className="text-xl sm:text-2xl font-bold text-amber-300 pt-3 border-t border-white/5">
                  {sec.heading}
                </h3>
              )}

              {sec.content.map((p, pIdx) => (
                <p key={pIdx} className="text-slate-200/95 font-light">
                  {p}
                </p>
              ))}

              {sec.quote && (
                <blockquote className="my-6 p-4 sm:p-5 rounded-xl bg-purple-950/40 border-l-4 border-purple-500 text-purple-200 italic font-marathi text-base sm:text-lg">
                  “{sec.quote}”
                </blockquote>
              )}
            </div>
          ))}
        </div>

        {/* Embedded Crisis Helpline Support in Article */}
        <div className="my-8">
          <CrisisSupportBanner variant="compact" />
        </div>

        {/* Google AdSense In-Article Ad Placement */}
        <AdSenseBanner format="in-feed" className="my-10" />

        {/* Key Takeaways Box */}
        <div className="my-10 p-6 rounded-2xl bg-gradient-to-br from-purple-950/40 to-slate-900 border border-purple-500/30">
          <h4 className="text-base font-bold font-marathi text-amber-300 flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-amber-400" />
            महत्त्वाचे सार (Key Takeaways):
          </h4>
          <ul className="space-y-2 text-sm sm:text-base font-marathi text-slate-200">
            {article.keyTakeaways.map((item, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <span className="text-amber-400 mt-1">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Seeker Reflection Box */}
        <div className="p-6 rounded-2xl bg-slate-900/90 border border-white/10 text-center my-8">
          <h4 className="text-sm font-semibold uppercase tracking-wider text-purple-300 mb-2">
            आत्मचिंतन (Daily Reflection)
          </h4>
          <p className="text-base sm:text-lg font-marathi text-slate-100 font-medium italic">
            "{article.reflectionPrompt}"
          </p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap items-center gap-2 pt-6 border-t border-white/10">
          <span className="text-xs text-slate-400 font-marathi">विषय टॅग:</span>
          {article.tags.map((tag, tIdx) => (
            <span
              key={tIdx}
              className="px-2.5 py-1 rounded-md text-xs font-marathi bg-white/5 text-slate-300 border border-white/5"
            >
              #{tag}
            </span>
          ))}
        </div>
      </article>

      {/* Community Reflections & Comments */}
      <section className="mt-12 rounded-3xl bg-slate-950/70 border border-white/10 backdrop-blur-xl p-6 sm:p-8">
        <div className="flex items-center gap-2 text-xl font-display font-bold text-white font-marathi mb-6">
          <MessageCircle className="w-5 h-5 text-amber-400" />
          <span>साधक प्रतिक्रिया व विचार मंथन ({reflections.length})</span>
        </div>

        {/* Post Form */}
        <form onSubmit={handlePostReflection} className="mb-8 p-4 rounded-2xl bg-slate-900/80 border border-white/10 space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="तुमचे नाव (Your Name) *"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              required
              className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-white/10 text-sm text-white placeholder-slate-500 font-marathi focus:outline-none focus:border-purple-500"
            />
            <input
              type="text"
              placeholder="गाव / शहर (City/Location)"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-white/10 text-sm text-white placeholder-slate-500 font-marathi focus:outline-none focus:border-purple-500"
            />
          </div>

          <textarea
            placeholder="हा लेख वाचून तुमचे काय विचार आहेत? इथे लिहा..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            rows={3}
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-sm text-white placeholder-slate-500 font-marathi focus:outline-none focus:border-purple-500 resize-none"
          />

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-marathi text-sm font-medium flex items-center gap-1.5 transition-all shadow-md"
            >
              <Send className="w-3.5 h-3.5" />
              <span>विचार पाठवा</span>
            </button>
          </div>
        </form>

        {/* Reflections List */}
        <div className="space-y-3">
          {reflections.map((item) => (
            <div key={item.id} className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold text-sm font-marathi text-amber-300">
                    {item.authorName}
                  </span>
                  <span className="text-xs text-slate-400 font-marathi">
                    ({item.city})
                  </span>
                  <span className="text-[11px] text-slate-400">
                    • {item.createdAt}
                  </span>
                </div>
                <p className="text-sm text-slate-300 font-marathi leading-relaxed">
                  {item.content}
                </p>
              </div>

              <button
                onClick={() => handleLike(item.id)}
                className="flex items-center gap-1 text-xs text-slate-400 hover:text-rose-400 transition-colors p-1"
                title="लाइक करा"
              >
                <Heart className="w-3.5 h-3.5 fill-rose-500/20 text-rose-400" />
                <span className="font-sans">{item.likes}</span>
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section className="mt-12">
          <h3 className="text-xl font-display font-bold text-white font-marathi mb-6">
            हे देखील नक्की वाचा (Related Reads)
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {relatedArticles.map((rel) => (
              <div
                key={rel.id}
                onClick={() => onSelectRelated(rel)}
                className="p-5 rounded-2xl bg-slate-950/60 border border-white/10 hover:border-purple-500/50 cursor-pointer transition-all hover:-translate-y-1"
              >
                <span className="text-xs text-purple-300 font-marathi block mb-1">
                  {rel.categoryLabel}
                </span>
                <h4 className="text-base font-bold text-slate-100 hover:text-amber-300 font-marathi line-clamp-2">
                  {rel.title}
                </h4>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
