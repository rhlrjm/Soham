export type PageType = 
  | 'home'
  | 'articles'
  | 'article-detail'
  | 'meditation'
  | 'mantras'
  | 'panchang'
  | 'about'
  | 'contact'
  | 'disclaimer'
  | 'privacy'
  | 'blogger-theme';

export interface Article {
  id: string;
  slug: string;
  title: string;
  englishTitle: string;
  category: 'meditation' | 'spirituality' | 'soul' | 'karma' | 'gurus' | 'panchang' | 'mantra' | 'lifestyle' | 'kundalini' | 'pranayama' | 'yoga';
  categoryLabel: string;
  publishedDate: string;
  readTime: string;
  author: string;
  excerpt: string;
  coverImage?: string;
  featured?: boolean;
  sections: {
    heading?: string;
    content: string[];
    quote?: string;
  }[];
  keyTakeaways: string[];
  reflectionPrompt: string;
  tags: string[];
}

export interface MantraItem {
  id: string;
  name: string;
  sanskrit: string;
  transliteration: string;
  meaning: string;
  significance: string;
  recommendedRepetitions: number;
  benefits: string[];
  frequencyHz: number;
}

export interface SpiritualReminder {
  headline: string;
  tithiSignificance: string;
  dailySadhana: string;
  recommendedMantra: {
    name: string;
    sanskrit: string;
    meaning: string;
    repetitions: string;
  };
  sattvicActions: string[];
  thingsToAvoid: string[];
  soahamBreathFocus: string;
  elementEnergy: string;
  sattvicRating: 'अत्युच्च (Very High)' | 'उत्कृष्ट (High)' | 'मध्यम (Moderate)';
}

export interface PanchangInfo {
  dateStr: string;
  marathiDate: string;
  tithi: string;
  paksha: string;
  nakshatra: string;
  yoga: string;
  karan: string;
  sunrise: string;
  sunset: string;
  shubhMuhurat: string;
  rahukaal: string;
  festivals: string[];
  spiritualTip: string;
  spiritualReminder: SpiritualReminder;
}

export interface UserReflection {
  id: string;
  articleId: string;
  authorName: string;
  city: string;
  content: string;
  createdAt: string;
  likes: number;
}

export interface YogaPose {
  id: string;
  sanskritName: string;
  englishName: string;
  meaning: string;
  dayOfWeek: number; // 0 for Sunday, 1 for Monday, etc.
  dayNameMarathi: string;
  difficulty: 'नवशिक्या (Beginner)' | 'मध्यम (Intermediate)' | 'प्रगत (Advanced)';
  targetChakra: string;
  idealDuration: string;
  bestTime: string;
  imageUrl: string;
  summary: string;
  healthBenefits: string[];
  steps: string[];
  breathGuide: string;
  precautions: string[];
}
