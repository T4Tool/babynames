import React, { useState } from 'react';
import { Sparkles, Search, Heart, Layers, Bot, Shuffle, Shield, Menu, X, BookOpen } from 'lucide-react';

interface HeaderProps {
  favoritesCount: number;
  compareCount: number;
  onOpenFavorites: () => void;
  onOpenCompare: () => void;
  onOpenRandom: () => void;
  onOpenAI: () => void;
  onOpenBlogs: () => void;
  onFocusSearch: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  favoritesCount,
  compareCount,
  onOpenFavorites,
  onOpenCompare,
  onOpenRandom,
  onOpenAI,
  onOpenBlogs,
  onFocusSearch,
  activeTab,
  setActiveTab
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#030408]/75 backdrop-blur-2xl border-b border-white/[0.08] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        
        {/* Brand Logo */}
        <button
          id="brand-logo-btn"
          onClick={() => {
            setActiveTab('explore');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-3.5 group text-left"
        >
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#3B82F6] via-[#6366F1] to-[#8B5CF6] p-[1px] shadow-xl shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-300">
            <div className="w-full h-full bg-[#0A0D14] rounded-[15px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-[#6366F1] group-hover:rotate-12 transition-transform duration-300" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-heading font-extrabold text-xl tracking-tight text-white">BabyNames</span>
              <span className="text-[10px] uppercase font-mono tracking-widest px-2 py-0.5 rounded-full bg-indigo-500/15 text-indigo-400 border border-indigo-500/30 font-semibold">10K+</span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block font-body tracking-tight">Curated Etymology & Discovery Engine</p>
          </div>
        </button>

        {/* Search Quick Launcher */}
        <button
          id="header-search-launcher"
          onClick={onFocusSearch}
          className="hidden md:flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-indigo-500/40 text-slate-400 hover:text-white transition-all text-xs w-72 backdrop-blur-md group shadow-sm"
        >
          <Search className="w-4 h-4 text-slate-400 group-hover:text-indigo-400 transition-colors" />
          <span className="flex-1 text-left font-medium">Search 10,000+ names or meanings...</span>
          <kbd className="px-2 py-0.5 rounded-md bg-white/[0.08] text-[10px] font-mono text-slate-300 border border-white/10">
            /
          </kbd>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1.5 bg-white/[0.02] p-1.5 rounded-2xl border border-white/[0.06] backdrop-blur-md">
          <button
            id="nav-explore-btn"
            onClick={() => setActiveTab('explore')}
            className={`px-4 py-1.5 rounded-xl text-xs font-semibold tracking-wide transition-all ${
              activeTab === 'explore'
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-indigo-500/25'
                : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
            }`}
          >
            Explore
          </button>
          <button
            id="nav-categories-btn"
            onClick={() => setActiveTab('categories')}
            className={`px-4 py-1.5 rounded-xl text-xs font-semibold tracking-wide transition-all ${
              activeTab === 'categories'
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-indigo-500/25'
                : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
            }`}
          >
            Categories
          </button>
          <button
            id="nav-trending-btn"
            onClick={() => setActiveTab('trending')}
            className={`px-4 py-1.5 rounded-xl text-xs font-semibold tracking-wide transition-all ${
              activeTab === 'trending'
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-indigo-500/25'
                : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
            }`}
          >
            Trending
          </button>
          <button
            id="nav-blog-btn"
            onClick={onOpenBlogs}
            className="px-4 py-1.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-white/[0.04] transition-all flex items-center gap-1.5"
          >
            <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
            Guides
          </button>
        </nav>

        {/* Action Buttons & Counters */}
        <div className="flex items-center gap-2.5">
          {/* AI Concierge */}
          <button
            id="header-ai-btn"
            onClick={onOpenAI}
            className="px-3.5 py-2 rounded-2xl bg-gradient-to-r from-indigo-500/20 to-purple-500/20 hover:from-indigo-500/30 hover:to-purple-500/30 border border-indigo-500/35 text-white text-xs font-semibold flex items-center gap-2 transition-all shadow-md group"
            title="AI Name Concierge"
          >
            <Bot className="w-4 h-4 text-indigo-400 group-hover:rotate-12 transition-transform" />
            <span className="hidden sm:inline">AI Concierge</span>
          </button>

          {/* Random Spin Generator */}
          <button
            id="header-random-btn"
            onClick={onOpenRandom}
            className="p-2.5 sm:px-3.5 sm:py-2 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-indigo-500/40 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-2 transition-all"
            title="Random Name Generator"
          >
            <Shuffle className="w-4 h-4 text-indigo-400" />
            <span className="hidden md:inline">Surprise Me</span>
          </button>

          {/* Compare Drawer Toggle */}
          <button
            id="header-compare-btn"
            onClick={onOpenCompare}
            className="relative p-2.5 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-indigo-500/40 text-slate-300 hover:text-white transition-all"
            title="Compare Names"
          >
            <Layers className="w-4 h-4 text-slate-300" />
            {compareCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 px-1.5 py-0.5 rounded-full bg-indigo-600 text-white text-[10px] font-bold font-mono shadow-sm">
                {compareCount}
              </span>
            )}
          </button>

          {/* Favorites Drawer Toggle */}
          <button
            id="header-favorites-btn"
            onClick={onOpenFavorites}
            className="relative p-2.5 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-rose-500/40 text-slate-300 hover:text-rose-400 transition-all group"
            title="Saved Favorites"
          >
            <Heart className="w-4 h-4 text-rose-400 group-hover:scale-110 transition-transform" />
            {favoritesCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 px-1.5 py-0.5 rounded-full bg-rose-500 text-white text-[10px] font-bold font-mono shadow-sm">
                {favoritesCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-2xl bg-white/[0.03] border border-white/[0.08] text-slate-300 lg:hidden"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0E1117] border-b border-white/[0.08] px-4 py-4 space-y-3">
          <button
            id="mobile-search-trigger"
            onClick={() => {
              setMobileMenuOpen(false);
              onFocusSearch();
            }}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl bg-[#05070A] border border-white/[0.08] text-[#A1A1AA] text-sm"
          >
            <Search className="w-4 h-4 text-[#5B8CFF]" />
            <span>Search names or meanings...</span>
          </button>
          
          <div className="grid grid-cols-2 gap-2 pt-2">
            <button
              id="mobile-nav-explore"
              onClick={() => {
                setActiveTab('explore');
                setMobileMenuOpen(false);
              }}
              className="px-3 py-2 rounded-lg bg-white/[0.04] text-left text-sm text-white font-medium"
            >
              Explore All
            </button>
            <button
              id="mobile-nav-categories"
              onClick={() => {
                setActiveTab('categories');
                setMobileMenuOpen(false);
              }}
              className="px-3 py-2 rounded-lg bg-white/[0.04] text-left text-sm text-white font-medium"
            >
              Categories
            </button>
            <button
              id="mobile-nav-trending"
              onClick={() => {
                setActiveTab('trending');
                setMobileMenuOpen(false);
              }}
              className="px-3 py-2 rounded-lg bg-white/[0.04] text-left text-sm text-white font-medium"
            >
              Trending Names
            </button>
            <button
              id="mobile-nav-guides"
              onClick={() => {
                onOpenBlogs();
                setMobileMenuOpen(false);
              }}
              className="px-3 py-2 rounded-lg bg-white/[0.04] text-left text-sm text-[#7B61FF] font-medium"
            >
              Name Guides
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
