import React, { useState, useEffect, useMemo } from 'react';
import { getAllNames } from './data/namesData';
import { FilterState, NameItem } from './types';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { SearchBar } from './components/SearchBar';
import { SidebarFilters } from './components/SidebarFilters';
import { NameCard } from './components/NameCard';
import { NameDetailModal } from './components/NameDetailModal';
import { CompareDrawer } from './components/CompareDrawer';
import { RandomGeneratorModal } from './components/RandomGeneratorModal';
import { AIAssistantModal } from './components/AIAssistantModal';
import { FavoritesDrawer } from './components/FavoritesDrawer';
import { CategoriesSection } from './components/CategoriesSection';
import { TrendingSection } from './components/TrendingSection';
import { BlogSection } from './components/BlogSection';
import { Footer } from './components/Footer';
import { Toast } from './components/Toast';
import { Sparkles, ArrowLeft, ArrowRight, Layers, SlidersHorizontal } from 'lucide-react';

const PAGE_SIZE = 24;

const INITIAL_FILTER_STATE: FilterState = {
  query: '',
  gender: 'All',
  country: '',
  religion: '',
  style: '',
  historyEra: '',
  letter: '',
  meaningTag: '',
  lengthRange: [2, 12],
  popularityFilter: 'All',
  category: '',
  page: 1,
  sortOrder: 'popular',
};

