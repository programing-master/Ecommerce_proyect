export interface Product {
  id: number;
  name: string;
  slug: string;
  price: number;
  discountPrice: number | null;
  category: string;
  subcategory: string;
  brand: string;
  description: string;
  image: string;
  images: string[];
  stock: number;
  rating: number;
  reviews: number;
  features: string[];
  specifications: Record<string>;
  isFeatured: boolean;
  isNew: boolean;
  tags: string[];
}

