import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X, Volume2, Heart, Copy, Share2, Check, Sparkles, Globe, History,
  Compass, Flame, Award, Users, BookOpen, TrendingUp, Code2
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { NameItem } from '../types';
import { pronounceName } from '../utils/sound';

interface NameDetailModalProps {
  item: NameItem | null;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onShowToast: (title: string, description?: string) => void;
  onSelectRelatedName?: (name: string) => void;
}

export const NameDetailModal: React.FC<NameDetailModalProps> = ({
  item,
  onClose,
  isFavorite,
  onToggleFavorite,
  onShowToast,
  onSelectRelatedName,
}) => {
  const [copied, setCopied] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [copiedSchema, setCopiedSchema] = useState(false);

  if (!item) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(
        `${item.name} (${item.pronunciation})\nMeaning: ${item.meaning}\nOrigin: ${item.country} (${item.origin})\nLucky Traits: Number ${item.luckyNumber}, Color ${item.luckyColor}, Stone ${item.luckyStone}`
      );
      setCopied(true);
      onShowToast(`Copied "${item.name}" ✓`);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  const handleAudio = async () => {
    setIsPlayingAudio(true);
    await pronounceName(item.name, item.gender);
    setIsPlayingAudio(false);
  };

  const handleShare = async () => {
    const shareUrl = `${window.location.origin}?name=${item.seoSlug}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${item.name} - Baby Name Details`,
          text: `Discover meaning and origin for ${item.name} on Namen.`,
          url: shareUrl,
        });
      } catch {}
    } else {
      await navigator.clipboard.writeText(shareUrl);
      onShowToast(`Share Link Copied ✓`, shareUrl);
    }
  };

  const handleCopyJsonLd = async () => {
    const schemaObj = {
      "@context": "https://schema.org",
      "@type": "GivenName",
      "name": item.name,
      "gender": item.gender,
      "description": item.meaning,
      "origin": item.origin,
      "inLanguage": item.language
    };
    await navigator.clipboard.writeText(JSON.stringify(schemaObj, null, 2));
    setCopiedSchema(true);
    onShowToast(`Schema.org JSON-LD Copied ✓`);
    setTimeout(() => setCopiedSchema(false), 2000);
  };

  const chartData = item.popularityHistory || [
    { year: '2023', rank: 40 },
    { year: '2024', rank: 25 },
    { year: '2025', rank: 12 },
    { year: '2026', rank: item.popularity }
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-3xl bg-[#0E1117] border border-white/[0.12] rounded-[32px] p-6 sm:p-8 shadow-2xl z-10 max-h-[90vh] overflow-y-auto my-auto scrollbar-thin text-white"
        >
          {/* Close Button */}
          <button
            id="detail-modal-close-btn"
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-2xl bg-white/[0.05] hover:bg-white/[0.1] text-[#A1A1AA] hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Top Header Badge Row */}
          <div className="flex items-center gap-2 flex-wrap mb-4">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#5B8CFF]/15 text-[#5B8CFF] border border-[#5B8CFF]/30">
              {item.gender}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-white/[0.05] text-[#A1A1AA] border border-white/[0.08]">
              {item.country}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-[#7B61FF]/15 text-[#7B61FF] border border-[#7B61FF]/30">
              {item.style}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
              {item.religion}
            </span>
          </div>

          {/* Name Title & Pronunciation Player */}
          <div className="flex items-center justify-between gap-4 border-b border-white/[0.08] pb-6 mb-6">
            <div>
              <div className="flex items-center gap-3">
                <h1 className="font-heading text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
                  {item.name}
                </h1>
                <button
                  id="detail-modal-audio-btn"
                  onClick={handleAudio}
                  className={`p-2.5 rounded-2xl bg-[#5B8CFF]/15 text-[#5B8CFF] hover:bg-[#5B8CFF]/25 transition-all ${
                    isPlayingAudio ? 'animate-pulse ring-2 ring-[#5B8CFF]' : ''
                  }`}
                  title="Pronounce Name"
                >
                  <Volume2 className="w-6 h-6" />
                </button>
              </div>
              <p className="text-sm font-mono text-[#5B8CFF] mt-1">
                Pronunciation: /{item.pronunciation}/
              </p>
            </div>

            {/* Favorite & Share Buttons */}
            <div className="flex items-center gap-2">
              <button
                id="detail-modal-fav-btn"
                onClick={() => onToggleFavorite(item.id)}
                className={`p-3 rounded-2xl border transition-all ${
                  isFavorite
                    ? 'bg-rose-500/20 text-rose-500 border-rose-500/40'
                    : 'bg-white/[0.05] text-[#A1A1AA] border-white/[0.08] hover:text-rose-400'
                }`}
              >
                <Heart className={`w-5 h-5 ${isFavorite ? 'fill-rose-500' : ''}`} />
              </button>

              <button
                id="detail-modal-share-btn"
                onClick={handleShare}
                className="p-3 rounded-2xl bg-white/[0.05] text-[#A1A1AA] hover:text-white border border-white/[0.08] transition-all"
              >
                <Share2 className="w-5 h-5" />
              </button>

              <button
                id="detail-modal-copy-btn"
                onClick={handleCopy}
                className="px-4 py-3 rounded-2xl bg-[#5B8CFF] text-white font-semibold text-xs flex items-center gap-2 shadow-lg shadow-[#5B8CFF]/25 hover:bg-[#5B8CFF]/90 transition-all"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Copied!' : 'Copy Name'}</span>
              </button>
            </div>
          </div>

          {/* Meaning & History Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="p-5 rounded-2xl bg-[#05070A] border border-white/[0.08]">
              <div className="flex items-center gap-2 text-[#5B8CFF] font-semibold text-sm mb-2 font-heading">
                <Sparkles className="w-4 h-4" />
                <span>Meaning & Etymology</span>
              </div>
              <p className="text-base text-gray-200 leading-relaxed font-body">
                {item.meaning}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#05070A] border border-white/[0.08]">
              <div className="flex items-center gap-2 text-[#7B61FF] font-semibold text-sm mb-2 font-heading">
                <History className="w-4 h-4" />
                <span>Origin & History</span>
              </div>
              <p className="text-sm text-[#A1A1AA] leading-relaxed font-body">
                {item.history || `Rooted in ${item.origin} traditions. Widely cherished for its melody and positive cultural resonance.`}
              </p>
            </div>
          </div>

          {/* Lucky Traits Grid */}
          <div className="mb-8">
            <h3 className="text-xs uppercase tracking-wider text-[#A1A1AA] font-mono mb-3">
              Lucky Traits & Attributes
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3.5 rounded-2xl bg-[#05070A] border border-white/[0.08] text-center">
                <div className="text-xs text-[#A1A1AA]">Lucky Number</div>
                <div className="font-num font-bold text-lg text-white mt-0.5">{item.luckyNumber}</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#05070A] border border-white/[0.08] text-center">
                <div className="text-xs text-[#A1A1AA]">Lucky Color</div>
                <div className="font-semibold text-sm text-[#5B8CFF] mt-0.5">{item.luckyColor}</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#05070A] border border-white/[0.08] text-center">
                <div className="text-xs text-[#A1A1AA]">Lucky Gemstone</div>
                <div className="font-semibold text-sm text-[#7B61FF] mt-0.5">{item.luckyStone}</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#05070A] border border-white/[0.08] text-center">
                <div className="text-xs text-[#A1A1AA]">Lucky Day</div>
                <div className="font-semibold text-sm text-emerald-400 mt-0.5">{item.luckyDay}</div>
              </div>
            </div>
          </div>

          {/* Nicknames & Sibling Suggestions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            <div className="p-4 rounded-2xl bg-[#05070A] border border-white/[0.08]">
              <div className="text-xs text-[#A1A1AA] uppercase tracking-wider font-mono mb-2">
                Nickname Suggestions
              </div>
              <div className="flex flex-wrap gap-2">
                {item.nicknames.map((nk) => (
                  <span key={nk} className="px-3 py-1 rounded-xl bg-white/[0.06] text-xs font-semibold text-white">
                    {nk}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#05070A] border border-white/[0.08]">
              <div className="text-xs text-[#A1A1AA] uppercase tracking-wider font-mono mb-2">
                Matching Sibling Names
              </div>
              <div className="flex flex-wrap gap-2">
                {item.siblingNames.map((sn) => (
                  <button
                    key={sn}
                    onClick={() => onSelectRelatedName && onSelectRelatedName(sn)}
                    className="px-3 py-1 rounded-xl bg-[#5B8CFF]/15 text-[#5B8CFF] hover:bg-[#5B8CFF]/30 text-xs font-semibold transition-colors"
                  >
                    {sn}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Popularity Trend Line Chart */}
          <div className="p-5 rounded-2xl bg-[#05070A] border border-white/[0.08] mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-white font-semibold text-sm font-heading">
                <TrendingUp className="w-4 h-4 text-[#5B8CFF]" />
                <span>Popularity Trend Over Time</span>
              </div>
              <span className="text-xs font-mono text-[#5B8CFF]">Score: {item.popularity}/100</span>
            </div>

            <div className="h-40 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <XAxis dataKey="year" stroke="#A1A1AA" fontSize={11} />
                  <YAxis stroke="#A1A1AA" fontSize={11} domain={[0, 100]} />
                  <Tooltip contentStyle={{ backgroundColor: '#0E1117', borderColor: '#5B8CFF', borderRadius: 12 }} />
                  <Line type="monotone" dataKey="rank" stroke="#5B8CFF" strokeWidth={3} dot={{ fill: '#7B61FF' }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* SEO Microdata JSON-LD export */}
          <div className="flex items-center justify-between pt-4 border-t border-white/[0.08]">
            <span className="text-xs text-[#A1A1AA] font-mono">
              SEO Slug: /name/{item.seoSlug}
            </span>
            <button
              id="copy-jsonld-schema-btn"
              onClick={handleCopyJsonLd}
              className="px-3 py-1.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-xs text-[#A1A1AA] hover:text-white flex items-center gap-1.5 transition-colors font-mono"
            >
              <Code2 className="w-3.5 h-3.5 text-[#5B8CFF]" />
              <span>{copiedSchema ? 'Schema Copied ✓' : 'Copy JSON-LD Schema'}</span>
            </button>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