export function App() {
  // All Names dataset state (includes initial + procedural + custom added)
  const [allNames, setAllNames] = useState<NameItem[]>(() => getAllNames());

  // Filter state
  const [filterState, setFilterState] = useState<FilterState>(INITIAL_FILTER_STATE);

  // Persistence: Favorites
  const [favoriteIds, setFavoriteIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('namen_favorites');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Persistence sync
  useEffect(() => {
    try {
      localStorage.setItem('namen_favorites', JSON.stringify(favoriteIds));
    } catch {}
  }, [favoriteIds]);

  // Comparison IDs
  const [compareIds, setCompareIds] = useState<string[]>([]);

  // Modals / Drawers state
  const [selectedNameModal, setSelectedNameModal] = useState<NameItem | null>(null);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [isRandomOpen, setIsRandomOpen] = useState(false);
  const [isAIOpen, setIsAIOpen] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Toast state
  const [toast, setToast] = useState<{ show: boolean; title: string; description?: string }>({
    show: false,
    title: '',
  });

  const showToast = (title: string, description?: string) => {
    setToast({ show: true, title, description });
  };

  // URL query search handler for SEO direct name links (e.g. ?name=aarav)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const nameParam = params.get('name');
    if (nameParam) {
      const found = allNames.find(
        (n) => n.seoSlug.toLowerCase() === nameParam.toLowerCase() || n.name.toLowerCase() === nameParam.toLowerCase()
      );
      if (found) {
        setSelectedNameModal(found);
      }
    }
  }, [allNames]);

  // Toggle Favorite
  const handleToggleFavorite = (id: string) => {
    setFavoriteIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  // Toggle Compare
  const handleToggleCompare = (id: string) => {
    setCompareIds((prev) => {
      if (prev.includes(id)) return prev.filter((i) => i !== id);
      if (prev.length >= 4) {
        showToast('Comparison Limit Reached', 'You can compare up to 4 names at a time.');
        return prev;
      }
      return [...prev, id];
    });
  };

  // Filter Updates
  const handleFilterChange = (updates: Partial<FilterState>) => {
    setFilterState((prev) => ({
      ...prev,
      ...updates,
      page: updates.page !== undefined ? updates.page : 1, // reset page to 1 on filter changes
    }));
  };

  const handleClearAllFilters = () => {
    setFilterState(INITIAL_FILTER_STATE);
    showToast('Filters Reset', 'All search filters have been cleared.');
  };

  // Filter Computation Engine
  const filteredNames = useMemo(() => {
    return allNames.filter((item) => {
      // Query search
      if (filterState.query.trim()) {
        const q = filterState.query.toLowerCase().trim();
        const matchesName = item.name.toLowerCase().includes(q);
        const matchesMeaning = item.meaning.toLowerCase().includes(q);
        const matchesOrigin = item.country.toLowerCase().includes(q) || item.origin.toLowerCase().includes(q);
        const matchesPronunciation = item.pronunciation.toLowerCase().includes(q);
        if (!matchesName && !matchesMeaning && !matchesOrigin && !matchesPronunciation) {
          return false;
        }
      }

      // Gender (case-insensitive strict check)
      if (
        filterState.gender !== 'All' &&
        item.gender.toLowerCase() !== filterState.gender.toLowerCase()
      ) {
        return false;
      }

      // Country
      if (filterState.country && item.country !== filterState.country) {
        return false;
      }

      // Religion
      if (filterState.religion && item.religion !== filterState.religion) {
        return false;
      }

      // Style
      if (filterState.style && item.style !== filterState.style) {
        return false;
      }

      // History Era
      if (filterState.historyEra && !item.history?.toLowerCase().includes(filterState.historyEra.toLowerCase())) {
        return false;
      }

      // Letter
      if (filterState.letter && item.letter.toUpperCase() !== filterState.letter.toUpperCase()) {
        return false;
      }

      // Meaning tag
      if (filterState.meaningTag) {
        const mTag = filterState.meaningTag.toLowerCase();
        const inMeaning = item.meaning.toLowerCase().includes(mTag);
        const inTags = item.meaningTags.some((t) => t.toLowerCase().includes(mTag));
        if (!inMeaning && !inTags) return false;
      }

      // Length Range
      if (item.length < filterState.lengthRange[0] || item.length > filterState.lengthRange[1]) {
        return false;
      }

      // Category
      if (filterState.category) {
        const catQ = filterState.category.toLowerCase();
        const matchStyle = item.style.toLowerCase().includes(catQ);
        const matchCat = item.category.toLowerCase().includes(catQ);
        if (!matchStyle && !matchCat) return false;
      }

      return true;
    });
  }, [allNames, filterState]);

  // Sorted Names
  const sortedNames = useMemo(() => {
    const list = [...filteredNames];
    if (filterState.sortOrder === 'popular') {
      return list.sort((a, b) => b.popularity - a.popularity);
    } else if (filterState.sortOrder === 'az') {
      return list.sort((a, b) => a.name.localeCompare(b.name));
    } else if (filterState.sortOrder === 'za') {
      return list.sort((a, b) => b.name.localeCompare(a.name));
    } else if (filterState.sortOrder === 'newest') {
      return list.sort((a, b) => (b.createdDate || '').localeCompare(a.createdDate || ''));
    }
    return list;
  }, [filteredNames, filterState.sortOrder]);

  // Paginated Slice
  const totalPages = Math.ceil(sortedNames.length / PAGE_SIZE) || 1;
  const currentPage = Math.min(filterState.page, totalPages);
  const paginatedNames = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return sortedNames.slice(start, start + PAGE_SIZE);
  }, [sortedNames, currentPage]);

  // Favorite Items List
  const favoriteItems = useMemo(() => {
    return allNames.filter((n) => favoriteIds.includes(n.id));
  }, [allNames, favoriteIds]);

  // Compared Items List
  const comparedItems = useMemo(() => {
    return allNames.filter((n) => compareIds.includes(n.id));
  }, [allNames, compareIds]);

  const scrollToExplore = () => {
    document.getElementById('explore-main-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToCategories = () => {
    document.getElementById('categories-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#05070A] text-white font-body selection:bg-[#5B8CFF] selection:text-white relative">
      
      {/* Toast Notification */}
      <Toast
        show={toast.show}
        title={toast.title}
        description={toast.description}
        onClose={() => setToast({ show: false, title: '' })}
      />

      {/* Header Bar */}
      <Header
        favoritesCount={favoriteIds.length}
        compareCount={compareIds.length}
        onOpenFavorites={() => setIsFavoritesOpen(true)}
        onOpenCompare={() => setIsCompareOpen(true)}
        onOpenRandom={() => setIsRandomOpen(true)}
        onOpenAI={() => setIsAIOpen(true)}
        onOpenBlogs={() => {
          document.getElementById('blog-section')?.scrollIntoView({ behavior: 'smooth' });
        }}
        onFocusSearch={() => {
          document.getElementById('search-input-field')?.focus();
        }}
        activeTab={filterState.category ? 'categories' : 'explore'}
        setActiveTab={(tab) => {
          if (tab === 'explore') {
            handleClearAllFilters();
            scrollToExplore();
          } else if (tab === 'categories') {
            scrollToCategories();
          } else if (tab === 'trending') {
            document.getElementById('trending-section')?.scrollIntoView({ behavior: 'smooth' });
          }
        }}
      />

      {/* Hero Section */}
      <Hero
        onExploreClick={scrollToExplore}
        onBrowseCategoriesClick={scrollToCategories}
        onOpenAIClick={() => setIsAIOpen(true)}
        onRandomClick={() => setIsRandomOpen(true)}
        totalNamesCount={allNames.length}
      />

      {/* Trending Section */}
      <TrendingSection
        allNames={allNames}
        onSelectDetails={(item) => setSelectedNameModal(item)}
        onSelectPopularityFilter={(filter) => handleFilterChange({ popularityFilter: filter })}
      />

      {/* Categories Section */}
      <CategoriesSection
        onSelectCategory={(cat) => {
          handleFilterChange({ category: cat });
          scrollToExplore();
        }}
      />

      {/* Main Exploration Section: Filters & Grid */}
      <main id="explore-main-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Search Bar Container */}
        <div className="mb-8">
          <SearchBar
            filterState={filterState}
            onFilterChange={handleFilterChange}
            onClearAll={handleClearAllFilters}
            allNames={allNames}
            onSelectName={(nameItem) => setSelectedNameModal(nameItem)}
            onToggleSidebarMobile={() => setIsMobileSidebarOpen(true)}
          />
        </div>

        {/* Layout: Sticky Sidebar + Main Card Grid */}
        <div className="flex gap-8 items-start">
          
          {/* Left Sticky Filters Sidebar */}
          <SidebarFilters
            filterState={filterState}
            onFilterChange={handleFilterChange}
            onClearAll={handleClearAllFilters}
            isMobileOpen={isMobileSidebarOpen}
            onCloseMobile={() => setIsMobileSidebarOpen(false)}
          />

          {/* Right Main Dashboard */}
          <div className="flex-1 w-full min-w-0">
            
            {/* Dashboard Header Bar: Count & Sort */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 mb-6 border-b border-white/[0.08]">
              <div>
                <h2 className="font-heading font-extrabold text-2xl text-white tracking-tight">
                  {filterState.category ? `${filterState.category} Names` : 'All Discovery Results'}
                </h2>
                <p className="text-xs text-slate-400 mt-0.5 font-mono">
                  Showing {sortedNames.length} names found in database
                </p>
              </div>

              {/* Sorting Selector */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400 font-medium hidden sm:inline">Sort By:</span>
                <select
                  id="sort-order-select"
                  value={filterState.sortOrder}
                  onChange={(e) => handleFilterChange({ sortOrder: e.target.value as any })}
                  className="px-4 py-2 rounded-xl bg-[#0A0D14] border border-white/[0.12] text-xs font-semibold text-white focus:outline-none focus:border-indigo-500 shadow-sm"
                >
                  <option value="popular">Most Popular</option>
                  <option value="az">Alphabetical (A - Z)</option>
                  <option value="za">Alphabetical (Z - A)</option>
                  <option value="newest">Recently Added</option>
                </select>
              </div>
            </div>

            {/* Empty State */}
            {paginatedNames.length === 0 ? (
              <div className="p-12 text-center rounded-[28px] bg-[#0A0D14]/80 backdrop-blur-xl border border-white/[0.08] shadow-2xl my-8">
                <Sparkles className="w-10 h-10 text-indigo-400/50 mx-auto mb-3" />
                <h3 className="font-heading font-bold text-xl text-white mb-1">
                  No Names Match Your Specific Filter Criteria
                </h3>
                <p className="text-xs text-slate-400 max-w-sm mx-auto mb-6">
                  Try widening your gender, length, or country parameters, or ask our AI Concierge to suggest personalized names.
                </p>
                <div className="flex items-center justify-center gap-3">
                  <button
                    onClick={handleClearAllFilters}
                    className="px-5 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-lg shadow-indigo-600/30 transition-all"
                  >
                    Reset All Filters
                  </button>
                  <button
                    onClick={() => setIsAIOpen(true)}
                    className="px-5 py-2.5 rounded-2xl bg-white/[0.04] border border-indigo-500/40 text-indigo-300 font-semibold text-xs hover:border-indigo-400 transition-all"
                  >
                    Ask AI Concierge
                  </button>
                </div>
              </div>
            ) : (
              /* Name Card Grid */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {paginatedNames.map((item) => (
                  <NameCard
                    key={item.id}
                    item={item}
                    isFavorite={favoriteIds.includes(item.id)}
                    isCompared={compareIds.includes(item.id)}
                    onToggleFavorite={handleToggleFavorite}
                    onToggleCompare={handleToggleCompare}
                    onSelectDetails={(selected) => setSelectedNameModal(selected)}
                    onShowToast={showToast}
                  />
                ))}
              </div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="mt-12 flex items-center justify-between border-t border-white/[0.08] pt-6">
                <button
                  id="pagination-prev-btn"
                  onClick={() => handleFilterChange({ page: Math.max(1, currentPage - 1) })}
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded-xl bg-[#0E1117] border border-white/[0.08] text-xs font-semibold text-white flex items-center gap-1 disabled:opacity-30 disabled:cursor-not-allowed hover:border-white/[0.2] transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>

                <div className="text-xs font-mono text-[#A1A1AA]">
                  Page <span className="text-white font-bold">{currentPage}</span> of{' '}
                  <span className="text-white font-bold">{totalPages}</span>
                </div>

                <button
                  id="pagination-next-btn"
                  onClick={() => handleFilterChange({ page: Math.min(totalPages, currentPage + 1) })}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 rounded-xl bg-[#0E1117] border border-white/[0.08] text-xs font-semibold text-white flex items-center gap-1 disabled:opacity-30 disabled:cursor-not-allowed hover:border-white/[0.2] transition-colors"
                >
                  <span>Next</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

          </div>

        </div>

      </main>

      {/* SEO Guides Section */}
      <BlogSection />

      {/* Footer */}
      <Footer
        onOpenAI={() => setIsAIOpen(true)}
        onOpenCategories={scrollToCategories}
        onSelectGender={(g) => {
          handleFilterChange({ gender: g });
          scrollToExplore();
        }}
      />

      {/* Floating Compare Counter Bar if names selected */}
      {compareIds.length > 0 && (
        <div className="fixed bottom-6 right-6 z-40 p-3 rounded-2xl bg-[#0E1117] border border-[#5B8CFF]/50 shadow-2xl flex items-center gap-3 backdrop-blur-xl animate-bounce">
          <div className="flex items-center gap-2 pl-2">
            <Layers className="w-5 h-5 text-[#5B8CFF]" />
            <span className="text-xs font-semibold text-white font-mono">
              {compareIds.length}/4 Selected
            </span>
          </div>
          <button
            onClick={() => setIsCompareOpen(true)}
            className="px-4 py-2 rounded-xl bg-[#5B8CFF] text-white text-xs font-bold shadow-lg"
          >
            Compare Now
          </button>
        </div>
      )}

      {/* Modals & Drawers */}
      <NameDetailModal
        item={selectedNameModal}
        onClose={() => setSelectedNameModal(null)}
        isFavorite={selectedNameModal ? favoriteIds.includes(selectedNameModal.id) : false}
        onToggleFavorite={handleToggleFavorite}
        onShowToast={showToast}
        onSelectRelatedName={(relName) => {
          const found = allNames.find((n) => n.name.toLowerCase() === relName.toLowerCase());
          if (found) setSelectedNameModal(found);
        }}
      />

      <FavoritesDrawer
        isOpen={isFavoritesOpen}
        onClose={() => setIsFavoritesOpen(false)}
        favoriteItems={favoriteItems}
        onRemoveFavorite={handleToggleFavorite}
        onClearAllFavorites={() => setFavoriteIds([])}
        onSelectDetails={(item) => setSelectedNameModal(item)}
        onShowToast={showToast}
      />

      <CompareDrawer
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
        comparedNames={comparedItems}
        onRemoveCompare={handleToggleCompare}
        onClearCompare={() => setCompareIds([])}
        onSelectDetails={(item) => setSelectedNameModal(item)}
      />

      <RandomGeneratorModal
        isOpen={isRandomOpen}
        onClose={() => setIsRandomOpen(false)}
        allNames={allNames}
        onSelectDetails={(item) => setSelectedNameModal(item)}
        onToggleFavorite={handleToggleFavorite}
        isFavorite={(id) => favoriteIds.includes(id)}
        onShowToast={showToast}
      />

      <AIAssistantModal
        isOpen={isAIOpen}
        onClose={() => setIsAIOpen(false)}
        onShowToast={showToast}
        onSelectNameByName={(nameStr) => {
          const found = allNames.find((n) => n.name.toLowerCase() === nameStr.toLowerCase());
          if (found) {
            setSelectedNameModal(found);
          } else {
            handleFilterChange({ query: nameStr });
            scrollToExplore();
          }
        }}
      />

    </div>
  );
}

export default App;
