import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search, Globe, FileCode2, CheckCircle2, Copy, ExternalLink, Sparkles, AlertCircle } from 'lucide-react';

interface SEOGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SEOGuideModal: React.FC<SEOGuideModalProps> = ({ isOpen, onClose }) => {
  const [copiedMeta, setCopiedMeta] = useState(false);
  const [copiedSitemap, setCopiedSitemap] = useState(false);

  if (!isOpen) return null;

  const currentHost = typeof window !== 'undefined' ? window.location.origin : 'https://your-domain.com';
  const sitemapUrl = `${currentHost}/sitemap.xml`;
  const robotsUrl = `${currentHost}/robots.txt`;

  const metaTagSnippet = `<meta name="google-site-verification" content="YOUR_GOOGLE_VERIFICATION_CODE" />`;

  const handleCopyMeta = () => {
    navigator.clipboard.writeText(metaTagSnippet);
    setCopiedMeta(true);
    setTimeout(() => setCopiedMeta(false), 2000);
  };

  const handleCopySitemap = () => {
    navigator.clipboard.writeText(sitemapUrl);
    setCopiedSitemap(true);
    setTimeout(() => setCopiedSitemap(false), 2000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-[28px] bg-[#0A0D14] border border-white/10 shadow-2xl p-6 sm:p-8 text-slate-200 scrollbar-thin"
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-4 pb-6 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 p-[1px] shadow-lg shadow-indigo-500/20">
                <div className="w-full h-full bg-[#0A0D14] rounded-[15px] flex items-center justify-center">
                  <Search className="w-6 h-6 text-indigo-400" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-heading font-extrabold text-xl sm:text-2xl text-white tracking-tight">
                    Google Search Console & SEO Guide
                  </h2>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                    Live Ready
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                  Step-by-step instructions to get your baby names site indexed at #1 on Google Search
                </p>
              </div>
            </div>

            <button
              id="seo-guide-close-btn"
              onClick={onClose}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all shrink-0"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Links Banner */}
          <div className="mt-6 p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/25 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-indigo-400 shrink-0" />
              <span className="text-xs font-semibold text-indigo-200">
                Your site is automatically serving robots.txt & dynamic XML sitemaps!
              </span>
            </div>
            <div className="flex items-center gap-2">
              <a
                href={sitemapUrl}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-md"
              >
                <span>View Sitemap.xml</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <a
                href={robotsUrl}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition-all border border-white/10"
              >
                <span>View Robots.txt</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Step-by-Step Instructions */}
          <div className="mt-8 space-y-6">
            
            {/* Step 1 */}
            <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
              <div className="flex items-center gap-3 mb-3">
                <span className="w-7 h-7 rounded-xl bg-blue-600 text-white font-mono font-bold text-xs flex items-center justify-center">
                  1
                </span>
                <h3 className="font-heading font-bold text-base text-white">
                  Add Property in Google Search Console
                </h3>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed pl-10">
                Go to <a href="https://search.google.com/search-console" target="_blank" rel="noreferrer" className="text-indigo-400 hover:underline inline-flex items-center gap-1 font-semibold">Google Search Console <ExternalLink className="w-3 h-3" /></a> and click <strong>"Add Property"</strong>. Choose <strong>"URL prefix"</strong> and enter your deployed app domain URL (or your custom domain).
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
              <div className="flex items-center gap-3 mb-3">
                <span className="w-7 h-7 rounded-xl bg-indigo-600 text-white font-mono font-bold text-xs flex items-center justify-center">
                  2
                </span>
                <h3 className="font-heading font-bold text-base text-white">
                  Verify Site Ownership via HTML Tag
                </h3>
              </div>
              <div className="pl-10 space-y-3">
                <p className="text-xs text-slate-300 leading-relaxed">
                  In Search Console, select <strong>"HTML tag"</strong> as the verification method. Google will give you a meta tag like this:
                </p>
                <div className="flex items-center justify-between p-3 rounded-xl bg-[#030408] border border-white/10 font-mono text-xs text-indigo-300 overflow-x-auto">
                  <code>{metaTagSnippet}</code>
                  <button
                    onClick={handleCopyMeta}
                    className="ml-3 p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-200 transition-all shrink-0 flex items-center gap-1 text-[11px]"
                  >
                    {copiedMeta ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedMeta ? 'Copied!' : 'Copy'}</span>
                  </button>
                </div>
                <p className="text-xs text-slate-400">
                  Paste your verification code into <code className="text-indigo-300">index.html</code> inside the <code className="text-indigo-300">&lt;head&gt;</code> section under <code className="text-indigo-300">google-site-verification</code>.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
              <div className="flex items-center gap-3 mb-3">
                <span className="w-7 h-7 rounded-xl bg-purple-600 text-white font-mono font-bold text-xs flex items-center justify-center">
                  3
                </span>
                <h3 className="font-heading font-bold text-base text-white">
                  Submit Your XML Sitemap
                </h3>
              </div>
              <div className="pl-10 space-y-3">
                <p className="text-xs text-slate-300 leading-relaxed">
                  Inside Search Console, go to <strong>"Sitemaps"</strong> in the left sidebar. Type <code className="text-indigo-300 font-semibold">sitemap.xml</code> and click <strong>Submit</strong>.
                </p>
                <div className="flex items-center justify-between p-3 rounded-xl bg-[#030408] border border-white/10 font-mono text-xs text-indigo-300">
                  <span>{sitemapUrl}</span>
                  <button
                    onClick={handleCopySitemap}
                    className="ml-3 p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-200 transition-all shrink-0 flex items-center gap-1 text-[11px]"
                  >
                    {copiedSitemap ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedSitemap ? 'Copied!' : 'Copy Link'}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Step 4: Pro SEO Tips */}
            <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <h4 className="font-heading font-bold text-sm text-emerald-300">
                  Built-in On-Page SEO Features Included
                </h4>
              </div>
              <ul className="text-xs text-slate-300 space-y-2 pl-7 list-disc font-body">
                <li><strong>Schema.org JSON-LD:</strong> Built-in WebSite and SearchAction structured data for rich search results and direct search box on Google.</li>
                <li><strong>OpenGraph & Twitter Cards:</strong> Social share cards optimized for Facebook, WhatsApp, Twitter, and LinkedIn previews.</li>
                <li><strong>Fast Clean Semantic HTML:</strong> High speed rendering and indexable category keywords for boy, girl, unisex, and 100+ global origins.</li>
              </ul>
            </div>

          </div>

          {/* Footer Close */}
          <div className="mt-8 pt-4 border-t border-white/10 flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-lg shadow-indigo-600/30 transition-all"
            >
              Got It, Thanks!
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
