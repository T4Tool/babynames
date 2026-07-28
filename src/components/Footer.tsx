import React from 'react';
import { Heart, Bot } from 'lucide-react';

interface FooterProps {
  onOpenAI: () => void;
  onOpenCategories: () => void;
  onSelectGender: (gender: 'Boy' | 'Girl' | 'Unisex') => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenAI,
  onOpenCategories,
  onSelectGender,
}) => {
  return (
    <footer className="bg-[#030408] border-t border-white/[0.08] pt-16 pb-12 text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-12">
          
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center text-white font-heading font-extrabold text-lg shadow-lg shadow-indigo-600/30">
                B
              </div>
              <span className="font-heading font-extrabold text-xl text-white tracking-tight">
                BabyNames<span className="text-indigo-400">.</span>
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm font-body">
              The premier discovery engine with 10,000+ unique baby names from 100+ countries, cultures, and historical eras. Powered by AI etymology and instant filters.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <button
                id="footer-ai-btn"
                onClick={onOpenAI}
                className="px-4 py-2.5 rounded-2xl bg-white/[0.04] border border-indigo-500/35 text-xs font-semibold text-white flex items-center gap-2 hover:border-indigo-400 transition-all backdrop-blur-xl shadow-md"
              >
                <Bot className="w-4 h-4 text-indigo-400" />
                <span>AI Concierge</span>
              </button>
            </div>
          </div>

          {/* Quick Gender Links */}
          <div>
            <h4 className="font-heading font-bold text-white text-xs uppercase tracking-wider mb-4">
              Browse By Gender
            </h4>
            <ul className="space-y-2.5 text-xs font-medium">
              <li>
                <button onClick={() => onSelectGender('Boy')} className="hover:text-blue-400 transition-colors">
                  Unique Baby Boy Names
                </button>
              </li>
              <li>
                <button onClick={() => onSelectGender('Girl')} className="hover:text-rose-400 transition-colors">
                  Unique Baby Girl Names
                </button>
              </li>
              <li>
                <button onClick={() => onSelectGender('Unisex')} className="hover:text-emerald-400 transition-colors">
                  Gender Neutral Names
                </button>
              </li>
            </ul>
          </div>

          {/* Top Origins */}
          <div>
            <h4 className="font-heading font-bold text-white text-xs uppercase tracking-wider mb-4">
              Top Cultural Origins
            </h4>
            <ul className="space-y-2.5 text-xs font-medium">
              <li><span>Indian & Sanskrit Names</span></li>
              <li><span>Japanese & Asian Names</span></li>
              <li><span>French & European Names</span></li>
              <li><span>Arabic & Persian Names</span></li>
              <li><span>Nordic & Viking Lore</span></li>
            </ul>
          </div>

          {/* Categories & Legal */}
          <div>
            <h4 className="font-heading font-bold text-white text-xs uppercase tracking-wider mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs font-medium">
              <li>
                <button onClick={onOpenCategories} className="hover:text-indigo-400 transition-colors">
                  All Categories
                </button>
              </li>
              <li><span>SEO Sitemap</span></li>
              <li><span>Etymology Dictionary</span></li>
              <li><span>Privacy & Security</span></li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright Bar */}
        <div className="pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-medium">
          <p>© {new Date().getFullYear()} BabyNames Inc. Built for modern parents worldwide.</p>
          <p className="flex items-center gap-1.5">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>& AI Precision</span>
          </p>
        </div>

      </div>
    </footer>
  );
};
