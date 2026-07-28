import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Globe, Heart, Shield, Sparkles, Filter, X, Zap } from 'lucide-react';
import { FilterState, GenderType, ReligionType, StyleType, HistoryEra } from '../types';

interface SidebarFiltersProps {
  filterState: FilterState;
  onFilterChange: (updates: Partial<FilterState>) => void;
  onClearAll: () => void;
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
}

const COUNTRIES = [
  'India', 'USA', 'UK', 'Canada', 'Australia', 'Japan', 'China', 'Korea', 'France',
  'Germany', 'Italy', 'Spain', 'Russia', 'Brazil', 'Mexico', 'Turkey', 'Pakistan',
  'Bangladesh', 'Nepal', 'Sri Lanka', 'UAE', 'Saudi Arabia', 'Nigeria', 'South Africa',
  'Norway', 'Greece', 'Egypt', 'Iran', 'Ireland', 'Scotland', 'Sweden', 'Denmark'
];

const RELIGIONS: ReligionType[] = [
  'Hindu', 'Muslim', 'Christian', 'Sikh', 'Jain', 'Buddhist', 'Jewish', 'Parsi', 'Others'
];

const STYLES: StyleType[] = [
  'Modern', 'Classic', 'Royal', 'Luxury', 'Cute', 'Elegant', 'Powerful', 'Rare',
  'Unique', 'Short', 'Minimal', 'Traditional', 'Vintage', 'Nature', 'Trendy'
];

const HISTORICAL_ERAS: HistoryEra[] = [
  'Ancient', 'Medieval', 'Greek', 'Roman', 'Egyptian', 'Persian', 'Viking',
  'Samurai', 'Mythology', 'Historical Figures', 'Kings', 'Queens', 'Warriors', 'Scientists'
];

const MEANINGS = [
  'Love', 'Peace', 'Moon', 'Sun', 'Fire', 'Water', 'Nature', 'Wisdom',
  'Strength', 'Courage', 'Hope', 'Victory', 'Blessing', 'Angel', 'Flower',
  'Sky', 'Ocean', 'King', 'Queen', 'Light', 'Star', 'Dream'
];

