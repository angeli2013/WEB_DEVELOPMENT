/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Star } from "lucide-react";
import { motion } from "motion/react";
import { Product } from "../types";
import { cn } from "../lib/utils";

interface ProductCardProps {
  product: Product;
  onViewDetails: (product: Product) => void;
  key?: string | number;
}

export default function ProductCard({ product, onViewDetails }: ProductCardProps) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -4 }}
      className="bg-ivory border-[1.5px] border-sand rounded-xl overflow-hidden flex flex-col shadow-sm hover:shadow-md relative group transition-shadow duration-200"
    >
      <div className="h-[150px] bg-pale-gold relative overflow-hidden">
        {product.badge && (
          <span className={cn(
            "absolute top-3 left-3 text-pale-gold font-bold text-[12px] tracking-widest px-3 py-1 rounded-full z-10 border border-pale-gold/30",
            product.badge === "BESTSELLER" ? "bg-deep-mahogany text-honey-gold border-honey-gold/30" : "bg-warm-brown"
          )}>
            {product.badge}
          </span>
        )}
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <span className="text-[12px] font-bold tracking-widest text-warm-brown/60 mb-2 font-body">
          {product.category}
        </span>
        <h3 className="font-display text-[20px] font-semibold text-deep-mahogany mb-2">
          {product.name}
        </h3>
        <p className="text-[13px] font-light text-warm-brown flex-grow mb-6 leading-relaxed line-clamp-3">
          {product.description}
        </p>
        <div className="flex justify-between items-end mb-5">
          <span className="font-display text-[20px] font-semibold text-terracotta">
            ${product.price.toFixed(2)}
          </span>
          <div className="flex items-center text-honey-gold">
            <Star size={18} fill="currentColor" />
            <span className="text-[12px] font-bold text-warm-brown ml-1">
              {product.rating.toFixed(1)}
            </span>
          </div>
        </div>
        <button
          onClick={() => onViewDetails(product)}
          className="w-full bg-terracotta text-pale-gold font-bold text-[14px] py-3 rounded-full hover:bg-deep-mahogany transition-colors text-center border-[1.5px] border-terracotta"
        >
          VIEW DETAILS
        </button>
      </div>
    </motion.article>
  );
}
