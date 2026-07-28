import React, { useRef, useEffect, useState } from 'react';
import { Search, X, SlidersHorizontal, Mic, Sparkles } from 'lucide-react';
import { FilterState, NameItem } from '../types';

interface SearchBarProps {
  filterState: FilterState;
  onFilterChange: (updates: Partial<FilterState>) => void;
  onClearAll: () => void;
  allNames: NameItem[];
  onSelectName: (name: NameItem) => void;
  onToggleSidebarMobile: () => void;
}

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

export const SearchBar: React.FC<SearchBarProps> = ({
  filterState,
  onFilterChange,
  onClearAll,
  allNames,
  onSelectName,
  onToggleSidebarMobile,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [suggestionsOpen, setSuggestionsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);

  // Keyboard shortcut listener "/" to focus search input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && document.activeElement !== inputRef.current) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Matching autocomplete suggestions
  const matchingSuggestions = filterState.query.trim().length > 0
    ? allNames
        .filter(n =>
          n.name.toLowerCase().includes(filterState.query.toLowerCase()) ||
          n.meaning.toLowerCase().includes(filterState.query.toLowerCase()) ||
          n.origin.toLowerCase().includes(filterState.query.toLowerCase())
        )
        .slice(0, 5)
    : [];

  const activeChipCount =
    (filterState.gender !== 'All' ? 1 : 0) +
    (filterState.country ? 1 : 0) +
    (filterState.religion ? 1 : 0) +
    (filterState.style ? 1 : 0) +
    (filterState.historyEra ? 1 : 0) +
    (filterState.letter ? 1 : 0) +
    (filterState.meaningTag ? 1 : 0) +
    (filterState.popularityFilter !== 'All' ? 1 : 0) +
    (filterState.category ? 1 : 0);

  const handleVoiceSearch = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Voice recognition is not supported on this browser.');
      return;
    }
    try {
      // @ts-ignore
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.lang = 'en-US';
      recognition.start();
      setIsListening(true);

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        onFilterChange({ query: transcript });
        setIsListening(false);
      };

      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);
    } catch {
      setIsListening(false);
    }
  };

  return (
    <div id="search-section" className="w-full space-y-4">
      {/* Large Premium Search Bar Container */}
      <div className="relative z-30">
        <div className="relative flex items-center rounded-[22px] bg-[#0A0D14]/90 backdrop-blur-2xl border border-white/[0.12] focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500/25 shadow-2xl transition-all p-2.5 gap-3">
          
          <Search className="w-5 h-5 text-slate-400 ml-3 shrink-0" />

          <input
            ref={inputRef}
            id="main-name-search-input"
            type="text"
            value={filterState.query}
            onChange={(e) => {
              onFilterChange({ query: e.target.value });
              setSuggestionsOpen(true);
            }}
            onFocus={() => setSuggestionsOpen(true)}
            placeholder='Search 10,000+ names e.g. "Aarav", "Peace", "Japanese", or "Royal"...'
            className="w-full bg-transparent text-white placeholder-slate-400 text-base sm:text-lg focus:outline-none px-1 font-body tracking-tight"
          />

          {/* Voice Search Button */}
          <button
            id="voice-search-btn"
            onClick={handleVoiceSearch}
            className={`p-2.5 rounded-xl transition-all ${
              isListening ? 'bg-rose-500/20 text-rose-400 animate-pulse border border-rose-500/30' : 'text-slate-400 hover:text-white hover:bg-white/[0.08]'
            }`}
            title="Voice Search"
          >
            <Mic className="w-5 h-5" />
          </button>

          {/* Clear Button */}
          {filterState.query && (
            <button
              id="clear-query-btn"
              onClick={() => onFilterChange({ query: '' })}
              className="p-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/[0.08] transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          )}

          {/* Mobile Filter Toggle */}
          <button
            id="mobile-filters-toggle-btn"
            onClick={onToggleSidebarMobile}
            className="lg:hidden px-3.5 py-2.5 rounded-xl bg-indigo-500/15 text-indigo-400 border border-indigo-500/30 font-semibold text-xs flex items-center gap-1.5 shrink-0"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>Filters ({activeChipCount})</span>
          </button>
        </div>

        {/* Autocomplete Dropdown */}
        {suggestionsOpen && matchingSuggestions.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-2.5 rounded-[22px] bg-[#0A0D14]/95 border border-white/[0.12] shadow-2xl overflow-hidden z-40 backdrop-blur-2xl divide-y divide-white/[0.06]">
            {matchingSuggestions.map((item) => (
              <button
                key={item.id}
                id={`suggestion-${item.id}`}
                onClick={() => {
                  onSelectName(item);
                  setSuggestionsOpen(false);
                }}
                className="w-full p-4 flex items-center justify-between text-left hover:bg-white/[0.06] transition-colors group"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-indigo-500/15 border border-indigo-500/25 flex items-center justify-center font-bold text-sm text-indigo-400">
                    {item.letter}
                  </div>
                  <div>
                    <div className="font-bold text-white font-heading group-hover:text-indigo-400 transition-colors">
                      {item.name}
                    </div>
                    <div className="text-xs text-slate-400 truncate max-w-md">
                      {item.meaning} • <span className="text-slate-300">{item.country}</span>
                    </div>
                  </div>
                </div>
                <span className="text-xs font-mono text-indigo-400 px-2.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20">
                  {item.gender}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Clickable Alphabet Letters Bar (A-Z) */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
        <button
          id="alphabet-all-btn"
          onClick={() => onFilterChange({ letter: '' })}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold font-mono shrink-0 transition-all ${
            filterState.letter === ''
              ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-indigo-500/25'
              : 'bg-white/[0.03] text-slate-400 hover:text-white hover:bg-white/[0.08] border border-white/[0.08]'
          }`}
        >
          All (A-Z)
        </button>

        {ALPHABET.map((char) => (
          <button
            key={char}
            id={`alphabet-${char}-btn`}
            onClick={() => onFilterChange({ letter: filterState.letter === char ? '' : char })}
            className={`w-8 h-8 rounded-xl text-xs font-bold font-mono shrink-0 transition-all flex items-center justify-center ${
              filterState.letter === char
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-indigo-500/25 scale-105'
                : 'bg-white/[0.03] text-slate-400 hover:text-white hover:bg-white/[0.08] border border-white/[0.08]'
            }`}
          >
            {char}
          </button>
        ))}
      </div>

      {/* Active Filter Chips Bar */}
      {activeChipCount > 0 && (
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="text-xs text-slate-400 font-medium mr-1">Active Filters:</span>

          {filterState.gender !== 'All' && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/15 text-indigo-300 text-xs font-medium border border-indigo-500/30">
              Gender: {filterState.gender}
              <button id="chip-clear-gender" onClick={() => onFilterChange({ gender: 'All' })} className="hover:text-white ml-0.5">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {filterState.country && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/15 text-indigo-300 text-xs font-medium border border-indigo-500/30">
              Country: {filterState.country}
              <button id="chip-clear-country" onClick={() => onFilterChange({ country: '' })} className="hover:text-white ml-0.5">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {filterState.religion && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/15 text-indigo-300 text-xs font-medium border border-indigo-500/30">
              Religion: {filterState.religion}
              <button id="chip-clear-religion" onClick={() => onFilterChange({ religion: '' })} className="hover:text-white ml-0.5">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {filterState.style && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/15 text-indigo-300 text-xs font-medium border border-indigo-500/30">
              Style: {filterState.style}
              <button id="chip-clear-style" onClick={() => onFilterChange({ style: '' })} className="hover:text-white ml-0.5">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {filterState.meaningTag && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/15 text-indigo-300 text-xs font-medium border border-indigo-500/30">
              Meaning: {filterState.meaningTag}
              <button id="chip-clear-meaning" onClick={() => onFilterChange({ meaningTag: '' })} className="hover:text-white ml-0.5">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {filterState.letter && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/15 text-indigo-300 text-xs font-medium border border-indigo-500/30">
              Letter: {filterState.letter}
              <button id="chip-clear-letter" onClick={() => onFilterChange({ letter: '' })} className="hover:text-white ml-0.5">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {filterState.category && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 text-amber-400 text-xs font-medium border border-amber-500/30">
              Category: {filterState.category}
              <button id="chip-clear-category" onClick={() => onFilterChange({ category: '' })} className="hover:text-white ml-0.5">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          <button
            id="chip-clear-all-btn"
            onClick={onClearAll}
            className="text-xs text-rose-400 hover:text-rose-300 font-semibold underline underline-offset-2 ml-1"
          >
            Clear All
          </button>
        </div>
      )}
    </div>
  );
};
