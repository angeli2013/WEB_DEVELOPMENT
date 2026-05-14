/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { X, ShoppingCart, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { CartItem } from "../types";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onCheckout: () => void;
}

export default function CartDrawer({ isOpen, onClose, items, onUpdateQuantity, onRemoveItem, onCheckout }: CartDrawerProps) {
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-deep-mahogany/40 backdrop-blur-sm"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="relative w-full max-w-[400px] bg-warm-cream h-full shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-sand">
              <div className="flex items-center gap-2">
                <ShoppingCart size={20} className="text-terracotta" />
                <h2 className="font-display text-[24px] font-semibold text-deep-mahogany">Your Cart</h2>
              </div>
              <button
                onClick={onClose}
                className="text-warm-brown hover:text-terracotta transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* List */}
            <div className="flex-grow overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <div className="w-16 h-16 bg-pale-gold rounded-full flex items-center justify-center mb-4">
                    <ShoppingCart size={32} className="text-warm-brown/40" />
                  </div>
                  <p className="text-warm-brown font-light italic">Your cart is empty</p>
                  <button
                    onClick={onClose}
                    className="mt-6 text-[12px] font-bold tracking-widest text-terracotta hover:underline"
                  >
                    CONTINUE SHOPPING
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex gap-4">
                      <div className="w-20 h-20 bg-pale-gold rounded-lg overflow-hidden flex-shrink-0 border border-sand">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-grow">
                        <div className="flex justify-between items-start mb-1">
                          <h3 className="font-display text-[16px] font-semibold text-deep-mahogany leading-tight">
                            {item.product.name}
                          </h3>
                          <span className="font-display text-[16px] font-semibold text-terracotta">
                            ${(item.product.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                        <p className="text-[12px] text-warm-brown mb-3">
                          ${item.product.price.toFixed(2)} each
                        </p>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center border border-sand rounded-full">
                            <button
                              onClick={() => onUpdateQuantity(item.product.id, -1)}
                              className="px-2 py-1 text-terracotta hover:bg-pale-gold rounded-l-full transition-colors"
                            >
                              -
                            </button>
                            <span className="px-3 text-[13px] font-semibold text-deep-mahogany">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => onUpdateQuantity(item.product.id, 1)}
                              className="px-2 py-1 text-terracotta hover:bg-pale-gold rounded-r-full transition-colors"
                            >
                              +
                            </button>
                          </div>
                          <button
                            onClick={() => onRemoveItem(item.product.id)}
                            className="text-warm-brown/40 hover:text-error transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 border-t border-sand bg-ivory">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-[14px] font-bold tracking-widest text-warm-brown/60">SUBTOTAL</span>
                  <span className="font-display text-[24px] font-semibold text-deep-mahogany">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
                <button
                  onClick={onCheckout}
                  className="w-full bg-terracotta text-pale-gold font-bold text-[14px] py-4 rounded-full hover:bg-deep-mahogany transition-colors text-center border-[1.5px] border-terracotta"
                >
                  CHECKOUT
                </button>
                <p className="text-[11px] text-center text-warm-brown mt-4 font-light italic">
                  Shipping and taxes calculated at checkout
                </p>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
