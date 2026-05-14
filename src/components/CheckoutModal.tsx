/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  subtotal: number;
}

export default function CheckoutModal({ isOpen, onClose, subtotal }: CheckoutModalProps) {
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
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-honey-gold/20 text-honey-gold rounded-full flex items-center justify-center">
                <CheckCircle2 size={48} />
              </div>
            </div>

            <h2 className="font-display text-[28px] font-semibold text-deep-mahogany mb-2">
              Order Confirmed! 🎉
            </h2>
            
            <p className="text-[14px] text-warm-brown mb-6 font-light">
              Thank you for shopping with us! Your order has been placed and is being prepared with care.
            </p>

            <div className="bg-pale-gold rounded-lg p-6 mb-8 border border-sand/50">
              <div className="flex justify-between items-center mb-3">
                <span className="text-[12px] font-bold tracking-widest text-warm-brown/60">ORDER TOTAL</span>
                <span className="font-display text-[20px] font-semibold text-deep-mahogany">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center text-[13px]">
                <span className="text-warm-brown font-light">EST. DELIVERY</span>
                <span className="text-terracotta font-semibold">2-3 Business Days (Rwanda)</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full bg-terracotta text-pale-gold font-bold text-[14px] py-4 rounded-full hover:bg-deep-mahogany transition-colors text-center border-[1.5px] border-terracotta"
            >
              CONTINUE SHOPPING
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
