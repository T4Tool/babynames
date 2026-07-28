import React from 'react';
import { CATEGORIES_DATA } from '../data/categoriesData';
import {
  Crown, Sparkles, Gem, Sun, Award, Heart, Flame, Hourglass, Flower2,
  Compass, Feather, BookOpen, Moon, Zap, ArrowRight
} from 'lucide-react';
import { CategoryItem } from '../types';

interface CategoriesSectionProps {
  onSelectCategory: (categoryTitle: string) => void;
}

const ICON_MAP: Record<string, React.ElementType> = {
  Crown, Sparkles, Gem, Sun, Award, Heart, Flame, Hourglass,
  Flower2, Compass, Feather, BookOpen, Moon, Zap
};

export const CategoriesSection: React.FC<CategoriesSectionProps> = ({ onSelectCategory }) => {
  return (
    <section id="categories-section" className="py-16 border-b border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-semibold mb-3 border border-indigo-500/25 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>Curated Name Collections</span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
            Browse By Category
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-2.5 font-body">
            Explore 14 carefully organized name collections by theme, style, history, and cultural roots.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {CATEGORIES_DATA.map((cat) => {
            const IconComponent = ICON_MAP[cat.iconName] || Sparkles;
            return (
              <button
                key={cat.id}
                id={`cat-card-${cat.id}`}
                onClick={() => onSelectCategory(cat.title.replace(' Names', ''))}
                className="group p-6 rounded-[22px] bg-[#0A0D14]/80 backdrop-blur-xl border border-white/[0.08] hover:border-indigo-500/40 text-left transition-all duration-300 shadow-xl hover:shadow-indigo-500/10 hover:-translate-y-1 flex flex-col justify-between"
              >
                <div>
                  <div className="w-11 h-11 rounded-2xl bg-white/[0.04] border border-white/[0.08] group-hover:bg-indigo-500/20 group-hover:border-indigo-500/30 text-indigo-400 flex items-center justify-center mb-4 transition-all">
                    <IconComponent className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  </div>
                  <h3 className="font-heading font-bold text-lg text-white group-hover:text-indigo-400 transition-colors">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-slate-400 font-body mt-1.5 line-clamp-2 leading-relaxed font-normal">
                    {cat.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-white/[0.06] flex items-center justify-between text-xs text-slate-400 font-medium">
                  <span className="font-mono text-indigo-300">{cat.count}+ names</span>
                  <ArrowRight className="w-4 h-4 text-indigo-400 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
};
