import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Heart, Trash2, Download, Copy, Share2, Volume2, ArrowRight } from 'lucide-react';
import { NameItem } from '../types';
import { exportNamesToCsv } from '../utils/exportCsv';
import { pronounceName } from '../utils/sound';

interface FavoritesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  favoriteItems: NameItem[];
  onRemoveFavorite: (id: string) => void;
  onClearAllFavorites: () => void;
  onSelectDetails: (item: NameItem) => void;
  onShowToast: (title: string, description?: string) => void;
}

export const FavoritesDrawer: React.FC<FavoritesDrawerProps> = ({
  isOpen,
  onClose,
  favoriteItems,
  onRemoveFavorite,
  onClearAllFavorites,
  onSelectDetails,
  onShowToast,
}) => {
  if (!isOpen) return null;

  const handleCopyAll = async () => {
    if (favoriteItems.length === 0) return;
    const text = favoriteItems
      .map((item) => `• ${item.name} (${item.gender}, ${item.country}): "${item.meaning}"`)
      .join('\n');
    await navigator.clipboard.writeText(text);
    onShowToast(`Copied ${favoriteItems.length} Favorite Names ✓`);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex justify-end">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm"
        />

        {/* Drawer Window */}
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="relative w-full max-w-md h-full bg-[#0E1117] border-l border-white/[0.12] p-6 shadow-2xl z-10 flex flex-col text-white"
        >
          {/* Drawer Header */}
          <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] mb-4">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-rose-500/15 text-rose-500">
                <Heart className="w-5 h-5 fill-rose-500" />
              </div>
              <div>
                <h2 className="font-heading font-bold text-xl text-white">Saved Favorites</h2>
                <p className="text-xs text-[#A1A1AA]">{favoriteItems.length} names saved</p>
              </div>
            </div>

            <button
              id="close-favorites-drawer-btn"
              onClick={onClose}
              className="p-1.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-[#A1A1AA] hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Favorites List */}
          {favoriteItems.length === 0 ? (
            <div className="my-auto text-center py-12 text-[#A1A1AA]">
              <Heart className="w-12 h-12 text-rose-500/30 mx-auto mb-3" />
              <h3 className="font-heading font-semibold text-lg text-white mb-1">
                Your shortlist is empty
              </h3>
              <p className="text-xs max-w-xs mx-auto">
                Tap the heart icon on any name card to bookmark your top candidate names.
              </p>
            </div>
          ) : (
            <>
              {/* Action Toolbar */}
              <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-white/[0.06]">
                <button
                  id="favorites-copy-all-btn"
                  onClick={handleCopyAll}
                  className="px-3 py-1.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-xs font-semibold text-white flex items-center gap-1.5"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy List</span>
                </button>

                <button
                  id="favorites-export-csv-btn"
                  onClick={() => exportNamesToCsv(favoriteItems)}
                  className="px-3 py-1.5 rounded-xl bg-[#5B8CFF]/15 text-[#5B8CFF] hover:bg-[#5B8CFF]/25 text-xs font-semibold flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export CSV</span>
                </button>

                <button
                  id="favorites-clear-all-btn"
                  onClick={onClearAllFavorites}
                  className="px-2.5 py-1.5 rounded-xl text-xs font-semibold text-rose-400 hover:text-rose-300"
                >
                  Clear All
                </button>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto space-y-3 pr-1 scrollbar-thin">
                {favoriteItems.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => {
                      onSelectDetails(item);
                      onClose();
                    }}
                    className="p-3.5 rounded-2xl bg-[#05070A] border border-white/[0.08] hover:border-[#5B8CFF]/40 cursor-pointer transition-all flex items-center justify-between gap-3 group"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-heading font-bold text-lg text-white group-hover:text-[#5B8CFF] transition-colors">
                          {item.name}
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#5B8CFF]/15 text-[#5B8CFF]">
                          {item.gender}
                        </span>
                      </div>
                      <p className="text-xs text-[#A1A1AA] line-clamp-1 mt-0.5">
                        {item.meaning}
                      </p>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          pronounceName(item.name, item.gender);
                        }}
                        className="p-1.5 rounded-lg text-[#A1A1AA] hover:text-[#5B8CFF]"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onRemoveFavorite(item.id);
                        }}
                        className="p-1.5 rounded-lg text-[#A1A1AA] hover:text-rose-400"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
