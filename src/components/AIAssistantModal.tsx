import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bot, X, Sparkles, Send, Loader2, Heart, Copy, Check, ArrowRight } from 'lucide-react';
import { AIRecommendation, GenderType, NameItem } from '../types';

interface AIAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShowToast: (title: string, description?: string) => void;
  onSelectNameByName: (name: string) => void;
}

export const AIAssistantModal: React.FC<AIAssistantModalProps> = ({
  isOpen,
  onClose,
  onShowToast,
  onSelectNameByName,
}) => {
  const [parentNames, setParentNames] = useState('');
  const [targetVibe, setTargetVibe] = useState('Royal & Modern');
  const [origin, setOrigin] = useState('');
  const [gender, setGender] = useState<GenderType>('Unisex');
  const [meaningWish, setMeaningWish] = useState('Peace, Strength, and Wisdom');
  const [siblingNames, setSiblingNames] = useState('');

  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<AIRecommendation[]>([]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('/api/gemini/ai-recommendations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          parentNames,
          targetVibe,
          origin,
          gender,
          meaning: meaningWish,
          siblingNames,
        })
      });

      const data = await response.json();
      if (data.recommendations && Array.isArray(data.recommendations)) {
        setRecommendations(data.recommendations);
        onShowToast(`AI Concierge Ready ✓`, `Generated ${data.recommendations.length} personalized recommendations.`);
      } else {
        throw new Error(data.error || 'Failed to fetch recommendations');
      }
    } catch (err: any) {
      onShowToast(`AI Error`, err.message || 'Please check API setup.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-3xl bg-[#0E1117] border border-white/[0.12] rounded-[32px] p-6 sm:p-8 shadow-2xl z-10 text-white max-h-[90vh] overflow-y-auto scrollbar-thin my-auto"
        >
          <button
            id="close-ai-modal-btn"
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-2xl bg-white/[0.05] hover:bg-white/[0.1] text-[#A1A1AA] hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-[#7B61FF]/15 text-[#7B61FF] border border-[#7B61FF]/30 flex items-center justify-center shrink-0">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-heading font-bold text-2xl text-white">AI Name Concierge</h2>
              <p className="text-xs text-[#A1A1AA]">
                Powered by Gemini AI — tailored recommendations matching family heritage and desires
              </p>
            </div>
          </div>

          {/* Input Form */}
          <form onSubmit={handleSubmit} className="space-y-4 mb-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#A1A1AA] mb-1 font-heading">
                  Parents' Names
                </label>
                <input
                  id="ai-parent-names-input"
                  type="text"
                  value={parentNames}
                  onChange={(e) => setParentNames(e.target.value)}
                  placeholder='e.g. "Alexander & Maya"'
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#05070A] border border-white/[0.08] focus:border-[#7B61FF] text-sm text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#A1A1AA] mb-1 font-heading">
                  Sibling Names
                </label>
                <input
                  id="ai-sibling-names-input"
                  type="text"
                  value={siblingNames}
                  onChange={(e) => setSiblingNames(e.target.value)}
                  placeholder='e.g. "Leo & Freya"'
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#05070A] border border-white/[0.08] focus:border-[#7B61FF] text-sm text-white focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#A1A1AA] mb-1 font-heading">
                  Target Style / Vibe
                </label>
                <input
                  id="ai-vibe-input"
                  type="text"
                  value={targetVibe}
                  onChange={(e) => setTargetVibe(e.target.value)}
                  placeholder='e.g. "Royal, Rare, Minimalist"'
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#05070A] border border-white/[0.08] focus:border-[#7B61FF] text-sm text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#A1A1AA] mb-1 font-heading">
                  Preferred Origin / Country
                </label>
                <input
                  id="ai-origin-input"
                  type="text"
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                  placeholder='e.g. "Japanese, French, Indian"'
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#05070A] border border-white/[0.08] focus:border-[#7B61FF] text-sm text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#A1A1AA] mb-1 font-heading">
                  Gender
                </label>
                <select
                  id="ai-gender-select"
                  value={gender}
                  onChange={(e) => setGender(e.target.value as GenderType)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#05070A] border border-white/[0.08] focus:border-[#7B61FF] text-sm text-white focus:outline-none"
                >
                  <option value="Boy">Boy</option>
                  <option value="Girl">Girl</option>
                  <option value="Unisex">Unisex</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#A1A1AA] mb-1 font-heading">
                Meaning or Wish for the Child
              </label>
              <input
                id="ai-meaning-input"
                type="text"
                value={meaningWish}
                onChange={(e) => setMeaningWish(e.target.value)}
                placeholder='e.g. "Light, Courage, Peace, Harmony with Nature"'
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#05070A] border border-white/[0.08] focus:border-[#7B61FF] text-sm text-white focus:outline-none"
              />
            </div>

            <button
              id="ai-submit-btn"
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#7B61FF] to-[#5B8CFF] text-white font-bold text-sm shadow-xl hover:shadow-[#7B61FF]/30 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Gemini AI Analyzing Etymologies...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  <span>Generate AI Recommendations</span>
                </>
              )}
            </button>
          </form>

          {/* AI Results Output */}
          {recommendations.length > 0 && (
            <div className="space-y-4 pt-4 border-t border-white/[0.08]">
              <h3 className="font-heading font-bold text-lg text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#7B61FF]" />
                <span>AI Curated Selections</span>
              </h3>

              <div className="space-y-3">
                {recommendations.map((rec, index) => (
                  <div
                    key={index}
                    className="p-5 rounded-2xl bg-[#05070A] border border-white/[0.08] hover:border-[#7B61FF]/40 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-heading font-bold text-2xl text-white">
                            {rec.name}
                          </span>
                          <span className="px-2 py-0.5 rounded bg-[#7B61FF]/15 text-[#7B61FF] text-xs font-semibold">
                            {rec.gender}
                          </span>
                          <span className="px-2 py-0.5 rounded bg-white/[0.05] text-[#A1A1AA] text-xs">
                            {rec.origin}
                          </span>
                        </div>
                        <p className="text-xs text-[#5B8CFF] font-semibold mt-1">
                          Meaning: "{rec.meaning}"
                        </p>
                      </div>

                      <button
                        onClick={() => {
                          onSelectNameByName(rec.name);
                          onClose();
                        }}
                        className="px-3 py-1.5 rounded-xl bg-[#7B61FF]/15 hover:bg-[#7B61FF]/25 text-[#7B61FF] text-xs font-semibold flex items-center gap-1 transition-colors shrink-0"
                      >
                        <span>Explore</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <p className="text-xs text-gray-300 font-body leading-relaxed mb-3">
                      <span className="text-[#A1A1AA] font-semibold">Why it matches: </span>
                      {rec.reasoning}
                    </p>

                    {rec.luckyAttributes && (
                      <div className="flex items-center gap-3 text-[11px] font-mono text-[#A1A1AA] pt-2 border-t border-white/[0.05]">
                        <span>Lucky #{rec.luckyAttributes.number}</span>
                        <span>•</span>
                        <span>Color: {rec.luckyAttributes.color}</span>
                        <span>•</span>
                        <span>Stone: {rec.luckyAttributes.stone}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
