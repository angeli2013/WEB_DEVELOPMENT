/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from "react";
import { Search, ShoppingCart, User, Home, UtensilsCrossed, Heart, ReceiptText } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { PRODUCTS, CATEGORIES, FOOTER_INFO } from "./constants";
import { Product, CartItem } from "./types";
import ProductCard from "./components/ProductCard";
import ProductModal from "./components/ProductModal";
import InfoModal from "./components/InfoModal";
import CartDrawer from "./components/CartDrawer";
import CheckoutModal from "./components/CheckoutModal";
import { cn } from "./lib/utils";

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedFooterInfo, setSelectedFooterInfo] = useState<{ title: string, content: string } | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [orderSubtotal, setOrderSubtotal] = useState(0);

  const cartCount = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
  }, [cartItems]);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchesCategory = selectedCategory === "ALL" || product.category === selectedCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            product.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleAddToCart = (product: Product, quantity: number) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.product.id === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.product.id === productId) {
        const newQuantity = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQuantity };
      }
      return item;
    }));
  };

  const removeItem = (productId: string) => {
    setCartItems(prev => prev.filter(item => item.product.id !== productId));
  };

  const handleCheckout = () => {
    const total = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    setOrderSubtotal(total);
    setIsCartOpen(false);
    setIsCheckoutModalOpen(true);
  };

  const handleCloseCheckoutModal = () => {
    setIsCheckoutModalOpen(false);
    setCartItems([]);
  };

  return (
    <div className="bg-warm-cream min-h-screen flex flex-col pb-24 md:pb-0 font-body">
      {/* Top Bar */}
      <header className="bg-deep-mahogany border-b-[1.5px] border-sand sticky top-0 z-40 w-full shadow-sm">
        <div className="flex justify-between items-center w-full px-6 py-4 max-w-[900px] mx-auto">
          <h1 className="font-display text-[24px] font-semibold text-honey-gold italic m-0">
            Taste of Africa
          </h1>
          <div className="flex items-center gap-4">
            {/* Desktop Search */}
            <div className="hidden md:flex items-center border-[1.5px] border-sand rounded-full px-4 py-2 bg-ivory">
              <Search className="text-terracotta mr-2" size={16} />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent border-none p-0 text-[13px] text-deep-mahogany focus:ring-0 w-48 font-light outline-none placeholder-warm-brown/40"
              />
            </div>
            <button
              onClick={() => setIsCartOpen(true)}
              className="text-pale-gold hover:text-honey-gold transition-colors p-2 rounded-full relative group"
            >
              <ShoppingCart size={24} />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-sunset-orange text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform">
                  {cartCount}
                </span>
              )}
            </button>
            <button className="text-pale-gold hover:text-honey-gold transition-colors p-2 rounded-full">
              <User size={24} />
            </button>
          </div>
        </div>
      </header>

      <main className="flex-grow w-full max-w-[900px] mx-auto px-6 py-8">
        {/* Mobile Search */}
        <div className="md:hidden mb-6">
          <div className="flex items-center border-[1.5px] border-sand rounded-full px-4 py-2 bg-ivory w-full">
            <Search className="text-terracotta mr-2" size={18} />
            <input
              type="text"
              placeholder="Search catalog..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none p-0 text-[13px] text-deep-mahogany focus:ring-0 w-full font-light outline-none placeholder-warm-brown/40"
            />
          </div>
        </div>

        {/* Filters */}
        <section className="mb-8 overflow-hidden">
          <div className="flex overflow-x-auto gap-3 pb-2 scrollbar-hide items-center">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={cn(
                  "border-[1.5px] border-sand rounded-full px-6 py-2 text-[12px] font-bold tracking-widest whitespace-nowrap transition-colors",
                  selectedCategory === category
                    ? "bg-terracotta text-pale-gold border-terracotta"
                    : "bg-ivory text-terracotta hover:bg-pale-gold"
                )}
              >
                {category}
              </button>
            ))}
          </div>
        </section>

        {/* Product Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onViewDetails={setSelectedProduct}
              />
            ))}
          </AnimatePresence>
        </section>

        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-warm-brown font-light italic">No products found matching your search.</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-deep-mahogany border-t-[1.5px] border-sand mt-12 w-full">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 max-w-[900px] mx-auto px-6 py-12">
          <span className="font-display text-[20px] font-semibold text-honey-gold italic">Taste of Africa</span>
          <div className="flex flex-wrap justify-center gap-6">
            {Object.keys(FOOTER_INFO).map((key) => {
              const info = FOOTER_INFO[key as keyof typeof FOOTER_INFO];
              return (
                <button
                  key={key}
                  onClick={() => setSelectedFooterInfo(info)}
                  className="text-pale-gold/70 hover:text-honey-gold transition-colors text-[12px] font-bold tracking-widest cursor-pointer"
                >
                  {info.title.toUpperCase()}
                </button>
              );
            })}
          </div>
          <p className="text-pale-gold/50 text-[13px] font-light text-center md:text-right">
            © 2026 Taste of Africa. Celebrating Heritage through Flavor.
          </p>
        </div>
      </footer>

      {/* Bottom Nav (Mobile) */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 rounded-t-xl shadow-[0_-4px_12px_rgba(0,0,0,0.05)] bg-warm-cream border-t-[1.5px] border-sand flex justify-around items-center px-4 py-2">
        <button className="flex flex-col items-center justify-center text-warm-brown/60 hover:text-terracotta transition-colors py-2 px-4">
          <Home size={20} className="mb-1" />
          <span className="text-[10px] font-bold tracking-widest">HOME</span>
        </button>
        <button className="flex flex-col items-center justify-center bg-honey-gold/30 text-terracotta rounded-full px-5 py-2 -translate-y-1 transition-transform border border-sand/50">
          <UtensilsCrossed size={20} className="mb-1" fill="currentColor" />
          <span className="text-[10px] font-bold tracking-widest">CATALOG</span>
        </button>
        <button className="flex flex-col items-center justify-center text-warm-brown/60 hover:text-terracotta transition-colors py-2 px-4">
          <Heart size={20} className="mb-1" />
          <span className="text-[10px] font-bold tracking-widest">FAVORITES</span>
        </button>
        <button className="flex flex-col items-center justify-center text-warm-brown/60 hover:text-terracotta transition-colors py-2 px-4">
          <ReceiptText size={20} className="mb-1" />
          <span className="text-[10px] font-bold tracking-widest">ORDERS</span>
        </button>
      </nav>

      {/* Product Detail Modal */}
      <ProductModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Footer Info Modal */}
      <InfoModal
        isOpen={!!selectedFooterInfo}
        onClose={() => setSelectedFooterInfo(null)}
        title={selectedFooterInfo?.title || ""}
        content={selectedFooterInfo?.content || ""}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeItem}
        onCheckout={handleCheckout}
      />

      {/* Checkout Selection Modal */}
      <CheckoutModal
        isOpen={isCheckoutModalOpen}
        onClose={handleCloseCheckoutModal}
        subtotal={orderSubtotal}
      />
    </div>
  );
}
