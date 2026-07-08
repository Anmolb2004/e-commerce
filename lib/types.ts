export type Category =
  | "Candles"
  | "Skincare"
  | "Fragrance"
  | "Bath & Body"
  | "Home"
  | "Botanicals";

export interface Review {
  author: string;
  rating: number;
  date: string;
  title: string;
  body: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  details: string[];
  ingredients?: string;
  price: number;
  compareAtPrice?: number;
  category: Category;
  brand: string;
  tags: string[];
  images: string[];
  rating: number;
  reviewCount: number;
  reviews: Review[];
  inStock: boolean;
  lowStock?: boolean;
  isNew?: boolean;
  isBestseller?: boolean;
  popularity: number;
  createdAt: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface OrderItem {
  productId: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  email: string;
  name: string;
  address: string;
  city: string;
  country: string;
  placedAt: string;
  estimatedDelivery: string;
}

export type SortKey =
  | "featured"
  | "newest"
  | "price-asc"
  | "price-desc"
  | "popular"
  | "rating";
