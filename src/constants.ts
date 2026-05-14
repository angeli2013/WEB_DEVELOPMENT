/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Product } from "./types";

export const PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Akabanga Chili Oil",
    category: "CONDIMENTS",
    description: "A fiery, intensely flavored chili oil crafted from Rwandan scotch bonnets. A single drop delivers complex heat and earthy undertones, perfect for elevating any traditional dish.",
    price: 12.50,
    rating: 4.9,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuADJh8byydqiJnyPk0OzR-HxFTBrcRfPf7cYkaQcpNHNpAorRiD6CjR5-QIQvFjMfoASsJgfSf0ny4ARhfCBIKkjwDvZSPI_Ngr24zB7fk0-z73CdDIZUAoHfbUkIEJWsyUY76iAaDQG1bvPKb5DP-GX23uzBX1PKtE7tNryGeY1VTZgeowvv7oRz_m1gnyCdC7A_t45UvUHDMcnauuRPE05B_dysXCvdinbvLFv4k9R6Z34VeMld5JBWHMNWvfbMMgKwXPb0g27CnR",
    badge: "BESTSELLER"
  },
  {
    id: "2",
    name: "Hibiscus Zobo Drink",
    category: "BEVERAGES",
    description: "A refreshing, tart, and floral beverage steeped from sun-dried hibiscus leaves. Enhanced with subtle notes of clove and ginger for a revitalizing, heritage-rich refreshment.",
    price: 8.00,
    rating: 4.7,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBLQfs2kpfeb8doEuzDSD7aWWLicwJ2srAs3_Q_Vc2fmrIJ11xayAau5agmfOs-mg-rAmAcc6lFIn3P02_6sOCiWEbxcpCoQGNKVJRBH586EnqC7C2q4OtYlf7GHgHVbKt2N-viqflbL0ZiF1hCr_tHzn2RmUQh61SnDVsauFHAqifu_n_1byLOzmuv7Lu3y2RGU5QJhdHHfWppzsMhoaFKzJ71qb3rWrBVLs6kvmy8emYLIZ8pY05v7gJmwX7vmrnTg0CTsaNSwnXh"
  },
  {
    id: "3",
    name: "Shea Honey Jar",
    category: "SWEETENERS",
    description: "Raw, unpasteurized honey harvested from the nectar of Shea blossoms. Distinctly rich, dark, and robustly sweet, offering a complex alternative to standard commercial syrups.",
    price: 16.00,
    rating: 5.0,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBUol9DTue76r3Lol7UZypz-Ep3b9E-ZVKzVNXKVZ7OtKsatdI0nsL2SZgaJlz2g8ocrDOxQlJu3ShNaGxNCWP4-_OfnVxnYoX_6VO1UkOdfwcrmxb3oTyjjosjFr5ZJuqpK7V927vN8GP7xO-s33mfvQuAk84bLL8C63fcNxld8m8xmBDtCK4pZdNjT6of3N8ujaYF-82k2e47WxigM9KeCv_TPtaGUIcHQupOvw0MXSJt5eWxyg2ytGq6taUR00ovopYyqplDS_lw",
    badge: "ORGANIC"
  },
  {
    id: "4",
    name: "Moringa Powder",
    category: "SUPERFOODS",
    description: "Finely milled from shade-dried leaves of the \"Miracle Tree.\" A potent, vibrant green superfood packed with essential nutrients, perfect for blending into smoothies or savory dishes.",
    price: 22.00,
    rating: 4.8,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBfPu9g7kCTPA3hhw5Nyo8mCHQj5M9EZm5ELNjA5Sty7gzq02duiwPGLQCFOJlYahje2J3NvttZJdVn7CX2mPEhslde4ZBrEh5MDILG5AUl4vhWVhU6-oZd1StEGiVGafToCNVXvz4MpdBTwDZTRNJGJTlbNN1MSoydV6OSwt6qE82PszRPWaZ4xwGlD5YbpuDELlwRdCu8sXUFmBBcv_adJX-kZMNt3peDMgedOWUqEhJ12-6CSg0N1kvQof-S_2-oUI3PX0O8P4Zt"
  }
];

export const CATEGORIES = ["ALL", "CONDIMENTS", "BEVERAGES", "SWEETENERS", "SUPERFOODS"] as const;

export const FOOTER_INFO = {
  SOURCING: {
    title: "Sourcing",
    content: "We partner with over 50 local farmers and cooperatives across Rwanda, Ghana, Nigeria, Ethiopia and South Africa."
  },
  "OUR STORY": {
    title: "Our Story",
    content: "Taste of Africa sources premium artisanal foods directly from farmers across the African continent."
  },
  SHIPPING: {
    title: "Shipping",
    content: "We deliver across Rwanda in 2-3 business days. East Africa delivery takes 5-7 days."
  },
  CONTACT: {
    title: "Contact",
    content: "Email us at hello@tasteofafrica.rw or call +250 788 000 000."
  }
} as const;
