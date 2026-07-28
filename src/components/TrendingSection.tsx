import React, { useState } from 'react';
import { Flame, Heart, Copy, Award, ArrowUpRight } from 'lucide-react';
import { NameItem } from '../types';

interface TrendingSectionProps {
  allNames: NameItem[];
  onSelectDetails: (item: NameItem) => void;
  onSelectPopularityFilter: (filter: string) => void;
}

export const TrendingSection: React.FC<TrendingSectionProps> = ({
  allNames,
  onSelectDetails,
  onSelectPopularityFilter,
}) => {
  const [activeTab, setActiveTab] = useState<'trending' | 'loved' | 'copied' | 'editors'>('trending');

  let displayed = [...allNames];

  if (activeTab === 'trending') {
    displayed = displayed.sort((a, b) => b.popularity - a.popularity).slice(0, 6);
  } else if (activeTab === 'loved') {
    displayed = displayed.sort((a, b) => b.favorites - a.favorites).slice(0, 6);
  } else if (activeTab === 'copied') {
    displayed = displayed.sort((a, b) => (b.copiesCount || 0) - (a.copiesCount || 0)).slice(0, 6);
  } else {
    displayed = displayed.filter(n => n.style === 'Royal' || n.style === 'Luxury' || n.style === 'Unique').slice(0, 6);
  }

  return (
    <section id="trending-section" className="py-12 border-b border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-[#5B8CFF] font-semibold text-xs font-mono uppercase tracking-wider mb-1">
              <Flame className="w-4 h-4 text-amber-500" />
              <span>Real-time Discovery Trends</span>
            </div>
            <h2 className="font-heading font-bold text-3xl text-white">Trending Names</h2>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-[#0E1117] border border-white/[0.08] overflow-x-auto">
            <button
              id="trending-tab-today"
              onClick={() => setActiveTab('trending')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === 'trending' ? 'bg-[#5B8CFF] text-white shadow-md' : 'text-[#A1A1AA] hover:text-white'
              }`}
            >
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              <span>Trending</span>
            </button>

            <button
              id="trending-tab-loved"
              onClick={() => setActiveTab('loved')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === 'loved' ? 'bg-[#5B8CFF] text-white shadow-md' : 'text-[#A1A1AA] hover:text-white'
              }`}
            >
              <Heart className="w-3.5 h-3.5 text-rose-400" />
              <span>Most Loved</span>
            </button>

            <button
              id="trending-tab-copied"
              onClick={() => setActiveTab('copied')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === 'copied' ? 'bg-[#5B8CFF] text-white shadow-md' : 'text-[#A1A1AA] hover:text-white'
              }`}
            >
              <Copy className="w-3.5 h-3.5 text-[#5B8CFF]" />
              <span>Most Copied</span>
            </button>

            <button
              id="trending-tab-editors"
              onClick={() => setActiveTab('editors')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === 'editors' ? 'bg-[#5B8CFF] text-white shadow-md' : 'text-[#A1A1AA] hover:text-white'
              }`}
            >
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span>Editor's Pick</span>
            </button>
          </div>
        </div>

        {/* Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {displayed.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectDetails(item)}
              className="p-5 rounded-2xl bg-[#0E1117] border border-white/[0.08] hover:border-[#5B8CFF]/40 cursor-pointer transition-all hover:-translate-y-1 group"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-heading font-bold text-2xl text-white group-hover:text-[#5B8CFF] transition-colors">
                  {item.name}
                </span>
                <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-[#5B8CFF]/15 text-[#5B8CFF]">
                  {item.gender}
                </span>
              </div>
              <p className="text-xs font-mono text-[#A1A1AA] mb-2">
                /{item.pronunciation}/ • {item.country}
              </p>
              <p className="text-xs text-gray-300 line-clamp-2 font-body mb-3">
                {item.meaning}
              </p>
              <div className="flex items-center justify-between text-xs pt-3 border-t border-white/[0.05]">
                <span className="text-[#A1A1AA] font-mono">Popularity: {item.popularity}%</span>
                <span className="text-[#5B8CFF] font-semibold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  <span>View</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
