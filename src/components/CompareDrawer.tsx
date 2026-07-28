import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Layers, Volume2, Trash2, Check, ArrowRight } from 'lucide-react';
import { NameItem } from '../types';
import { pronounceName } from '../utils/sound';

interface CompareDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  comparedNames: NameItem[];
  onRemoveCompare: (id: string) => void;
  onClearCompare: () => void;
  onSelectDetails: (item: NameItem) => void;
}

export const CompareDrawer: React.FC<CompareDrawerProps> = ({
  isOpen,
  onClose,
  comparedNames,
  onRemoveCompare,
  onClearCompare,
  onSelectDetails,
}) => {
  if (!isOpen) return null;

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

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-5xl bg-[#0E1117] border border-white/[0.12] rounded-[32px] p-6 sm:p-8 shadow-2xl z-10 max-h-[90vh] overflow-y-auto my-auto scrollbar-thin text-white"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-[#5B8CFF]/15 text-[#5B8CFF]">
                <Layers className="w-6 h-6" />
              </div>
              <div>
                <h2 className="font-heading font-bold text-2xl text-white">Compare Names</h2>
                <p className="text-xs text-[#A1A1AA]">
                  Side-by-side analysis for up to 4 selected names
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {comparedNames.length > 0 && (
                <button
                  id="clear-all-compare-btn"
                  onClick={onClearCompare}
                  className="px-3 py-1.5 rounded-xl bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 text-xs font-semibold transition-colors flex items-center gap-1.5"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Clear Selection</span>
                </button>
              )}
              <button
                id="close-compare-modal-btn"
                onClick={onClose}
                className="p-2 rounded-2xl bg-white/[0.05] hover:bg-white/[0.1] text-[#A1A1AA] hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {comparedNames.length === 0 ? (
            <div className="py-16 text-center">
              <Layers className="w-12 h-12 text-[#A1A1AA]/40 mx-auto mb-3" />
              <h3 className="font-heading font-semibold text-lg text-white mb-1">
                No Names Selected For Comparison
              </h3>
              <p className="text-xs text-[#A1A1AA] max-w-md mx-auto">
                Click the comparison icon on any name card in the main list to compare meanings, origins, lucky traits, and popularity scores side-by-side.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[600px]">
                <thead>
                  <tr className="border-b border-white/[0.08]">
                    <th className="py-3 px-4 text-xs font-mono text-[#A1A1AA] w-36">Attribute</th>
                    {comparedNames.map((item) => (
                      <th key={item.id} className="py-3 px-4 min-w-[180px]">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-heading font-bold text-xl text-white flex items-center gap-2">
                              <span>{item.name}</span>
                              <button
                                onClick={() => pronounceName(item.name, item.gender)}
                                className="text-[#5B8CFF] hover:scale-110"
                              >
                                <Volume2 className="w-4 h-4" />
                              </button>
                            </div>
                            <div className="text-xs font-mono text-[#5B8CFF]">/{item.pronunciation}/</div>
                          </div>
                          <button
                            onClick={() => onRemoveCompare(item.id)}
                            className="p-1 rounded bg-white/[0.05] text-[#A1A1AA] hover:text-rose-400"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.06] text-sm">
                  <tr>
                    <td className="py-3 px-4 text-xs font-mono text-[#A1A1AA]">Gender</td>
                    {comparedNames.map((item) => (
                      <td key={item.id} className="py-3 px-4 font-semibold text-[#5B8CFF]">
                        {item.gender}
                      </td>
                    ))}
                  </tr>

                  <tr>
                    <td className="py-3 px-4 text-xs font-mono text-[#A1A1AA]">Meaning</td>
                    {comparedNames.map((item) => (
                      <td key={item.id} className="py-3 px-4 text-gray-300 text-xs font-body">
                        {item.meaning}
                      </td>
                    ))}
                  </tr>

                  <tr>
                    <td className="py-3 px-4 text-xs font-mono text-[#A1A1AA]">Country & Origin</td>
                    {comparedNames.map((item) => (
                      <td key={item.id} className="py-3 px-4 text-xs text-white">
                        {item.country} ({item.origin})
                      </td>
                    ))}
                  </tr>

                  <tr>
                    <td className="py-3 px-4 text-xs font-mono text-[#A1A1AA]">Religion</td>
                    {comparedNames.map((item) => (
                      <td key={item.id} className="py-3 px-4 text-xs text-emerald-400">
                        {item.religion}
                      </td>
                    ))}
                  </tr>

                  <tr>
                    <td className="py-3 px-4 text-xs font-mono text-[#A1A1AA]">Style & Vibe</td>
                    {comparedNames.map((item) => (
                      <td key={item.id} className="py-3 px-4 text-xs text-[#7B61FF] font-medium">
                        {item.style}
                      </td>
                    ))}
                  </tr>

                  <tr>
                    <td className="py-3 px-4 text-xs font-mono text-[#A1A1AA]">Popularity Score</td>
                    {comparedNames.map((item) => (
                      <td key={item.id} className="py-3 px-4">
                        <div className="font-num font-bold text-base text-white">{item.popularity}%</div>
                      </td>
                    ))}
                  </tr>

                  <tr>
                    <td className="py-3 px-4 text-xs font-mono text-[#A1A1AA]">Name Length</td>
                    {comparedNames.map((item) => (
                      <td key={item.id} className="py-3 px-4 font-mono text-xs text-[#A1A1AA]">
                        {item.length} letters
                      </td>
                    ))}
                  </tr>

                  <tr>
                    <td className="py-3 px-4 text-xs font-mono text-[#A1A1AA]">Lucky Number</td>
                    {comparedNames.map((item) => (
                      <td key={item.id} className="py-3 px-4 font-num font-bold text-amber-400">
                        #{item.luckyNumber}
                      </td>
                    ))}
                  </tr>

                  <tr>
                    <td className="py-3 px-4 text-xs font-mono text-[#A1A1AA]">Lucky Color & Stone</td>
                    {comparedNames.map((item) => (
                      <td key={item.id} className="py-3 px-4 text-xs text-gray-300">
                        {item.luckyColor} • {item.luckyStone}
                      </td>
                    ))}
                  </tr>

                  <tr>
                    <td className="py-3 px-4 text-xs font-mono text-[#A1A1AA]">Full Details</td>
                    {comparedNames.map((item) => (
                      <td key={item.id} className="py-3 px-4">
                        <button
                          onClick={() => {
                            onSelectDetails(item);
                            onClose();
                          }}
                          className="px-3 py-1.5 rounded-xl bg-[#5B8CFF]/15 text-[#5B8CFF] hover:bg-[#5B8CFF]/25 text-xs font-semibold flex items-center gap-1 transition-colors"
                        >
                          <span>View Profile</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          )}

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
