import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shuffle, X, Volume2, Sparkles, Heart, Copy, ArrowUpRight, Check } from 'lucide-react';
import { NameItem } from '../types';
import { pronounceName } from '../utils/sound';

interface RandomGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  allNames: NameItem[];
  onSelectDetails: (item: NameItem) => void;
  onToggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
  onShowToast: (title: string, description?: string) => void;
}

export const RandomGeneratorModal: React.FC<RandomGeneratorModalProps> = ({
  isOpen,
  onClose,
  allNames,
  onSelectDetails,
  onToggleFavorite,
  isFavorite,
  onShowToast,
}) => {
  const [selectedGender, setSelectedGender] = useState<'All' | 'Boy' | 'Girl' | 'Unisex'>('All');
  const [isSpinning, setIsSpinning] = useState(false);
  const [currentName, setCurrentName] = useState<NameItem | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isOpen && allNames.length > 0) {
      let candidatePool = allNames;
      if (selectedGender !== 'All') {
        candidatePool = allNames.filter(
          (n) => n.gender.toLowerCase() === selectedGender.toLowerCase()
        );
      }
      if (candidatePool.length === 0) {
        candidatePool = allNames;
      }
      const randomIndex = Math.floor(Math.random() * candidatePool.length);
      setCurrentName(candidatePool[randomIndex]);
    }
  }, [isOpen, selectedGender, allNames]);

  if (!isOpen) return null;

  const handleGenerate = () => {
    setIsSpinning(true);
    let candidatePool = allNames;
    if (selectedGender !== 'All') {
      candidatePool = allNames.filter(
        (n) => n.gender.toLowerCase() === selectedGender.toLowerCase()
      );
    }

    if (candidatePool.length === 0) {
      candidatePool = allNames;
    }

    let spins = 0;
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * candidatePool.length);
      setCurrentName(candidatePool[randomIndex]);
      spins++;
      if (spins > 12) {
        clearInterval(interval);
        setIsSpinning(false);
      }
    }, 80);
  };

  const handleGenderChange = (gender: 'All' | 'Boy' | 'Girl' | 'Unisex') => {
    setSelectedGender(gender);
  };

  const handleCopy = async () => {
    if (!currentName) return;
    try {
      await navigator.clipboard.writeText(
        `${currentName.name} (${currentName.pronunciation}) - ${currentName.meaning}`
      );
      setCopied(true);
      onShowToast(`Copied "${currentName.name}" ✓`);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-lg bg-[#0E1117] border border-white/[0.12] rounded-[32px] p-6 sm:p-8 shadow-2xl z-10 text-white text-center"
        >
          <button
            id="close-random-modal-btn"
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-2xl bg-white/[0.05] hover:bg-white/[0.1] text-[#A1A1AA] hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-12 h-12 rounded-2xl bg-[#5B8CFF]/15 text-[#5B8CFF] flex items-center justify-center mx-auto mb-4 border border-[#5B8CFF]/30">
            <Shuffle className="w-6 h-6" />
          </div>

          <h2 className="font-heading font-bold text-2xl text-white">Random Name Generator</h2>
          <p className="text-xs text-[#A1A1AA] mt-1 max-w-sm mx-auto">
            Feeling indecisive? Spin the wheel to discover a unique name with its origin and meaning.
          </p>

          {/* Gender Filter for Generator */}
          <div className="flex items-center justify-center gap-2 my-5">
            {(['All', 'Boy', 'Girl', 'Unisex'] as const).map((g) => (
              <button
                key={g}
                id={`random-gender-${g}`}
                onClick={() => handleGenderChange(g)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  selectedGender === g
                    ? 'bg-[#5B8CFF] text-white shadow-md'
                    : 'bg-[#05070A] text-[#A1A1AA] hover:text-white border border-white/[0.06]'
                }`}
              >
                {g}
              </button>
            ))}
          </div>

          {/* Animated Card Spin Box */}
          <div className="p-6 rounded-2xl bg-[#05070A] border border-white/[0.08] min-h-[180px] flex flex-col items-center justify-center relative overflow-hidden my-6 glow-blue">
            {currentName ? (
              <motion.div
                key={currentName.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-2 w-full"
              >
                <div className="flex items-center justify-center gap-2">
                  <span className="font-heading font-extrabold text-4xl text-white tracking-tight">
                    {currentName.name}
                  </span>
                  <button
                    onClick={() => pronounceName(currentName.name, currentName.gender)}
                    className="p-1 text-[#5B8CFF] hover:scale-110"
                  >
                    <Volume2 className="w-5 h-5" />
                  </button>
                </div>

                <div className="text-xs font-mono text-[#5B8CFF]">
                  /{currentName.pronunciation}/ • {currentName.country} ({currentName.gender})
                </div>

                <p className="text-sm text-gray-300 font-body max-w-md mx-auto line-clamp-2">
                  "{currentName.meaning}"
                </p>

                {/* Quick actions for current random name */}
                {!isSpinning && (
                  <div className="flex items-center justify-center gap-2 pt-3">
                    <button
                      id="random-card-copy-btn"
                      onClick={handleCopy}
                      className="px-3 py-1.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-xs font-medium text-white flex items-center gap-1"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copied ? 'Copied' : 'Copy'}</span>
                    </button>

                    <button
                      id="random-card-fav-btn"
                      onClick={() => {
                        onToggleFavorite(currentName.id);
                        onShowToast(`Updated Favorites`);
                      }}
                      className={`px-3 py-1.5 rounded-xl text-xs font-medium flex items-center gap-1 border transition-colors ${
                        isFavorite(currentName.id)
                          ? 'bg-rose-500/20 text-rose-400 border-rose-500/30'
                          : 'bg-white/[0.06] text-[#A1A1AA] border-white/[0.06]'
                      }`}
                    >
                      <Heart className="w-3.5 h-3.5" />
                      <span>Saved</span>
                    </button>

                    <button
                      id="random-card-view-btn"
                      onClick={() => {
                        onSelectDetails(currentName);
                        onClose();
                      }}
                      className="px-3 py-1.5 rounded-xl bg-[#5B8CFF]/15 text-[#5B8CFF] text-xs font-semibold flex items-center gap-1"
                    >
                      <span>Full Profile</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </motion.div>
            ) : (
              <div className="text-center text-[#A1A1AA]">
                <Sparkles className="w-8 h-8 text-[#5B8CFF]/50 mx-auto mb-2" />
                <p className="text-xs font-body">Press the button below to generate a random name</p>
              </div>
            )}
          </div>

          {/* Spin Trigger Button */}
          <button
            id="random-spin-trigger-btn"
            onClick={handleGenerate}
            disabled={isSpinning}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#5B8CFF] to-[#7B61FF] text-white font-bold text-sm shadow-xl shadow-[#5B8CFF]/25 hover:shadow-[#5B8CFF]/40 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <Shuffle className={`w-5 h-5 ${isSpinning ? 'animate-spin' : ''}`} />
            <span>{isSpinning ? 'Spinning Names...' : 'Generate Random Name'}</span>
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