export const SidebarFilters: React.FC<SidebarFiltersProps> = ({
  filterState,
  onFilterChange,
  onClearAll,
  isMobileOpen = false,
  onCloseMobile
}) => {
  const [genderOpen, setGenderOpen] = useState(true);
  const [countryOpen, setCountryOpen] = useState(true);
  const [religionOpen, setReligionOpen] = useState(false);
  const [styleOpen, setStyleOpen] = useState(true);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [meaningOpen, setMeaningOpen] = useState(false);
  const [lengthOpen, setLengthOpen] = useState(false);

  const sidebarContent = (
    <div className="space-y-6">
      
      {/* Sidebar Header */}
      <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-indigo-400" />
          <h3 className="font-heading font-extrabold text-white text-base tracking-tight">Smart Filters</h3>
        </div>
        <button
          id="sidebar-clear-all-btn"
          onClick={onClearAll}
          className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold transition-colors"
        >
          Reset All
        </button>
      </div>

      {/* Gender Filter */}
      <div className="border-b border-white/[0.08] pb-4">
        <button
          id="filter-accordion-gender"
          onClick={() => setGenderOpen(!genderOpen)}
          className="w-full flex items-center justify-between py-1 text-xs uppercase tracking-wider font-bold text-slate-300 font-heading"
        >
          <span>Gender</span>
          {genderOpen ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
        </button>
        {genderOpen && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 mt-3">
            {(['All', 'Boy', 'Girl', 'Unisex'] as const).map((g) => (
              <button
                key={g}
                id={`gender-filter-${g}`}
                onClick={() => onFilterChange({ gender: g })}
                className={`py-2 px-2 rounded-xl text-xs font-semibold transition-all ${
                  filterState.gender === g
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                    : 'bg-white/[0.03] text-slate-400 hover:text-white hover:bg-white/[0.08] border border-white/[0.08]'
                }`}
              >
                {g}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Style Filter */}
      <div className="border-b border-white/[0.08] pb-4">
        <button
          id="filter-accordion-style"
          onClick={() => setStyleOpen(!styleOpen)}
          className="w-full flex items-center justify-between py-1 text-xs uppercase tracking-wider font-bold text-slate-300 font-heading"
        >
          <span>Style & Aesthetics</span>
          {styleOpen ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
        </button>
        {styleOpen && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {STYLES.map((st) => (
              <button
                key={st}
                id={`style-filter-${st}`}
                onClick={() => onFilterChange({ style: filterState.style === st ? '' : st })}
                className={`px-2.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
                  filterState.style === st
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-indigo-500/20'
                    : 'bg-white/[0.03] text-slate-400 hover:text-white hover:bg-white/[0.08] border border-white/[0.08]'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Country Filter */}
      <div className="border-b border-white/[0.08] pb-4">
        <button
          id="filter-accordion-country"
          onClick={() => setCountryOpen(!countryOpen)}
          className="w-full flex items-center justify-between py-1 text-xs uppercase tracking-wider font-bold text-slate-300 font-heading"
        >
          <span className="flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 text-indigo-400" />
            <span>Country & Region</span>
          </span>
          {countryOpen ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
        </button>
        {countryOpen && (
          <div className="mt-3 max-h-48 overflow-y-auto space-y-1 pr-1 scrollbar-thin">
            <button
              id="country-filter-all"
              onClick={() => onFilterChange({ country: '' })}
              className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                !filterState.country ? 'text-indigo-400 bg-indigo-500/10 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              All Countries (100+)
            </button>
            {COUNTRIES.map((c) => (
              <button
                key={c}
                id={`country-filter-${c}`}
                onClick={() => onFilterChange({ country: filterState.country === c ? '' : c })}
                className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center justify-between ${
                  filterState.country === c ? 'text-indigo-400 bg-indigo-500/10 font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                <span>{c}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Religion Filter */}
      <div className="border-b border-white/[0.08] pb-4">
        <button
          id="filter-accordion-religion"
          onClick={() => setReligionOpen(!religionOpen)}
          className="w-full flex items-center justify-between py-1 text-xs uppercase tracking-wider font-bold text-slate-300 font-heading"
        >
          <span>Religion & Faith</span>
          {religionOpen ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
        </button>
        {religionOpen && (
          <div className="grid grid-cols-2 gap-1.5 mt-3">
            {RELIGIONS.map((rel) => (
              <button
                key={rel}
                id={`religion-filter-${rel}`}
                onClick={() => onFilterChange({ religion: filterState.religion === rel ? '' : rel })}
                className={`py-1.5 px-2.5 rounded-xl text-xs font-medium text-left truncate transition-all ${
                  filterState.religion === rel
                    ? 'bg-indigo-600 text-white font-semibold shadow-md'
                    : 'bg-white/[0.03] text-slate-400 hover:text-white border border-white/[0.08]'
                }`}
              >
                {rel}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* History & Lore Filter */}
      <div className="border-b border-white/[0.08] pb-4">
        <button
          id="filter-accordion-history"
          onClick={() => setHistoryOpen(!historyOpen)}
          className="w-full flex items-center justify-between py-1 text-xs uppercase tracking-wider font-bold text-slate-300 font-heading"
        >
          <span>History & Lore</span>
          {historyOpen ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
        </button>
        {historyOpen && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {HISTORICAL_ERAS.map((era) => (
              <button
                key={era}
                id={`history-filter-${era}`}
                onClick={() => onFilterChange({ historyEra: filterState.historyEra === era ? '' : era })}
                className={`px-2.5 py-1 rounded-xl text-xs font-medium transition-all ${
                  filterState.historyEra === era
                    ? 'bg-amber-500 text-black font-bold shadow-md'
                    : 'bg-white/[0.03] text-slate-400 hover:text-white border border-white/[0.08]'
                }`}
              >
                {era}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Meaning Filter */}
      <div className="border-b border-white/[0.08] pb-4">
        <button
          id="filter-accordion-meaning"
          onClick={() => setMeaningOpen(!meaningOpen)}
          className="w-full flex items-center justify-between py-1 text-xs uppercase tracking-wider font-bold text-slate-300 font-heading"
        >
          <span>Meaning Keywords</span>
          {meaningOpen ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
        </button>
        {meaningOpen && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {MEANINGS.map((m) => (
              <button
                key={m}
                id={`meaning-filter-${m}`}
                onClick={() => onFilterChange({ meaningTag: filterState.meaningTag === m ? '' : m })}
                className={`px-2.5 py-1 rounded-xl text-xs font-medium transition-all ${
                  filterState.meaningTag === m
                    ? 'bg-emerald-500 text-black font-bold shadow-md'
                    : 'bg-white/[0.03] text-slate-400 hover:text-white border border-white/[0.08]'
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Name Length Filter */}
      <div>
        <button
          id="filter-accordion-length"
          onClick={() => setLengthOpen(!lengthOpen)}
          className="w-full flex items-center justify-between py-1 text-xs uppercase tracking-wider font-bold text-slate-300 font-heading"
        >
          <span>Name Length</span>
          {lengthOpen ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
        </button>
        {lengthOpen && (
          <div className="mt-3 space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
              <span>{filterState.lengthRange[0]} letters</span>
              <span>{filterState.lengthRange[1]} letters</span>
            </div>
            <div className="flex gap-1.5">
              {[2, 3, 4, 5, 6, 7, 8].map((num) => (
                <button
                  key={num}
                  id={`length-num-${num}`}
                  onClick={() => onFilterChange({ lengthRange: [num, num] })}
                  className={`flex-1 py-1.5 rounded-lg bg-white/[0.03] border text-xs font-mono transition-all ${
                    filterState.lengthRange[0] === num && filterState.lengthRange[1] === num
                      ? 'border-indigo-500 text-indigo-400 font-bold bg-indigo-500/10'
                      : 'border-white/[0.08] text-slate-400'
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

    </div>
  );

  return (
    <>
      {/* Desktop Sticky Sidebar */}
      <aside className="hidden lg:block w-72 shrink-0">
        <div className="sticky top-28 p-6 rounded-[24px] bg-[#0A0D14]/80 backdrop-blur-xl border border-white/[0.08] shadow-2xl">
          {sidebarContent}
        </div>
      </aside>

      {/* Mobile Modal Drawer */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div className="fixed inset-0 bg-black/80 backdrop-blur-md" onClick={onCloseMobile} />
          <div className="relative ml-auto w-full max-w-xs h-full bg-[#0A0D14] border-l border-white/[0.08] p-6 overflow-y-auto z-10 shadow-2xl">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/[0.08]">
              <span className="font-heading font-extrabold text-white text-base">Filter Options</span>
              <button id="close-mobile-filters" onClick={onCloseMobile} className="p-1 text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};
