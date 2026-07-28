import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Heart, Copy, Share2, Volume2, Check, ArrowUpRight, Layers, Sparkles } from 'lucide-react';
import { NameItem } from '../types';
import { pronounceName } from '../utils/sound';

interface NameCardProps {
  item: NameItem;
  isFavorite: boolean;
  isCompared: boolean;
  onToggleFavorite: (id: string) => void;
  onToggleCompare: (id: string) => void;
  onSelectDetails: (item: NameItem) => void;
  onShowToast: (title: string, description?: string) => void;
}

export const NameCard: React.FC<NameCardProps> = ({
  item,
  isFavorite,
  isCompared,
  onToggleFavorite,
  onToggleCompare,
  onSelectDetails,
  onShowToast,
}) => {
  const [copied, setCopied] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(
        `${item.name} (${item.pronunciation}) - Meaning: ${item.meaning}. Origin: ${item.country}`
      );
      setCopied(true);
      onShowToast(`Copied "${item.name}" ✓`, `Copied to clipboard with meaning & origin.`);
      
      // Notify backend for copy analytics
      fetch('/api/analytics/event', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'copy', name: item.name })
      }).catch(() => {});

      setTimeout(() => setCopied(false), 2000);
    } catch {
      onShowToast(`Copied "${item.name}" ✓`);
    }
  };

  const handleAudio = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPlayingAudio(true);
    await pronounceName(item.name, item.gender);
    setIsPlayingAudio(false);
  };

  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const shareData = {
      title: `${item.name} - Unique Baby Name`,
      text: `${item.name} (${item.pronunciation}) means "${item.meaning}". Discover 10,000+ unique baby names on BabyNames!`,
      url: window.location.origin + `?name=${item.seoSlug}`
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        onShowToast(`Shared "${item.name}"`);
      } catch {}
    } else {
      await navigator.clipboard.writeText(shareData.url);
      onShowToast(`Link Copied ✓`, `Share link for ${item.name} copied to clipboard.`);
    }
  };

  const genderBadgeStyle =
    item.gender === 'Boy'
      ? 'bg-blue-500/15 text-blue-400 border-blue-500/30'
      : item.gender === 'Girl'
      ? 'bg-rose-500/15 text-rose-400 border-rose-500/30'
      : 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30';

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.25 }}
      onClick={() => onSelectDetails(item)}
      className="group relative p-6 rounded-[24px] bg-[#0A0D14]/80 backdrop-blur-xl border border-white/[0.08] hover:border-indigo-500/40 transition-all duration-300 shadow-xl hover:shadow-indigo-500/10 cursor-pointer flex flex-col justify-between"
    >
      {/* Top Header Row */}
      <div>
        <div className="flex items-start justify-between gap-3 mb-4">
          
          <div className="flex items-center gap-2 flex-wrap">
            {/* Gender Badge */}
            <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${genderBadgeStyle}`}>
              {item.gender}
            </span>

            {/* Country Badge */}
            <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-white/[0.04] text-slate-300 border border-white/[0.08]">
              {item.country}
            </span>

            {/* Style Badge */}
            <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
              {item.style}
            </span>
          </div>

          {/* Action Buttons: Favorite & Compare */}
          <div className="flex items-center gap-1.5">
            <button
              id={`card-compare-btn-${item.id}`}
              onClick={(e) => {
                e.stopPropagation();
                onToggleCompare(item.id);
              }}
              className={`p-2 rounded-xl transition-all ${
                isCompared
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-white/[0.08]'
              }`}
              title="Compare"
            >
              <Layers className="w-4 h-4" />
            </button>

            <button
              id={`card-favorite-btn-${item.id}`}
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavorite(item.id);
                onShowToast(
                  isFavorite ? `Removed from Favorites` : `Saved "${item.name}" to Favorites ❤️`
                );
              }}
              className={`p-2 rounded-xl transition-all ${
                isFavorite
                  ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                  : 'text-slate-400 hover:text-rose-400 hover:bg-white/[0.08]'
              }`}
              title="Save Favorite"
            >
              <Heart className={`w-4 h-4 ${isFavorite ? 'fill-rose-500 text-rose-500' : ''}`} />
            </button>
          </div>
        </div>

        {/* Name Title & Pronunciation */}
        <div className="flex items-baseline gap-3 mb-1.5">
          <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-white tracking-tight group-hover:text-indigo-400 transition-colors">
            {item.name}
          </h2>

          <button
            id={`audio-play-btn-${item.id}`}
            onClick={handleAudio}
            className={`p-1.5 rounded-lg text-slate-400 hover:text-indigo-400 hover:bg-white/[0.08] transition-colors ${
              isPlayingAudio ? 'animate-pulse text-indigo-400' : ''
            }`}
            title="Listen to pronunciation"
          >
            <Volume2 className="w-4 h-4" />
          </button>
        </div>

        {/* Pronunciation Text */}
        <p className="text-xs font-mono text-slate-400 mb-3 tracking-wide">
          /{item.pronunciation}/
        </p>

        {/* Meaning Description */}
        <p className="text-sm text-slate-300 font-body line-clamp-2 leading-relaxed mb-5 font-normal">
          {item.meaning}
        </p>
      </div>

      {/* Bottom Footer Row */}
      <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between gap-2">
        
        {/* Popularity Score */}
        <div className="flex items-center gap-2">
          <div className="w-14 bg-white/[0.08] h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-blue-500 to-indigo-500 h-full rounded-full"
              style={{ width: `${item.popularity}%` }}
            />
          </div>
          <span className="text-[11px] font-mono text-slate-400">
            {item.popularity}% Match
          </span>
        </div>

        {/* Quick Actions: Copy, Share, View */}
        <div className="flex items-center gap-1.5">
          <button
            id={`card-copy-btn-${item.id}`}
            onClick={handleCopy}
            className={`p-2 rounded-xl text-xs font-medium transition-all flex items-center gap-1 ${
              copied
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                : 'bg-white/[0.04] hover:bg-white/[0.08] text-slate-400 hover:text-white border border-white/[0.08]'
            }`}
            title="One-click Copy"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
          </button>

          <button
            id={`card-share-btn-${item.id}`}
            onClick={handleShare}
            className="p-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-400 hover:text-white border border-white/[0.08] text-xs transition-all"
            title="Share"
          >
            <Share2 className="w-3.5 h-3.5" />
          </button>

          <button
            id={`card-details-btn-${item.id}`}
            onClick={(e) => {
              e.stopPropagation();
              onSelectDetails(item);
            }}
            className="p-2 rounded-xl bg-indigo-500/15 hover:bg-indigo-500/25 text-indigo-400 border border-indigo-500/30 text-xs font-semibold transition-all flex items-center gap-1"
            title="View Full Details"
          >
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </motion.div>
  );
};
