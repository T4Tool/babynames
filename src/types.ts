export type GenderType = 'Boy' | 'Girl' | 'Unisex';

export type ReligionType = 
  | 'Hindu' 
  | 'Muslim' 
  | 'Islam'
  | 'Christian' 
  | 'Catholic'
  | 'Sikh' 
  | 'Jain' 
  | 'Buddhist' 
  | 'Jewish' 
  | 'Parsi' 
  | 'None'
  | 'Others';

export type StyleType = 
  | 'Modern' 
  | 'Classic' 
  | 'Royal' 
  | 'Luxury' 
  | 'Cute' 
  | 'Elegant' 
  | 'Powerful' 
  | 'Rare' 
  | 'Unique' 
  | 'Short' 
  | 'Long' 
  | 'Minimal' 
  | 'Traditional' 
  | 'Vintage' 
  | 'Nature' 
  | 'Trendy'
  | 'Mythology';

export type HistoryEra = 
  | 'Ancient' 
  | 'Medieval' 
  | 'Greek' 
  | 'Roman' 
  | 'Egyptian' 
  | 'Persian' 
  | 'Viking' 
  | 'Samurai' 
  | 'Mythology' 
  | 'Historical Figures' 
  | 'Kings' 
  | 'Queens' 
  | 'Warriors' 
  | 'Scientists' 
  | 'Artists';

export type SortOption = 
  | 'popularity-desc' 
  | 'name-asc' 
  | 'name-desc' 
  | 'newest' 
  | 'shortest' 
  | 'longest' 
  | 'trending' 
  | 'random';

export interface NameItem {
  id: string;
  name: string;
  meaning: string;
  gender: GenderType;
  country: string;
  origin: string;
  religion: ReligionType;
  pronunciation: string;
  history?: string;
  style: StyleType;
  category: string;
  language: string;
  meaningTags: string[];
  popularity: number; // 1 - 100
  letter: string; // A-Z
  length: number;
  nicknames: string[];
  siblingNames: string[];
  luckyNumber: number;
  luckyColor: string;
  luckyStone: string;
  luckyDay: string;
  seoSlug: string;
  views: number;
  favorites: number;
  copiesCount?: number;
  createdDate: string;
  updatedDate: string;
  popularityHistory?: { year: string; rank: number }[];
}

export interface FilterState {
  query: string;
  gender: 'All' | GenderType;
  country: string;
  religion: string;
  style: string;
  historyEra: string;
  letter: string;
  meaningTag: string;
  lengthRange: [number, number]; // [min, max] e.g. [2, 10]
  popularityFilter: 'All' | 'Trending' | 'Most Loved' | 'Recently Added' | 'Most Copied' | 'Editor\'s Pick';
  category: string;
  sortBy?: SortOption;
  page?: number;
  sortOrder?: 'popular' | 'az' | 'za' | 'newest';
}

export interface CategoryItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
  slug: string;
  count: number;
  featured?: boolean;
}

export interface BlogArticle {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
}

export interface AdminStats {
  totalNames: number;
  totalViews: number;
  totalCopies: number;
  totalFavorites: number;
  topSearches: { query: string; count: number }[];
  recentActivity: { timestamp: string; action: string; name: string }[];
}

export interface AIRecommendation {
  name: string;
  meaning: string;
  origin: string;
  gender: GenderType;
  reasoning: string;
  luckyAttributes?: {
    number: number;
    color: string;
    stone: string;
  };
  styleMatch: string;
}
