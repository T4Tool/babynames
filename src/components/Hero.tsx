import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Compass, Bot, Shuffle, ArrowRight, ShieldCheck, Globe, Award } from 'lucide-react';

interface HeroProps {
  onExploreClick: () => void;
  onBrowseCategoriesClick: () => void;
  onOpenAIClick: () => void;
  onRandomClick: () => void;
  totalNamesCount: number;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreClick,
  onBrowseCategoriesClick,
  onOpenAIClick,
  onRandomClick,
  totalNamesCount
}) => {
  return (
    <section className="relative overflow-hidden pt-16 pb-20 lg:pt-28 lg:pb-32 border-b border-white/[0.08]">
      {/* Ambient Parallax Gradient Light Blobs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-tr from-blue-600/20 via-indigo-600/15 to-purple-600/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute top-10 right-10 w-96 h-96 bg-blue-500/10 blur-[100px] rounded-full pointer-events-none animate-float" />
      <div className="absolute bottom-5 left-10 w-96 h-96 bg-indigo-500/10 blur-[110px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Top Badge Pill */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/[0.04] border border-white/[0.1] text-xs text-slate-300 mb-8 backdrop-blur-xl shadow-lg shadow-black/20"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-sm shadow-emerald-400" />
          <span className="text-white font-semibold font-mono tracking-tight">10,250+ Curated Names Engine</span>
          <span className="text-white/20">•</span>
          <span className="text-indigo-400 font-semibold">100+ Cultures & Global Origins</span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-heading text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-[1.08]"
        >
          Discover The Perfect <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-indigo-200 to-indigo-400">
            Unique Baby Name.
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 text-base sm:text-xl text-slate-400 max-w-2xl mx-auto font-body font-normal leading-relaxed tracking-normal"
        >
          Over 10,000 carefully researched names from around the world. Instant filter by origin, meaning, religion, style, and syllable length.
        </motion.p>

        {/* CTA Button Group */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3.5"
        >
          <button
            id="hero-explore-btn"
            onClick={onExploreClick}
            className="px-7 py-4 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-indigo-700 text-white font-semibold text-sm shadow-xl shadow-indigo-600/30 hover:shadow-indigo-600/50 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2.5 group"
          >
            <span>Explore 10,000+ Names</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            id="hero-ai-btn"
            onClick={onOpenAIClick}
            className="px-6 py-4 rounded-2xl bg-white/[0.04] border border-indigo-500/35 hover:border-indigo-400 text-white font-semibold text-sm hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2 backdrop-blur-xl shadow-md"
          >
            <Bot className="w-4 h-4 text-indigo-400" />
            <span>AI Concierge</span>
          </button>

          <button
            id="hero-categories-btn"
            onClick={onBrowseCategoriesClick}
            className="px-5 py-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-white/[0.2] text-slate-300 hover:text-white font-medium text-sm transition-all flex items-center gap-2 backdrop-blur-xl"
          >
            <Compass className="w-4 h-4 text-blue-400" />
            <span>Browse Categories</span>
          </button>

          <button
            id="hero-random-btn"
            onClick={onRandomClick}
            className="px-5 py-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-white/[0.2] text-slate-300 hover:text-white font-medium text-sm transition-all flex items-center gap-2 backdrop-blur-xl"
          >
            <Shuffle className="w-4 h-4 text-emerald-400" />
            <span>Random Spin</span>
          </button>
        </motion.div>

        {/* Stats Row - High Contrast Apple Cards */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto"
        >
          <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl text-center shadow-lg hover:border-white/20 transition-all">
            <div className="font-heading font-extrabold text-2xl sm:text-3xl text-white tracking-tight">10,250+</div>
            <div className="text-xs text-slate-400 mt-1.5 flex items-center justify-center gap-1.5 font-medium">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              <span>Unique Names</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl text-center shadow-lg hover:border-white/20 transition-all">
            <div className="font-heading font-extrabold text-2xl sm:text-3xl text-white tracking-tight">100+</div>
            <div className="text-xs text-slate-400 mt-1.5 flex items-center justify-center gap-1.5 font-medium">
              <Globe className="w-3.5 h-3.5 text-indigo-400" />
              <span>Global Origins</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl text-center shadow-lg hover:border-white/20 transition-all">
            <div className="font-heading font-extrabold text-2xl sm:text-3xl text-white tracking-tight">14</div>
            <div className="text-xs text-slate-400 mt-1.5 flex items-center justify-center gap-1.5 font-medium">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span>Curated Collections</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl text-center shadow-lg hover:border-white/20 transition-all">
            <div className="font-heading font-extrabold text-2xl sm:text-3xl text-white tracking-tight">100%</div>
            <div className="text-xs text-slate-400 mt-1.5 flex items-center justify-center gap-1.5 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Verified Meanings</span>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
