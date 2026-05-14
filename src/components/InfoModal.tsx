/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: string;
}

export default function InfoModal({ isOpen, onClose, title, content }: InfoModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-deep-mahogany/80 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="bg-warm-cream border-[1.5px] border-sand rounded-xl max-w-[400px] w-full p-8 shadow-xl relative z-10 text-center"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-warm-brown hover:text-terracotta transition-colors"
            >
              <X size={24} />
            </button>

            <h2 className="font-display text-[24px] font-semibold text-deep-mahogany mb-4">
              {title}
            </h2>

            <p className="text-[14px] text-warm-brown leading-relaxed italic">
              "{content}"
            </p>

            <button
              onClick={onClose}
              className="mt-8 px-8 py-2 bg-terracotta text-pale-gold font-bold text-[12px] tracking-widest rounded-full hover:bg-deep-mahogany transition-colors border-[1.5px] border-terracotta"
            >
              CLOSE
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
