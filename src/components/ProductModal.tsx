/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { X, Minus, Plus } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Product } from "../types";
import { useState } from "react";

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
}

export default function ProductModal({ product, isOpen, onClose, onAddToCart }: ProductModalProps) {
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  const handleAddToCart = () => {
    onAddToCart(product, quantity);
    onClose();
    setQuantity(1);
  };

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
            className="bg-warm-cream border-[1.5px] border-sand rounded-xl max-w-[420px] w-full p-6 shadow-xl relative z-10"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-warm-brown hover:text-terracotta transition-colors"
            >
              <X size={24} />
            </button>

            <div className="bg-pale-gold h-48 rounded-lg mb-6 border-[1.5px] border-sand overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex justify-between items-start mb-2">
              <h2 className="font-display text-[24px] font-semibold text-deep-mahogany">
                {product.name}
              </h2>
              <span className="font-display text-[24px] font-semibold text-terracotta">
                ${product.price.toFixed(2)}
              </span>
            </div>

            <p className="text-[14px] text-warm-brown mb-6 leading-relaxed">
              {product.description}
            </p>

            <div className="flex items-center justify-between mb-8">
              <span className="text-[12px] font-bold tracking-widest text-warm-brown/60">
                QUANTITY
              </span>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 rounded-full border-[1.5px] border-sand flex items-center justify-center text-terracotta hover:bg-pale-gold transition-colors"
                >
                  <Minus size={14} />
                </button>
                <span className="font-display text-[20px] font-semibold text-deep-mahogany min-w-[20px] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8 rounded-full border-[1.5px] border-sand flex items-center justify-center text-terracotta hover:bg-pale-gold transition-colors"
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              className="w-full bg-terracotta text-pale-gold font-bold text-[14px] py-3 rounded-full hover:bg-deep-mahogany transition-colors text-center border-[1.5px] border-terracotta"
            >
              ADD TO CART
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
