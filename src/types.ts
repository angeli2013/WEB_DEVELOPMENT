/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Product {
  id: string;
  name: string;
  category: "CONDIMENTS" | "BEVERAGES" | "SWEETENERS" | "SUPERFOODS";
  description: string;
  price: number;
  rating: number;
  image: string;
  badge?: "BESTSELLER" | "ORGANIC";
}

export interface CartItem {
  product: Product;
  quantity: number;
}
