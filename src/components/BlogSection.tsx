import React, { useState } from 'react';
import { BLOGS_DATA } from '../data/blogsData';
import { BlogArticle } from '../types';
import { BookOpen, X, ArrowRight, Clock, User, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const BlogSection: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<BlogArticle | null>(null);

  return (
    <section id="guides-section" className="py-12 border-b border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#7B61FF]/15 text-[#7B61FF] text-xs font-semibold mb-3 border border-[#7B61FF]/30">
            <BookOpen className="w-3.5 h-3.5" />
            <span>SEO Etymology Guides & Research</span>
          </div>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-white tracking-tight">
            Baby Naming Articles & Insights
          </h2>
          <p className="text-sm text-[#A1A1AA] mt-2 font-body">
            Deep-dive articles written by cultural linguists and name ethnographers.
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {BLOGS_DATA.map((art) => (
            <div
              key={art.id}
              onClick={() => setSelectedArticle(art)}
              className="p-6 rounded-2xl bg-[#0E1117] border border-white/[0.08] hover:border-[#7B61FF]/40 cursor-pointer transition-all hover:-translate-y-1 flex flex-col justify-between group shadow-xl"
            >
              <div>
                <div className="flex items-center gap-3 text-xs text-[#A1A1AA] font-mono mb-3">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#7B61FF]/15 text-[#7B61FF] font-semibold">
                    {art.category}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {art.readTime}
                  </span>
                </div>

                <h3 className="font-heading font-bold text-lg text-white group-hover:text-[#7B61FF] transition-colors leading-snug mb-2">
                  {art.title}
                </h3>

                <p className="text-xs text-gray-300 font-body line-clamp-3 leading-relaxed">
                  {art.summary}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-white/[0.05] flex items-center justify-between text-xs text-[#A1A1AA]">
                <span className="truncate max-w-[150px]">{art.author}</span>
                <span className="text-[#7B61FF] font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Article Reader Modal */}
      <AnimatePresence>
        {selectedArticle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedArticle(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-[#0E1117] border border-white/[0.12] rounded-[32px] p-6 sm:p-8 shadow-2xl z-10 text-white max-h-[85vh] overflow-y-auto my-auto scrollbar-thin"
            >
              <button
                id="close-article-reader-btn"
                onClick={() => setSelectedArticle(null)}
                className="absolute top-6 right-6 p-2 rounded-2xl bg-white/[0.05] hover:bg-white/[0.1] text-[#A1A1AA] hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 text-xs text-[#7B61FF] font-mono mb-3">
                <span>{selectedArticle.category}</span>
                <span>•</span>
                <span>{selectedArticle.date}</span>
                <span>•</span>
                <span>{selectedArticle.readTime}</span>
              </div>

              <h1 className="font-heading font-bold text-2xl sm:text-3xl text-white mb-4">
                {selectedArticle.title}
              </h1>

              <div className="flex items-center gap-2 text-xs text-[#A1A1AA] border-b border-white/[0.08] pb-4 mb-6">
                <User className="w-3.5 h-3.5 text-[#5B8CFF]" />
                <span>By {selectedArticle.author}</span>
              </div>

              <div className="prose prose-invert prose-sm max-w-none space-y-4 text-gray-200 font-body leading-relaxed whitespace-pre-line">
                {selectedArticle.content}
              </div>

              <div className="mt-8 pt-4 border-t border-white/[0.08] flex items-center gap-2 flex-wrap">
                {selectedArticle.tags.map((tag) => (
                  <span key={tag} className="px-2.5 py-1 rounded-lg bg-white/[0.05] text-xs text-[#A1A1AA] font-mono">
                    #{tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
